const Dealer = require("../models/Dealer")

const getDealers = async (req, res) => {
  try {
    const dealers = await Dealer.find().sort({ createdAt: -1 })
    res.json(dealers)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const addDealer = async (req, res) => {
  try {
    const dealer = await Dealer.create(req.body)
    res.status(201).json(dealer)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteDealer = async (req, res) => {
  try {
    await Dealer.findByIdAndDelete(req.params.id)
    res.json({ message: "Dealer deleted" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { getDealers, addDealer, deleteDealer }