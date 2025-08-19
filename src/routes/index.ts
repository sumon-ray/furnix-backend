import { Router } from "express"
import auth from "./auth.js"
import products from "./products.js"
// import categories from "./categories.js"
import orders from "./orders.js"
import customOrders from "./custom-orders.js"
import users from "./users.js"
import search from "./search.js"
import paymentsSslcommerz from "./payments-sslcommerz.js"

const r = Router()
r.use("/auth", auth)
r.use("/products", products)
// r.use("/categories", categories)
r.use("/orders", orders)
r.use("/custom-orders", customOrders)
r.use("/users", users)
r.use("/search", search)
r.use("/payments/sslcommerz", paymentsSslcommerz)

export default r
