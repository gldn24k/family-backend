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
  getAllMembers
} = require("../controllers/familyController");

// 📌 MAIN ROUTE to check server is working
router.get("/", getAllMembers);

// ➕ Add Member
router.post("/", createMember);

// 📌 Approved Members
router.get("/approved", getApprovedMembers);

// 🔍 Search Member
router.get("/search", searchMember);

// ⚙ Admin / Modify Routes
router.get("/pending", getPendingMembers);
router.put("/approve/:id", approveMember);
router.put("/image/:id", updateImage);
router.put("/update/:id", updateMember);

// 🚀 EXPORT ROUTER (VERY IMPORTANT)
module.exports = router;
