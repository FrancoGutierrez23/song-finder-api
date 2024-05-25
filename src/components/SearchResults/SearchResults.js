import React, { useState, useRef, useEffect } from 'react';
import './SearchResults.css';
import SongPreviewButton from '../SongPreviewButton/SongPreviewButton';

// Component to render each search result item
const SearchResultItem = ({ result, addToPlaylist }) => {
  const [showAddButton, setShowAddButton] = useState(false); // State to toggle add button visibility
  const addButtonRef = useRef(null); // Ref for the add button
  const optionsButtonRef = useRef(null); // Ref for the options button

  // Function to handle adding a song to the playlist
  const handleAddToPlaylist = () => {
    addToPlaylist(result);
    setShowAddButton(false);  // Hide the button after adding the song to the playlist
  };

  // Function to toggle the visibility of the add button
  const handleToggleAddButton = () => {
    setShowAddButton((prevShowAddButton) => !prevShowAddButton);
  };

  // Effect to handle clicks outside of the add button to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        addButtonRef.current &&
        !addButtonRef.current.contains(event.target) &&
        !optionsButtonRef.current.contains(event.target)
      ) {
        setShowAddButton(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // JSX for the add button
  const addButton = (
    <button
      ref={addButtonRef}
      onClick={handleAddToPlaylist}
      className='add'
      style={{ display: showAddButton ? 'flex' : 'none' }}
    >
      {result.artist.toggle >= 0 ? (
        <div style={{ display: 'flex', width: '100%'}}>
          <span className='add-again add-option-text'><span>+</span> <span>Add to playlist again</span></span>
        </div>
      ) : (
        <p className='add-option-text'><span>+</span><span style={{paddingRight: 15}}>Add to playlist</span></p>
      )}
    </button>
  );

  // Function to format time from seconds to MM:SS format
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  // JSX for rendering each search result item
  return (
    <div className='result-card'>
      <div className='headings'>
        <h3>{result.title}<p className='duration'> {formatTime(result.duration)}</p></h3>
        <div className='cont'>{`${result.artist.name} at ${result.album.title}`}</div>
      </div>
      <div className='card-bttns'>
        <SongPreviewButton previewUrl={result.preview} />
        <button ref={optionsButtonRef} onClick={handleToggleAddButton} id='options'>⋮</button>
        {addButton}
      </div>
    </div>
  );
};

// Component to render the list of search results
const SearchResults = ({ results, addToPlaylist }) => {
  return (
    <div className='results-cards-container'>
      {results.map((result) => (
        <SearchResultItem key={result.id} result={result} addToPlaylist={addToPlaylist} />
      ))}
    </div>
  );
};

export default SearchResults;
