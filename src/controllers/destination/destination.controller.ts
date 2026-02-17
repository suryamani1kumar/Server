import { Request, Response } from "express";
import { Destinations } from "../../models/destination.schema";

export const createDestination = async (req: Request, res: Response) => {
  try {
    const destination = await Destinations.create(req.body);

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

export const getDestinationById = async (req: Request, res: Response) => {
  try {
    const destination = await Destinations.findById(req.params.id)
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
    const updated = await Destinations.findByIdAndUpdate(
      req.params.id,
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
    const deleted = await Destinations.findByIdAndDelete(req.params.id);

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
