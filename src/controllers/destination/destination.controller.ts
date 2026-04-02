import { Request, Response } from "express";
import { Destinations } from "../../models/destination.schema";

export const createDestination = async (req: Request, res: Response) => {
  try {
    const slug = req.body.slug;

    const existingDestinations = await Destinations.findOne({ slug: slug });

    if (existingDestinations) {
      res.status(409).json({
        message: "Page slug already exists. Please use a different slug.",
      });
      return;
    }

    const faq = Array.isArray(req.body.faqs) ? req.body.faqs : [];

    const destination = await Destinations.create({ ...req.body, faq, slug });

    res.status(201).json({
      success: true,
      data: destination,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllDestinations = async (req: Request, res: Response) => {
  try {
    const destinations = await Destinations.find()
      .populate("author")
      .populate("country")
      .populate("city")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: destinations,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getDestinationBySlug = async (req: Request, res: Response) => {
  try {
    const slug = req.query.slug;

    const destination = await Destinations.findOne({
      slug: slug,
    });
    if (!destination) {
      res.status(404).json({
        success: false,
        message: "Destination not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: destination,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateDestination = async (req: Request, res: Response) => {
  try {
    const { slug } = req.query;

    if (!slug) {
      res.status(400).json({
        success: false,
        message: "Slug is required",
      });
      return;
    }

    const updated = await Destinations.findOneAndUpdate(
      { slug: slug },
      req.body,
      { new: true, runValidators: true },
    );

    if (!updated) {
      res.status(404).json({
        success: false,
        message: "Destination not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: updated,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteDestination = async (req: Request, res: Response) => {
  try {
    const { slug } = req.query;
    const deleted = await Destinations.findOneAndDelete({ slug });

    if (!deleted) {
      res.status(404).json({
        success: false,
        message: "Destination not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Destination deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const destinationStatus = async (req: Request, res: Response) => {
  try {
    const slug = req.query.slug;
    const isActive = req.query.isActive;
    const updatedDestination = await Destinations.findOneAndUpdate(
      { slug },
      { isActive },
      {
        new: true,
      },
    );

    if (!updatedDestination) {
      res.status(404).json({ message: "Destination not found" });
      return;
    }
    res
      .status(200)
      .json({ message: "Destination updated", blog: updatedDestination });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const allDestinationWeb = async (req: Request, res: Response) => {
  try {
    const page: number = parseInt(req.query.page as string) || 1;
    const limit: number = parseInt(req.query.limit as string) || 4;
    const destinations = await Destinations.find({ isActive: true })
      .select("slug heading country city images createdAt updatedAt")
      .populate("author", "name")
      .populate("country", "name slug")
      .populate("city", "name slug")
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    if (!destinations) {
      res.status(404).json({ message: "Destination is not exist" });
      return;
    }
    const totalCount: number = await Destinations.countDocuments();
    res.status(200).json({
      message: "destination fetch All",
      page,
      limit,
      totalPages: Math.ceil(totalCount / limit),
      totalDestinations: totalCount,
      destinations: destinations,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getDesWebBySlug = async (req: Request, res: Response) => {
  try {
    const slug = req.query.slug;

    const destination = await Destinations.findOne({
      slug: slug,
    })
      .populate("author", "name")
      .populate("country", "name slug")
      .populate("city", "name slug");

    if (!destination) {
      res.status(404).json({
        success: false,
        message: "Destination not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: destination,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
