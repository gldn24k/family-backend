const express = require("express");
const router = express.Router();

const {
  createMember,
  getApprovedMembers,
  getPendingMembers,
  approveMember,
  searchMember, // 🔍 Make sure this is imported
  updateImage,
  updateMember
} = require("../controllers/familyController");

// Public
router.post("/", createMember);
router.get("/approved", getApprovedMembers);

// 🔍 Search Route
router.get("/search", searchMember);

// MOD
router.get("/pending", getPendingMembers);
router.put("/approve/:id", approveMember);
router.put("/image/:id", updateImage);
router.put("/update/:id", updateMember);

module.exports = router;
