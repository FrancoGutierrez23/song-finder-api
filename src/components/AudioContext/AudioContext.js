import React, { createContext, useContext, useRef } from 'react';

const AudioContext = createContext();

/*Ensures there are not more than one preview at the time*/
export const AudioProvider = ({ children }) => {
  const audioRef = useRef(null);

  const setCurrentAudio = (audioElement) => {
    if (audioRef.current && audioRef.current !== audioElement) {
      audioRef.current.pause();
    }
    audioRef.current = audioElement;
  };

  return (
    <AudioContext.Provider value={{ setCurrentAudio }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);