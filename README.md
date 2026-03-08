# Kairo

Kairo is a full-stack Japanese learning platform with a React + Vite frontend and a Node.js + Express + MongoDB backend.

The actual application source lives in `exported-assets/`.

## Stack

- React
- Vite
- Node.js
- Express
- MongoDB

## Project Layout

```text
exported-assets/
|-- client/   # Frontend app
|-- server/   # Backend API
|-- README.md # App-specific notes
```

## Local Setup

```bash
cd exported-assets
npm install
cd client && npm install
cd ../server && npm install
```

Create `exported-assets/server/.env` with your local configuration before starting the backend.

## Run

From `exported-assets/`:

```bash
npm run dev
```

This starts the frontend and backend together using the root workspace script defined in `exported-assets/package.json`.
