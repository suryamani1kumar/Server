import { Request, Response } from "express";
import Package from "../../models/package.schema";
import PackageItinerary from "../../models/packageitinerary.schema";

export const createPackage = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const {
      packageName,
      slug,
      packageCatgory,
      packageRating,
      description,
      durationDays,
      durationNights,
      siteId,
      metaTitle,
      metaDescription,
      metaKeywords,
      media,
      isActive,
      itinerary,
      countries,
      cities,
      faqs,
      inclusions,
      exclusions,
      termsAndConditions,
      cancellationPolicy,
      pricing,
      isTransfers,
      isMealsIncluded,
      isHotels,
      isSightseeing,
      isActivity,
      packageStartSeason,
      packageEndSeason,
    } = req.body;

    // Check duplicate
    const existingPackage = await Package.findOne({ slug, siteId });

    if (existingPackage) {
      res.status(409).json({
        success: false,
        message: "Package already exists",
      });
      return;
    }

    // Save itinerary first
    const itinerarySave = await PackageItinerary.create({
      itinerary,
      inclusions,
      exclusions,
      termsAndConditions,
      cancellationPolicy,
    });

    // Create package
    const newPackage = await Package.create({
      packageName,
      slug,
      packageCatgory,
      packageRating,
      description,
      countries,
      cities,
      durationDays,
      durationNights,
      siteId,
      metaTitle,
      metaDescription,
      metaKeywords,
      media,
      isActive,
      itinerary: itinerarySave._id, 
      faqs,
      pricing,
      isTransfers,
      isMealsIncluded,
      isHotels,
      isSightseeing,
      isActivity,
      packageStartSeason,
      packageEndSeason,
    });

    res.status(201).json({
      success: true,
      message: "Package created successfully",
      data: newPackage,
    });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const updatePackage = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const {
      packageName,
      slug,
      packageCatgory,
      packageRating,
      description,
      countries,
      cities,
      durationDays,
      durationNights,
      siteId,
      metaTitle,
      metaDescription,
      metaKeywords,
      media,
      isActive,
      itinerary,
      faqs,
      inclusions,
      exclusions,
      termsAndConditions,
      cancellationPolicy,
      pricing,
      isTransfers,
      isMealsIncluded,
      isHotels,
      isSightseeing,
      isActivity,
      packageStartSeason,
      packageEndSeason,
    } = req.body;

    const { site, slugName } = req.query as {
      site: string;
      slugName: string;
    };

    // Find package
    const existingPackage = await Package.findOne({
      slug: slugName,
      siteId: site,
    });

    if (!existingPackage) {
      res.status(404).json({
        success: false,
        message: "Package not found",
      });
      return;
    }

    // Update main package
    const updatedPackage = await Package.findOneAndUpdate(
      { slug: slugName, siteId: site },
      {
        packageName,
        slug,
        packageCatgory,
        packageRating,
        description,
        countries,
        cities,
        durationDays,
        durationNights,
        metaTitle,
        metaDescription,
        metaKeywords,
        media,
        isActive,
        faqs,
        pricing,
        siteId,
        isTransfers,
        isMealsIncluded,
        isHotels,
        isSightseeing,
        isActivity,
        packageStartSeason,
        packageEndSeason,
      },
      { new: true },
    );

    // Update itinerary separately
    if (existingPackage.itinerary) {
      await PackageItinerary.findByIdAndUpdate(
        existingPackage.itinerary,
        {
          itinerary,
          inclusions,
          exclusions,
          termsAndConditions,
          cancellationPolicy,
        },
        { new: true },
      );
    }

    res.json({
      success: true,
      message: "Package updated successfully",
      data: updatedPackage,
    });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getAllPackage = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const {
      siteId,
      page = "1",
      limit = "10",
    } = req.query as {
      siteId?: string;
      page?: string;
      limit?: string;
    };

    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 10;
    const skip = (pageNumber - 1) * limitNumber;

    const filter: any = {};
    if (siteId) {
      filter.siteId = Number(siteId);
    }

    const [packages, totalCount] = await Promise.all([
      Package.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNumber)
        .select(
          "packageName slug siteId pricing isActive cities.city cities.nights countries",
        )
        .populate("packageCatgory", "name slug")
        .lean(),

      Package.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      message: "Packages fetched successfully",
      data: packages,
      pagination: {
        totalItems: totalCount,
        currentPage: pageNumber,
        totalPages: Math.ceil(totalCount / limitNumber),
        limit: limitNumber,
      },
    });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getPackageBySlug = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { siteId, slug } = req.query as {
      siteId: string;
      slug: string;
    };

    const getPackage = await Package.findOne({
      siteId: Number(siteId),
      slug,
    })
      .populate("packageCatgory", "name slug")
      .populate(
        "itinerary",
        "itinerary inclusions exclusions termsAndConditions cancellationPolicy "
      )
      .lean();

    if (!getPackage) {
      res.status(404).json({
        success: false,
        message: "Package not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Package fetched successfully",
      data: getPackage,
    });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getPackageBySlugWeb = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { siteId, slug } = req.query as {
      siteId: string;
      slug: string;
    };

    const getPackage = await Package.findOne({
      siteId: Number(siteId),
      slug,
      isActive: true,
    })
      .populate("packageCatgory", "name slug")
      .populate(
        "itinerary",
        "itinerary inclusions exclusions termsAndConditions cancellationPolicy"
      )
      .lean();

    if (!getPackage) {
      res.status(404).json({
        success: false,
        message: "Package not found or inactive",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Package fetched successfully",
      data: getPackage,
    });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


export const deletePackageBySlug = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { siteId, slug } = req.query as {
      siteId: string;
      slug: string;
    };

    const existingPackage = await Package.findOne({
      siteId: Number(siteId),
      slug,
    });

    if (!existingPackage) {
      res.status(404).json({
        success: false,
        message: "Package not found",
      });
      return;
    }

    // Delete package
    await Package.deleteOne({
      siteId: Number(siteId),
      slug,
    });

    // Delete itinerary if exists
    if (existingPackage.itinerary) {
      await PackageItinerary.deleteOne({
        _id: existingPackage.itinerary,
      });
    }

    res.status(200).json({
      success: true,
      message: "Package deleted successfully",
    });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};