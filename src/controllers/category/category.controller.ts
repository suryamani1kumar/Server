import { Request, Response } from "express";
import { Category } from "../../models/category.schema";
import mongoose from "mongoose";

export const AddCategory = async (req: Request, res: Response) => {
  try {
    const { name, slug, description, createdBy, updatedBy, parent, isActive } =
      req.body;

    if (!name || !slug) {
      res.status(400).json({ message: "Name and slug are required" });
      return;
    }

    const existingCategory = await Category.findOne({ slug });
    if (existingCategory) {
      res.status(409).json({ message: "Category slug already exists" });
      return;
    }

    const categoryData = new Category({
      name,
      slug,
      description,
      createdBy,
      updatedBy,
      parent: parent || null,
      isActive: isActive ?? true,
      image: [],
    });

    const savedData = await categoryData.save();

    res
      .status(201)
      .json({ message: "Category created successfully", data: savedData });
  } catch (error: any) {
    res.status(500).json({
      message: "Failed to create category",
      error: error.message || error,
    });
  }
};

export const UpdateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, slug, description, updatedBy, parent, isActive } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid category ID" });
      return;
    }

    if (!name || !slug) {
      res.status(400).json({ message: "Name and slug are required" });
      return;
    }

    const existingCategory = await Category.findOne({
      slug,
      parent: parent || null,
      _id: { $ne: id },
    });

    if (existingCategory) {
      res.status(409).json({
        message: "Category slug already exists under this parent",
      });
      return;
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      {
        name,
        slug,
        description,
        updatedBy,
        parent: parent || null,
        isActive: isActive ?? true,
      },
      { new: true },
    );

    if (!updatedCategory) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    res.status(200).json({
      message: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Failed to update category",
      error: error.message || error,
    });
  }
};

export const ActiveCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { isActive } = req.query;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid category ID" });
      return;
    }

    const status = isActive === "true";

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { isActive: status },
      { new: true },
    );

    if (!updatedCategory) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    res.status(200).json({
      message: `Category ${status ? "activated" : "deactivated"} successfully`,
      data: updatedCategory,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message || error,
    });
  }
};

export const getCategory = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find({})
      .select("name slug parent isActive")
      .populate({
        path: "parent",
        select: "name", // only bring parent name
        options: { lean: true },
      })
      .lean();

    res.status(200).json({
      message: "Category data fetched successfully",
      data: categories,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message || error,
    });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const getCategory = await Category.findOne({ _id: id }).select("-createdAt -updatedAt -createdBy -updatedBy");
    res.status(200).json({ message: "category data", data: getCategory });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid category ID" });
      return;
    }

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
