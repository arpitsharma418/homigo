# Homigo

A simple rental listing app built with the MERN stack.

## What You Need

- Node.js installed
- A MongoDB account (free cluster on MongoDB Atlas)
- A Cloudinary account (free tier) for image uploads

## Setup

### Backend

```bash
cd backend
npm install
```

Create a file called `.env` in the `backend` folder:

```bash
PORT=8080
MONGO_URI=your-mongodb-uri
JWT_SECRET=any-secret-word
CLIENT_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

Start the backend:

```bash
npm run dev
```

Backend runs at: `http://localhost:8080`

### Frontend

```bash
cd frontend
npm install
```

Create `.env` in the `frontend` folder:

```bash
VITE_API_URL=http://localhost:8080/api
```

Start the frontend:

```bash
npm run dev
```

Frontend runs at: `http://localhost:5173`

## Deploying

- **Backend**: Deploy to Render (free tier works). Set the same env variables there.
- **Frontend**: Deploy to Vercel. Set `VITE_API_URL` to your Render URL.

That's it!