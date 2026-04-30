import { Request, Response } from "express";
import PackageCatgory from "../../models/packagecat.schema";

// Define request body type
interface PackageCategoryBody {
  name: string;
  slug: string;
}

// Create Package Category
export const createPackageCatgory = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { name, slug } = req.body;

    if (!name || !slug) {
      res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
      return;
    }

    const existingPackageType = await PackageCatgory.findOne({
      slug: slug,
    });

    if (existingPackageType) {
      res.status(409).json({
        success: false,
        message: "Package category already exists",
      });
      return;
    }

    const newPackageType = await PackageCatgory.create({
      name: name,
      slug: slug,
    });

    res.json({
      success: true,
      message: "Package category created successfully",
      PackageCatgory: newPackageType,
    });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Update Package Category
export const updatePackageCategory = async (
  req: Request<{}, {}, PackageCategoryBody, { slugName?: string }>,
  res: Response,
): Promise<void> => {
  try {
    const { name, slug } = req.body;
    const { slugName } = req.query;

    if (!name || !slug) {
      res.status(400).json({
        success: false,
        message: "Missing required fields",
      });

      return;
    }

    if (!slugName) {
      res.status(400).json({
        success: false,
        message: "slugName is required in query",
      });
      return;
    }

    const existingCategory = await PackageCatgory.findOne({
      slug: slugName,
    });

    if (!existingCategory) {
      res.status(404).json({
        success: false,
        message: "Package Category does not exist",
      });
      return;
    }

    // Check slug conflict
    if (slug !== slugName) {
      const slugConflict = await PackageCatgory.findOne({
        slug: slug,
      });

      if (slugConflict) {
        res.status(409).json({
          success: false,
          message: "Slug already in use",
        });
        return;
      }
    }

    const updatedCategory = await PackageCatgory.findOneAndUpdate(
      { slug: slugName },
      {
        name: name,
        slug: slug,
      },
      { new: true },
    );

    res.json({
      success: true,
      message: "Package Category updated successfully",
      updatedCategory,
    });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get All Package Categories
export const getPackageCatgory = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const existingPackageType = await PackageCatgory.find();

    res.json({
      success: true,
      message: "Package category fetch successfully",
      PackageCatgory: existingPackageType,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
