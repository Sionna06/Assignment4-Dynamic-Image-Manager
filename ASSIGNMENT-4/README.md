# Assignment 4 - Character Image Fetcher

This project consists of a backend Express.js server and a frontend React application.

## Project Structure

```
assignment-4/
├── backend/
│   ├── server.js       # Express server implementation
│   └── package.json    # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── App.js      # Main React component
│   │   ├── App.css     # Styling for the app
│   │   ├── index.js    # Entry point for React app
│   │   └── index.css   # Global CSS styles
│   └── package.json    # Frontend dependencies
└── public/
    └── index.html      # Simple HTML frontend (alternative to React)
```

## Backend Setup

The backend is an Express.js server that:
1. Serves static files from the `/public` directory
2. Implements a GET route at `/api/getImage` that takes a query parameter (e.g., `?name=tom`) and returns the corresponding image filename
3. Implements a POST route at `/api/upload` that accepts an image file and a character name, then saves the image in the `/public` directory

To run the backend server:
1. Navigate to the `backend` directory
2. Install dependencies: `npm install`
3. Start the server: `npm start`
4. Server will run on http://localhost:3000

## Frontend Options

There are two frontend options available:

### Option 1: Simple HTML Frontend
Located in the `/public` directory, this is a basic HTML/CSS/JavaScript implementation that works directly with the backend.

Access it by visiting http://localhost:3000 after starting the backend server.

### Option 2: React Frontend
Located in the `/frontend` directory, this is a React application with enhanced UI and functionality.

To run the React frontend:
1. Navigate to the `frontend` directory
2. Install dependencies: `npm install`
3. Start the development server: `npm start`
4. The app will open in your browser at http://localhost:3000

Note: For the React frontend to work properly with the backend, you would typically need to configure a proxy or handle CORS. In a production environment, you would build the React app and serve it through the Express server.

## API Endpoints

### GET `/api/getImage?name={characterName}`
- Returns JSON with the filename of the image
- Example response: `{ "filename": "tom.jpg" }`

### POST `/api/upload?name={characterName}`
- Accepts a multipart form data with an image file
- Saves the image in the `/public` directory with the specified character name
- Example response: `{ "message": "File uploaded successfully", "filename": "tom.jpg" }`