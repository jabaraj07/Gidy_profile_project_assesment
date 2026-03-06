# Gidy Project Assessment

This repository contains the backend (Node.js/Express/MongoDB) and frontend (React) code for the Gidy profile assessment project.

## Tech Stack

- **Backend**: Node.js, Express, MongoDB (mongoose), JWT for authentication, Cloudinary for image storage.
- **Frontend**: React (Create React App), React Router, React Hook Form, Axios.
- **Styling**: plain CSS with responsive layout rules.

## Setup Instructions

### Prerequisites

- Node.js 16+
- npm or yarn
- MongoDB instance (local or Atlas)

### Backend

1. Navigate to the `Backend` directory:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `Backend` folder with the following variables:
   ```text
   PORT=5000
   MONGO_URI=<your mongodb connection string>
   TOKEN_COOKIE_EXPIRES=86400000  # e.g. 1 day in ms
   CLOUDINARY_CLOUD_NAME=<cloud name>
   CLOUDINARY_API_KEY=<api key>
   CLOUDINARY_API_SECRET=<api secret>
   ```
4. Start the server:
   ```bash
   npm run dev
   ```
   The API will be available at `http://localhost:5000/api`.

### Frontend

1. Open a new terminal and go to the React app directory:
   ```bash
   cd FrontEnd/profile-project
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in this folder with at least:
   ```text
   REACT_APP_API_BASE_URL=http://localhost:5000/api
   ```
4. Start the development server:
   ```bash
   npm start
   ```
   The app will open in your browser at `http://localhost:3000`.

### Usage

- Register a new user via `/register` or the signup page.
- Log in to access protected routes.
- Navigate to `/user_profile` to view and edit profile sections (bio, experience, education, skills, certifications, career goals).
- Use the navbar logout button to sign out.

### Notes

- The backend uses an HTTP-only cookie for authentication; the frontend passes `withCredentials: true` on all API calls.
- Profile completion logic lives in `Backend/utils/profileCompletion.js` and is mirrored on the frontend.