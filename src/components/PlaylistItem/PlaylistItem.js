import React, { useState } from 'react';
import './PlaylistItem.css';
import SongPreviewButton from '../SongPreviewButton/SongPreviewButton';

const PlaylistItem = ({song, removeFromPlaylist, playlist, style}) => {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleClick = () => {
    setIsRemoving(true); // Trigger the removal animation
    setTimeout(() => removeFromPlaylist(playlist.indexOf(song)), 200); // Remove the song after the animation
  };
  
  return (
    <div className={`added-card ${isRemoving ? 'removing' : (isRemoving === false ? 'adding' : '')}`} style={style}>
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
