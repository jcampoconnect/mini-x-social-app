# Mini Social App

A full-stack social media web application inspired by modern social platforms. 
The application allows users to create accounts, manage profiles, create posts,
interact with other users, and view weather information through an external API.

## Features

### Authentication
- User registration and login
- Email validation
- Password requirements and validation
- User logout
- Session/authentication handling

### Social Features
- Create posts
- View posts from other users
- Delete your own posts
- Like posts
- Follow and unfollow users
- View user profiles
- Search for recent posts by username
- Comment functionality

### Weather Integration
- Displays weather information using an external weather API
- Integrates third-party API data into the application

### Backend
- PHP backend
- MySQL database
- REST API endpoints
- Database-driven user and post interactions

## Technologies

### Frontend
- React
- JavaScript
- React Router
- Vite
- HTML/CSS

### Backend
- PHP
- MySQL
- REST APIs

### External Services
- Weather API

## Application Structure

The application is divided into a React frontend and PHP/MySQL backend.

The React frontend handles the user interface and client-side navigation,
while the PHP backend handles API requests, authentication, database
operations, and social interactions.

## Getting Started

### Prerequisites

- Node.js
- npm
- PHP
- MySQL

### Frontend

Clone the repository:

```bash
git clone https://github.com/jcampoconnect/mini-x-social-app.git
cd mini-x-social-app
```
## Screenshots

### Authentication
![Login](screenshots/login.png)

### Social Feed
![Social Feed](screenshots/feed.png)

### Weather Integration
![Weather](screenshots/weather.png)

## Project Structure

```text
mini-x-social-app/
├── src/
│   ├── components/
│   ├── pages/
│   ├── ...
├── server/
│   ├── ...
├── public/
├── package.json
├── vite.config.js
└── README.md
```

## Author

**Julian Campo**
- GitHub: https://github.com/jcampoconnect
- LinkedIn: https://www.linkedin.com/in/juliancampo/
