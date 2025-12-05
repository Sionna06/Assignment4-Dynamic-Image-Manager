const express = require ('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// App configuration
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static file serving
app.use('/public', express.static(path.join(__dirname, 'public')));

// Create public directory if it doesn't exist
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// File upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/');
  },
  filename: (req, file, cb) => {
    const name = req.query.name;
    if (!name) {
      return cb(new Error('Name parameter is required'));
    }
    
    // Preserve file extension
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${name}${ext}`);
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// API endpoint for getting images
app.get('/api/getImage', (req, res) => {
  const name = req.query.name;
  
  if (!name) {
    return res.status(400).json({ error: 'Name parameter is required' });
  }
  
  // Check for image with various extensions
  const extensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
  let found = false;
  
  for (const ext of extensions) {
    const fileName = `${name}${ext}`;
    const filePath = path.join(__dirname, 'public', fileName);
    
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
      found = true;
      break;
    }
  }
  
  if (!found) {
    res.status(404).json({ error: 'Image not found' });
  }
});

// API endpoint for uploading images
app.post('/api/upload', upload.single('image'), (req, res) => {
  const name = req.query.name;
  
  if (!name) {
    return res.status(400).json({ error: 'Name parameter is required' });
  }
  
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  res.json({ 
    success: true, 
    message: 'Image uploaded successfully',
    fileName: req.file.filename
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});