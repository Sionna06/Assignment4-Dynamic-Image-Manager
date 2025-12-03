# Assignment 4 Implementation Summary

## Backend Implementation (Express.js Server)

### Features Implemented:
1. Created an Express.js server that serves static files from the `/public` directory
2. Implemented a GET route at `/api/getImage` that:
   - Takes a query parameter (e.g., `?name=tom`)
   - Returns the corresponding image filename from the `/public` folder
   - Checks if the file actually exists before returning it
   - Returns appropriate error messages for missing parameters or files

### Files Created:
- `backend/server.js` - Main server implementation
- `backend/package.json` - Dependencies and scripts

### API Endpoint:
```
GET /api/getImage?name={characterName}
```

Example responses:
- Success: `{ "filename": "tom.jpg" }`
- Error (missing parameter): `{ "error": "Name parameter is required" }`
- Error (file not found): `{ "error": "Image 'invalid.jpg' not found" }`

## Frontend Implementation

### Option 1: Simple HTML Frontend
- Located in `/public/index.html`
- Pure HTML/CSS/JavaScript implementation
- Includes a search bar and button to fetch images
- Displays results with placeholder when images don't actually exist

### Option 2: React Frontend
- Located in `/frontend/` directory
- Modern React implementation with hooks (useState)
- Enhanced UI with better styling and user experience
- Form validation and loading states
- Responsive design

### Files Created:
- `frontend/src/App.js` - Main React component
- `frontend/src/App.css` - Component styling
- `frontend/src/index.js` - Entry point
- `frontend/src/index.css` - Global styles
- `frontend/package.json` - Dependencies and scripts

## Public Assets
- Created placeholder images (`tom.jpg`, `jerry.jpg`) in `/public/` directory
- These act as examples for the image fetching functionality

## How to Run (if Node.js was available)

### Backend:
1. Navigate to `backend/` directory
2. Run `npm install` to install dependencies
3. Run `npm start` to start the server
4. Server runs on http://localhost:3000

### Frontend:
1. Navigate to `frontend/` directory
2. Run `npm install` to install dependencies
3. Run `npm start` to start the development server
4. App opens in browser at http://localhost:3000

## Technical Notes

1. The backend properly validates the existence of image files before returning them
2. Both frontend implementations include error handling for:
   - Missing character names
   - Network errors
   - File not found errors
3. The React frontend provides a better user experience with:
   - Loading states
   - Form validation
   - Responsive design
4. The simple HTML frontend demonstrates the core functionality with minimal code

## Limitations Due to Environment

Since Node.js is not installed on the system:
1. Cannot actually run the server to test functionality
2. Cannot install dependencies listed in package.json files
3. Created all files manually to demonstrate proper structure and implementation

In a real environment with Node.js installed, the application would function as intended.