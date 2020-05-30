import React from "react";
import "./LikeCount.css";

const LikeCount = (props) => {
  const handleButtonClick = (event) => {
    if (event.target.name === "incrementLike") {
      props.handleLikeIncrement(props.id);
    } else if (event.target.name === "decrementLike") {
      props.handleLikeDecrement(props.id);
    }
  };

  return (
    <div className="LikeCount">
      <button
        onClick={handleButtonClick}
        name="decrementLike"
        className="LikeCount-button"
      >
        -
      </button>
      <div className="LikeCount-count-container">
        <p className="LikeCount-count-value">{props.likes}</p>
      </div>
      <button
        onClick={handleButtonClick}
        name="incrementLike"
        className="LikeCount-button"
      >
        +
      </button>
    </div>
  );
};

export default LikeCount;
