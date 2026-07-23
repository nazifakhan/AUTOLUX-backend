const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.locals.dbConnected = false;

// Middleware
app.use(express.json());

// Enable CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Health check routes
app.get("/", (req, res) => {
  res.json({ message: "CarInfo backend is running" });
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// MongoDB connection
if (process.env.MONGO_URI) {
  mongoose
    .connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 15000,
      tls: true,
    })
    .then(() => {
      app.locals.dbConnected = true;
      console.log("✅ MongoDB connected");
    })
    .catch((err) => {
      app.locals.dbConnected = false;
      console.error("⚠️ MongoDB connection error. Server will continue running without the database:", err.message);
    });
} else {
  console.warn("⚠️ MONGO_URI is not set. Server will continue running without the database.");
}

// Routes
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

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}`);
  });
}

// Export Express app for Vercel
module.exports = app;
