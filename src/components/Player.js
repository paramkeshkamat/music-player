import React, { useState, useEffect, useRef } from "react";
import Details from "./Details";
import Controls from "./Controls";

const Player = ({ songs, currentSongIndex, setCurrentSongIndex, nextSongIndex }) => {
  const audioElement = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      audioElement.current.play();
    } else {
      audioElement.current.pause();
    }
  });

  const skipSong = (forwards = true) => {
    if (forwards) {
      setCurrentSongIndex(() => {
        if (currentSongIndex + 1 > songs.length - 1) {
          return 0;
        } else {
          return currentSongIndex + 1;
        }
      });
    } else {
      setCurrentSongIndex(() => {
        if (currentSongIndex - 1 < 0) {
          return songs.length - 1;
        } else {
          return currentSongIndex - 1;
        }
      });
    }
  };

  return (
    <div className="Player">
      <audio src={songs[currentSongIndex].audio_src} ref={audioElement}></audio>
      <h4>Playing Now</h4>
      <Details song={songs[currentSongIndex]} />
      <Controls isPlaying={isPlaying} setIsPlaying={setIsPlaying} skipSong={skipSong} />
      <p> Next up: {songs[nextSongIndex].title} by {songs[nextSongIndex].artist}</p>
    </div>
  );
};

export default Player;
