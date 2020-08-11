import React, { useState } from "react";
import "./App.css";

function App() {
  const [movie, setMovie] = useState("");
  const [movieInfo, setMovieInfo] = useState("");

  function movieName(event) {
    setMovie(event.target.value);
  }

  function search() {
    fetch(
      `https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/${movie}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host":
            "imdb-internet-movie-database-unofficial.p.rapidapi.com",
          "x-rapidapi-key":
            "ENTER KEY",
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        setMovieInfo(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="content">
      <div className="finder">
        <h1 className="finder__title">Movie Finder</h1>
        <img className="finder__icon" src="icon.png" alt="icon of play" />

        <form id="form" className="finder__form">
          <label className="finder__label" htmlFor="fname">
            Enter movie name:
          </label>
          <br />
          <input
            className="finder__input"
            type="text"
            id="fname"
            name="fname"
            value={movie}
            onChange={movieName}
          />
          <br />
          <button onClick={search} id="btn" className="form__btn" type="button">
            Search
          </button>
        </form>
      </div>
      {movieInfo.title && (
        <div id="res" className="res">
          <h1> {movieInfo.title} </h1>
          <p>{movieInfo.plot}</p>
          <img alt="movie poster" src={movieInfo.poster}></img>
        </div>
      )}
      {movieInfo.title === "" && <p>Movie not Found</p>}
    </div>
  );
}

export default App;
