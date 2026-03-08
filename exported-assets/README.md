# Kairo Full Stack App

Kairo is a Japanese learning platform with a React frontend and an Express + MongoDB backend.

## Tech Stack

- React
- Vite
- Tailwind CSS
- Node.js
- Express
- MongoDB

## Folder Structure

```text
client/   Frontend application
server/   Backend API
```

## Prerequisites

- Node.js 18+
- npm
- MongoDB running locally or a hosted MongoDB URI

## Install

From this folder:

```bash
npm install
cd client && npm install
cd ../server && npm install
```

## Environment

Create `server/.env` and set values like:

```env
PORT=5005
MONGODB_URI=mongodb://localhost:27017/kairo
JWT_SECRET=replace-this-with-a-secret
```

## Run In Development

From this folder:

```bash
npm run dev
```

That starts:

- frontend on `http://localhost:3000`
- backend on `http://localhost:5005`

## Available Scripts

```bash
npm run dev
npm run server
npm run client
npm run build
npm run start
```

## API Health Check

After starting the backend:

```text
GET http://localhost:5005/api/health
```

## Notes

- Frontend API requests under `/api` are proxied to the backend during development.
- Do not commit `node_modules` or `.env` files.
