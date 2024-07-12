# Job Tracker

> A web application for managing and tracking job applications for job seekers.

## Description

Job Tracker is a comprehensive web application designed to assist job seekers in organizing and monitoring their job application process. It provides a user-friendly interface for managing applications, tracking statuses, and maintaining important details throughout the job search journey.

## Features

- **User Authentication:** Secure signup and login system.
- **Job Application Management:** Add, edit, and delete job applications.
- **Status Tracking:** Keep track of the current status for each job application.
- **Notes Functionality:** Add and update notes for each application.
- **Responsive Design:** Ensures usability on both desktop and mobile devices.

## MVP Enhancements

### Refactoring Functionality
- Created our own database
- Implemented core functionality

### Changes to UI/UX
- Relocated some of the previous features
- Changed color theme

### Creating Test Cases
- Signup Fulfilment
- Account Creation
- User Login/Logout
- Application Form Fulfilment
- Updated Database

## Tech Stack

- **Frontend:**
  - React
  - CSS
- **Backend:**
  - Node.js
  - Express
  - PostgreSQL
- **Authentication:**
  - JSON Web Tokens (JWT)
- **Testing:**
  - React Testing Library
  - Jest
  - Supertest

## Database Schema

```sql
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255) NOT NULL
);

CREATE TABLE Applications (
    id SERIAL PRIMARY KEY,
    company VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    url VARCHAR(255),
    date_applied TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status_id INT,
    contact VARCHAR(255),
    email VARCHAR(255),
    notes TEXT
);

CREATE TABLE Status (
    id SERIAL PRIMARY KEY,
    status VARCHAR(255)
);

CREATE TABLE users_applications (
    user_id INT NOT NULL,
    application_id INT NOT NULL,
    PRIMARY KEY (user_id, application_id),
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (application_id) REFERENCES Applications(id)
);

## Technical Challenges

Implementing comprehensive application testing, including:
* Unit testing with Jest
* Integration testing with React Testing Library
* API testing with Supertest

## Stretch Goals

* Integrate Search Bar & Filtering Feature
* Notifications & Reminders
* Analytics
* Job Board Integration
* Collaborative Features

## Installation and Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up PostgreSQL database and run the schema scripts
4. Configure environment variables
5. Start the server:
`cd server
npm start`
6. Start the client:
`cd client
npm start`

## Usage

1. Sign up for an account or log in
2. Add new job applications using the application form
3. View and manage your applications in the dashboard
4. Update application statuses as you progress through the hiring process
5. Add notes to keep track of important details

## API Documentation

* POST /api/signup: Create a new user account
* POST /api/login: Authenticate a user
* GET /api/applications: Retrieve user's job applications
* POST /api/applications: Add a new job application
* PUT /api/applications/:id: Update an existing application
* DELETE /api/applications/:id: Delete an application

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a pull request

## Development Team

* **Aria Liang** - arialiang8@gmail.com
* **Brian Yang** - jibriyang91@gmail.com
* **Erik Gao** - garvin.gao@gmail.com
* **Mike Bui** - mikeeybui91@gmail.com
* **Mingzhu Wan** - mingzhuwan@gmail.com