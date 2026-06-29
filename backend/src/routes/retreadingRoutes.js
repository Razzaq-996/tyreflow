const express = require("express")
const router = express.Router()
const protect = require("../middlewares/authMiddlewares")
const { getJobs, addJob, updateStage, deleteJob } = require("../controllers/retreadingController")

router.get("/", protect, getJobs)
router.post("/", protect, addJob)
router.put("/:id", protect, updateStage)
router.delete("/:id", protect, deleteJob)

module.exports = router