# LUL-AE Website

React + Vite frontend with an Express API for the Lambda Upsilon Lambda Alumni Engagement site. The API serves alumni directory data (CSV + base lines), upcoming events from Google Calendar, and inquiry submissions with admin-protected access.

## Features
- Alumni directory built from `server/data/baseLines.js` and `server/data/alumni_profiles.csv`
- Google Calendar events feed (top 3 upcoming)
- Inquiry form with lowdb persistence + admin session auth
- Admin login/logout and session-based access control
- Headshot URLs resolved from `PUBLIC_S3_BASE`

## Tech Stack
- Frontend: React 19, Vite, React Router, Bootstrap
- Backend: Express 5, lowdb, express-session, helmet, rate limiter

## Project Structure
- `client/` React app (Vite)
- `server/` Express API
- `server/data/` CSV data, base lines, inquiry storage

## Setup
1) Install dependencies
```bash
cd server && npm install
cd ../client && npm install
```

2) Configure environment variables
- Create `server/.env` with the variables listed below. Contact Roy for these. 

3) Run the apps (separate terminals)
```bash
cd server && npm run dev
```
```bash
cd client && npm run dev
```

The API runs on `http://localhost:5050` by default. The Vite dev server runs on `http://localhost:5173`.

## Environment Variables (server/.env) Contact Roy for these. 
Required for core functionality:
- `PORT` (default `5050`)
- `CLIENT_ORIGIN` (default `http://localhost:5173`)
- `SESSION_SECRET` (use a long random string)
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD_HASH` (bcrypt hash)
- `GOOGLE_CALENDAR_API_KEY`
- `GOOGLE_CALENDAR_ID`
- `PUBLIC_S3_BASE` (e.g. `https://your-bucket.s3.region.amazonaws.com`)
- `AWS_ACCESS_KEY_ID` (upload signing)
- `AWS_SECRET_ACCESS_KEY` (upload signing)
- `AWS_REGION` (upload signing)
- `S3_BUCKET` (upload bucket for signed uploads)

Notes:
- Generate a bcrypt hash for `ADMIN_PASSWORD_HASH` using `bcryptjs` or another bcrypt tool.
- Keep secrets out of version control and rotate any committed credentials.

## API Endpoints
- `GET /api/health` health check
- `GET /api/alumni` alumni data merged with CSV extras
- `GET /api/alumni/debug` debug CSV parsing + headshot URL building
- `GET /api/events` next 3 upcoming Google Calendar events
- `POST /api/inquiries` create inquiry
- `GET /api/inquiries?limit=200` list inquiries (admin only)
- `POST /api/admin/login` admin login
- `POST /api/admin/logout` admin logout
- `GET /api/admin/me` admin session check

## Data Files
- `server/data/baseLines.js` core line + hermano list
- `server/data/alumni_profiles.csv` CSV profile extras (bio, LinkedIn, headshot key, etc.)
- `server/data/inquiries.json` persisted inquiries (lowdb)

## Scripts
Frontend (`client/`):
- `npm run dev` start Vite dev server
- `npm run build` production build
- `npm run lint` lint
- `npm run preview` preview build

Backend (`server/`):
- `npm run dev` start API with nodemon
- `npm run start` start API

## Updating Production (SSH + S3)
Frontend is hosted on S3 and the API runs on EC2.

1) Build the frontend locally
```bash
cd client
npm run build
```

2) Upload `client/dist/` contents to the S3 bucket root (e.g., `lul-ae.com`).
   - Update all website buckets (e.g., `lul-ae.com` and `www.lul-ae.com`) so both domains serve the same build.
   - `lul-headshot-bucket` is for headshots/uploads only.

3) SSH into the EC2 server and update the API
```bash
ssh -i 02_19_1982_thirteen_1999_ps.pem ubuntu@44.219.247.140 - make sure you cd into the folder with this tho 
cd /path/to/repo/server - for example: /Users/royalcala/LUL-AE Website/lul-ae/server
git pull
npm ci
pm2 restart lul-api
```
Note: Update the EC2 security group inbound rule for SSH (port 22) to allow your current public IP (x.x.x.x/32) before connecting.

4) Purge Cloudflare cache after uploads (Caching -> Purge Everything).
