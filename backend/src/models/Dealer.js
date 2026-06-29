const mongoose = require("mongoose")

const dealerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: String, required: true },
  phone: { type: String },
  city: { type: String },
  brands: [String],
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" }
}, { timestamps: true })

module.exports = mongoose.model("Dealer", dealerSchema)