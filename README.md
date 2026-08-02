# MERN Stack App

A starter MERN project with:

- MongoDB + Mongoose
- Express API server
- React + Vite client
- Node workspace scripts to run both apps together

## Setup

```bash
npm install
cp server/.env.example server/.env
npm run dev
```

The client runs on `http://localhost:5173`.
The API runs on `http://localhost:5000`.

If MongoDB is not running yet, the API can still start without a database
connection. Add a working `MONGODB_URI` in `server/.env` when you are ready to
use database-backed features.

