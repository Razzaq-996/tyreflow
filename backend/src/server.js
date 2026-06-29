const express = require("express")
const cors = require("cors")
require("dotenv").config()
const connectDB = require("./config/db")
const authRoutes = require("./routes/authRoutes")
const inventoryRoutes = require("./routes/inventoryRoutes")
const customerRoutes = require("./routes/customerRoutes")
const retreadingRoutes = require("./routes/retreadingRoutes")
const billingRoutes = require("./routes/billingRoutes")
const dealerRoutes = require("./routes/dealerRoutes")
const protect = require("./middlewares/authMiddlewares")
const app = express()

connectDB()

app.use(cors())
app.use(express.json())

app.get("/api/stats", protect, async (req, res) => {
  try {
    const Inventory = require("./models/Inventory")
    const Customer = require("./models/Customer")
    const Retreading = require("./models/Retreading")
    const Billing = require("./models/Billing")

    const totalCustomers = await Customer.countDocuments()
    const pendingRetreads = await Retreading.countDocuments({ stage: { $ne: "Delivered" } })
    const lowStock = await Inventory.countDocuments({ stock: { $lte: 10 } })
    const invoices = await Billing.find({ status: "Paid" })
    const totalSales = invoices.reduce((sum, inv) =>
      sum + inv.items.reduce((s, item) => s + item.qty * item.price, 0), 0
    )

    res.json({ totalCustomers, pendingRetreads, lowStock, totalSales })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})
app.use("/api/auth", authRoutes)
app.use("/api/inventory", inventoryRoutes)
app.use("/api/customers", customerRoutes)
app.use("/api/retreading", retreadingRoutes)
app.use("/api/billing", billingRoutes)
app.use("/api/dealers", dealerRoutes)
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})