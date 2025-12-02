import express from "express";
import { getCustomers, createCustomer, deleteCustomer } from "../controllers/customerController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// All routes are protected (must be logged in to see/edit CRM data)
router.use(protect);

router.get("/", getCustomers);
router.post("/", createCustomer);
router.delete("/:id", deleteCustomer);

export default router;