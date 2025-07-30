# Backend Troubleshooting Guide

## 🚨 Common Issues and Solutions

### 1. MongoDB Connection Issues

#### Error: "MongoNetworkError: failed to connect to server"
**Solution:**
- Ensure MongoDB is running (if using local installation)
- Check your `MONGODB_URI` in `.env` file
- For local MongoDB: `mongodb://127.0.0.1:27017/rad-kring-aviation`
- For MongoDB Atlas: Get connection string from Atlas dashboard

**For Local MongoDB:**
```bash
# Check if MongoDB is running
netstat -an | find "27017"

# Start MongoDB (Windows)
net start MongoDB

# Start MongoDB (macOS/Linux)
brew services start mongodb/brew/mongodb-community
# or
sudo systemctl start mongod
```

#### Error: "Authentication failed"
**Solution:**
- Check MongoDB Atlas credentials
- Ensure IP address is whitelisted in Atlas
- Verify username/password in connection string

### 2. Email Configuration Issues

#### Error: "Invalid login: 535-5.7.8 Username and Password not accepted"
**Solution:**
- Enable 2-Step Verification in your Google Account
- Generate an App Password specifically for this application
- Use the App Password in `SMTP_PASS` (not your Gmail password)

**Steps to generate App Password:**
1. Go to Google Account settings
2. Security → 2-Step Verification → App passwords
3. Select "Mail" and your device
4. Use the generated 16-character password

#### Error: "connect ECONNREFUSED 587"
**Solution:**
- Check if your ISP blocks SMTP ports
- Try using port 465 with secure: true
- For Gmail, ensure less secure app access is enabled (not recommended)

### 3. Environment Variables Issues

#### Error: "JWT_SECRET is required"
**Solution:**
```bash
# Generate a secure JWT secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```
Add this to your `.env` file as `JWT_SECRET`

#### Error: Variables not loading
**Solution:**
- Ensure `.env` file is in the project root
- Check for typos in variable names
- Restart the server after changing `.env`

### 4. Port Already in Use

#### Error: "EADDRINUSE: address already in use :::5000"
**Solution:**
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (Windows)
taskkill /PID <PID> /F

# Kill the process (macOS/Linux)
kill -9 <PID>

# Or use different port in .env
PORT=5001
```

### 5. CORS Issues

#### Error: "Access to XMLHttpRequest has been blocked by CORS policy"
**Solution:**
- Add your frontend URL to `cors` configuration in `server.js`
- For development, ensure frontend runs on allowed origins

### 6. Database Seeding Issues

#### Error: "Cannot read property 'save' of null"
**Solution:**
- Ensure MongoDB connection is established before seeding
- Check if models are properly imported
- Verify database name in connection string

### 7. Missing Dependencies

#### Error: "Cannot find module 'express'"
**Solution:**
```bash
# Reinstall dependencies
npm install

# Clear npm cache if issues persist
npm cache clean --force
npm install
```

### 8. File Upload Issues

#### Error: "File too large"
**Solution:**
- Check `express.json()` limit in server.js
- Increase limit: `express.json({ limit: '50mb' })`

### 9. Development vs Production Issues

#### Different behavior in production
**Solution:**
- Set `NODE_ENV=production` in production
- Use process.env.NODE_ENV checks in code
- Ensure all required environment variables are set

### 10. API Testing Issues

#### 404 Not Found errors
**Solution:**
- Check route paths in route files
- Ensure routes are properly imported in server.js
- Verify API base path `/api`

## 🔍 Debugging Commands

### Check Server Health
```bash
curl http://localhost:5000/api/health
```

### Test Database Connection
```bash
node -e "
const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI)
.then(() => { console.log('✅ Database connected'); process.exit(0); })
.catch(err => { console.error('❌ Database error:', err.message); process.exit(1); });
"
```

### Test Email Configuration
```bash
node -e "
const nodemailer = require('nodemailer');
require('dotenv').config();
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});
transporter.verify()
.then(() => console.log('✅ Email config is valid'))
.catch(err => console.error('❌ Email config error:', err.message));
"
```

### Check Environment Variables
```bash
node -e "
require('dotenv').config();
console.log('MongoDB URI:', process.env.MONGODB_URI ? '✅ Set' : '❌ Missing');
console.log('JWT Secret:', process.env.JWT_SECRET ? '✅ Set' : '❌ Missing');
console.log('SMTP User:', process.env.SMTP_USER ? '✅ Set' : '❌ Missing');
console.log('SMTP Pass:', process.env.SMTP_PASS ? '✅ Set' : '❌ Missing');
"
```

## 📊 Logging and Monitoring

### Enable Debug Mode
Add to `.env`:
```
DEBUG=true
LOG_LEVEL=debug
```

### View Server Logs
```bash
# Start with verbose logging
npm run dev

# For production with PM2
pm2 logs rad-kring-backend
```

## 🆘 Getting Help

If you're still experiencing issues:

1. **Check the logs** - Most errors are logged with descriptive messages
2. **Verify environment** - Ensure all required variables are set
3. **Test individual components** - Use the debugging commands above
4. **Check network connectivity** - Ensure services are reachable
5. **Review documentation** - Check README.md and API_DOCUMENTATION.md

### Error Reporting Template
When reporting issues, please include:
- Node.js version: `node --version`
- npm version: `npm --version`
- Operating system
- Complete error message
- Steps to reproduce
- Environment variables (without sensitive values)

## 🔧 Quick Fixes Checklist

- [ ] MongoDB is running and accessible
- [ ] All environment variables are set in `.env`
- [ ] Dependencies are installed (`npm install`)
- [ ] Port 5000 is available
- [ ] Network connectivity to external services
- [ ] Correct file permissions
- [ ] Latest code from repository
