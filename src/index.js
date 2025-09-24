import express from "express";
import dotenv from "dotenv";

// Import routes
import medicationRoutes from "./routes/medicationRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import supplierRoutes from "./routes/supplierRoutes.js";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/suppliers", supplierRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/medications", medicationRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.json({ message: "API is running!" });
});

// Export app untuk Vercel
export default app;
