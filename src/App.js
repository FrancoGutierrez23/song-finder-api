import React, {useState} from 'react';
import './App.css';
import Search from './components/Search/Search';
import Playlist from './components/Playlist/Playlist';
import VolumeControl from './components/VolumeControl/VolumeControl';
import PhoneNavBttn from './components/PhoneNavBttn/PhoneNavBttn';


function App() {
  const [playlist, setPlaylist] = useState([]);

  const addToPlaylist = (song) => {
    if(!playlist.includes(song)) {
      setPlaylist([...playlist, song]);
      song.artist.toggle = 0;
    } else {
      song.artist.toggle += 1;
      setPlaylist([...playlist, song])
    }
      
  };

  const removeFromPlaylist = (index) => {
    setPlaylist(prevPlaylist => {
      const newPlaylist = [...prevPlaylist];
      newPlaylist.splice(index, 1);
      return newPlaylist;
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
