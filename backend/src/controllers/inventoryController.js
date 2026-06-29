const Inventory = require("../models/Inventory")

// Get all products
const getProducts = async (req, res) => {
  try {
    const { search } = req.query
    let query = {}

    if (search) {
      query = {
        $or: [
          { brand: { $regex: search, $options: "i" } },
          { model: { $regex: search, $options: "i" } },
          { size: { $regex: search, $options: "i" } }
        ]
      }
    }

    const products = await Inventory.find(query).sort({ createdAt: -1 })
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Add product
const addProduct = async (req, res) => {
  try {
    const { brand, model, size, category, price, stock } = req.body
    const product = await Inventory.create({ brand, model, size, category, price, stock })
    res.status(201).json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Update product
const updateProduct = async (req, res) => {
  try {
    const product = await Inventory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    if (!product) return res.status(404).json({ message: "Product not found" })
    res.json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const product = await Inventory.findByIdAndDelete(req.params.id)
    if (!product) return res.status(404).json({ message: "Product not found" })
    res.json({ message: "Product deleted" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { getProducts, addProduct, updateProduct, deleteProduct }