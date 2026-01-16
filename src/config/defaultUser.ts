import { User } from "../models/user.schema";

/**
 * Creates default admin users if they don't already exist
 */
const defaultUser = async (): Promise<void> => {
  try {
    // Check if admin user already exists
    const existingUser = await User.findOne({
      $or: [{ role: "admin" }, { username: "admin" }], //"admin" | "superadmin" | "editor" | "viewer"
    });

    if (existingUser) {
      return;
    }

    // Create Admin User
    const adminUser = new User({
      name: "Admin",
      username: "admin",
      email: "admin@example.com",
      password: "Admin@123",
      role: "admin",
      isActive: true,
      permission: ["all"],
      lastLogin: new Date(),
    });

    await adminUser.save();

    console.log("Default users created successfully!");
  } catch (error) {
    console.error("Error creating default users:", error);
  }
};

export default defaultUser;
