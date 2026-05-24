const express = require("express")
const router = express.Router()
const Soldier = require("../models/Soldier")

// GET ALL SOLDIERS
router.get("/", async (req, res) => {
  console.log("🔥 SOLDIER ROUTE HIT")

  try {
    const data = await Soldier.find()
    console.log("DATA FROM DB:", data)

    res.json(data)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Server error" })
  }
})

module.exports = router