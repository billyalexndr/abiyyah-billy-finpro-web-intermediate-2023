"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/discover/movie?api_key=e64500ed35aa80d6aa47b51eaca63cbf"
        );
        setMovies(response.data.results);
        console.log(response.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      } 
  };

  return (
    <div>
      <h1>Daftar Film</h1>
      <div className="movies-container">
        {/* {movies.map((movie) => (
                    <div key={movie.id} className="movie-card">
                        <h2>{movie.Title}</h2>
                        <p>Year: {movie.Year}</p>
                        <img src={movie.Poster} alt={movie.Title} />
                    </div>
                ))} */}
      </div>
    </div>
  );
}

export default MovieList;