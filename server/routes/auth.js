const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

const router = express.Router()

// REGISTER
router.post("/register", async (req, res) => {
  const { username, password } = req.body

  const hashed = await bcrypt.hash(password, 10)

  const user = new User({ username, password: hashed })

  await user.save()

  res.json({ message: "User created successfully" })
})

// LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })

  if (!user) return res.status(400).json({ error: "User not found" })

  const match = await bcrypt.compare(password, user.password)

  if (!match) return res.status(400).json({ error: "Invalid password" })

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  )

  res.json({ token, user })
})

module.exports = router