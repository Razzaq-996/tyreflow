const express = require("express")
const cors = require("cors")
require("dotenv").config()
const connectDB = require("./config/db")
const authRoutes = require("./routes/authRoutes")
const inventoryRoutes = require("./routes/inventoryRoutes")
const customerRoutes = require("./routes/customerRoutes")
const retreadingRoutes = require("./routes/retreadingRoutes")
const billingRoutes = require("./routes/billingRoutes")
const app = express()

connectDB()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.json({ message: "TyreFlow API is running" })
})

app.use("/api/auth", authRoutes)
app.use("/api/inventory", inventoryRoutes)
app.use("/api/customers", customerRoutes)
app.use("/api/retreading", retreadingRoutes)
app.use("/api/billing", billingRoutes)
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})