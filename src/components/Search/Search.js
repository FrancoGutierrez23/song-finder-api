import React, { useState } from 'react';
import './Search.css';
import SearchResults from '../SearchResults/SearchResults';

const Search = ({ addToPlaylist }) => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  function removeDuplicatesFromArray(arr) {
    const ids = {}; // Object to store encountered ids
    const newArr = []; // New array without duplicates
    
    for (const obj of arr) {
      if (typeof obj === 'object' && 'id' in obj) {
        const id = obj.id;
        
        // Check if id is already encountered
        if (!(id in ids)) {
          ids[id] = true;
          newArr.push(obj);
        }
      } else {
        newArr.push(obj);
      }
    }
    
    return newArr;
  }

  /*Handle search feature*/
  const handleSearch = async () => {
    const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${query}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '21f1e33022msh27f27053f5ade4cp1263f8jsnb356a2564e11',
        'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      const newData = await data.data;
      const revisedData = removeDuplicatesFromArray(newData);
      setSearchResults(revisedData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };


  return (
    <div className='Search' id='search-section'>
      <div ></div>
      <div id='wrapper'>
        <input 
          type="search" 
          id='search'
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          onKeyDown={handleKeyDown}
          placeholder="Search for songs..."
        />
        
      </div>
      {searchResults.length > 0 && (
        <SearchResults results={searchResults} addToPlaylist={addToPlaylist} />
      )}
    </div>
  );
};

export default Search;