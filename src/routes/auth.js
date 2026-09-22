import { Router } from "express";
import { firebaseAuth } from "../config/firebase.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

/**
 * POST /auth/google
 *
 * React Native will eventually send:
 *
 * Authorization: Bearer <firebase-id-token>
 */
router.post("/google", authenticate, async (req, res) => {
  try {
    const { uid } = req.user;

    // Get complete Firebase user
    const firebaseUser = await firebaseAuth.getUser(uid);

    return res.status(200).json({
      success: true,
      message: "Google authentication successful",

      user: {
        firebaseUid: firebaseUser.uid,
        email: firebaseUser.email || null,
        displayName: firebaseUser.displayName || null,
        photoURL: firebaseUser.photoURL || null,
        emailVerified: firebaseUser.emailVerified,
        provider: firebaseUser.providerData[0]?.providerId || null,
      },
    });
  } catch (error) {
    console.error("Google authentication error:", error);

    return res.status(500).json({
      success: false,
      message: "Authentication failed",
    });
  }
});

export default router;
