import React, { useState, useEffect } from 'react';
import PlaylistItem from '../PlaylistItem/PlaylistItem';
import './Playlist.css';

const Playlist = ({playlist, removeFromPlaylist}) => {
  const [animatingIds, setAnimatingIds] = useState(new Set());

  useEffect(() => {
    if (playlist.length > 0) {
      const newId = playlist[playlist.length - 1].id;
      setAnimatingIds(prev => new Set([...prev, newId]));

      setTimeout(() => {
        setAnimatingIds(prev => new Set([...prev].filter(id => id !== newId)));
      }, 500); // Animation duration
    }
  }, [playlist]);

  return (
    <div className='Playlist' id='playlist-section'>
      <section className="wrap">
        <h2 className="gradient-text">My Playlist</h2>
      </section>
      <div className='added-cards-container'>
      {playlist.map((song, index) => (
        <PlaylistItem 
          key={song.id}
          song={song} 
          removeFromPlaylist={removeFromPlaylist} 
          playlist={playlist}
          className={song.isRemoving ? '' : 'adding'}
        />
      ))}
      </div>
    </div>
  );
};

export default Playlist;

