import axios from "axios"

const API = "http://localhost:5000/api/soldiers"

export const getSoldiers = async () => {
  const res = await axios.get(API)
  return res.data
}