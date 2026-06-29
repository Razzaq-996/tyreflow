const Retreading = require("../models/Retreading")

const getJobs = async (req, res) => {
  try {
    const jobs = await Retreading.find().sort({ createdAt: -1 })
    res.json(jobs)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const addJob = async (req, res) => {
  try {
    const { customer, phone, tyre, remarks } = req.body
    const job = await Retreading.create({ customer, phone, tyre, remarks })
    res.status(201).json(job)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateStage = async (req, res) => {
  try {
    const job = await Retreading.findByIdAndUpdate(
      req.params.id,
      { stage: req.body.stage },
      { new: true }
    )
    if (!job) return res.status(404).json({ message: "Job not found" })
    res.json(job)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteJob = async (req, res) => {
  try {
    const job = await Retreading.findByIdAndDelete(req.params.id)
    if (!job) return res.status(404).json({ message: "Job not found" })
    res.json({ message: "Job deleted" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { getJobs, addJob, updateStage, deleteJob }