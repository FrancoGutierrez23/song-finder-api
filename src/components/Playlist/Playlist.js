import React, { useState} from 'react';
import PlaylistItem from '../PlaylistItem/PlaylistItem';
import './Playlist.css';
import { BiSolidEditAlt } from "react-icons/bi";

const Playlist = ({playlist, removeFromPlaylist}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [playlistName, setPlaylistName] = useState('My Playlist');

  const handleNameChange = (event) => {
    const newName = event.target.value;
    if (newName.length >= 0 && newName.length <= 30) {
      setPlaylistName(newName);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      toggleEdit();
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className='Playlist' id='playlist-section'>
      <section className="playlist-name-section">
        {isEditing ? (
          <input
            id='playlist-name-input'
            type="text"
            value={playlistName}
            onChange={handleNameChange}
            onBlur={toggleEdit}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <h2 className="gradient-text playlist-name" onClick={toggleEdit}>{playlistName}</h2>
        )}
        <button className='edit-playlist-button' onClick={toggleEdit}><BiSolidEditAlt /></button>
      </section>
      <div className='added-cards-container'>
        {playlist.map((song) => (
          <PlaylistItem 
            key={song.id}
            song={song} 
            removeFromPlaylist={removeFromPlaylist} 
            playlist={playlist}
          />
        ))}
      </div>
    </div>
  );
};

export default Playlist;

