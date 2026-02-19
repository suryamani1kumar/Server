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
    })
      .populate("author")
      .populate("country")
      .populate("city");

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
