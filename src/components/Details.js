import React from "react";

const Details = ({ song }) => {
  return (
    <div className="Details">
      <div className="image-container">
        <img src={song.img_src} alt={song.title} />
      </div>
      <h2 className="title">{song.title}</h2>
      <h3 className="artist">{song.artist}</h3>
    </div>
  );
};

export default Details;
