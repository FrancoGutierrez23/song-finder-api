import React, { useState, useMemo } from 'react';
import './VolumeControl.css';
import { Range, getTrackBackground } from 'react-range';
import { RiVolumeMuteFill, RiVolumeDownFill, RiVolumeUpFill } from "react-icons/ri";

const VolumeControl = () => {
  const [volume, setVolume] = useState(0.5);

  const handleVolumeChange = (values) => {
    const newVolume = values[0] / 100;
    setVolume(newVolume);
    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach(audio => {
      audio.volume = newVolume;
    });
  };

  const volumeIcon = useMemo(() => {
    if (volume === 0) {
      return <RiVolumeMuteFill />;
    } else if (volume > 0.5) {
      return <RiVolumeUpFill />;
    } else {
      return <RiVolumeDownFill />;
    }
  }, [volume]);

  return (
    <div className='volume-control-container'>
      <Range
        values={[volume * 100]}
        step={1}
        min={0}
        max={100}
        onChange={handleVolumeChange}
        renderTrack={({ props, children }) => {
          // Extract key from props
          const { key, ...restProps } = props;
          return (
            <div
              key={key} // Apply key directly here
              {...restProps}
              style={{
                ...restProps.style,
                height: '8px',
                width: '100%',
                background: getTrackBackground({
                  values: [volume * 100],
                  colors: ['#fea500', '#b7cfd5'],
                  min: 0,
                  max: 100
                })
              }}
              className="track"
            >
              {children}
            </div>
          );
        }}
        renderThumb={({ props }) => {
          // Extract key from props
          const { key, ...restProps } = props;
          return (
            <div
              key={key} // Apply key directly here
              {...restProps}
              className="thumb"
            >
              {volumeIcon}
            </div>
          );
        }}
      />
    </div>
  );
};

export default VolumeControl;

