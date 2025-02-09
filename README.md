# JobQuest

## Overview
JobQuest is a job portal web application that allows users to search for jobs, track applications, and access chatbot-based career assistance. It is built using **Node.js**, **Express.js**, and **MongoDB** for efficient backend management.

## Features
- **User Authentication**: Secure login system using cookies.
- **Job Search & Tracking**: Users can browse job listings and track their applications.
- **Chatbot Integration**: AI-powered chatbot to assist users with job-related queries.
- **Web Scraping**: Uses Puppeteer to extract job data from external sources.
- **Dynamic UI**: Renders pages using EJS templates.

## Technology Stack
- **Frontend**: EJS (Embedded JavaScript Templates), HTML, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose ORM)
- **Middleware**: Cookie-parser for session management
- **Web Scraping**: Puppeteer

## Installation & Setup
### Prerequisites
- **Node.js** and **npm** installed
- **MongoDB** running locally or on a cloud service

### Steps to Run Locally
1. **Clone the Repository**:
   ```sh
   git clone https://github.com/ranveer193/JobQuest1.git
   cd JobQuest
   ```
2. **Install Dependencies**:
   ```sh
   npm install
   ```
3. **Configure Environment Variables**:
   - Create a `.env` file in the root directory.
   - Add the following:
     ```env
     PORT=3000
     DATABASE_URL=mongodb://mongo_user_name/MyProject
     SESSION_SECRET=your_secret_key
     ```
4. **Start the Application**:
   ```sh
   npm start
   ```
   The app will run on `http://localhost:3000`.

## Folder Structure
```
JobQuest1/
├── css/                # Stylesheets
├── middleware/         # Middleware for authentication, logging
├── models/             # Mongoose schemas
├── node_modules/       # Installed dependencies
├── routes/             # Express routes (static, user, chatbot, scraping)
├── services/           # Business logic services
├── views/              # EJS template files
├── connection.js       # MongoDB connection setup
├── index.js            # Main Express server
├── package.json        # Project dependencies
└── README.md           # Project documentation
```

## API Endpoints
| Method | Endpoint      | Description |
|--------|--------------|-------------|
| GET    | `/`          | Home page   |
| GET    | `/user`      | User profile management |
| GET    | `/chatbot`   | AI chatbot integration |
| GET    | `/admin`     | Web scraping management |

## Dependencies
- **Express** (Server framework)
- **Mongoose** (MongoDB ORM)
- **EJS** (Templating engine)
- **Cookie-parser** (Session management)
- **Puppeteer** (Web scraping)

## Contributing
Feel free to fork the repository and submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the ISC License.

## Acknowledgments
- Inspired by various job portals.
- Uses external job data sources via web scraping.

---
🚀 *Happy job hunting with JobQuest!*
