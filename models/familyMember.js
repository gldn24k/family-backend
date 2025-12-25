const mongoose = require("mongoose");

const FamilyMemberSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: String,
  gender: String,
  birthDate: Date,

  parents: [{ type: mongoose.Schema.Types.ObjectId, ref: "FamilyMember" }],
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: "FamilyMember" }]
});

module.exports = mongoose.model("FamilyMember", FamilyMemberSchema);

