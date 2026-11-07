# FundChain — Web3 Fundraising Demo

A full-stack portfolio demonstration built with React, Vite, Node.js, Express and MongoDB.

## Included
- Dark Web3-inspired responsive dashboard
- Register / login with JWT authentication
- Browse fundraising campaigns
- Create and manage campaigns (signed-in users)
- Campaign progress and demo contribution flow
- User dashboard showing created campaigns and contribution history
- MongoDB persistence
- Seed script with sample campaigns

## Important demo limitation
Contributions are **simulated records only**. This project does not transfer cryptocurrency, custody assets, or execute blockchain transactions. The wallet button is a UI connection placeholder. Do not describe it as production Web3 payment integration.

## Requirements
- Node.js 18+
- MongoDB Atlas database or local MongoDB

## 1. Configure the backend
```bash
cd server
cp .env.example .env
```
Edit `.env` and set:
- `MONGODB_URI` to your MongoDB connection string
- `JWT_SECRET` to a long random secret
- `CLIENT_ORIGIN` to `http://localhost:5173`

Install and run:
```bash
npm install
npm run seed
npm run dev
```
API runs at `http://localhost:5000`.

## 2. Configure the frontend
Open a second terminal:
```bash
cd client
cp .env.example .env
npm install
npm run dev
```
Open `http://localhost:5173`.

## 3. Deploy
### MongoDB Atlas
1. Create a free cluster at https://www.mongodb.com/atlas.
2. Create a database user and allow your deployment host's IP (or use the provider's documented network access setup).
3. Copy the connection string and replace the credentials/database name.

### Backend (Render / Railway)
Deploy the `server` folder as a Node web service.
- Build command: `npm install`
- Start command: `npm start`
- Environment variables: `MONGODB_URI`, `JWT_SECRET`, `CLIENT_ORIGIN`, `NODE_ENV=production`
- Set `CLIENT_ORIGIN` to your deployed frontend URL.

### Frontend (Vercel / Netlify)
Deploy the `client` folder.
- Build command: `npm run build`
- Output directory: `dist`
- Set `VITE_API_URL` to your deployed backend URL plus `/api`, e.g. `https://your-api.onrender.com/api`.

After deployment, update the backend `CLIENT_ORIGIN` to the final frontend URL and redeploy/restart the backend.

## Portfolio honesty
Describe this as an independently built portfolio demo. Before calling it production-ready, add real audited smart contracts, wallet signing, transaction verification, rate limiting, email verification, monitoring, security review, and legal/compliance review appropriate to the markets served.
