import express from "express";
import Pending from "../models/pending.js";
import Approved from "../models/approved.js";

const router = express.Router();

/* User submits */
router.post("/", async (req, res) => {
  await Pending.create(req.body);
  res.json({ message: "Sent for approval" });
});

/* MOD views pending */
router.get("/pending", async (req, res) => {
  const data = await Pending.find();
  res.json(data);
});

/* MOD approves */
router.post("/approve/:id", async (req, res) => {
  const item = await Pending.findById(req.params.id);
  await Approved.create(item);
  await Pending.findByIdAndDelete(req.params.id);
  res.json({ message: "Approved" });
});

/* Public data */
router.get("/approved", async (req, res) => {
  const data = await Approved.find();
  res.json(data);
});

export default router;
