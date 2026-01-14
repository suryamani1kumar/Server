import { Request, Response } from "express";
import { Category } from "../../models/category.schema";

export const getCategory = async (req: Request, res: Response) => {
  try {
    const getAllcCategory = await Category.find(
      {},
      {
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
        description: 0,
        image: 0,
        userid: 0,
      }
    );
    res.status(200).json({ message: "category data", data: getAllcCategory });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const getAllcCategory = await Category.findOne({ _id: id });
    res.status(200).json({ message: "category data", data: getAllcCategory });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const searchCategory = async (req: Request, res: Response) => {
  try {
    const name = req.query.name;
    const category = await Category.find(
      {
        $or: [
          { categoryName: { $regex: name, $options: "i" } },
          { categoryUrl: { $regex: name, $options: "i" } },
        ],
      },
      {
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
        description: 0,
        image: 0,
        userid: 0,
      }
    );
    res.status(200).json({ message: "category data", data: category });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
