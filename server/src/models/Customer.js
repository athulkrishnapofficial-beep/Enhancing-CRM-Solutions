import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  company: { type: String },
  status: { 
    type: String, 
    enum: ["New", "Active", "Inactive"], 
    default: "New" 
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Customer", customerSchema);