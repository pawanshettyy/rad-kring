# RAD KRING AVIATION Backend API Documentation

## Overview
This backend provides comprehensive API endpoints for the RAD KRING AVIATION website, including contact forms, news management, newsletter functionality, about us content, and privacy policy management.

## Base URL
```
http://localhost:5000/api
```

## Authentication
Admin endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

---

## 📧 Contact API

### Submit Contact Form
**POST** `/contact`

Submit a new contact form inquiry.

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "contactNo": "+1234567890",
  "preferredTime": "morning",
  "message": "I'm interested in your eVTOL services"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Contact form submitted successfully. We will get back to you soon!",
  "data": {
    "id": "contact_id",
    "submittedAt": "2025-07-30T10:00:00.000Z"
  }
}
```

### Get All Contacts (Admin)
**GET** `/contact/admin?page=1&limit=10&status=pending&isRead=false`

### Update Contact Status (Admin)
**PUT** `/contact/admin/:id`

**Body:**
```json
{
  "status": "contacted",
  "isRead": true,
  "responseNotes": "Called customer, scheduled meeting"
}
```

### Get Contact Statistics (Admin)
**GET** `/contact/admin/stats`

---

## 📰 News & Media API

### Get All News Articles
**GET** `/news?page=1&limit=10&category=technology&search=eVTOL&featured=true`

**Response:**
```json
{
  "success": true,
  "data": {
    "news": [...],
    "pagination": {
      "current": 1,
      "total": 5,
      "count": 10,
      "totalRecords": 50
    }
  }
}
```

### Get Single News Article
**GET** `/news/:id`

### Get Featured News
**GET** `/news/featured?limit=5`

### Get News Categories
**GET** `/news/categories`

### Create News Article (Admin)
**POST** `/news/admin`

**Body:**
```json
{
  "title": "New eVTOL Technology Breakthrough",
  "excerpt": "RAD KRING AVIATION announces major advancement...",
  "content": "Full article content here...",
  "category": "technology",
  "tags": ["eVTOL", "innovation"],
  "featured": true,
  "featuredImage": "image_url",
  "seoTitle": "SEO optimized title",
  "seoDescription": "SEO description"
}
```

### Update News Article (Admin)
**PUT** `/news/admin/:id`

### Delete News Article (Admin)
**DELETE** `/news/admin/:id`

### Get All News for Admin
**GET** `/news/admin/all?page=1&limit=10&status=published&category=technology`

---

## 📬 Newsletter API

### Subscribe to Newsletter
**POST** `/newsletter/subscribe`

**Body:**
```json
{
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "interests": ["technology", "flights"],
  "source": "footer"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully subscribed to newsletter! Welcome aboard!",
  "data": {
    "id": "subscription_id",
    "email": "user@example.com",
    "subscribedAt": "2025-07-30T10:00:00.000Z"
  }
}
```

### Unsubscribe from Newsletter
**POST** `/newsletter/unsubscribe`

**Body:**
```json
{
  "email": "user@example.com"
}
```
or
```json
{
  "token": "unsubscribe_token"
}
```

### Update Newsletter Preferences
**PUT** `/newsletter/preferences`

**Body:**
```json
{
  "email": "user@example.com",
  "interests": ["technology", "news"],
  "firstName": "John",
  "lastName": "Doe"
}
```

### Get All Subscribers (Admin)
**GET** `/newsletter/admin?page=1&limit=10&isActive=true&source=footer`

### Get Newsletter Statistics (Admin)
**GET** `/newsletter/admin/stats`

### Export Subscribers (Admin)
**GET** `/newsletter/admin/export?isActive=true`

---

## ℹ️ About Us API

### Get All About Content
**GET** `/about`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "section": "hero",
      "title": "RAD KRING AVIATION",
      "subtitle": "Pioneering the Future of Urban Air Mobility",
      "content": "We are revolutionizing urban transportation...",
      "order": 1,
      "metadata": {
        "layout": "center",
        "backgroundColor": "#000000"
      }
    }
  ]
}
```

### Get Specific About Section
**GET** `/about/:section`

### Create About Content (Admin)
**POST** `/about/admin`

**Body:**
```json
{
  "section": "mission",
  "title": "Our Mission",
  "content": "To democratize air travel...",
  "order": 2,
  "metadata": {
    "layout": "left"
  }
}
```

### Update About Content (Admin)
**PUT** `/about/admin/:section`

### Delete About Content (Admin)
**DELETE** `/about/admin/:section`

### Get All About Content for Admin
**GET** `/about/admin/all`

### Reorder About Sections (Admin)
**PUT** `/about/admin/reorder`

**Body:**
```json
{
  "sections": [
    { "section": "hero", "order": 1 },
    { "section": "mission", "order": 2 },
    { "section": "vision", "order": 3 }
  ]
}
```

---

## 🔒 Privacy Policy API

### Get Current Privacy Policy
**GET** `/privacy-policy`

**Response:**
```json
{
  "success": true,
  "data": {
    "version": "1.0",
    "title": "Privacy Policy",
    "lastUpdated": "2025-07-30T10:00:00.000Z",
    "effectiveDate": "2025-07-30T10:00:00.000Z",
    "sections": [...],
    "contactInfo": {
      "email": "privacy@radkringaviation.com",
      "address": "Aviation Hub, India",
      "phone": "+91 (555) 123-4567"
    }
  }
}
```

### Get Privacy Policy by Version
**GET** `/privacy-policy/:version`

### Create New Privacy Policy Version (Admin)
**POST** `/privacy-policy/admin`

**Body:**
```json
{
  "version": "2.0",
  "title": "Privacy Policy",
  "sections": [
    {
      "heading": "Information We Collect",
      "content": "We collect information...",
      "order": 1
    }
  ],
  "isActive": true
}
```

### Update Privacy Policy (Admin)
**PUT** `/privacy-policy/admin/:version`

### Delete Privacy Policy Version (Admin)
**DELETE** `/privacy-policy/admin/:version`

### Get All Privacy Policy Versions (Admin)
**GET** `/privacy-policy/admin/all`

### Set Active Privacy Policy (Admin)
**PUT** `/privacy-policy/admin/:version/activate`

---

## Error Responses

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Specific error details"] // For validation errors
}
```

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request / Validation Error
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict (e.g., duplicate email)
- `500` - Internal Server Error

---

## Setup Instructions

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Environment Setup:**
   ```bash
   cp .env.example .env
   # Update .env with your configuration
   ```

3. **Seed Database:**
   ```bash
   npm run seed
   ```

4. **Start Development Server:**
   ```bash
   npm run dev
   ```

5. **Start Production Server:**
   ```bash
   npm start
   ```

---

## Database Models

### Contact
- name, email, contactNo, preferredTime, message
- status (pending, contacted, resolved)
- isRead, responseNotes, timestamps

### News
- title, excerpt, content, featuredImage
- category, tags, author, status
- publishedAt, views, featured
- seoTitle, seoDescription

### Newsletter
- email, firstName, lastName, isActive
- subscriptionSource, interests
- unsubscribeToken, lastEmailSent
- clickCount, openCount

### AboutContent
- section, title, subtitle, content
- image, order, isActive, metadata

### PrivacyPolicy
- version, title, lastUpdated, effectiveDate
- sections, contactInfo, isActive
- complianceRegions

---

## Email Features

The system automatically sends:
- Welcome emails to newsletter subscribers
- Contact form notifications to admin
- HTML-formatted professional emails
- Unsubscribe links for compliance

Configure SMTP settings in `.env` file for email functionality.
