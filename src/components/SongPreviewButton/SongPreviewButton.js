import React, { useState, useRef, useEffect } from 'react';
import { useAudio } from '../AudioContext/AudioContext'; // Import the context
import './SongPreviewButton.css';
import { FaPlay, FaPause } from "react-icons/fa";
import { CSSTransition } from 'react-transition-group';

const SongPreviewButton = ({ previewUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const buttonRef = useRef(null); // Add this line to create a ref for the button
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
    <div className='special'>
      <audio ref={audioRef} src={previewUrl} />
      <button ref={buttonRef} onClick={togglePlay} className={isPlaying ? 'pause' : 'play'}>
        <CSSTransition
          in={isPlaying}
          timeout={300}
          classNames="fade"
          nodeRef={buttonRef}
        >
          <span className="button-content">
            {isPlaying ? <FaPause /> : <FaPlay />}
          </span>
        </CSSTransition>
      </button>
    </div>
  );
};

export default SongPreviewButton;
