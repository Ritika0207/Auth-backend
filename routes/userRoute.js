import express from "express";
import {
  getAllUsers,
  getMyProfile,
  login,
  logout,
  register,
} from "../controllers/userController.js";
import isAuthenticated from "../middleware/auth.js";

const router = express.Router();

router.get("/all", getAllUsers);
router.get("/me", isAuthenticated, getMyProfile);
router.get("/logout", logout);
router.post("/register", register);
router.post("/login", login);

export default router;
