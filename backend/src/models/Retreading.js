const mongoose = require("mongoose")

const retreadingSchema = new mongoose.Schema({
  customer: { type: String, required: true },
  phone: { type: String },
  tyre: { type: String, required: true },
  stage: {
    type: String,
    enum: ["Received", "Inspection", "Buffing", "Building", "Curing", "Quality Check", "Ready", "Delivered"],
    default: "Received"
  },
  remarks: { type: String },
}, { timestamps: true })

module.exports = mongoose.model("Retreading", retreadingSchema)