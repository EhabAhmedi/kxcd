import React from "react";
import "../App.css";

const Comic = ({ comic, handlePreviousComic, handleRandomComic,handleNextComic }) => {
  if (!comic) {
    return <div>Loading...</div>;
  }

  return (
    <div className="comic-container">
      <div className="comic-header">
        <h2 className="comic-title">&ldquo; {comic.title} &rdquo;</h2>
        <p className="comic-author">- by xkcd</p>
      </div>
      <div className="buttons">
        <button className="previous-button" onClick={handlePreviousComic}>
          Previous
        </button>
        <button className="random-button" onClick={handleRandomComic}>
          Random
        </button>
        <button className="next-button" onClick={handleNextComic}>
          Next
        </button>
      </div>
      <div className="comic-image-container">
        <img className="comic-image" src={comic.img} alt={comic.title} />
      </div>
      <div className="comic-date-views">
        <p className="comic-date">
          Date: {comic?.month}/{comic?.day}/{comic?.year}
        </p>
        <p className="comic-views">Views: {comic?.views}</p>
      </div>
      <div className="comic-transcript">&ldquo; {comic.alt} &rdquo;</div>
    </div>
  );
};

export default Comic;
