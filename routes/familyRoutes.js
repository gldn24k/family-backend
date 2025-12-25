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

// ⚡ MAIN
router.get("/", getAllMembers);

// 🟢 Public
router.post("/", createMember);
router.get("/approved", getApprovedMembers);
router.get("/search", searchMember);

// 🛠️ Admin / Manage
router.get("/pending", getPendingMembers);
router.put("/approve/:id", approveMember);
router.put("/image/:id", updateImage);
router.put("/update/:id", updateMember);

module.exports = router;
