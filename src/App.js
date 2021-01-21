import React, { useState, useEffect } from "react";
import Player from "./components/Player";
import data from "./data";

const App = () => {
  // eslint-disable-next-line no-unused-vars
  const [songs, setSongs] = useState(data);
  const [currentSongIndex, setCurrentSongIndex] = useState(Math.floor(Math.random() * data.length));
  const [nextSongIndex, setNextSongIndex] = useState(0);

  useEffect(() => {
    setNextSongIndex(() => {
      if (currentSongIndex + 1 > songs.length - 1) {
        return 0;
      } else {
        return currentSongIndex + 1;
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSongIndex]);

  return (
    <div className="App">
      <Player
        songs={songs}
        currentSongIndex={currentSongIndex}
        setCurrentSongIndex={setCurrentSongIndex}
        nextSongIndex={nextSongIndex}
      />
    </div>
  );
};

export default App;
