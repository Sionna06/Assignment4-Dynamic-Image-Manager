import React from 'react';
import SearchImage from './components/SearchImage';
import UploadImage from './components/UploadImage';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Image Manager</h1>
      </header>
      <main>
        <section className="search-section">
          <h2>Search Image</h2>
          <SearchImage />
        </section>
        <section className="upload-section">
          <h2>Upload Image</h2>
          <UploadImage />
        </section>
      </main>
    </div>
  );
}

export default App;