import React from "react";
import "./Joke.css";

const Joke = (props) => {
  const joke = props.joke;
  return (
    <div className="Joke">
      <p className="Joke-joke">{joke}</p>
    </div>
  );
};

export default Joke;
