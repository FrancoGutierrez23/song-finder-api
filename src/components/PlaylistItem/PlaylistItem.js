import React from 'react';
import './PlaylistItem.css';
import SongPreviewButton from '../SongPreviewButton/SongPreviewButton';

const PlaylistItem = ({song, removeFromPlaylist, playlist}) => {
  // Function to handle removing the song from the playlist
  const handleClick = () =>{
    removeFromPlaylist(playlist.indexOf(song));
    song.artist.toggle -= 1;
  }

  return (
    <div className='added-card'>
      <div className='headings' >
        <h3>{song.title}</h3>
        <div className='cont'>{`${song.artist.name} at ${song.album.title}`}</div>
      </div>
      <div className='card-bttns'>
        <SongPreviewButton previewUrl={song.preview} />
      <button onClick={handleClick} className='remove-btn'>x</button>
      </div>
      
    </div>
  );
};

export default PlaylistItem;