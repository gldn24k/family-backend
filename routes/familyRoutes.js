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
  getAllMembers // 👈 Add this in your controller!
} = require("../controllers/familyController");

// 👇 MAIN GET ROUTE (Fixes Cannot GET /api/family)
router.get("/", getAllMembers);

// Public
router.post("/", createMember);
router.get("/approved", getApprovedMembers);

// 🔍 Search Route
router.get("/search", searchMember);

// MOD / Admin routes
router.get("/pending", getPendingMembers);
router.put("/approve/:id", approveMember);
router.put("/image/:id", updateImage);
router.put("/update/:id", updateMember);

module.exports = router;
