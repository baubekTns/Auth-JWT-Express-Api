# Auth JWT Express API

A secure authentication API built with Node.js, Express, MongoDB, JWT, and Docker.
The API supports user registration, login, protected routes, access-token authentication, refresh-token handling, and logout using HTTP-only cookies.

## Features

- User registration and login
- Password hashing with bcrypt
- JWT access tokens for protected routes
- Refresh-token handling with HTTP-only cookies
- Protected user profile endpoint
- MongoDB persistence with Mongoose
- Login rate limiting to reduce brute-force attempts
- Docker and Docker Compose setup for local development

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens
- bcrypt
- cookie-parser
- express-rate-limit
- Docker
- Docker Compose

## Getting Started

### Prerequisites

Install the following:

- Node.js LTS
- MongoDB, if running locally without Docker
- Docker and Docker Compose, if using the containerized setup

### Environment Variables

Create a `.env` file in the project root:

```env
PORT=5000
HOST_PORT=5050

DB_PORT=27017
HOST_DB_PORT=27017

MONGO_URI=mongodb://mongo:27017/auth-api

NODE_ENV=development
JWT_SECRET=your_access_token_secret
REFRESH_SECRET=your_refresh_token_secret
JWT_EXPIRES_IN=15m
```

## Running Locally

Install dependencies:

```bash
npm install
```

Start MongoDB locally, then run:

```bash
npm run dev
```

The API will run on:

```txt
http://localhost:5000
```

## Running with Docker

Start the API and MongoDB containers:

```bash
docker-compose up --build
```

The API will be available at:

```txt
http://localhost:${HOST_PORT}
```

Example:

```txt
http://localhost:5050
```

## API Endpoints

All authentication routes are prefixed with:

```txt
/api/auth
```

| Method | Endpoint             | Description                                                | Access  |
| ------ | -------------------- | ---------------------------------------------------------- | ------- |
| POST   | `/api/auth/register` | Register a new user                                        | Public  |
| POST   | `/api/auth/login`    | Login and receive an access token                          | Public  |
| POST   | `/api/auth/refresh`  | Generate a new access token using the refresh-token cookie | Public  |
| POST   | `/api/auth/logout`   | Clear the refresh-token cookie and end the session         | Public  |
| GET    | `/api/auth/profile`  | Get the authenticated user's profile                       | Private |

## Example Requests

### Register

```http
POST /api/auth/register
Content-Type: application/json
```

```json
{
  "name": "Example User",
  "email": "user@example.com",
  "password": "password123"
}
```

### Login

```http
POST /api/auth/login
Content-Type: application/json
```

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Successful login returns an access token and sets a refresh token in an HTTP-only cookie.

```json
{
  "accessToken": "jwt_access_token"
}
```

### Get Profile

```http
GET /api/auth/profile
Authorization: Bearer <access_token>
```

## Security Features

- Passwords are hashed before being stored in MongoDB.
- Refresh tokens are stored in HTTP-only cookies.
- Access tokens are short-lived.
- Login attempts are rate-limited.
- Protected routes require a valid Bearer token.

## Future Improvements

- Store hashed refresh tokens instead of raw refresh tokens.
- Add multi-device session management.
- Add request validation with Zod or express-validator.
- Add automated tests for authentication routes.
- Restrict CORS using an environment-based client URL.
- Add production-ready Docker configuration.
