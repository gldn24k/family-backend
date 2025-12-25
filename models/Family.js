const mongoose = require("mongoose");

const FamilySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    father: { type: String, required: true },
    mother: { type: String, required: true },
    dob: { type: String, required: true },
    gender: { type: String, enum: ["male", "female", "other"], default: "other" },
    imageUrl: { type: String, default: "" },
    about: { type: String, default: "" },
    status: { type: String, enum: ["pending", "approved"], default: "pending" }
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// ⭐ AUTO-CALCULATE AGE
FamilySchema.virtual("age").get(function () {
  if (!this.dob) return null;
  return new Date().getFullYear() - new Date(this.dob).getFullYear();
});

module.exports = mongoose.model("Family", FamilySchema);
