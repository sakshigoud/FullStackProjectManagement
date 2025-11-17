# Flipr Assignment - Backend API

A complete backend API for a landing page and admin panel application built with Node.js, Express.js, MongoDB, and JWT authentication.

## 🚀 Features

- **JWT Authentication** with role-based access control (Admin/User)
- **Project Management** (CRUD operations)
- **Client Management** (CRUD operations)
- **Newsletter Subscription** system
- **Admin Panel** with protected routes
- Clean and simple folder structure

## 📁 Project Structure

```
backend/
├── config/
│   └── db.js                 # MongoDB connection
├── controllers/
│   ├── authController.js     # Authentication logic
│   ├── projectController.js  # Project management
│   ├── clientController.js   # Client management
│   └── newsletterController.js # Newsletter subscriptions
├── middleware/
│   └── authMiddleware.js     # JWT & Admin verification
├── models/
│   ├── User.js               # User schema
│   ├── Project.js            # Project schema
│   ├── Client.js             # Client schema
│   └── Newsletter.js         # Newsletter schema
├── routes/
│   ├── authRoutes.js         # Auth endpoints
│   ├── projectRoutes.js      # Project endpoints
│   ├── clientRoutes.js       # Client endpoints
│   └── newsletterRoutes.js   # Newsletter endpoints
├── .env                      # Environment variables
├── package.json
└── server.js                 # Express server setup
```

## 🛠️ Installation

1. **Install dependencies:**

```bash
npm install
```

2. **Configure environment variables:**
   Edit the `.env` file and update the values:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/flipr-assignment
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRE=7d
```

3. **Make sure MongoDB is running:**

- Install MongoDB locally or use MongoDB Atlas
- Update `MONGODB_URI` in `.env` file

4. **Start the server:**

```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```

Server will run on `http://localhost:5000`

## 📡 API Endpoints

### Authentication

#### Register User

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"  // optional: "user" or "admin"
}
```

#### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "_id": "...",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "token": "jwt_token_here"
}
```

#### Get Current User

```http
GET /api/auth/me
Authorization: Bearer <token>
```

---

### Projects (Public Routes)

#### Get All Projects

```http
GET /api/projects
```

---

### Projects (Admin Routes - Requires JWT + Admin Role)

#### Get All Projects (Admin)

```http
GET /api/admin/projects
Authorization: Bearer <admin_token>
```

#### Create Project

```http
POST /api/admin/projects
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "projectImage": "https://example.com/image.jpg",
  "projectName": "Project Name",
  "projectDescription": "Project description here"
}
```

#### Update Project

```http
PUT /api/admin/projects/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "projectName": "Updated Project Name",
  "projectDescription": "Updated description"
}
```

#### Delete Project

```http
DELETE /api/admin/projects/:id
Authorization: Bearer <admin_token>
```

---

### Clients (Public Routes)

#### Get All Clients

```http
GET /api/clients
```

---

### Clients (Admin Routes - Requires JWT + Admin Role)

#### Get All Clients (Admin)

```http
GET /api/admin/clients
Authorization: Bearer <admin_token>
```

#### Create Client

```http
POST /api/admin/clients
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "clientImage": "https://example.com/client.jpg",
  "clientName": "Client Name",
  "clientDescription": "Client testimonial or description",
  "clientDesignation": "CEO, Company Name"
}
```

#### Update Client

```http
PUT /api/admin/clients/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "clientName": "Updated Client Name",
  "clientDesignation": "CTO, Company Name"
}
```

#### Delete Client

```http
DELETE /api/admin/clients/:id
Authorization: Bearer <admin_token>
```

---

### Newsletter

#### Subscribe to Newsletter (Public)

```http
POST /api/newsletter
Content-Type: application/json

{
  "email": "subscriber@example.com"
}
```

#### Get All Subscribers (Admin Only)

```http
GET /api/admin/newsletter
Authorization: Bearer <admin_token>
```

---

## 🔐 Authentication Flow

1. **Register/Login** to get JWT token
2. **Include token** in Authorization header for protected routes:
   ```
   Authorization: Bearer <your_jwt_token>
   ```
3. **Admin routes** require both valid JWT and `role: "admin"`

## 🗄️ Database Models

### User

```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (enum: ['user', 'admin']),
  timestamps: true
}
```

### Project

```javascript
{
  projectImage: String,
  projectName: String,
  projectDescription: String,
  timestamps: true
}
```

### Client

```javascript
{
  clientImage: String,
  clientName: String,
  clientDescription: String,
  clientDesignation: String,
  timestamps: true
}
```

### Newsletter

```javascript
{
  email: String (unique),
  subscribedAt: Date (default: Date.now)
}
```

## 🧪 Testing the API

You can test the API using:

- **Postman** or **Insomnia** (import the endpoints)
- **Thunder Client** (VS Code extension)
- **cURL** commands

### Example: Create Admin User

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@example.com",
    "password": "admin123",
    "role": "admin"
  }'
```

## 📝 Notes

- Passwords are automatically hashed using bcrypt
- JWT tokens expire in 7 days (configurable in .env)
- All admin routes check for both valid token and admin role
- Email validation is included in Newsletter model
- Timestamps (createdAt, updatedAt) are automatically added to all models

## 🔧 Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **jsonwebtoken** - JWT authentication
- **bcryptjs** - Password hashing
- **dotenv** - Environment variables
- **cors** - CORS middleware

## 📄 License

ISC
