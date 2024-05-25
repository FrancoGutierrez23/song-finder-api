import React, { useRef, useState, useEffect } from 'react';
import './Slide.css';

function Slide({ text }) {
  const slideRef = useRef(null);
  const textRef = useRef(null);
  const [animationDuration, setAnimationDuration] = useState(0);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (textRef.current && slideRef.current) {
      const textWidth = textRef.current.offsetWidth;
      const containerWidth = slideRef.current.offsetWidth;
      // Set duration based on the text width and container width
      setAnimationDuration((textWidth + containerWidth) / 200); // Adjust speed factor as needed
      // Only animate if text is wider than the container
      setShouldAnimate(textWidth > containerWidth);
    }
  }, [text]);

  return (
    <div ref={slideRef} className="slide">
      <span ref={textRef} style={{
        animationDuration: `${shouldAnimate ? animationDuration : 0}s`,
        animationPlayState: shouldAnimate ? 'running' : 'paused'
      }}>
        {text}
      </span>
    </div>
  );
}

export default Slide;