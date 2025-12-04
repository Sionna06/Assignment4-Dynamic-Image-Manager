import React, { useState } from 'react';
import './App.css';

function App() {
  const [characterName, setCharacterName] = useState('');
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // State for upload functionality
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const fetchImage = async () => {
    if (!characterName.trim()) {
      setError('Please enter a character name');
      return;
    }

    setLoading(true);
    setError('');
    setImageData(null);

    try {
      const response = await fetch(`/api/getImage?name=${encodeURIComponent(characterName.trim())}`);
      const data = await response.json();

      if (response.ok) {
        setImageData(data);
      } else {
        setError(data.error || 'Failed to fetch image');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    
    if (!selectedFile) {
      setUploadStatus('Please select a file to upload');
      return;
    }
    
    if (!characterName.trim()) {
      setUploadStatus('Please enter a character name');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      setUploadStatus('Uploading...');
      
      const response = await fetch(`/api/upload?name=${encodeURIComponent(characterName.trim())}`, {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setUploadStatus(`Upload successful: ${data.filename}`);
        setSelectedFile(null);
        // Clear any previous image data to encourage re-fetch
        setImageData(null);
      } else {
        setUploadStatus(`Upload failed: ${data.error}`);
      }
    } catch (err) {
      setUploadStatus(`Upload error: ${err.message}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchImage();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Character Image Fetcher</h1>
        
        {/* Upload Section */}
        <div className="upload-section">
          <h2>Upload Character Image</h2>
          <form onSubmit={handleFileUpload} className="upload-form">
            <div className="input-group">
              <input
                type="text"
                value={characterName}
                onChange={(e) => setCharacterName(e.target.value)}
                placeholder="Enter character name (e.g., tom, jerry)"
                className="name-input"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setSelectedFile(e.target.files[0])}
                className="file-input"
              />
              <button 
                type="submit" 
                className="upload-button"
              >
                Upload Image
              </button>
            </div>
          </form>
          {uploadStatus && <div className="upload-status">{uploadStatus}</div>}
        </div>
        
        {/* Search Section */}
        <div className="search-section">
          <h2>Find Character Image</h2>
          <form onSubmit={handleSubmit} className="search-form">
            <div className="input-group">
              <input
                type="text"
                value={characterName}
                onChange={(e) => setCharacterName(e.target.value)}
                placeholder="Enter character name (e.g., tom, jerry)"
                className="search-input"
              />
              <button 
                type="submit" 
                disabled={loading}
                className="search-button"
              >
                {loading ? 'Fetching...' : 'Fetch Image'}
              </button>
            </div>
          </form>
        </div>

        {error && <div className="error-message">{error}</div>}
        
        {imageData && (
          <div className="result-container">
            <p>Found image: {imageData.filename}</p>
            <div className="image-display">
              {/* In a real implementation, we would display the actual image */}
              {/* For demonstration purposes, we're showing a placeholder */}
              <img 
                src={`/${imageData.filename}`} 
                alt={characterName}
                onError={(e) => {
                  // If image fails to load, show placeholder
                  e.target.style.display = 'none';
                  document.getElementById('placeholder-text').style.display = 'block';
                }}
              />
              <div id="placeholder-text" className="placeholder-text" style={{display: 'none'}}>
                <p>Image would be displayed here in a real implementation:</p>
                <div className="placeholder-box">
                  <p>[{imageData.filename}]</p>
                  <p><em>(Placeholder for image: {imageData.filename})</em></p>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;