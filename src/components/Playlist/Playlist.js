import React from 'react';
import PlaylistItem from '../PlaylistItem/PlaylistItem';
import './Playlist.css';

const Playlist = ({playlist, removeFromPlaylist}) => {

  return (
    <div className='Playlist' id='playlist-section'>
      <h2>My Playlist ({playlist.findLastIndex(song => song !== null) + 1} songs)</h2>
      
      <div className='added-cards-container'>
      {playlist.map((song) => (
        <PlaylistItem key={song.id + Math.floor(Math.random()*1000000)} song={song} removeFromPlaylist={removeFromPlaylist} playlist={playlist} />
      ))}
      </div>
    </div>
  );
};

export default Playlist;

