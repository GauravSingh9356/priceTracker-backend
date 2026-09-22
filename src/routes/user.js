import { Router } from "express";
import { authenticate } from "../middleware/auth.js";

const router = Router();

router.get("/me", authenticate, async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    console.error("Error getting user:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get user",
    });
  }
});

export default router;
