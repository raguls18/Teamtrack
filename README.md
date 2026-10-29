# TeamTrack

People operations, simplified.

## Features
- JWT accounts and employee directory
- Employee CRUD for configured admin account
- Attendance check-in records and attendance history
- Leave request submission and admin approval/rejection


## Run locally
1. Start MongoDB or create an Atlas database.
2. In `server`, copy `.env.example` to `.env`, set `MONGO_URI` and `JWT_SECRET`, then run `npm install && npm run dev`.
3. In `client`, copy `.env.example` to `.env`, then run `npm install && npm run dev`.
4. Open the Vite URL and register. API port: `5003`.

For teamtrack admin features, set `ADMIN_EMAIL` in the backend environment to the email address you register with. The server marks that matching account as admin on registration; do not expose this setting to untrusted users.

## API overview
- `GET /api/health` — health check
- `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`
- `/api/employees` — directory and admin CRUD
- `/api/attendance` — attendance records/check-in
- `/api/leaves` — request and admin decision


## Deployment
Deploy `server` to Render and `client` to Vercel. Configure `MONGO_URI`, `JWT_SECRET`, `CLIENT_ORIGIN`, `ADMIN_EMAIL` if applicable, and `VITE_API_URL` (deployed backend URL plus `/api`). Do not commit `.env` files.
