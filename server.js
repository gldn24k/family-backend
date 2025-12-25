require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// 🔐 Environment Port (Railway/Render/Heroku) OR fallback to 5000
const PORT = process.env.PORT || 5000;

// 🛡️ Middlewares
app.use(cors());
app.use(express.json());

// 🌐 MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB Error:", err));

// 🛣️ API Routes
app.use("/api/family", require("./routes/familyRoutes"));

// 🚀 Start Server (0.0.0.0 ALLOWS GLOBAL ACCESS)
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚆 Server running on port ${PORT}`);
});
