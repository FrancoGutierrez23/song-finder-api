import React, { useRef, useState, useEffect } from 'react';
import './Slide.css';

function Slide({ text }) {
  const textRef = useRef(null);
  const [textWidth, setTextWidth] = useState(0);
  const [animationDuration, setAnimationDuration] = useState(0);
  const [animationDelay, setAnimationDelay] = useState(0); // 3 seconds delay

  // Measure text width on initial render
  useEffect(() => {
    if (textRef.current) {
      setTextWidth(textRef.current.offsetWidth);
      const textLength = textRef.current.innerText.length;
      // Set duration proportional to the text length
      setAnimationDuration(textLength * 0.25);
    }
  }, [text]);

  // Reset animation when text moves out of view
  const handleAnimationEnd = () => {
    setTextWidth(textRef.current.offsetWidth);
  };

  // Start animation after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationDelay(0);
    }, animationDelay * 1000);

    return () => clearTimeout(timer);
  }, [animationDelay]);

  return (
    <div
      className="slide"
      style={{ width: `${textWidth}px`, animationDuration: `${animationDuration}s`, animationDelay: `${animationDelay}s` }}
      onAnimationIteration={handleAnimationEnd}
    >
      <span ref={textRef}>{text}</span>
    </div>
  );
}

export default Slide;