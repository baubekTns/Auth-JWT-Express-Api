# Auth-JWT-Express-Api

# Authentication API

## Overview

This is a Node.js authentication API that includes user registration, login, JWT-based authentication, and refresh token handling. It uses MongoDB for storage and is containerized using Docker.

## Features

- User authentication with **JWT access & refresh tokens**
- Secure password hashing with **bcrypt**
- Token storage in **HTTP-only cookies**
- User session management with **refresh tokens**
- Logout functionality
- Dockerized setup with **Docker Compose**

## Technologies Used

- Node.js / Express.js
- MongoDB / Mongoose
- JSON Web Tokens (JWT)
- bcrypt
- dotenv
- Cookie-based authentication
- Docker & Docker Compose

## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (latest LTS version recommended)
- **MongoDB** (if running locally)
- **Docker & Docker Compose** (for containerized setup)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/baubekTns/Auth-JWT-Express-Api.git
   cd Auth-JWT-Express-Api
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the project root with these variables:
   ```sh (Suggested ports)
   PORT=5000
   HOST_PORT=5050
   DB_PORT=27017
   HOST_DB_PORT=27017
   MONGO_URI=your_mongodb_uri
   NODE_ENV=development
   JWT_SECRET=your_jwt_secret
   REFRESH_SECRET=your_refresh_secret
   ```

### Running Locally

1. Start MongoDB (if not using Docker):
   ```sh
   mongod --dbpath ./data
   ```
2. Start the server:
   ```sh
   npm run dev
   ```

### Running with Docker

1. Ensure Docker is installed and running.
2. Start the services:
   ```sh
   docker-compose up --build
   ```
3. The API should be available at `http://localhost:${HOST_PORT}`

## API Endpoints

### **Authentication Routes**

| Method | Endpoint    | Description         |
| ------ | ----------- | ------------------- |
| POST   | `/register` | Register a new user |
| POST   | `/login`    | Authenticate a user |
| POST   | `/refresh`  | Refresh JWT token   |
| POST   | `/logout`   | Log out user        |
| GET    | `/profile`  | Get user profile    |
