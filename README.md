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

## Alumni CSV Notes
- The API only reads `server/data/alumni_profiles.csv`. Do not rely on alternate files such as `alumni_profiles2.csv` in production unless you rename/copy them to `alumni_profiles.csv`.
- Alumni data is merged by line and by a normalized version of the hermano name. Shorter CSV names can work, but exact matches are safest.
- `HeadshotKey` should match the real object key in `lul-headshot-bucket` as closely as possible. S3 keys are case-sensitive.
- `.jpg` and `.jpeg` are different object names. Do not assume they are interchangeable.
- Prefer keys in the form `headshots/<filename>` and avoid malformed paths such as `headshot/...` or `headshots/headshots/...`.
- If a headshot file was renamed in S3, update the matching `HeadshotKey` in `server/data/alumni_profiles.csv`.
- If an alumni image is missing, check `https://api.lul-ae.com/api/alumni/debug` and compare the CSV `HeadshotKey` to the actual object name in `lul-headshot-bucket`.

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
Frontend is hosted in S3. The API runs on EC2. Headshots live in a separate S3 bucket.

### Know Which Part Changed
- `client/` changes: rebuild the frontend and upload `client/dist` contents to the website buckets.
- `server/` changes: pull on EC2 and restart `pm2`.
- `server/data/baseLines.js` changes: this is backend data, so update EC2 and restart `pm2`.
- `server/data/alumni_profiles.csv` changes: this is backend data, so update EC2 and restart `pm2`.
- New or renamed headshot image files: upload them to `lul-headshot-bucket` and make sure `HeadshotKey` in the CSV matches the real object name.

### Frontend Deploy
Only do this when something under `client/` changed.

1) Build the frontend locally
```bash
cd client
npm run build
```

2) Upload the contents of `client/dist/` to the root of both website buckets:
- `lul-ae.com`
- `www.lul-ae.com`

Important:
- Upload the contents of `client/dist`, not a folder named `dist`.
- After a correct upload, the bucket root should contain files like `index.html`, `assets/`, `favicon.png`, `og-image.png`, and `vite.svg`.
- Do not upload the frontend build to `lul-headshot-bucket`.

3) Purge Cloudflare cache after uploading the frontend build.
   - Cloudflare -> Caching -> Purge Everything

### Backend Deploy
Do this when anything under `server/` changed, including CSV or `baseLines.js`.

1) SSH into EC2
```bash
ssh -i 02_19_1982_thirteen_1999_ps.pem ubuntu@44.219.247.140
```

Note:
- The public IP/DNS may change over time. Confirm the current EC2 public address in the AWS console before connecting.
- Update the EC2 security group inbound rule for SSH (port `22`) to allow your current public IP (`x.x.x.x/32`) before connecting.

2) Go to the repo and pull the latest code
```bash
cd ~/lul-ae
git pull
```

3) Install dependencies in the correct directory if needed
```bash
cd server
npm ci
```

Important:
- `npm ci` must be run inside `server/` or `client/`, not the repo root.
- The repo root does not have a `package-lock.json`, so `npm ci` will fail there.

4) Restart the API
```bash
pm2 restart lul-api
```

5) Check logs if the site still shows old data or returns a `500`
```bash
pm2 logs lul-api --lines 50
curl http://localhost:5050/api/alumni/debug
curl http://localhost:5050/api/alumni
```

### Headshot / CSV Update Checklist
Use this when alumni images or profile data are updated.

1) Update `server/data/alumni_profiles.csv`
- Keep the filename exactly `alumni_profiles.csv`.
- Do not leave the production data in `alumni_profiles2.csv` or another alternate filename.

2) If you uploaded or renamed images in S3, verify the CSV `HeadshotKey`
- Example format: `headshots/roy-alcala.jpg`
- Match the exact S3 object key, including capitalization, accents, and extension
- If the S3 object is `bryan-contreras.jpg`, do not point the CSV to `Bryan-Contreras.jpeg`

3) Deploy the backend
- `git push`
- `ssh` into EC2
- `git pull`
- `cd server && pm2 restart lul-api`

4) Verify the API response directly
- `https://api.lul-ae.com/api/alumni/debug`
- `https://api.lul-ae.com/api/alumni`

5) If the frontend still looks stale after the API is correct
- Hard refresh the browser
- Purge Cloudflare cache

### Local Testing Notes
- The backend runs on `http://localhost:5050`.
- The frontend runs on `http://localhost:5173`.
- `client/.env` currently points the frontend to production:
```bash
VITE_API_BASE_URL=https://api.lul-ae.com
```
- If you want to test local backend changes from the local frontend, change `client/.env` to:
```bash
VITE_API_BASE_URL=http://localhost:5050
```
- Restart the Vite dev server after changing `client/.env`.
