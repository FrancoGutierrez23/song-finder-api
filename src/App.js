import React, {useState} from 'react';
import './App.css';
import Search from './components/Search/Search';
import Playlist from './components/Playlist/Playlist';
import VolumeControl from './components/VolumeControl/VolumeControl';
import PhoneNavBttn from './components/PhoneNavBttn/PhoneNavBttn';


function App() {
  const [playlist, setPlaylist] = useState([]);

  const addToPlaylist = (song) => {
    const uniqueSong = { ...song, id: `${song.id}-${Date.now()}`, isRemoving: false };
    setPlaylist(prevPlaylist => [...prevPlaylist, uniqueSong]);
  };

  const removeFromPlaylist = (index) => {
    setPlaylist(prevPlaylist => {
      const newPlaylist = [...prevPlaylist];
      newPlaylist[index].isRemoving = true; // Set isRemoving before actual removal
      setTimeout(() => {
        newPlaylist.splice(index, 1);
        setPlaylist(newPlaylist); // Update state after animation
      }, 500); // Match timeout to animation duration
      return [...newPlaylist]; // Return updated playlist immediately
    });
  };



  return (
    <div className="App" >
      <Search addToPlaylist={addToPlaylist} playlist={playlist} />
      <Playlist playlist={playlist} removeFromPlaylist={removeFromPlaylist} />
      <VolumeControl />
      <PhoneNavBttn />
    </div>
  );
}

export default App;
