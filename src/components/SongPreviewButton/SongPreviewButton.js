import React, { useState, useRef, useEffect } from 'react';
import './SongPreviewButton.css';

const SongPreviewButton = ({ previewUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const audioElement = audioRef.current;

    const handleEnded = () => {
      setIsPlaying(false); // Reset button state to play when preview ends
    };

    audioElement.addEventListener('ended', handleEnded);

    return () => {
      audioElement.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <div className='sepcial'>
      <audio ref={audioRef} src={previewUrl} />
      <button onClick={togglePlay} className='play-pause'>
        {isPlaying ? '⏸' : '⏵'}
      </button>
    </div>
  );
};

export default SongPreviewButton;
