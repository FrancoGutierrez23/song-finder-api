import React from "react";
import './PhoneNavBttn.css';

const PhoneNavBttn = () => {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="nav-bttns-container">
      <button
        className="search-section-bttn"
        onClick={() => scrollToSection('search-section')}
      >
      </button>
      <button
        className="playlist-section-bttn"
        onClick={() => scrollToSection('playlist-section')}
      >
      </button>
    </div>
  );
};

export default PhoneNavBttn;
