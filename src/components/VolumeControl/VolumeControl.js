import React, { useState } from 'react';
import './VolumeControl.css';

const VolumeControl = () => {
  const [volume, setVolume] = useState(0.5); // Initial volume value

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    // Update volume of all audio elements
    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach((audio) => {
      audio.volume = newVolume;
    });
  };

  return (
    <div className='volume-control-container'>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
      />
    </div>
  );
};

export default VolumeControl;
