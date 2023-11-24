"use client";
import React, { useState, useEffect } from "react";

const MovieList = () => {
    const [movies, setMovies] = useState([]);

    const fetchMovies = async () => {
        try {
            const response = await fetch(
                "https://api.themoviedb.org/3/discover/movie?api_key=e64500ed35aa80d6aa47b51eaca63cbf"
            );
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    return (
        <div>
            <h1>Daftar Film</h1>
            <div className="movies-container">
                {/* {movies.map((movie) => (
                    <div key={movie.imdbID} className="movie-card">
                        <h2>{movie.Title}</h2>
                        <p>Year: {movie.Year}</p>
                        <img src={movie.Poster} alt={movie.Title} />
                    </div>
                ))} */}
            </div>
        </div>
    );
};

export default MovieList;
