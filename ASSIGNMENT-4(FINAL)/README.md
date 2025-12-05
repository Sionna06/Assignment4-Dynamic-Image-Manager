# Image Manager

Image management application with Node.js/Express backend and React frontend.

## Features

- Search images by name
- Upload images with custom names
- File overwriting
- Real-time preview
- Responsive design

## Project Structure

```
project/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── public/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── SearchImage.jsx
│   │   │   └── UploadImage.jsx
│   │   ├── App.jsx
│   │   └── index.js
│   └── package.json
└── ImageManager.html
```

## Backend

### Endpoints

1. `GET /api/getImage?name={character}` - Get image by name
2. `POST /api/upload?name={character}` - Upload image

### Technologies

- Node.js + Express.js
- Multer for file uploads
- CORS

## Frontend

### Components

1. `SearchImage.jsx` - Search and display images
2. `UploadImage.jsx` - Upload images

## Running the Application

### Backend

```bash
cd backend
npm install
npm start
```

Server runs at `http://localhost:5000`

### Frontend

```bash
cd frontend
npm install
npm start
```

Frontend runs at `http://localhost:3000`

## Standalone Version

Double-click `ImageManager.html` to run without a server.
Images are stored in browser localStorage.