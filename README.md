# FurniX Backend (Express + MongoDB)

Banglay setup guide:

1) MongoDB
- Local: MongoDB Community install korun. Default URI: mongodb://localhost:27017/furnix
- Atlas: Free cluster, database user, IP allow, SRV URI niben (mongodb+srv://.../furnix)

2) .env
- backend/.env.example copy kore .env file banan, values fill korun (PORT, MONGODB_URI, JWT secrets, FRONTEND_ORIGIN)

3) Install & run
- cd backend
- npm i
- npm run dev   # http://localhost:4000

(Optional) Seed data:
- npm run seed

4) Frontend ke connect
- Frontend e env add korun: NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api
- Next.js e only NEXT_PUBLIC_ diye client-e env expose hoy [^2]
- Frontend run korben as usual (npm run dev). Preview e baseUrl empty thakle in-memory API use hobe; env set korle external Express use hobe.

5) Endpoints (compatible with FE)
- POST /api/auth/register
- POST /api/auth/login
- GET  /api/auth/refresh
- GET  /api/categories
- GET  /api/products?q=&page=&pageSize=&priceMax=&material=&color=
- POST /api/products
- GET  /api/products/:id_or_slug
- PUT  /api/products/:id
- DELETE /api/products/:id
- GET  /api/search?q=
- GET  /api/orders?status=
- POST /api/orders
- PUT  /api/orders/:id
- GET  /api/users
- GET  /api/custom-orders?status=
- POST /api/custom-orders  (multipart/form-data, field name: files)

6) File uploads
- /uploads static serve configured. Multer write kore public/uploads e.
- FE receive path like /uploads/filename.jpg

7) Real-time (Socket.io)
- server.ts e io configured. Order status change/low-stock emit korte parben: io.emit("order:update", payload)
- FE theke socket.io-client diye subscribe korlei Toastify te notification dekhate parben.

8) Email/SMS/Payment
- Nodemailer: SMTP env diye transporter set kore order/verification mails pathan.
- Twilio: SID/TOKEN diye SMS pathan.
- SSLCommerz: init/validate endpoints add kore checkout flow complete korun.

Troubleshooting
- CORS: FRONTEND_ORIGIN=.env e http://localhost:3000 set thakbe. Multiple origin comma-separated support ache.
- Env expose: NEXT_PUBLIC_API_BASE_URL chara client theke env paben na (Next.js rule) [^2].
