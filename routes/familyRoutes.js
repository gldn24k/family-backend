const express = require("express");
const router = express.Router();

const {
  createMember,
  getAllMembers,
  getApprovedMembers,
  getPendingMembers,
  approveMember,
  searchMember,
  updateImage,
  updateMember
} = require("../controllers/familyController");

// 📌 TEST ROUTE - BASE
router.get("/", getAllMembers);

// 📌 PUBLIC ROUTES
router.post("/", createMember);
router.get("/approved", getApprovedMembers);

// 🔍 SEARCH
router.get("/search", searchMember);

// 🔧 MOD / ADMIN
router.get("/pending", getPendingMembers);
router.put("/approve/:id", approveMember);
router.put("/image/:id", updateImage);
router.put("/update/:id", updateMember);

module.exports = router;
