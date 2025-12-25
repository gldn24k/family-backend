import mongoose from "mongoose";

const ApprovedSchema = new mongoose.Schema({
  name: String,
  father: String,
  mother: String,
  profession: String,
  dob: String,
  approvedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Approved", ApprovedSchema);
