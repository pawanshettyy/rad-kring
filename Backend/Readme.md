# Backend API

A complete Node.js/Express backend with authentication, user management, and MongoDB integration.

## 🚀 Features

* **Authentication & Authorization**
  * JWT-based authentication
  * Role-based access control (User/Admin)
  * Password hashing with bcryptjs
  * Token refresh functionality
* **User Management**
  * User registration and login
  * Profile management
  * Password change functionality
  * Admin user management
* **Database**
  * MongoDB with Mongoose ODM
  * Data validation and sanitization
  * Indexing for performance
* **Security**
  * Input validation middleware
  * Error handling
  * CORS configuration
  * Password security best practices

## 📁 Project Structure

```
Backend/
├── config/
│   └── database.js          # Database configuration
├── controllers/
│   ├── authController.js    # Authentication logic
│   └── userController.js    # User management logic
├── middleware/
│   ├── authMiddleware.js    # JWT authentication
│   ├── errorMiddleware.js   # Error handling
│   └── validationMiddleware.js # Input validation
├── models/
│   └── User.js              # User model
├── routes/
│   ├── authRoutes.js        # Authentication routes
│   └── userRoutes.js        # User management routes
├── tests/
│   └── auth.test.js         # Test examples
├── uploads/                 # File uploads directory
├── utils/
│   ├── asyncHandler.js      # Async error handler
│   ├── errorUtils.js        # Error utilities
│   └── tokenUtils.js        # JWT utilities
├── .env                     # Environment variables
├── package.json             # Dependencies
└── server.js               # Main server file
```

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Backend
   ```
2. **Install dependencies**

   ```bash
   npm install
   ```
3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Update the `.env` file with your configuration:

   * `MONGODB_URI`: Your MongoDB connection string
   * `JWT_SECRET`: A strong secret key (at least 32 characters)
   * Other optional configurations
4. **Start MongoDB**

   * Local MongoDB: Make sure MongoDB is running on your system
   * MongoDB Atlas: Use your cloud database connection string
5. **Run the server**

   ```bash
   npm run dev    # Development with auto-reload
   npm start      # Production
   ```

## 📚 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint      | Description       | Access  |
| ------ | ------------- | ----------------- | ------- |
| POST   | `/register` | Register new user | Public  |
| POST   | `/login`    | User login        | Public  |
| GET    | `/me`       | Get current user  | Private |
| POST   | `/logout`   | User logout       | Private |
| POST   | `/refresh`  | Refresh token     | Private |

### User Routes (`/api/users`)

| Method | Endpoint             | Description         | Access      |
| ------ | -------------------- | ------------------- | ----------- |
| GET    | `/profile`         | Get user profile    | Private     |
| PUT    | `/profile`         | Update user profile | Private     |
| PUT    | `/change-password` | Change password     | Private     |
| GET    | `/`                | Get all users       | Admin       |
| GET    | `/:id`             | Get user by ID      | Owner/Admin |
| PUT    | `/:id`             | Update user         | Admin       |
| DELETE | `/:id`             | Delete user         | Admin       |
| PUT    | `/:id/status`      | Toggle user status  | Admin       |

### Health Check

| Method | Endpoint        | Description         | Access |
| ------ | --------------- | ------------------- | ------ |
| GET    | `/api/health` | Server health check | Public |

## 🔧 Usage Examples

### Register a new user

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Access protected route

```bash
curl -X GET http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🔒 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

Tokens expire in 7 days by default (configurable via `JWT_EXPIRES_IN`).

## 🛡️ Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "stack": "Error stack (development only)"
}
```

Common HTTP status codes:

* `200`: Success
* `201`: Created
* `400`: Bad Request
* `401`: Unauthorized
* `403`: Forbidden
* `404`: Not Found
* `500`: Internal Server Error

## 🧪 Testing

Run the test suite (when implemented):

```bash
npm test
```

Manual API testing with the included test function:

```javascript
const { testAPI } = require('./tests/auth.test.js');
testAPI();
```

## 🚀 Deployment

1. **Environment Setup**
   * Set `NODE_ENV=production`
   * Use a strong `JWT_SECRET`
   * Configure production MongoDB URI
2. **Security Considerations**
   * Use HTTPS in production
   * Implement rate limiting
   * Add helmet.js for security headers
   * Configure CORS properly
3. **Performance Optimization**
   * Enable MongoDB indexing
   * Implement caching where appropriate
   * Use compression middleware

## 📝 Environment Variables

| Variable           | Description               | Default                             |
| ------------------ | ------------------------- | ----------------------------------- |
| `PORT`           | Server port               | `5000`                            |
| `NODE_ENV`       | Environment               | `development`                     |
| `MONGODB_URI`    | MongoDB connection string | `mongodb://localhost:27017/myapp` |
| `JWT_SECRET`     | JWT secret key            | Required                            |
| `JWT_EXPIRES_IN` | Token expiration          | `7d`                              |
| `FRONTEND_URL`   | Frontend URL for CORS     | `http://localhost:3000`           |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.
