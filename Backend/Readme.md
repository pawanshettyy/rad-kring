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
