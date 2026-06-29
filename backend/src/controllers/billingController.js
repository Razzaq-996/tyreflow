const Billing = require("../models/Billing")

const getInvoices = async (req, res) => {
  try {
    const invoices = await Billing.find().sort({ createdAt: -1 })
    res.json(invoices)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const createInvoice = async (req, res) => {
  try {
    const { customer, phone, items } = req.body
    const invoice = await Billing.create({ customer, phone, items })
    res.status(201).json(invoice)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateStatus = async (req, res) => {
  try {
    const invoice = await Billing.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    )
    if (!invoice) return res.status(404).json({ message: "Invoice not found" })
    res.json(invoice)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteInvoice = async (req, res) => {
  try {
    const invoice = await Billing.findByIdAndDelete(req.params.id)
    if (!invoice) return res.status(404).json({ message: "Invoice not found" })
    res.json({ message: "Invoice deleted" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { getInvoices, createInvoice, updateStatus, deleteInvoice }