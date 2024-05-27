import React, { useState, useRef, useEffect } from 'react';
import { useAudio } from '../AudioContext/AudioContext'; // Import the context
import './SongPreviewButton.css';
import { FaPlay, FaPause } from "react-icons/fa";

const SongPreviewButton = ({ previewUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const { setCurrentAudio } = useAudio(); // Use the context

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      setCurrentAudio(audioRef.current);
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const audioElement = audioRef.current;

    const handleEnded = () => {
      setIsPlaying(false); // Reset button state to play when preview ends
    };

    const handlePause = () => {
      setIsPlaying(false); // Reset button state to play when preview is paused
    };

    audioElement.addEventListener('ended', handleEnded);
    audioElement.addEventListener('pause', handlePause);

    return () => {
      audioElement.removeEventListener('ended', handleEnded);
      audioElement.removeEventListener('pause', handlePause);
    };
  }, []);

  return (
    <div className='sepcial'>
      <audio ref={audioRef} src={previewUrl} />
      <button onClick={togglePlay} className={isPlaying ? 'pause' : 'play'}>
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>
    </div>
  );
};

export default SongPreviewButton;
