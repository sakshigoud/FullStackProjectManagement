# Project Management - Full Stack Application

A modern full-stack web application with a public landing page and admin panel for managing projects, clients, and newsletter subscriptions.

## 🚀 Features

### Frontend

- **Landing Page** with dynamic projects and client testimonials
- **Newsletter Subscription** functionality
- **Admin Dashboard** with authentication
- **CRUD Operations** for projects and clients
- **Responsive Design** with Tailwind CSS
- **TypeScript** for type safety
- **React Router** for navigation

### Backend

- **RESTful API** built with Express.js
- **JWT Authentication** with role-based access control
- **MongoDB** database with Mongoose ODM
- **File Upload** support for images (Multer)
- **Protected Routes** for admin operations
- **Input Validation** and error handling

## Screen Shots

<img width="1885" height="916" alt="image" src="https://github.com/user-attachments/assets/705dff3b-831c-43a9-b0cc-8317d2449f6c" />


<img width="1852" height="944" alt="image" src="https://github.com/user-attachments/assets/b1b4b3ad-9460-451f-8a57-98277ef838f0" />


<img width="1899" height="930" alt="image" src="https://github.com/user-attachments/assets/48d2d2eb-931f-429b-8999-bb5b8d30b5d3" />




## 📁 Project Structure

```
Flipr assignment/
├── backend/              # Express.js backend
│   ├── config/          # Database configuration
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Auth & file upload middleware
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── uploads/         # Uploaded images
│   └── server.js        # Entry point
│
└── frontend/            # React + TypeScript frontend
    ├── public/          # Static assets
    └── src/
        ├── components/  # Reusable components
        ├── constants/   # API endpoints
        ├── layouts/     # Page layouts
        ├── pages/       # Page components
        ├── routes/      # Protected routes
        ├── services/    # API client
        └── styles.css   # Global styles
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**

```bash
cd backend
```

2. **Install dependencies:**

```bash
npm install
```

3. **Configure environment variables:**
   Create a `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/flipr-assignment
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRE=7d
```

4. **Start the backend server:**

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**

```bash
cd frontend
```

2. **Install dependencies:**

```bash
npm install
```

3. **Update API configuration (if needed):**
   Edit [`frontend/src/constants/api.ts`](frontend/src/constants/api.ts) to match your backend URL:

```ts
export const API_BASE_URL = "http://localhost:5000";
```

4. **Start the development server:**

```bash
npm run dev
```

Frontend will run on `http://localhost:5173` (default Vite port)

## 📡 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Projects

- `GET /api/projects` - Get all projects (public)
- `GET /api/admin/projects` - Get all projects (admin)
- `POST /api/admin/projects` - Create project (admin)
- `PUT /api/admin/projects/:id` - Update project (admin)
- `DELETE /api/admin/projects/:id` - Delete project (admin)

### Clients

- `GET /api/clients` - Get all clients (public)
- `GET /api/admin/clients` - Get all clients (admin)
- `POST /api/admin/clients` - Create client (admin)
- `PUT /api/admin/clients/:id` - Update client (admin)
- `DELETE /api/admin/clients/:id` - Delete client (admin)

### Newsletter

- `POST /api/newsletter` - Subscribe to newsletter (public)
- `GET /api/admin/newsletter` - Get all subscribers (admin)

## 🔐 Creating Admin User

To access the admin panel, you need to create an admin user:

**Using the API:**

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

**Using Postman:**
Import the [`Flipr_Assignment_API.postman_collection.json`](backend/Flipr_Assignment_API.postman_collection.json) file included in the backend directory.

## 🎯 Usage

1. **Start both backend and frontend servers**
2. **Visit** `http://localhost:5173` for the landing page
3. **Click "Admin Login"** in the navbar
4. **Login** with your admin credentials
5. **Manage** projects, clients, and view newsletter subscribers

## 🧪 Testing

Use the included Postman collection ([`backend/Flipr_Assignment_API.postman_collection.json`](backend/Flipr_Assignment_API.postman_collection.json)) to test all API endpoints.

## 🔧 Tech Stack

### Frontend

- React 19
- TypeScript
- React Router DOM
- Axios
- Tailwind CSS
- React Hot Toast
- Vite

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- Bcrypt.js
- Multer (file uploads)
- CORS

## 📝 Environment Variables

### Backend (.env)

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/flipr-assignment
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
```

## 🚀 Building for Production

### Frontend

```bash
cd frontend
npm run build
```

Build output will be in the `frontend/dist` directory.

### Backend

```bash
cd backend
npm start
```

## 📄 License

ISC

## 👤 Author

Created as part of Flipr Assignment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📧 Contact

For questions or support, please contact the project maintainer.
