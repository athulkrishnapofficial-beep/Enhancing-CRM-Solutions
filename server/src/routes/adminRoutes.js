import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import { adminData } from "../controllers/adminController.js";

const router = express.Router();

router.get("/", protect, authorizeRoles("admin"), adminData);

export default router;
