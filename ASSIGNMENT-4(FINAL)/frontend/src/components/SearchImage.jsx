import React, { useState } from 'react';

const SearchImage = () => {
  const [characterName, setCharacterName] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchImage = async (e) => {
    e.preventDefault();
    
    if (!characterName.trim()) {
      setError('Please enter a character name');
      return;
    }
    
    setLoading(true);
    setError('');
    setImageSrc('');
    
    try {
      // Add timestamp to prevent caching
      const timestamp = new Date().getTime();
      const response = await fetch(`http://localhost:5000/api/getImage?name=${encodeURIComponent(characterName)}&t=${timestamp}`);
      
      if (response.ok) {
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setImageSrc(imageUrl);
      } else if (response.status === 404) {
        setError('Image not found');
      } else {
        setError('Failed to fetch image');
      }
    } catch (err) {
      setError('Error fetching image: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={searchImage}>
        <div className="form-group">
          <label htmlFor="characterName">Character Name:</label>
          <input
            type="text"
            id="characterName"
            value={characterName}
            onChange={(e) => setCharacterName(e.target.value)}
            placeholder="Enter character name (e.g., tom, jerry)"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search Image'}
        </button>
      </form>
      
      {error && <div className="message error">{error}</div>}
      
      <div className="image-container">
        {imageSrc && <img src={imageSrc} alt={characterName} />}
      </div>
    </div>
  );
};

export default SearchImage;