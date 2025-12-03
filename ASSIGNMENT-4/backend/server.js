const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});