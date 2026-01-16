import { Request, Response } from "express";

export const logout = (req: Request, res: Response) => {
  // ✅ Dynamic cookie options to match login cookies
  let cookieOptions: any = {
    path: "/",
    httpOnly: true,
  };

  if (req.hostname === "localhost") {
    cookieOptions.secure = false;
    cookieOptions.sameSite = "lax";
  } else {
    cookieOptions.secure = true;
    cookieOptions.sameSite = "none";
    // cookieOptions.domain = "admincrm-three.vercel.app";
  }

  // ✅ Clear cookies
  res.clearCookie("accessToken", cookieOptions);
  res.clearCookie("refreshToken", cookieOptions);

  res.status(200).json({ message: "Logout successful" });
};


