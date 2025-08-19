import { Router } from "express"
// Note: This is a mock/stub for SSLCommerz. Integrate the real gateway SDK here.
const r = Router()

r.post("/init", async (req, res) => {
  const { orderId, amount, currency = "BDT" } = req.body || {}
  if (!orderId || !amount) return res.status(400).json({ error: "orderId and amount required" })
  // In real use: call SSLCommerz init API, receive GatewayPageURL, return it.
  // For now, redirect back to frontend with a success flag.
  const frontend = (process.env.FRONTEND_ORIGIN || "http://localhost:3000").split(",")[0]
  const redirectUrl = `${frontend}/?payment=mock-success&order=${encodeURIComponent(orderId)}&amount=${encodeURIComponent(
    amount,
  )}&currency=${encodeURIComponent(currency)}`
  res.json({ redirectUrl })
})

export default r
