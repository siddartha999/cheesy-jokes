import React from "react";
import Joke from "../Joke/Joke.js";
import LikeCount from "../LikeCount/LikeCount.js";
import Emoji from "../Emoji/Emoji";
import "./JokeList.css";

const JokeList = (props) => {
  const currentJokes = props.jokes;
  const likes = props.likeCounts;

  const handleLikeDecrement = (index) => {
    props.decrementLike(index);
  };

  const handleLikeIncrement = (index) => {
    props.incrementLike(index);
  };

  const jokeRows = [];
  for (let index = 0; index < currentJokes.length; index++) {
    jokeRows.push(
      <div className="JokeList-item" key={index}>
        <LikeCount
          id={index}
          likes={likes[index]}
          handleLikeDecrement={handleLikeDecrement}
          handleLikeIncrement={handleLikeIncrement}
        />
        <Joke id={index} joke={currentJokes[index]} />
        <Emoji mood={likes[index]} />
      </div>
    );
  }

  const noJokes = (
    <div>
      <p>No Jokes to display!</p>
    </div>
  );

  return (
    <div className="JokeList">{currentJokes.length ? jokeRows : noJokes}</div>
  );
};

export default JokeList;
