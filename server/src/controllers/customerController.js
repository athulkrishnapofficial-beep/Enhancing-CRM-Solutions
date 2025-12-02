import Customer from "../models/Customer.js";

// GET all customers
export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE a new customer
export const createCustomer = async (req, res) => {
  const { name, email, phone, company, status } = req.body;
  try {
    const newCustomer = await Customer.create({ name, email, phone, company, status });
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE a customer
export const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    await Customer.findByIdAndDelete(id);
    res.json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};