const mongoose = require("mongoose")

const inventorySchema = new mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  size: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
}, { timestamps: true })

module.exports = mongoose.model("Inventory", inventorySchema)