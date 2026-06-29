const express = require("express")
const router = express.Router()
const protect = require("../middlewares/authMiddlewares")
const { getInvoices, createInvoice, updateStatus, deleteInvoice } = require("../controllers/billingController")

router.get("/", protect, getInvoices)
router.post("/", protect, createInvoice)
router.put("/:id", protect, updateStatus)
router.delete("/:id", protect, deleteInvoice)

module.exports = router