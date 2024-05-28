import React, { useState, useRef, useEffect } from 'react';
import './PlaylistItem.css';
import SongPreviewButton from '../SongPreviewButton/SongPreviewButton';
import { PiMusicNotesMinusFill } from "react-icons/pi";

const PlaylistItem = ({song, removeFromPlaylist, playlist, style}) => {
  const [isRemoving, setIsRemoving] = useState(false);
  const [showOptions, setShowOptions] = useState(false); // State to control options visibility
  const optionsRef = useRef(null); // Ref for the options container

  const handleClick = () => {
    setIsRemoving(true); // Trigger the removal animation
    setTimeout(() => removeFromPlaylist(playlist.indexOf(song)), 200); // Remove the song after the animation
  };

  const toggleOptions = () => setShowOptions(prev => !prev); // Toggle options visibility

  // Effect to handle clicks outside of the options container
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  return (
    <div className={`added-card ${isRemoving ? 'removing' : ''}`} style={style}>
      <div className='headings' >
      <h3>{song.title}<p className='duration'> {formatTime(song.duration)}</p></h3>
        <div className='cont'>{`${song.artist.name} at ${song.album.title}`}</div>
      </div>
      <div className='card-bttns'>
        <SongPreviewButton previewUrl={song.preview} />
        <button onClick={toggleOptions} className='options-btn'>⋮</button>
        {showOptions && (
          <div ref={optionsRef}>
            <button onClick={handleClick} className='remove-btn'><PiMusicNotesMinusFill style={{fontSize: '1.3em', color: '#7a1717'}} />Remove</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaylistItem;
