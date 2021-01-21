import React, { useState, useEffect, useRef } from "react";
import Details from "./Details";
import Controls from "./Controls";
import "../styles/Player.css";

const Player = ({ songs, currentSongIndex, setCurrentSongIndex, nextSongIndex }) => {
  const audioElement = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    if (isPlaying) {
      audioElement.current.play();
    } else {
      audioElement.current.pause();
    }
  });

  const skipSong = (forwards = true) => {
    setPercentage(0);
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

  const onChange = (e) => {
    const audio = audioElement.current;
    audio.currentTime = (audio.duration / 100) * e.target.value;
    setPercentage(e.target.value);
  }

  const getDuration = (e) => {
    const audio = audioElement.current;
    const percent = ((audio.currentTime / audio.duration) * 100).toFixed(2);
    const time = audio.currentTime;
    setPercentage(percent);
    setCurrentTime(time.toFixed(2));
    if(audio.ended) {
      skipSong(true);
    }
  }

  const secToMin = (time) => {
    let min = parseInt(time / 60);
    if(min < 10) {
      min = `0${min}`;
    }
    time = time % 60;
    let sec = parseInt(time);
    if(sec < 10) {
      sec = `0${sec}`;
    }
    return `${min} : ${sec}`;
  }

  return (
    <div className="Player">
      <h4>Playing Now</h4>
      <Details song={songs[currentSongIndex]} />
      <input 
        type="range" 
        value={percentage} 
        onChange={onChange}
      />
      <div className="slider-duration">
        <p>{secToMin(currentTime)}</p>
        <p>{secToMin(duration)}</p>
      </div>
      <Controls 
        isPlaying={isPlaying} 
        setIsPlaying={setIsPlaying} 
        skipSong={skipSong} 
      />  
      <audio 
        ref={audioElement} 
        onTimeUpdate={getDuration} 
        onLoadedData={(e) => setDuration(e.currentTarget.duration.toFixed(2))}
        src={songs[currentSongIndex].audio_src}
      />
      <p>
        Next up : {songs[nextSongIndex].title} by {songs[nextSongIndex].artist}
      </p>
    </div>
  );
};

export default Player;
