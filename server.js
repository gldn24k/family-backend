require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("💾 MongoDB Connected"))
  .catch(err => console.log("❌ Database Error:", err));

// ROUTES
app.use("/api/family", require("./routes/familyRoutes"));

// TEST ROUTE
app.get("/", (req, res) => res.send("🚆 Backend is running!"));

// SERVER
const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => console.log(`🚀 Running on ${PORT}`));
