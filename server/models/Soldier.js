const mongoose = require("mongoose")

const soldierSchema = new mongoose.Schema({
  id: String,
  heart: Number,
  temp: Number,
  spo2: Number,
  risk: String,
  lat: Number,
  lng: Number
})

module.exports = mongoose.model("Soldier", soldierSchema)