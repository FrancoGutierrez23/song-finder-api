import React from 'react';
import Slide from '../Slide/Slide';
import './SearchResults.css';
import SongPreviewButton from '../SongPreviewButton/SongPreviewButton';

const SearchResultItem = ({ result, addToPlaylist, playlist}) => {
  // Function to handle adding the song to the playlist
    const handleAddToPlaylist = () => {
        addToPlaylist(result);
    };


  return (
    <div className='result-card'>
      <div className='headings' >
        <h3>{result.title}</h3>
        <div className='cont'><Slide text={`${result.artist.name} at ${result.album.title}`} /></div>
      </div>
      {/* Add button to add the song to the playlist */}
      <SongPreviewButton previewUrl={result.preview} />
      <button onClick={handleAddToPlaylist} className='add' >{result.artist.toggle >= 0 ? <p style={{display: 'flex'}}>+ <span style={{fontSize: 10, display: 'flex', margin: 0}}>{result.artist.toggle + 1}</span></p> : '+'}</button>
    </div>
  );
};

const SearchResults = ({ results, addToPlaylist}) => {
  return (
    <div className='results-cards-container'>
      {results.map((result) => (
        <SearchResultItem key={result.id} result={result} addToPlaylist={addToPlaylist} />
      ))}
    </div>
  );
};

export default SearchResults;


