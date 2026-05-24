const Soldier = require("./models/Soldier")
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

require("dotenv").config()

const app = express()

app.use(cors())
app.use(express.json())

// ROUTES
const soldierRoutes = require("./routes/soldierRoutes")
app.use("/api/soldiers", soldierRoutes)

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("HOME WORKING")
})

// DB CONNECT
mongoose.connect("mongodb://127.0.0.1:27017/soldierDB")
  .then(() => console.log("🟢 MongoDB Connected"))
  .catch(err => console.log(err))

app.listen(5000, () => {
  console.log("SERVER RUNNING 5000")
})
setInterval(async () => {
  try {
    const soldiers = await Soldier.find()

    for (let s of soldiers) {

      // simulate live changes
      s.heart = 60 + Math.floor(Math.random() * 90)
      s.spo2 = 85 + Math.floor(Math.random() * 15)
      s.temp = (36 + Math.random() * 3).toFixed(1)

      // simple risk logic
      if (s.heart > 120) {
        s.risk = "PANIC"
      } else if (s.heart > 100) {
        s.risk = "HIGH"
      } else if (s.heart > 80) {
        s.risk = "MEDIUM"
      } else {
        s.risk = "LOW"
      }

      await s.save()
    }

    console.log("🔄 Soldiers updated in MongoDB")

  } catch (err) {
    console.log("Auto update error:", err)
  }
}, 5000)