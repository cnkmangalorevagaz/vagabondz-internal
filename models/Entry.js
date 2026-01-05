const mongoose = require("mongoose");

const EntrySchema = new mongoose.Schema(
  {
    staff: { type: String, required: true },
    travelDate: { type: String, required: true },
    destination: { type: String, required: true },
    query: { type: String, required: true },
    client: { type: String, required: true },
    status: { type: String, required: true },
    remarks: { type: String, default: "-" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Entry", EntrySchema);
