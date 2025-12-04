const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const app = express();
const PORT = 3000;

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public'));
  },
  filename: function (req, file, cb) {
    // Get the character name from query parameter
    const characterName = req.query.name || 'unnamed';
    // Use the original file extension or default to .jpg
    const ext = path.extname(file.originalname) || '.jpg';
    cb(null, `${characterName}${ext}`);
  }
});

const upload = multer({ storage: storage });

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

// Middleware to parse JSON bodies
app.use(express.json());

// GET route to return image filename based on query parameter
app.get('/api/getImage', (req, res) => {
  const imageName = req.query.name;
  
  if (!imageName) {
    return res.status(400).json({ error: 'Name parameter is required' });
  }
  
  // Construct the image filename
  const imageFilename = `${imageName}.jpg`; // Assuming .jpg extension
  
  // Check if the file exists in the public directory
  const imagePath = path.join(__dirname, '../public', imageFilename);
  
  // Check if file exists
  if (fs.existsSync(imagePath)) {
    res.json({ filename: imageFilename });
  } else {
    res.status(404).json({ error: `Image '${imageFilename}' not found` });
  }
});

// POST route for uploading images
app.post('/api/upload', upload.single('image'), (req, res) => {
  // Check if file was uploaded
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  // Get the character name from query parameter
  const characterName = req.query.name;
  
  if (!characterName) {
    // Delete the uploaded file since we can't use it
    fs.unlinkSync(req.file.path);
    return res.status(400).json({ error: 'Name parameter is required' });
  }
  
  // Rename the file to match the character name if needed
  const ext = path.extname(req.file.originalname) || '.jpg';
  const newFilename = `${characterName}${ext}`;
  const newPath = path.join(__dirname, '../public', newFilename);
  
  // If the filename is different, rename the file
  if (req.file.filename !== newFilename) {
    fs.renameSync(req.file.path, newPath);
  }
  
  res.json({ 
    message: 'File uploaded successfully', 
    filename: newFilename 
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});