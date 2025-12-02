import express from "express";
import cors from "cors"; 
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",                         
    "https://enhancing-crm-solutions.vercel.app"     
  ],
  credentials: true
}));

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/customers", customerRoutes);

export default app;