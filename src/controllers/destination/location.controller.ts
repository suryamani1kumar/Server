import { Request, Response } from "express";
import Location from "../../models/destLocation.schema";

export const createLocation = async (req: Request, res: Response) => {
  try {
    const { name, slug, type, parent } = req.body;

    if (!name || !slug || !type) {
      res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
      return;
    }

    const exists = await Location.findOne({
      $or: [{ slug }, { name, type }],
    });

    if (exists) {
      let message = "";
      if (exists.slug === slug) message = "Slug already exists";
      else if (exists.name === name && exists.type === type)
        message = "Name with this type already exists";

      res.status(400).json({
        success: false,
        message,
      });
      return;
    }

    const location = await Location.create({
      name,
      slug,
      type,
      parent: parent || null,
    });

    res.json({
      success: true,
      message: "Location created successfully",
      location,
    });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const updateLocation = async (req: Request, res: Response) => {
  try {
    const { name, slug } = req.body;
    const { slugName, type } = req.query;
    if (!name || !slug || !slugName || !type) {
      res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
      return;
    }

    const existingLocation = await Location.findOne({
      slug: slugName,
      type,
    });

    if (!existingLocation) {
      res.status(404).json({
        success: false,
        message: "Location not found",
      });
      return;
    }

    // Slug conflict check
    if (slug !== slugName) {
      const slugConflict = await Location.findOne({ slug });
      if (slugConflict) {
        res.status(409).json({
          success: false,
          message: "Slug already exists",
        });
        return;
      }
    }

    // Name conflict check
    const nameConflict = await Location.findOne({ name, type });
    if (nameConflict && nameConflict.slug !== slugName) {
      res.status(409).json({
        success: false,
        message: "Name already exists for this type",
      });
      return;
    }

    const updatedLocation = await Location.findOneAndUpdate(
      { slug: slugName, type },
      { name, slug },
      { new: true },
    );

    res.json({
      success: true,
      message: "Location updated successfully",
      location: updatedLocation,
    });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getLocation = async (req: Request, res: Response) => {
  try {
    const locations = await Location.find().populate("parent", "name");

    res.json({
      success: true,
      message: "Locations fetched successfully",
      locations,
    });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getLocationsByType = async (req: Request, res: Response) => {
  try {
    const { type } = req.query;

    const filter: any = {};
    if (type) {
      filter.type = type;
    }

    const locations = await Location.find(filter)

    res.json({
      success: true,
      message: `${type || "All"} locations fetched successfully`,
      locations,
    });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
