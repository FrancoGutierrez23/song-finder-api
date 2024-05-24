import React, { useState, useRef, useEffect } from 'react';
import Slide from '../Slide/Slide';
import './SearchResults.css';
import SongPreviewButton from '../SongPreviewButton/SongPreviewButton';

const SearchResultItem = ({ result, addToPlaylist, playlist }) => {
  const [showAddButton, setShowAddButton] = useState(false);
  const addButtonRef = useRef(null);
  const optionsButtonRef = useRef(null);

  const handleAddToPlaylist = () => {
    addToPlaylist(result);
    setShowAddButton(false);  // Hide the button after adding the song to the playlist
  };

  const handleToggleAddButton = () => {
    setShowAddButton((prevShowAddButton) => !prevShowAddButton);
  };

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

  const addButton = (
    <button
      ref={addButtonRef}
      onClick={handleAddToPlaylist}
      className='add'
      style={{ display: showAddButton ? 'flex' : 'none' }}
    >
      {result.artist.toggle >= 0 ? (
        <p style={{ display: 'flex', width: '100%'}}>
          <p className='add-again add-option-text'><p>+</p> <p>Add to playlist again</p></p>
        </p>
      ) : (
        <p className='add-option-text'><p>+</p><p style={{paddingRight: 15}}>Add to playlist</p></p>
      )}
    </button>
  );

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

  return (
    <div className='result-card'>
      <div className='headings'>
        <h3>{result.title}<p className='duration'> {formatTime(result.duration)}</p></h3>
        <div className='cont'><Slide text={`${result.artist.name} at ${result.album.title}`} /></div>
      </div>
      <div className='card-bttns'>
        <SongPreviewButton previewUrl={result.preview} />
        <button ref={optionsButtonRef} onClick={handleToggleAddButton} id='options'>⋮</button>
        {addButton}
      </div>
    </div>
  );
};

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
