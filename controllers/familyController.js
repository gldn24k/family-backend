// controllers/familyController.js
const Family = require("../models/Family");

// ================= CREATE MEMBER (AUTO-CREATE PARENTS) =================
const createMember = async (req, res) => {
  try {
    const { name, father, mother, dob, gender, about } = req.body;

    // Prevent duplicate child
    const existing = await Family.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: "❌ Person already exists" });
    }

    // Auto-create father if missing
    if (father) {
      const existingFather = await Family.findOne({ name: father });
      if (!existingFather) {
        await Family.create({
          name: father,
          gender: "male",
          dob: null,
          about: "Auto-generated parent",
          father: "N.A",
          mother: "N.A",
          status: "approved",
        });
      }
    }

    // Auto-create mother if missing
    if (mother) {
      const existingMother = await Family.findOne({ name: mother });
      if (!existingMother) {
        await Family.create({
          name: mother,
          gender: "female",
          dob: null,
          about: "Auto-generated parent",
          father: "N.A",
          mother: "N.A",
          status: "approved",
        });
      }
    }

    // Create CHILD as APPROVED
    const newMember = await Family.create({
      name,
      father,
      mother,
      dob,
      gender,
      about,
      status: "approved", // auto-approved
    });

    res.status(201).json({
      message: "✨ Member created successfully (parents auto-created if needed)",
      data: newMember,
    });
  } catch (error) {
    console.error("Create Member Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// ================= GET APPROVED MEMBERS =================
const getApprovedMembers = async (req, res) => {
  try {
    const members = await Family.find({ status: "approved" });
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: "❌ Fetch failed", error: error.message });
  }
};

// ================= SEARCH MEMBER =================
// 🔍 SEARCH MEMBER (case-insensitive & partial match)
const searchMember = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "Enter a valid name" });
    }

    // 🔥 Case-insensitive + partial search
    const person = await Family.findOne({
      name: { $regex: name.trim(), $options: "i" },
    });

    if (!person) {
      return res.status(404).json({ message: "No person found" });
    }

    res.status(200).json(person);

  } catch (error) {
    console.error("Search Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};




// ================= UPDATE MEMBER =================
const updateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Family.findByIdAndUpdate(id, req.body, { new: true });

    if (!updated) return res.status(404).json({ message: "❌ Not found" });

    res.json({ message: "✔ Member updated", data: updated });
  } catch (error) {
    res.status(500).json({ message: "❌ Update failed", error: error.message });
  }
};

// ================= UPDATE IMAGE =================
const updateImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { imageUrl } = req.body;

    const updated = await Family.findByIdAndUpdate(
      id,
      { imageUrl: imageUrl.trim() },
      { new: true }
    );

    res.json({ message: "📸 Image updated", data: updated });
  } catch (error) {
    res.status(500).json({ error: "Image update failed" });
  }
};

// ================= PENDING MEMBERS =================
const getPendingMembers = async (req, res) => {
  try {
    const pending = await Family.find({ status: "pending" });
    res.json(pending);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ================= APPROVE MEMBER =================
const approveMember = async (req, res) => {
  try {
    const { id } = req.params;
    await Family.findByIdAndUpdate(id, { status: "approved" });
    res.json({ message: "✔ Approved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Approval failed", error: error.message });
  }
};// 📌 Get ALL members
const getAllMembers = async (req, res) => {
  try {
    const members = await Family.find();
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= EXPORT =================
module.exports = {
  createMember,
  getApprovedMembers,
  searchMember,
  updateMember,
  updateImage,
  getPendingMembers,
  approveMember,
  getAllMembers,
};
