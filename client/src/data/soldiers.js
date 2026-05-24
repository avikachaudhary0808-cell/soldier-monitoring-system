export const generateSoldiers = () => {

  const baseLat = 34.0837
  const baseLng = 74.7973

  const soldiers = []

  for (let i = 1; i <= 6; i++) {

    const heart = Math.floor(Math.random() * 60 + 60)
    const temp = Number((36 + Math.random() * 3).toFixed(1))
    const spo2 = Math.floor(Math.random() * 10 + 90)

    let risk = "LOW"

    if (heart > 120 || spo2 < 90 || temp > 38.5) {
      risk = "PANIC"
    }
    else if (heart > 110 || spo2 < 92) {
      risk = "HIGH"
    }
    else if (heart > 90) {
      risk = "MEDIUM"
    }

    soldiers.push({
      id: `SOL-${100 + i}`,
      heart,
      temp,
      spo2,
      risk: risk.trim().toUpperCase(), // 🔥 FIX HERE
      lat: baseLat + Math.random() * 0.05,
      lng: baseLng + Math.random() * 0.05
    })
  }

  return soldiers
}