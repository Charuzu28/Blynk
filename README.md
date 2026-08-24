# BLYNK

BLYNK is a minimalist productivity and Pomodoro web application built with the MERN stack.

It is designed to help users stay focused, manage tasks and notes, track focus sessions, and personalize their productivity experience.

🌐 **Live Demo:** https://blynks.vercel.app

---

## Preview

<img width="1920" height="918" alt="Screenshot (1925)" src="https://github.com/user-attachments/assets/979e721e-593e-413a-a79a-7e793fc6b60f" />

## Features

### Pomodoro Timer

- Focus sessions
- Short break sessions
- Long break sessions
- Start, pause, and reset controls
- Persistent timer settings
- Customizable timer ring styles
- Custom alarm sounds
- Adjustable alarm volume

### Task Management

- Create tasks
- Edit tasks
- Complete tasks
- Delete tasks
- Persistent task storage

### Notes

- Create notes
- Edit notes
- Pin notes
- Delete notes
- Persistent note storage

### Focus Tracking

- Focus session tracking
- Productivity streaks
- Session history

### Eye Care

- Eye-care reminders during productivity sessions

### User Settings

- Pomodoro duration
- Short break duration
- Long break duration
- Alarm sound selection
- Alarm volume
- Timer ring customization
- Persistent user preferences

### Authentication

- User registration
- User login
- User logout
- JWT authentication
- Secure HttpOnly cookies
- Persistent login sessions
- Protected routes

---

## Tech Stack

### Frontend

- React
- JavaScript
- Vite
- Tailwind CSS
- React Router

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt

### Development and Deployment

- Docker
- Git
- GitHub
- Vercel
- Render
- MongoDB Atlas

---

## Architecture

blynk uses a separated frontend, backend, and database architecture.

```text
                    User Browser
                         │
                         ▼
                ┌─────────────────┐
                │     Vercel      │
                │                 │
                │ React Frontend  │
                │       +         │
                │   API Proxy     │
                └────────┬────────┘
                         │
                      /api/*
                         │
                         ▼
                ┌─────────────────┐
                │     Render      │
                │                 │
                │ Docker Container│
                │ Node + Express  │
                └────────┬────────┘
                         │
                      Mongoose
                         │
                         ▼
                ┌─────────────────┐
                │ MongoDB Atlas   │
                │                 │
                │ Users           │
                │ Tasks           │
                │ Notes           │
                │ Settings        │
                │ Focus Sessions  │
                └─────────────────┘
```

---

## API Proxy

In production, the React frontend does not call the Render backend directly.

The frontend uses relative API routes such as:

```js
fetch("/api/tasks");
```

The browser sends the request to:

```text
https://blynks.vercel.app/api/tasks
```

Vercel receives the request and forwards it to the backend running on Render:

```text
https://blynk-4w88.onrender.com/api/tasks
```

This is configured using `client/vercel.json`.

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://blynk-4w88.onrender.com/api/:path*"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

The `/api/:path*` rule acts as the API proxy.

For example:

```text
/api/tasks
      ↓
Vercel
      ↓
Render
      ↓
Express
```

The second rewrite sends frontend routes back to `index.html` so React Router can handle routes such as:

```text
/settings
/login
/register
```

---

## API Client

The frontend uses a centralized API client.

During development, requests are sent to the local Express backend.

```text
React
http://localhost:5173

        ↓

Express
http://localhost:5000
```

In production, the frontend uses the current Vercel origin.

Example:

```js
const API_BASE_URL = import.meta.env.DEV
  ? import.meta.env.VITE_API_URL || "http://localhost:5000"
  : "";
```

When running locally:

```js
API_BASE_URL = "http://localhost:5000";
```

When deployed:

```js
API_BASE_URL = "";
```

So:

```js
fetch(`${API_BASE_URL}/api/tasks`);
```

becomes:

```js
fetch("/api/tasks");
```

Vercel then proxies that request to Render.

---

## Authentication

blynk uses JWT authentication stored inside an HttpOnly cookie.

The authentication cookie uses:

```text
HttpOnly
Secure in production
SameSite=Lax
Path=/
```

The frontend sends requests using:

```js
credentials: "include"
```

Example:

```js
fetch("/api/auth/me", {
  credentials: "include"
});
```

The browser automatically sends the authentication cookie with the request.

The JWT is not stored in `localStorage`.

This helps keep the authentication token inaccessible to normal frontend JavaScript.

---

## Authentication Flow

```text
User Login
    │
    ▼
React
    │
    ▼
POST /api/auth/login
    │
    ▼
Vercel Proxy
    │
    ▼
Render
    │
    ▼
Express
    │
    ▼
MongoDB
    │
    ▼
User verified
    │
    ▼
JWT created
    │
    ▼
HttpOnly Cookie
    │
    ▼
Browser
```

After login, the browser automatically includes the authentication cookie in protected API requests.

---

## Docker

The backend is containerized using Docker.

Docker packages the backend together with its:

```text
Node.js runtime
Application code
Dependencies
Startup command
```

This helps provide a consistent runtime environment between local development and production deployment.

The backend flow is:

```text
Dockerfile
   ↓
Docker Image
   ↓
Docker Container
   ↓
Node.js
   ↓
Express API
```

The Docker image was tested locally before the backend was deployed to Render.

---

## Why Docker Is Used

Without Docker, the backend depends on the Node.js version and environment installed on the server.

Docker defines the environment itself.

For example:

```dockerfile
FROM node:22-bookworm-slim

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --omit=dev

COPY . .

USER node

EXPOSE 5000

CMD ["npm", "start"]
```

This makes sure the backend uses a predictable Node.js runtime and installs the required dependencies from `package.json` and `package-lock.json`.

---

## Project Structure

```text
Blynk/
│
├── client/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── features/
│   │   ├── pages/
│   │   └── services/
│   │
│   ├── package.json
│   ├── vite.config.js
│   └── vercel.json
│
├── server/
│   │
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── utils/
│   │
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── package.json
│   └── server.js
│
└── README.md
```

---

## Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/Charuzu28/Blynk.git
```

Move into the project:

```bash
cd Blynk
```

---

## Frontend Setup

Navigate to the frontend:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Create a `.env` file if needed:

```env
VITE_API_URL=http://localhost:5000
```

Start the Vite development server:

```bash
npm run dev
```

The frontend will normally run on:

```text
http://localhost:5173
```

---

## Backend Setup

Open another terminal and navigate to:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create:

```text
server/.env
```

Example:

```env
PORT=5000

NODE_ENV=development

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLIENT_URL=http://localhost:5173
```

Do not commit your `.env` file.

Start the backend development server:

```bash
npm run dev
```

Or start it normally:

```bash
npm start
```

The backend will normally run on:

```text
http://localhost:5000
```

---

## Running the Backend with Docker

Navigate to the server directory:

```bash
cd server
```

Build the Docker image:

```bash
docker build -t blynkn-api .
```

Run the container:

```bash
docker run \
  --name blynkn-api \
  --env-file .env \
  -e NODE_ENV=development \
  -p 5000:5000 \
  blynkn-api
```

The API should then be available at:

```text
http://localhost:5000
```

---

## Health Check

The backend includes a health-check endpoint:

```text
GET /api/health
```

Test locally:

```bash
curl http://localhost:5000/api/health
```

Expected response:

```json
{
  "success": true,
  "message": "blynk API is running"
}
```

Production health check:

```text
https://blynks.vercel.app/api/health
```

---

## Environment Variables

### Frontend

Development:

```env
VITE_API_URL=http://localhost:5000
```

In production, the frontend uses relative `/api/*` requests that are forwarded through Vercel.

---

### Backend

Development example:

```env
PORT=5000

NODE_ENV=development

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLIENT_URL=http://localhost:5173
```

Production example:

```env
NODE_ENV=production

MONGODB_URI=your_production_mongodb_connection_string

JWT_SECRET=your_production_jwt_secret

CLIENT_URL=https://blynks.vercel.app
```

Secrets should never be committed to GitHub.

---

## Deployment

### Frontend

The React frontend is deployed on:

**Vercel**

Production URL:

https://blynks.vercel.app

---

### Backend

The Node.js and Express API is containerized using Docker and deployed on:

**Render**

Backend service:

https://blynk-4w88.onrender.com

---

### Database

Production data is stored using:

**MongoDB Atlas**

---

## Production Request Flow

```text
User
  │
  ▼
React Frontend
  │
  ▼
Vercel
  │
  ▼
/api/*
  │
  ▼
Vercel Proxy
  │
  ▼
Render
  │
  ▼
Docker Container
  │
  ▼
Node.js + Express
  │
  ▼
Mongoose
  │
  ▼
MongoDB Atlas
```

---

## Development Request Flow

```text
React
localhost:5173
      │
      ▼
Express
localhost:5000
      │
      ▼
Mongoose
      │
      ▼
MongoDB Atlas
```

---

## Security

The project includes several backend security measures:

- JWT authentication
- HttpOnly authentication cookies
- Secure cookies in production
- Password hashing using bcrypt
- Protected API routes
- Helmet security headers
- API rate limiting
- Request body size limits
- CORS configuration
- Environment variables for secrets
- Centralized error handling
- Input validation
- MongoDB persistence

Sensitive values such as MongoDB credentials and JWT secrets are stored using environment variables and are not included in the repository or Docker image.

---

## Main API Routes

### Authentication

```text
/api/auth
```

Used for:

- Register
- Login
- Logout
- Current authenticated user

---

### Tasks

```text
/api/tasks
```

Used for:

- Creating tasks
- Reading tasks
- Updating tasks
- Completing tasks
- Deleting tasks

---

### Notes

```text
/api/notes
```

Used for:

- Creating notes
- Reading notes
- Editing notes
- Pinning notes
- Deleting notes

---

### Settings

```text
/api/settings
```

Used for storing user preferences such as:

- Pomodoro duration
- Break duration
- Alarm sound
- Alarm volume
- Timer ring style

---

### Focus Sessions

```text
/api/focus-sessions
```

Used to save and retrieve completed focus sessions.

---

## Timer Personalization

blynk allows users to customize the appearance of the Pomodoro timer ring.

Available styles include:

```text
Solid
Dashed
Dotted
Wavy
None
```

The selected timer ring style is stored in MongoDB as part of the user's settings.

---

## Alarm Personalization

Users can select different alarm sounds for completed timer sessions.

Available alarm options include:

```text
Default Alarm
Cat Laugh
Danger Alarm
Alarm Dubist
Fah Alarm
Alarm Voice
Rat Dance Alarm
```

Users can also control alarm volume from:

```text
0% - 100%
```

Alarm preferences are stored in MongoDB and persist between sessions.

---

## Data Persistence

blynk stores user data using MongoDB Atlas.

Persistent data includes:

```text
Users
Tasks
Notes
Settings
Focus Sessions
Streak information
```

This means the data remains available even if the Render Docker container restarts.

---

## What I Learned

Building blynk helped me gain practical experience beyond creating a frontend interface.

Throughout the project, I worked on:

- Planning application features
- Redesigning the user interface
- Building reusable React components
- React state management
- Creating REST API endpoints
- Connecting frontend and backend systems
- User authentication
- Password hashing
- JWT authentication
- HttpOnly cookies
- Protected routes
- Database modeling
- MongoDB persistence
- API error handling
- Loading and empty states
- Environment variables
- Docker containerization
- Production configuration
- API proxying
- Frontend deployment
- Backend deployment
- Production testing

One of the biggest lessons from this project was understanding that building features is only one part of software development.

Preparing an application for production also involves:

```text
Security
Infrastructure
Environment configuration
Deployment
Testing
Persistence
Error handling
```

---

## Future Improvements

blynk v1.0 is currently complete, but possible future improvements include:

- Productivity analytics
- More timer customization
- Additional alarm sounds
- More themes
- Improved mobile experience
- Better accessibility
- Browser notifications
- More productivity tools
- Advanced focus statistics
- Improved streak visualization

---

## Version

```text
blynk v1.0.0
```

---

## Author

Developed by **Charles**

GitHub:

https://github.com/Charuzu28

Live Project:

https://blynks.vercel.app

---

## License

This project was created as a personal portfolio and learning project.


