require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 10000;

/* ---------------- MIDDLEWARE ---------------- */
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

/* ---------------- MONGODB CONNECT ---------------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ Mongo error:", err.message));

/* ---------------- SCHEMA (TABLE STRUCTURE) ---------------- */
const EntrySchema = new mongoose.Schema(
  {
    staff: String,
    travelDate: String,
    destination: String,
    query: String,
    client: String,
    status: String,
    remarks: String
  },
  { timestamps: true }
);

const Entry = mongoose.model("Entry", EntrySchema);

/* ---------------- ADMIN LOGIN ---------------- */
app.post("/api/admin/login", (req, res) => {
  const { password } = req.body;

  if (password === process.env.ADMIN_PASSWORD) {
    return res.json({ success: true });
  }
  res.status(401).json({ success: false });
});

/* ---------------- CRUD APIs ---------------- */

// GET all entries
app.get("/api/entries", async (req, res) => {
  const entries = await Entry.find().sort({ createdAt: -1 });
  res.json(entries);
});

// ADD entry
app.post("/api/entries", async (req, res) => {
  const entry = new Entry(req.body);
  await entry.save();
  res.json({ success: true });
});

// UPDATE entry
app.put("/api/entries/:id", async (req, res) => {
  await Entry.findByIdAndUpdate(req.params.id, req.body);
  res.json({ success: true });
});

// DELETE entry
app.delete("/api/entries/:id", async (req, res) => {
  await Entry.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

/* ---------------- ROUTES ---------------- */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/staff", (req, res) => {
  res.sendFile(path.join(__dirname, "public/staff.html"));
});

/* ---------------- START SERVER ---------------- */
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
