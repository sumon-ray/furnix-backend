import express from "express"
import cors from "cors"
import morgan from "morgan"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import { createServer } from "http"
import { Server as SocketIOServer } from "socket.io"
import path from "node:path"
import { connectDB } from "./utils/db.js"
import apiRouter from "./routes/index.js"

dotenv.config()
const app = express()
const httpServer = createServer(app)
const origins = (process.env.FRONTEND_ORIGIN || "http://localhost:3000").split(",")

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")))
// app.use(cors({
//   origin: "http://localhost:3000", // frontend origin
//   credentials: true,
// }))
const io = new SocketIOServer(httpServer, {
  cors: { origin: origins, credentials: true },
})
;(globalThis as any).io = io




app.use(morgan("dev"))
// app.use(cors({ origin: origins, credentials: true }))
app.use(cors({
  origin: "http://localhost:3000", // frontend origin
  credentials: true,
}))
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use("/uploads", express.static(path.join(process.cwd(), "public/uploads")))
app.use("/api", apiRouter)
io.on("connection", (socket) => {
  console.log("socket connected", socket.id)
  socket.on("disconnect", () => {})
})

app.get("/", (req, res) => res.json({ message: "Backend is running!" }))
const port = process.env.PORT || 4000

connectDB().then(() => {
  httpServer.listen(port, () => console.log(`API running on http://localhost:${port}`))
})
