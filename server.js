require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 5000;

// 🌍 CORS for frontend
app.use(cors({
  origin: [
    "https://family-frontend-production.up.railway.app",
    "http://localhost:3000",
  ],
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));

app.use(express.json());

// 📌 Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB Error:", err.message));

// 📌 Routes
app.get("/", (req, res) => res.send("Server running 🚀"));
app.use("/api/family", require("./routes/familyRoutes"));

app.listen(PORT, "0.0.0.0", () =>
  console.log(`🚆 Server running on port ${PORT}`)
);
