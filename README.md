# My App

This repository contains a full-stack application with a Node.js backend and a React frontend.

## Project Structure

### Backend (`my-app`)

The backend of the application is built with Node.js. The structure is as follows:

- `models/`: Contains database models.
- `routes/`: Contains route handlers.
  - `users.js`: Manages user-related routes.
- `package-lock.json` & `package.json`: Manage Node.js dependencies.
- `server.js`: The main server file.

### Frontend (`my-frontend`)

The frontend of the application is built with React. The structure is as follows:

- `node_modules/`: Contains npm dependencies.
- `public/`: Contains static files.
- `src/`: Contains the source code.
  - `components/`: Contains React components.
    - `ContactDetailsForm.js`: Form for contact details.
    - `GeneralInfoForm.js`: Form for general information.
    - `UsersList.js`: Displays a list of users.
  - `App.css`: Styles for the App component.
  - `App.js`: Main App component.
  - `App.test.js`: Tests for the App component.
  - `index.css`: Global styles.
  - `index.js`: Entry point of the React application.
  - `logo.svg`: Logo image.
  - `reportWebVitals.js`: Measures performance metrics.
  - `setupTests.js`: Configures testing environment.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/my-app.git
   cd my-app
   ```
