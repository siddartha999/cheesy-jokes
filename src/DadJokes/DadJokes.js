import React, { useState } from "react";
import "./DadJokes.css";
import JokeList from "../JokeList/JokeList";
import axios from "axios";

const MAX_JOKES_TO_RETRIEVE = 10;
const URL_FOR_JOKE = `https://icanhazdadjoke.com/`;
const MAX_JOKES_RETRIEVABLE_FROM_SERVER = 90;
const OUT_OF_JOKES_APOLOGY_MSG = `Sorry!Ran out of Jokes!!!`;

const DadJokes = () => {
  let [jokes, updateJokes] = useState([]);
  let [likeCounts, updateLikeCounts] = useState([]);
  let [jokeIds, updateJokeIds] = useState(new Set());
  let [isLoading, updateIsLoading] = useState(false);

  /**
   * Retrieves a single joke from the URl.
   */
  const retrieveSingleJoke = async () => {
    let newJoke, newId;
    const joke = axios.get(URL_FOR_JOKE, {
      headers: {
        Accept: "application/json",
      },
    });

    await joke;

    joke.then((res) => {
      newJoke = res.data.joke;
    });

    return { newId, newJoke };
  };

  /**
   * Retrieves multiple(equal to MAX_JOKES_RETRIEVED) jokes from the URL
   */
  const retrieveMultipleJokes = async () => {
    if (jokeIds.size >= MAX_JOKES_RETRIEVABLE_FROM_SERVER) {
      alert(OUT_OF_JOKES_APOLOGY_MSG);
    }
    const jokesRetrieved = [];
    const newJokes = [...jokes];
    const newJokeIds = new Set([...jokeIds]);
    let retrievedData;
    updateIsLoading(true);

    for (let i = 0; i < MAX_JOKES_TO_RETRIEVE; i++) {
      jokesRetrieved.push(
        axios.get(URL_FOR_JOKE, {
          headers: {
            Accept: "application/json",
          },
        })
      );
    }

    await Promise.all(jokesRetrieved).then((values) => {
      retrievedData = values;
    });

    //Checking for duplicates and jokes without any content
    let duplicateCount = 0;
    let invalidCount = 0;
    for (const val of retrievedData) {
      const jokeId = val.data.id;
      const joke = val.data.joke;
      if (newJokeIds.has(jokeId)) {
        duplicateCount++;
      } else if (!joke.trim()) {
        invalidCount++;
      } else {
        newJokeIds.add(jokeId);
        newJokes.push(joke);
      }
    }

    //Requesting additional jokes based on the defects.
    let totalFaultCount = duplicateCount + invalidCount;
    let maxTries = MAX_JOKES_RETRIEVABLE_FROM_SERVER - newJokeIds.size;
    while (totalFaultCount > 0 && maxTries) {
      const { newJoke, newId } = retrieveSingleJoke();
      if (!newJokeIds.has(newId)) {
        totalFaultCount--;
        newJokeIds.add(newId);
        newJokes.push(newJoke);
      }
      maxTries--;
    }

    const newLikeCounts = [
      ...likeCounts,
      ...new Array(newJokes.length - jokes.length).fill(0),
    ];

    updateJokes(newJokes);
    updateJokeIds(newJokeIds);
    updateLikeCounts(newLikeCounts);
    updateIsLoading(false);

    //Preventing infinite loop of network calls.
    if (!maxTries && duplicateCount > 0) {
      alert(OUT_OF_JOKES_APOLOGY_MSG);
    }
  };

  const decrementLike = (index) => {
    const newLikeCounts = [...likeCounts];
    newLikeCounts[index]--;
    updateLikeCounts(newLikeCounts);
  };

  const incrementLike = (index) => {
    const newLikeCounts = [...likeCounts];
    newLikeCounts[index]++;
    updateLikeCounts(newLikeCounts);
  };

  const loadingSpinnerJSX = (
    <div className="sk-circle">
      <div className="sk-circle1 sk-child"></div>
      <div className="sk-circle2 sk-child"></div>
      <div className="sk-circle3 sk-child"></div>
      <div className="sk-circle4 sk-child"></div>
      <div className="sk-circle5 sk-child"></div>
      <div className="sk-circle6 sk-child"></div>
      <div className="sk-circle7 sk-child"></div>
      <div className="sk-circle8 sk-child"></div>
      <div className="sk-circle9 sk-child"></div>
      <div className="sk-circle10 sk-child"></div>
      <div className="sk-circle11 sk-child"></div>
      <div className="sk-circle12 sk-child"></div>
    </div>
  );

  const dadJokesHeaderJSX = (
    <div className="DadJokes-header-container">
      <div className="DadJokes-title-container">
        <p className="DadJokes-title-first">Dad</p>
        <p className="DadJokes-title-second">Jokes!</p>
        <p className="DadJokes-title-third"> 🤣 </p>
      </div>
      <div className="DadJokes-new-jokes-button-container">
        <button
          onClick={retrieveMultipleJokes}
          className="DadJokes-new-jokes-button"
        >
          New Jokes
        </button>
      </div>
    </div>
  );

  return (
    <div className="DadJokes">
      {dadJokesHeaderJSX}
      <JokeList
        jokes={jokes}
        likeCounts={likeCounts}
        decrementLike={decrementLike}
        incrementLike={incrementLike}
      />
      {isLoading && loadingSpinnerJSX}
    </div>
  );
};

export default DadJokes;
