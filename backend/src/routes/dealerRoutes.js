const express = require("express")
const router = express.Router()
const protect = require("../middlewares/authMiddlewares")
const { getDealers, addDealer, deleteDealer } = require("../controllers/dealerController")

router.get("/", protect, getDealers)
router.post("/", protect, addDealer)
router.delete("/:id", protect, deleteDealer)

module.exports = router