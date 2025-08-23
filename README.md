# 🛋️ Furniture E-commerce Backend

A robust and scalable Node.js/TypeScript backend powering a comprehensive furniture e-commerce platform with B2B/B2C capabilities, real-time features, and enterprise-grade security.

**🌐 Live API:** [https://furnix-backend-gsgs.onrender.com/](https://furnix-backend-gsgs.onrender.com/)

**📚 API Documentation:** [https://furnix-backend-gsgs.onrender.com/api/docs](https://furnix-backend-gsgs.onrender.com/api/docs)

## ✨ Key Features

### 🔐 **Enterprise Authentication & Authorization**
- **JWT Implementation**: Access/refresh token rotation
- **Multi-Role System**: Super Admin, Admin, Distributor, Customer
- **Secure Password Handling**: bcrypt hashing with salt rounds
- **Email Verification**: Complete account verification workflow
- **Password Reset**: Secure token-based password recovery

### 🏪 **Dual Commerce Architecture**
- **B2C Retail**: Individual customer transactions
- **B2B Corporate**: Bulk orders with tiered pricing
- **Dynamic Pricing**: Role-based discount calculations
- **Inventory Management**: Real-time stock tracking and alerts

### 📦 **Advanced Product Management**
- **Multi-Level Categories**: Room → Furniture Type → Sub-Type
- **Product Variants**: Size, color, material combinations
- **Image Management**: Multiple images with automatic cleanup
- **SEO Optimization**: Dynamic meta tags and URLs
- **Stock Control**: Low stock alerts and management

### ⚡ **Real-Time Capabilities**
- **Socket.io Integration**: Live order updates and notifications
- **Real-Time Search**: Fuzzy matching with instant results
- **Stock Synchronization**: Live inventory updates
- **Admin Notifications**: Instant alerts for new orders

### 🎨 **Custom Furniture System**
- **File Upload Management**: Images, PDFs, design sketches
- **Admin Review Workflow**: Approval process before payment
- **Status Tracking**: Complete lifecycle management
- **Measurement Integration**: Room dimensions and specifications

## 🛠️ Technology Stack

### **Core Technologies**
- **Runtime**: Node.js 18+
- **Language**: TypeScript 5.0+
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with bcrypt
- **Real-Time**: Socket.io

### **Communication & Notifications**
- **Email**: Nodemailer with SMTP
- **SMS**: Twilio integration
- **File Storage**: Local storage with cleanup utilities
- **Payment**: SSL Commerce integration

### **Development Tools**
- **Validation**: Zod schema validation
- **Testing**: Jest with Supertest
- **Linting**: ESLint + Prettier
- **Documentation**: Swagger/OpenAPI
- **Monitoring**: Morgan logging

## 🏗️ Project Architecture

```
backend/
├── src/
│   ├── app/                     # Application core
│   │   ├── config/             # Configuration files
│   │   │   ├── database.ts     # Database connection
│   │   │   ├── jwt.ts          # JWT configuration
│   │   │   └── socket.ts       # Socket.io setup
│   │   ├── controllers/        # Request handlers
│   │   │   ├── auth.controller.ts
│   │   │   ├── product.controller.ts
│   │   │   ├── order.controller.ts
│   │   │   ├── category.controller.ts
│   │   │   ├── user.controller.ts
│   │   │   └── customOrder.controller.ts
│   │   ├── middleware/          # Express middleware
│   │   │   ├── auth.middleware.ts
│   │   │   ├── validation.middleware.ts
│   │   │   ├── upload.middleware.ts
│   │   │   ├── error.middleware.ts
│   │   │   └── rateLimiter.middleware.ts
│   │   ├── models/             # Database models (Prisma)
│   │   │   ├── user.model.ts
│   │   │   ├── product.model.ts
│   │   │   ├── order.model.ts
│   │   │   ├── category.model.ts
│   │   │   └── customOrder.model.ts
│   │   ├── routes/             # API route definitions
│   │   │   ├── auth.routes.ts
│   │   │   ├── product.routes.ts
│   │   │   ├── order.routes.ts
│   │   │   ├── category.routes.ts
│   │   │   ├── user.routes.ts
│   │   │   └── customOrder.routes.ts
│   │   ├── services/           # Business logic layer
│   │   │   ├── auth.service.ts
│   │   │   ├── product.service.ts
│   │   │   ├── order.service.ts
│   │   │   ├── email.service.ts
│   │   │   ├── sms.service.ts
│   │   │   ├── payment.service.ts
│   │   │   └── upload.service.ts
│   │   ├── utils/              # Utility functions
│   │   │   ├── encryption.ts
│   │   │   ├── validation.ts
│   │   │   ├── constants.ts
│   │   │   ├── helpers.ts
│   │   │   └── logger.ts
│   │   └── types/              # TypeScript definitions
│   │       ├── auth.types.ts
│   │       ├── product.types.ts
│   │       ├── order.types.ts
│   │       └── common.types.ts
│   ├── components/             # Shared components
│   │   ├── email/             # Email templates
│   │   │   ├── welcome.template.ts
│   │   │   ├── orderConfirmation.template.ts
│   │   │   └── passwordReset.template.ts
│   │   ├── sms/               # SMS templates
│   │   │   └── notification.templates.ts
│   │   └── validation/        # Validation schemas
│   │       ├── auth.schema.ts
│   │       ├── product.schema.ts
│   │       └── order.schema.ts
│   ├── services/              # External service integrations
│   │   ├── payment/           # Payment gateway services
│   │   │   └── sslcommerz.service.ts
│   │   ├── storage/           # File storage services
│   │   │   └── local.storage.ts
│   │   └── notification/      # Notification services
│   │       ├── email.service.ts
│   │       └── sms.service.ts
│   ├── prisma/                # Database schema and migrations
│   │   ├── schema.prisma      # Database schema
│   │   ├── migrations/        # Migration files
│   │   └── seeds/            # Database seeders
│   ├── public/               # Static file storage
│   │   ├── uploads/          # User uploaded files
│   │   │   ├── products/     # Product images
│   │   │   ├── custom-orders/ # Custom order files
│   │   │   └── avatars/      # User profile images
│   │   └── docs/             # API documentation assets
│   ├── tests/                # Test files
│   │   ├── unit/            # Unit tests
│   │   ├── integration/     # Integration tests
│   │   └── fixtures/        # Test data
│   ├── app.ts               # Express app configuration
│   └── server.ts            # Server entry point
├── .env.example             # Environment variables template
├── .gitignore              # Git ignore rules
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── jest.config.js          # Jest testing configuration
├── docker-compose.yml      # Docker development setup
└── README.md              # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18.0.0 or higher
- **PostgreSQL** 14+ (or MongoDB if using Mongoose)
- **npm** or **yarn**
- **Redis** (optional, for session storage)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/furniture-ecommerce-backend.git
   cd furniture-ecommerce-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```

   Configure your environment variables:
   ```env
   # Server Configuration
   NODE_ENV=development
   PORT=5000
   
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/furniture_db"
   
   # JWT Configuration
   JWT_ACCESS_SECRET=your-access-token-secret
   JWT_REFRESH_SECRET=your-refresh-token-secret
   JWT_ACCESS_EXPIRES_IN=15m
   JWT_REFRESH_EXPIRES_IN=7d
   
   # Email Configuration (Nodemailer)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   
   # SMS Configuration (Twilio)
   TWILIO_ACCOUNT_SID=your-twilio-account-sid
   TWILIO_AUTH_TOKEN=your-twilio-auth-token
   TWILIO_PHONE_NUMBER=your-twilio-phone-number
   
   # Payment Gateway (SSL Commerce)
   SSL_STORE_ID=your-ssl-store-id
   SSL_STORE_PASSWORD=your-ssl-store-password
   SSL_IS_LIVE=false
   
   # File Upload
   MAX_FILE_SIZE=5242880
   ALLOWED_FILE_TYPES=jpg,jpeg,png,pdf
   
   # CORS
   FRONTEND_URL=http://localhost:3000
   
   # Socket.io
   SOCKET_CORS_ORIGIN=http://localhost:3000
   ```

4. **Database Setup**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma migrate dev
   
   # Seed the database (optional)
   npm run seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

   The server will start on `http://localhost:5000`

## 📡 API Endpoints

### **Authentication Endpoints**
```http
POST   /api/auth/register         # User registration
POST   /api/auth/login            # User login
POST   /api/auth/refresh          # Token refresh
POST   /api/auth/logout           # User logout
POST   /api/auth/verify-email     # Email verification
POST   /api/auth/forgot-password  # Password reset request
POST   /api/auth/reset-password   # Password reset confirmation
```

### **User Management**
```http
GET    /api/users                 # Get all users (Admin only)
GET    /api/users/profile         # Get user profile
PUT    /api/users/profile         # Update user profile
DELETE /api/users/:id             # Delete user (Admin only)
POST   /api/users/change-password # Change password
```

### **Product Management**
```http
GET    /api/products              # Get all products (with filters)
GET    /api/products/:id          # Get product details
POST   /api/products              # Create product (Admin only)
PUT    /api/products/:id          # Update product (Admin only)
DELETE /api/products/:id          # Delete product (Admin only)
GET    /api/products/search       # Search products
GET    /api/products/related/:id  # Get related products
```

### **Category Management**
```http
GET    /api/categories            # Get all categories
GET    /api/categories/:id        # Get category details
POST   /api/categories            # Create category (Admin only)
PUT    /api/categories/:id        # Update category (Admin only)
DELETE /api/categories/:id        # Delete category (Admin only)
```

### **Order Management**
```http
GET    /api/orders                # Get user orders
GET    /api/orders/all            # Get all orders (Admin/Distributor)
GET    /api/orders/:id            # Get order details
POST   /api/orders                # Create new order
PUT    /api/orders/:id/status     # Update order status
DELETE /api/orders/:id            # Cancel order
POST   /api/orders/:id/payment    # Process payment
```

### **Custom Orders**
```http
GET    /api/custom-orders         # Get custom orders
GET    /api/custom-orders/:id     # Get custom order details
POST   /api/custom-orders         # Submit custom order
PUT    /api/custom-orders/:id     # Update custom order (Admin)
DELETE /api/custom-orders/:id     # Delete custom order
POST   /api/custom-orders/:id/approve # Approve custom order (Admin)
POST   /api/custom-orders/:id/reject  # Reject custom order (Admin)
```

### **File Upload**
```http
POST   /api/upload/product        # Upload product images
POST   /api/upload/custom-order   # Upload custom order files
POST   /api/upload/avatar         # Upload user avatar
DELETE /api/upload/:filename      # Delete uploaded file
```

### **Dashboard & Analytics**
```http
GET    /api/dashboard/stats       # Get dashboard statistics
GET    /api/dashboard/sales       # Get sales analytics
GET    /api/dashboard/products    # Get product analytics
GET    /api/dashboard/orders      # Get order analytics
GET    /api/dashboard/users       # Get user analytics
```

## 🔐 Authentication & Authorization

### **JWT Token Structure**
```typescript
interface JWTPayload {
  userId: string;
  email: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'DISTRIBUTOR' | 'CUSTOMER';
  iat: number;
  exp: number;
}
```

### **Role-Based Access Control**
```typescript
const rolePermissions = {
  SUPER_ADMIN: ['*'], // All permissions
  ADMIN: [
    'products:read', 'products:write', 'products:delete',
    'orders:read', 'orders:write',
    'users:read', 'categories:write'
  ],
  DISTRIBUTOR: [
    'orders:read', 'orders:update',
    'products:read'
  ],
  CUSTOMER: [
    'products:read', 'orders:create',
    'profile:read', 'profile:write'
  ]
};
```

### **Security Middleware**
```typescript
// Rate limiting
app.use('/api', rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
}));

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

// Security headers
app.use(helmet());
```

## 📧 Notification System

### **Email Templates**
- **Welcome Email**: Account creation confirmation
- **Order Confirmation**: Order details and tracking
- **Custom Order Updates**: Status change notifications
- **Password Reset**: Secure password recovery
- **Low Stock Alerts**: Inventory management notifications

### **SMS Notifications**
- Order confirmation and updates
- Delivery status changes
- Custom order approvals
- Security alerts

### **Real-Time Notifications (Socket.io)**
```typescript
// Order status updates
socket.to(userId).emit('orderUpdate', {
  orderId,
  status: 'SHIPPED',
  message: 'Your order has been shipped'
});

// Stock alerts for admins
socket.to('adminRoom').emit('stockAlert', {
  productId,
  currentStock: 5,
  threshold: 10
});
```

## 💳 Payment Integration

### **SSL Commerce Integration**
```typescript
interface PaymentRequest {
  amount: number;
  currency: string;
  orderId: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
}

// Payment initiation
const paymentResponse = await sslCommerzService.initPayment(paymentData);

// Payment verification
const verificationResult = await sslCommerzService.validatePayment(transactionId);
```

### **Cash on Delivery**
- Order placement without payment
- Payment collection tracking
- Delivery confirmation workflow

## 📁 File Management

### **Upload System**
```typescript
// Multer configuration
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = `public/uploads/${req.body.type}`;
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}.${file.originalname.split('.').pop()}`;
      cb(null, uniqueName);
    }
  }),
  limits: { fileSize: parseInt(process.env.MAX_FILE_SIZE) },
  fileFilter: fileFilterMiddleware
});
```

### **File Cleanup**
- Automatic cleanup of unused files
- Image optimization and resizing
- Secure file access with authentication

## 🧪 Testing

### **Test Structure**
```bash
tests/
├── unit/                    # Unit tests
│   ├── auth.service.test.ts
│   ├── product.service.test.ts
│   └── order.service.test.ts
├── integration/             # Integration tests
│   ├── auth.routes.test.ts
│   ├── product.routes.test.ts
│   └── order.routes.test.ts
└── fixtures/               # Test data
    ├── users.json
    ├── products.json
    └── orders.json
```

### **Running Tests**
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test auth.service.test.ts
```

## 🐳 Docker Setup

### **Development with Docker**
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=development
    volumes:
      - .:/app
      - /app/node_modules
    depends_on:
      - postgres
      
  postgres:
    image: postgres:14
    environment:
      POSTGRES_DB: furniture_db
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      
volumes:
  postgres_data:
```

```bash
# Start development environment
docker-compose up -d

# View logs
docker-compose logs -f

# Stop environment
docker-compose down
```

## 📊 Database Schema

### **Core Models**
```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  role      Role     @default(CUSTOMER)
  profile   Profile?
  orders    Order[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Product {
  id          String          @id @default(cuid())
  name        String
  description String
  price       Decimal
  variants    ProductVariant[]
  category    Category        @relation(fields: [categoryId], references: [id])
  categoryId  String
  images      String[]
  stock       Int
  isActive    Boolean         @default(true)
  createdAt   DateTime        @default(now())
  updatedAt   DateTime        @updatedAt
}

model Order {
  id            String      @id @default(cuid())
  user          User        @relation(fields: [userId], references: [id])
  userId        String
  items         OrderItem[]
  status        OrderStatus @default(PENDING)
  totalAmount   Decimal
  shippingAddress Json
  paymentMethod String
  isPaid        Boolean     @default(false)
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt
}
```

## 🔍 Search & Filtering

### **Advanced Search Features**
```typescript
// Fuzzy search implementation
const searchProducts = async (query: string, filters: ProductFilters) => {
  const searchConditions = {
    OR: [
      { name: { contains: query, mode: 'insensitive' } },
      { description: { contains: query, mode: 'insensitive' } },
      { category: { name: { contains: query, mode: 'insensitive' } } }
    ],
    AND: [
      filters.categoryId && { categoryId: filters.categoryId },
      filters.minPrice && { price: { gte: filters.minPrice } },
      filters.maxPrice && { price: { lte: filters.maxPrice } },
      filters.inStock && { stock: { gt: 0 } }
    ].filter(Boolean)
  };

  return await prisma.product.findMany({
    where: searchConditions,
    include: { category: true, variants: true },
    orderBy: { createdAt: 'desc' }
  });
};
```

## 📈 Performance Optimization

### **Caching Strategy**
- Redis for session storage
- Query result caching
- Image optimization and CDN integration
- Database connection pooling

### **Database Optimization**
- Proper indexing on frequently queried fields
- Query optimization with Prisma
- Connection pooling configuration
- Regular database maintenance

## 🚀 Deployment

### **Production Environment**
```bash
# Build the application
npm run build

# Start production server
npm start

# PM2 deployment (recommended)
pm2 start ecosystem.config.js
```

### **Environment Variables (Production)**
```env
NODE_ENV=production
PORT=5000
DATABASE_URL=your-production-database-url
JWT_ACCESS_SECRET=your-production-access-secret
JWT_REFRESH_SECRET=your-production-refresh-secret
FRONTEND_URL=https://your-frontend-domain.com
SSL_IS_LIVE=true
```

### **Health Check Endpoint**
```http
GET /health
```

Response:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "services": {
    "database": "connected",
    "redis": "connected",
    "email": "operational"
  }
}
```

## 📝 Scripts

```bash
# Development
npm run dev              # Start development server with hot reload
npm run build           # Build TypeScript to JavaScript
npm start               # Start production server

# Database
npm run db:migrate      # Run database migrations
npm run db:seed         # Seed database with initial data
npm run db:studio       # Open Prisma Studio
npm run db:reset        # Reset database

# Testing
npm test                # Run test suite
npm run test:watch      # Run tests in watch mode
npm run test:coverage   # Generate coverage report

# Code Quality
npm run lint            # Run ESLint
npm run lint:fix        # Fix ESLint issues
npm run format          # Format code with Prettier

# Production
npm run build           # Build for production
npm run start:prod      # Start production server
```

## 🎯 Key Achievements

- ✅ **Enterprise-Grade Architecture**: Modular, scalable codebase
- ✅ **Multi-Role Authentication**: Secure JWT implementation with role-based access
- ✅ **Real-Time Features**: Socket.io integration for live updates
- ✅ **Payment Integration**: SSL Commerce + COD support
- ✅ **File Management**: Secure upload/download with cleanup
- ✅ **Notification System**: Email + SMS + real-time notifications
- ✅ **B2B/B2C Support**: Dual commerce architecture
- ✅ **Custom Orders**: Complete workflow management
- ✅ **Database Optimization**: Efficient queries with proper indexing
- ✅ **Type Safety**: 100% TypeScript coverage
- ✅ **Testing Coverage**: Comprehensive unit and integration tests
- ✅ **Security Features**: Rate limiting, CORS, input validation

## 🔒 Security Features

### **Data Protection**
- Password hashing with bcrypt (12 rounds)
- JWT token rotation and secure storage
- Input validation with Zod schemas
- SQL injection prevention with Prisma
- XSS protection with helmet

### **API Security**
- Rate limiting per IP and user
- CORS configuration
- File upload security
- Authentication middleware
- Role-based authorization

## 📞 Support & Documentation

- **API Documentation**: Available at `/api/docs` (Swagger UI)
- **Health Monitoring**: `/health` endpoint for system status
- **Logging**: Structured logging with Winston
- **Error Tracking**: Comprehensive error handling and reporting

## 📄 License

MIT License.

---

<div align="center">

**🚀 Built with Node.js, TypeScript, and PostgreSQL**

**Powering the future of furniture e-commerce**

</div>
