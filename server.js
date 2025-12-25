require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 8080;

app.use(cors({ origin: "*" }));
app.use(express.json());

// DB CONNECT
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✔"))
  .catch(err => console.error("DB Error ❌", err));

// ROUTES
app.use("/api/family", require("./routes/familyRoutes"));

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server live at PORT ${PORT}`);
});
