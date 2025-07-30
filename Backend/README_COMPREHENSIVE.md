# RAD KRING AVIATION - Backend API

A comprehensive Node.js/Express backend API for the RAD KRING AVIATION website, providing endpoints for contact forms, news management, newsletter functionality, about us content, and privacy policy management.

## 🚀 Features

### Core Functionality
- **Contact Management**: Handle contact form submissions with email notifications
- **News & Media**: Complete news article management with categories and search
- **Newsletter**: Subscription management with welcome emails and preferences
- **About Us**: Dynamic content management for about sections
- **Privacy Policy**: Version-controlled privacy policy management
- **Authentication**: JWT-based authentication for admin endpoints

### Technical Features
- **Email Integration**: Automated emails using Nodemailer
- **Data Validation**: Comprehensive input validation with Mongoose
- **Error Handling**: Centralized error handling and logging
- **API Documentation**: Detailed endpoint documentation
- **Database Seeding**: Initial data setup scripts
- **CORS Support**: Cross-origin resource sharing configured
- **Security**: Input sanitization and password hashing

## 📋 Prerequisites

- **Node.js** (v16.0.0 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** (local installation or cloud instance) - [Download here](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** package manager
- **Email Account** (Gmail recommended for SMTP) for automated emails
- **Git** (for cloning the repository)

## 🛠️ Complete Setup Guide

### 1. Clone the Repository
```bash
git clone https://github.com/pawanshettyy/rad-kring.git
cd rad-kring/Backend
```

### 2. Install Dependencies
```bash
npm install
```

This will install all required packages:
- **express**: Web framework
- **mongoose**: MongoDB object modeling
- **jsonwebtoken**: JWT authentication
- **bcryptjs**: Password hashing
- **nodemailer**: Email sending
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variable management

### 3. MongoDB Setup

#### Option A: Local MongoDB Installation
1. **Download and install MongoDB Community Server** from [MongoDB Downloads](https://www.mongodb.com/try/download/community)
2. **Start MongoDB service:**
   - **Windows**: MongoDB should start automatically as a service
   - **macOS**: `brew services start mongodb/brew/mongodb-community`
   - **Linux**: `sudo systemctl start mongod`
3. **Verify MongoDB is running:**
   ```bash
   mongosh --eval "db.runCommand({ connectionStatus: 1 })"
   ```

#### Option B: MongoDB Atlas (Cloud) - Recommended for Production
1. **Create free account** at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. **Create a new cluster** (free tier available)
3. **Create database user** with read/write permissions
4. **Get connection string** from the "Connect" button
5. **Whitelist your IP address** in Network Access

### 4. Email Configuration Setup

#### Gmail Setup (Recommended)
1. **Create or use existing Gmail account**
2. **Enable 2-Factor Authentication:**
   - Go to [Google Account settings](https://myaccount.google.com/)
   - Security → 2-Step Verification → Turn on

3. **Generate App Password:**
   - Google Account → Security → 2-Step Verification
   - Scroll down to "App passwords"
   - Select "Mail" and your device
   - Copy the generated 16-character password

4. **Important**: Use the App Password in environment variables (not your regular Gmail password)

#### Alternative Email Providers
- **Outlook/Hotmail**: 
  - Host: `smtp-mail.outlook.com`
  - Port: `587`
  - Security: STARTTLS
- **Yahoo Mail**:
  - Host: `smtp.mail.yahoo.com`
  - Port: `587`
  - Security: STARTTLS
- **Custom SMTP**: Contact your email provider for SMTP settings

### 5. Environment Configuration

#### Create Environment File
```bash
cp .env.example .env
```

#### Configure Environment Variables
Edit the `.env` file with your specific configuration:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/rad-kring-aviation
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/rad-kring-aviation

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration (Generate secure random strings)
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long-for-security
JWT_EXPIRE=7d

# Email Configuration for Automated Emails
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-character-app-password-from-google
ADMIN_EMAIL=admin@radkringaviation.com

# Frontend URL (for email links and CORS)
FRONTEND_URL=http://localhost:3000

# Optional: File Upload Configuration
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads

# Optional: Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

#### Environment Variables Explained

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/rad-kring-aviation` | ✅ **Required** |
| `JWT_SECRET` | Secret key for JWT tokens (min 32 chars) | `your-super-secure-secret-key-here` | ✅ **Required** |
| `JWT_EXPIRE` | JWT token expiration time | `7d`, `24h`, `30m` | ✅ **Required** |
| `PORT` | Server port number | `5000`, `3001` | ✅ **Required** |
| `NODE_ENV` | Environment mode | `development`, `production` | ✅ **Required** |
| `SMTP_HOST` | Email server hostname | `smtp.gmail.com` | ⚠️ **For emails** |
| `SMTP_PORT` | Email server port | `587`, `465` | ⚠️ **For emails** |
| `SMTP_USER` | Email address for sending | `your-email@gmail.com` | ⚠️ **For emails** |
| `SMTP_PASS` | Email password/app password | `your-app-password` | ⚠️ **For emails** |
| `ADMIN_EMAIL` | Admin email for notifications | `admin@company.com` | ⚠️ **For emails** |
| `FRONTEND_URL` | Frontend URL for email links | `http://localhost:3000` | 🔵 **Optional** |

### 6. Database Initialization
```bash
npm run seed
```

This command will:
- Connect to your MongoDB database
- Create all necessary collections and indexes
- Insert initial data:
  - **About Us sections** (Hero, Mission, Vision, Values, Team, History, Achievements)
  - **Sample news articles** with different categories (Technology, Announcements, Partnerships)
  - **Privacy Policy** with comprehensive sections
  - **Database indexes** for optimal performance

### 7. Start the Server

#### Development Mode (with auto-restart on file changes)
```bash
npm run dev
```

#### Production Mode
```bash
npm start
```

### 8. Verify Installation

#### Check Server Health
Open your browser and visit: `http://localhost:5000/api/health`

**Expected response:**
```json
{
  "status": "OK",
  "timestamp": "2025-07-30T10:00:00.000Z",
  "message": "Server is running successfully"
}
```

#### Run Comprehensive API Tests
```bash
node test-api.js
```

This will test all major endpoints and show success/failure status for:
- Health check
- About content retrieval
- News articles
- Featured news
- Newsletter subscription
- Contact form submission
- Privacy policy

## 📧 Email System Configuration

### Email Features
The backend automatically sends professional HTML emails for:

1. **Newsletter Welcome Emails**: Sent when users subscribe
2. **Contact Form Notifications**: Sent to admin when contact forms are submitted
3. **Professional Branding**: RAD KRING AVIATION branded templates
4. **Unsubscribe Compliance**: Automatic unsubscribe links

### Email Templates
- Responsive HTML design
- Professional RAD KRING AVIATION branding
- Orange and blue color scheme matching website
- Mobile-friendly layouts
- Automatic unsubscribe links for compliance

### Troubleshooting Email Issues

#### Common Email Problems:

1. **"Authentication failed" Error:**
   - Ensure 2FA is enabled on Gmail
   - Use App Password, not regular password
   - Double-check SMTP_USER and SMTP_PASS

2. **"Connection timeout" Error:**
   - Check firewall settings
   - Verify SMTP_HOST and SMTP_PORT
   - Try port 465 with secure: true

3. **Emails not sending:**
   - Check email credentials in .env file
   - Verify Gmail account is not locked
   - Check spam folder for test emails

#### Email Testing:
```bash
# Test email configuration
node -e "
const { sendWelcomeEmail } = require('./utils/emailService');
sendWelcomeEmail('test@example.com', 'Test User')
  .then(() => console.log('✅ Email sent successfully'))
  .catch(err => console.error('❌ Email failed:', err));
"
```

## 📚 API Endpoints Overview

### Public Endpoints (No Authentication Required)

#### Contact Management
- `POST /api/contact` - Submit contact form

#### News & Media
- `GET /api/news` - Get all published news with pagination
- `GET /api/news/:id` - Get single news article
- `GET /api/news/featured` - Get featured news articles
- `GET /api/news/categories` - Get available news categories

#### Newsletter
- `POST /api/newsletter/subscribe` - Subscribe to newsletter
- `POST /api/newsletter/unsubscribe` - Unsubscribe from newsletter
- `PUT /api/newsletter/preferences` - Update subscription preferences

#### Content Pages
- `GET /api/about` - Get all about us content sections
- `GET /api/about/:section` - Get specific about section
- `GET /api/privacy-policy` - Get current privacy policy
- `GET /api/privacy-policy/:version` - Get specific policy version

### Admin Endpoints (Authentication Required)

#### Contact Management
- `GET /api/contact/admin` - Get all contacts with filtering
- `PUT /api/contact/admin/:id` - Update contact status
- `GET /api/contact/admin/stats` - Get contact statistics

#### News Management
- `GET /api/news/admin/all` - Get all news (including drafts)
- `POST /api/news/admin` - Create news article
- `PUT /api/news/admin/:id` - Update news article
- `DELETE /api/news/admin/:id` - Delete news article

#### Newsletter Management
- `GET /api/newsletter/admin` - Get all subscribers
- `GET /api/newsletter/admin/stats` - Get newsletter statistics
- `GET /api/newsletter/admin/export` - Export subscriber data

#### Content Management
- `POST /api/about/admin` - Create about content
- `PUT /api/about/admin/:section` - Update about content
- `DELETE /api/about/admin/:section` - Delete about content
- `PUT /api/about/admin/reorder` - Reorder about sections

#### Privacy Policy Management
- `POST /api/privacy-policy/admin` - Create new policy version
- `PUT /api/privacy-policy/admin/:version` - Update policy
- `PUT /api/privacy-policy/admin/:version/activate` - Set active policy
- `DELETE /api/privacy-policy/admin/:version` - Delete policy version

## 🔧 Development Commands

```bash
# Install dependencies
npm install

# Start development server (auto-restart on changes)
npm run dev

# Start production server
npm start

# Seed database with initial data
npm run seed

# Run API endpoint tests
node test-api.js

# Check for dependency vulnerabilities
npm audit

# Update dependencies
npm update
```

## 📁 Project Structure

```
Backend/
├── config/
│   └── database.js              # MongoDB connection configuration
├── controllers/
│   ├── authController.js        # Authentication logic
│   ├── userController.js        # User management
│   ├── contactController.js     # Contact form handling
│   ├── newsController.js        # News article management
│   ├── newsletterController.js  # Newsletter subscriptions
│   ├── aboutController.js       # About content management
│   └── privacyController.js     # Privacy policy management
├── middleware/
│   ├── authMiddleware.js        # JWT authentication middleware
│   └── errorMiddleware.js       # Error handling middleware
├── models/
│   ├── User.js                  # User model
│   ├── Contact.js               # Contact form model
│   ├── News.js                  # News article model
│   ├── Newsletter.js            # Newsletter subscription model
│   ├── AboutContent.js          # About content model
│   └── PrivacyPolicy.js         # Privacy policy model
├── routes/
│   ├── authRoutes.js            # Authentication routes
│   ├── userRoutes.js            # User management routes
│   ├── contactRoutes.js         # Contact form routes
│   ├── newsRoutes.js            # News article routes
│   ├── newsletterRoutes.js      # Newsletter routes
│   ├── aboutRoutes.js           # About content routes
│   └── privacyRoutes.js         # Privacy policy routes
├── scripts/
│   └── seed.js                  # Database seeding script
├── utils/
│   ├── emailService.js          # Email sending utilities
│   └── seedData.js              # Initial data for seeding
├── uploads/                     # File upload directory
├── tests/                       # Test files directory
├── .env.example                 # Environment variables template
├── .gitignore                   # Git ignore rules
├── API_DOCUMENTATION.md         # Detailed API documentation
├── package.json                 # Project dependencies and scripts
├── server.js                    # Main application entry point
└── test-api.js                  # API testing script
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs for secure password storage
- **Input Validation**: Mongoose schema validation
- **CORS Configuration**: Cross-origin resource sharing setup
- **Environment Variables**: Sensitive data protection
- **Error Handling**: Secure error responses (no sensitive data exposure)
- **Rate Limiting**: Configurable request rate limiting
- **Data Sanitization**: Input sanitization to prevent injection attacks

## 🚀 Production Deployment

### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/rad-kring-aviation
JWT_SECRET=super-secure-production-secret-key-minimum-32-characters
PORT=5000
FRONTEND_URL=https://radkringaviation.com
ADMIN_EMAIL=admin@radkringaviation.com
```

### Deployment Checklist
- [ ] Set all environment variables
- [ ] Configure production MongoDB connection
- [ ] Set up email service (SMTP credentials)
- [ ] Run database seeding: `npm run seed`
- [ ] Configure domain and SSL certificate
- [ ] Set up monitoring and logging
- [ ] Configure firewall and security groups
- [ ] Test all API endpoints
- [ ] Set up backup strategy for database

### Recommended Hosting Platforms
- **Railway**: Easy Node.js deployment
- **Heroku**: Popular platform with MongoDB add-ons
- **DigitalOcean**: VPS with full control
- **AWS EC2**: Scalable cloud infrastructure
- **Vercel**: Serverless deployment option

## 📖 Documentation

- **Complete API Documentation**: `API_DOCUMENTATION.md`
- **Environment Setup**: This README
- **Frontend Integration**: `Frontend/src/services/api.js`
- **React Hooks**: `Frontend/src/hooks/useAPI.js`

## 🐛 Troubleshooting

### Common Issues and Solutions

#### Database Connection Issues
```bash
# Check MongoDB status
mongosh --eval "db.runCommand({ connectionStatus: 1 })"

# Restart MongoDB service
sudo systemctl restart mongod  # Linux
brew services restart mongodb-community  # macOS
```

#### Port Already in Use
```bash
# Find process using port 5000
lsof -i :5000  # macOS/Linux
netstat -ano | findstr :5000  # Windows

# Kill process
kill -9 <PID>  # macOS/Linux
taskkill /PID <PID> /F  # Windows
```

#### JWT Secret Issues
- Ensure JWT_SECRET is at least 32 characters long
- Use a cryptographically secure random string
- Never commit JWT secrets to version control

#### Email Configuration Issues
- Verify Gmail 2FA is enabled
- Use App Password, not regular password
- Check firewall/antivirus blocking SMTP ports
- Test with different SMTP ports (587, 465)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes
4. Add tests for new functionality
5. Commit changes: `git commit -am 'Add new feature'`
6. Push to branch: `git push origin feature/new-feature`
7. Submit a pull request

## 📄 License

This project is licensed under the ISC License - see the package.json file for details.

## 📞 Support

For support or questions:
- **Email**: contact@radkringaviation.com
- **Documentation**: See `API_DOCUMENTATION.md` for detailed API reference
- **Issues**: Create an issue on the GitHub repository

---

**Made in India, Built for the World** 🇮🇳 ✈️

**RAD KRING AVIATION** - Pioneering the future of urban air mobility with zero-emission eVTOL technology.
