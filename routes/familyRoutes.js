const express = require("express");
const router = express.Router();

const {
  createMember,
  getApprovedMembers,
  getPendingMembers,
  approveMember,
  searchMember,
  updateImage,
  updateMember,
  getAllMembers,
} = require("../controllers/familyController");

// MAIN GET ROUTE
router.get("/", getAllMembers);

// Public
router.post("/", createMember);
router.get("/approved", getApprovedMembers);

// Search
router.get("/search", searchMember);

// Admin
router.get("/pending", getPendingMembers);
router.put("/approve/:id", approveMember);
router.put("/image/:id", updateImage);
router.put("/update/:id", updateMember);

module.exports = router; // << FIXED
