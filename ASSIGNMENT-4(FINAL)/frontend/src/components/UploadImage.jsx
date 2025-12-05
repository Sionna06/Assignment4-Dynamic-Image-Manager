import React, { useState } from 'react';

const UploadImage = () => {
  const [characterName, setCharacterName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const onFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setMessage('');
  };

  const uploadImage = async (e) => {
    e.preventDefault();
    
    if (!characterName.trim()) {
      setMessage('Please enter a character name');
      setIsSuccess(false);
      return;
    }
    
    if (!selectedFile) {
      setMessage('Please select an image file');
      setIsSuccess(false);
      return;
    }
    
    // Validate file type
    if (!selectedFile.type.startsWith('image/')) {
      setMessage('Please select a valid image file');
      setIsSuccess(false);
      return;
    }
    
    setUploading(true);
    setMessage('');
    
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      
      const response = await fetch(`http://localhost:5000/api/upload?name=${encodeURIComponent(characterName)}`, {
        method: 'POST',
        body: formData,
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setMessage('Image uploaded successfully!');
        setIsSuccess(true);
        setCharacterName('');
        setSelectedFile(null);
        e.target.reset();
      } else {
        setMessage(result.error || 'Upload failed');
        setIsSuccess(false);
      }
    } catch (err) {
      setMessage('Error uploading image: ' + err.message);
      setIsSuccess(false);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <form onSubmit={uploadImage}>
        <div className="form-group">
          <label htmlFor="uploadCharacterName">Character Name:</label>
          <input
            type="text"
            id="uploadCharacterName"
            value={characterName}
            onChange={(e) => setCharacterName(e.target.value)}
            placeholder="Enter character name (e.g., tom, jerry)"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="imageFile">Select Image:</label>
          <input
            type="file"
            id="imageFile"
            accept="image/*"
            onChange={onFileChange}
          />
        </div>
        
        <button type="submit" disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload Image'}
        </button>
      </form>
      
      {message && (
        <div className={`message ${isSuccess ? 'success' : 'error'}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default UploadImage;