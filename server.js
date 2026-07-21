const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());

// Enable CORS for frontend (Vite dev server on port 5173)
app.use(
  cors({
    origin: "*", // allow your React app
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));


const categoryRoutes = require("./routes/categoryRoutes");
const carRoutes = require("./routes/carRoutes");
const bannerRoutes = require("./routes/bannerRoutes");
const infoRoutes = require("./routes/infoRoutes");
const contactRoutes = require("./routes/contactRoutes");
const counterRoutes = require("./routes/counterRoutes");
const reachUsRoutes = require("./routes/reachUsRoutes");


app.use("/api/reachus", reachUsRoutes);
app.use("/api/counters", counterRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/banners", bannerRoutes);
app.use("/api/info", infoRoutes);
app.use("/api/contact", contactRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
