import { Request, Response } from "express";
import { Types } from "mongoose";
import { Author } from "../../models/author.schema";

export const createAuthor = async (req: Request, res: Response) => {
  try {
    const { name, jobtitle, description, image, isActive, createdBy } =
      req.body;

    const author = await Author.create({
      name,
      jobtitle,
      description,
      image,
      isActive,
      createdBy,
    });

    res.status(201).json({
      message: "Author created successfully",
      data: author,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create author",
      error,
    });
  }
};

export const getAllAuthors = async (_req: Request, res: Response) => {
  try {
    const authors = await Author.find()
      .select("name jobtitle isActive")
      .sort({ createdAt: -1 });

    res.status(200).json({
      authors: authors,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch authors",
      error,
    });
  }
};

export const getAuthorById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid author ID" });
      return;
    }

    const author = await Author.findById(id);

    if (!author) {
      res.status(404).json({ message: "Author not found" });
      return;
    }

    res.status(200).json({ data: author });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch author",
      error,
    });
  }
};

export const updateAuthor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid author ID" });
      return;
    }

    const updatedAuthor = await Author.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true },
    );

    if (!updatedAuthor) {
      res.status(404).json({ message: "Author not found" });
      return;
    }

    res.status(200).json({
      message: "Author updated successfully",
      data: updatedAuthor,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update author",
      error,
    });
  }
};

export const deleteAuthor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const author = await Author.findOneAndDelete({ _id: id });
    if (!author) {
      res.status(404).json({ message: "Author is not exist" });
      return;
    }
    res.status(200).json({ message: "Author is deleted" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
