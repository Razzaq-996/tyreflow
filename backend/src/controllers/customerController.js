const Customer = require("../models/Customer")

const getCustomers = async (req, res) => {
  try {
    const { search } = req.query
    let query = {}
    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { phone: { $regex: search, $options: "i" } },
          { vehicle: { $regex: search, $options: "i" } }
        ]
      }
    }
    const customers = await Customer.find(query).sort({ createdAt: -1 })
    res.json(customers)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const addCustomer = async (req, res) => {
  try {
    const { name, phone, vehicle } = req.body
    const customer = await Customer.create({ name, phone, vehicle })
    res.status(201).json(customer)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    if (!customer) return res.status(404).json({ message: "Customer not found" })
    res.json(customer)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id)
    if (!customer) return res.status(404).json({ message: "Customer not found" })
    res.json({ message: "Customer deleted" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { getCustomers, addCustomer, updateCustomer, deleteCustomer }