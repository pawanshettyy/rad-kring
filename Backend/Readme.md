# Rad Kring Aviation

A modern aviation product site with booking, careers, contact, newsletter, and news features.

## Frontend
- Built with React, Vite, Tailwind CSS, Framer Motion
- Deployed on Vercel: [your-vercel-url]
- All static assets (images/videos) in `public` folder


## Backend
- Node.js, Express, MongoDB (Mongoose)
- Handles contact, careers, newsletter, preorder forms
- Sends notification emails via Nodemailer
- Environment config in `.env`

### Backend Setup Instructions

1. **Clone the repository**
  ```sh
  git clone https://github.com/pawanshettyy/rad-kring.git
  ```

2. **Install dependencies**
  ```sh
  cd Backend
  npm install
  ```

3. **Configure environment variables**
  - Copy `.env.example` to `.env` and fill in your values:
    - `MONGO_URI`: Get your free MongoDB Atlas URI
    - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`: Your email SMTP credentials (Gmail, Outlook, etc.)

4. **Connect your database**
  - Create a free MongoDB Atlas cluster and get your connection string.
  - Paste it in `.env` as `MONGO_URI`.

5. **Run the backend locally**
  ```sh
  npm start
  ```
  - The server will run on the port specified in `.env` (default: 5000).

6. **Deploy the backend**
  - Recommended free platforms:
    - [Render](https://render.com/): Node.js/Express hosting
    - [Railway](https://railway.app/): Node.js/Express hosting
  - Add your environment variables in the platform's dashboard.
  - Point your frontend API calls to the deployed backend URL.

### Email Setup
- Uses Nodemailer for sending notifications to info@radkring.com
- Works with Gmail, Outlook, or any SMTP provider
- For Gmail, use an App Password if 2FA is enabled

### Database Models
- Contact: name, email, message
- Newsletter: email
- CareerApplication: name, email, phone, position, resumeUrl, message

### API Endpoints
- `POST /api/contact` — Contact form
- `POST /api/newsletter` — Newsletter signup
- `POST /api/careers` — Careers application
- `POST /api/preorder` — Preorder form

### Testing the Backend
- Use Postman or curl to test endpoints
- Example:
  ```sh
  curl -X POST https://your-backend-url/api/contact \
   -H "Content-Type: application/json" \
   -d '{"name":"John","email":"john@example.com","message":"Hello!"}'
  ```

### Troubleshooting
- If emails are not sent, check SMTP credentials and provider settings
- If database does not connect, verify your MongoDB Atlas URI and network access


## Recommended Free Platforms
- **MongoDB Atlas**: Free cloud database for MongoDB
  - https://www.mongodb.com/atlas/database
- **Render**: Free backend hosting for Node.js/Express
  - https://render.com/
- **Railway**: Free backend hosting and database (limited)
  - https://railway.app/
- **Vercel Functions**: For lightweight backend (if you want to keep everything on Vercel)
  - https://vercel.com/docs/functions

## Setup
1. Clone repo
2. Add `.env` with MongoDB Atlas URI and SMTP credentials
3. `cd Backend && npm install`
4. `npm start` (or deploy to Render/Railway)

## API Endpoints
- `POST /api/contact` — Contact form
- `POST /api/newsletter` — Newsletter signup
- `POST /api/careers` — Careers application
- `POST /api/preorder` — Preorder form

## License
MIT
