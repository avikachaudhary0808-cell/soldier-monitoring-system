const mongoose = require("mongoose")
const Soldier = require("./models/Soldier")

console.log("🔥 Seed script started")

mongoose.connect("mongodb://127.0.0.1:27017/soldierDB")
  .then(async () => {

    console.log("🟢 MongoDB connected")

    const soldiers = []

    for (let i = 1; i <= 15; i++) {
      soldiers.push({
        id: `SOL-${100 + i}`,
        heart: 60 + Math.floor(Math.random() * 80),
        temp: (36 + Math.random() * 3).toFixed(1),
        spo2: 85 + Math.floor(Math.random() * 15),

        risk:
          Math.random() > 0.8 ? "PANIC" :
          Math.random() > 0.6 ? "HIGH" :
          Math.random() > 0.3 ? "MEDIUM" : "LOW",

        lat: 28.6 + Math.random() * 0.1,
        lng: 77.2 + Math.random() * 0.1
      })
    }

    // 🔥 SAVE TO MONGODB
    await Soldier.deleteMany()
    await Soldier.insertMany(soldiers)

    console.log("🔥 15 Soldiers inserted successfully")

    mongoose.disconnect()
  })
  .catch(err => {
    console.log("❌ Error:", err)
  })