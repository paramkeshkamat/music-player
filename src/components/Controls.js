import React from "react";
import { AiFillPlayCircle, AiFillPauseCircle, AiFillBackward, AiFillForward } from "react-icons/ai";
import "../styles/Controls.css";

const Controls = ({ isPlaying, setIsPlaying, skipSong }) => {
  return (
    <div className="Controls">
      <button className="btn skip-btn" onClick={() => skipSong(false)}>
        <AiFillBackward />
      </button>
      <button className="btn play-btn" onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? <AiFillPauseCircle /> : <AiFillPlayCircle />}
      </button>
      <button className="btn skip-btn" onClick={() => skipSong(true)}>
        <AiFillForward />
      </button>
    </div>
  );
};

export default Controls;
