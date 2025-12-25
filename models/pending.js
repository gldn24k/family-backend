import mongoose from "mongoose";

const PendingSchema = new mongoose.Schema({
  name: String,
  father: String,
  mother: String,
  profession: String,
  dob: String,
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Pending", PendingSchema);
