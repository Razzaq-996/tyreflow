const mongoose = require("mongoose")

const billingSchema = new mongoose.Schema({
  customer: { type: String, required: true },
  phone: { type: String },
  items: [
    {
      name: { type: String },
      qty: { type: Number },
      price: { type: Number }
    }
  ],
  status: {
    type: String,
    enum: ["Paid", "Pending"],
    default: "Pending"
  }
}, { timestamps: true })

module.exports = mongoose.model("Billing", billingSchema)