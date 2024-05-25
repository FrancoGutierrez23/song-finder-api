import React from "react";
import './PhoneNavBttn.css';

const PhoneNavBttn = () => {

  //Handle navegation between sections
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      setTimeout(() => {
        section.scrollIntoView({ behavior: 'smooth' });
      }, 100); // Adjust the timeout as necessary
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
