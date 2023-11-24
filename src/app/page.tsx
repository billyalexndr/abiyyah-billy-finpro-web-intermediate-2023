import React, { useState, useEffect } from "react";

const MovieList = () => {
    const [movies, setMovies] = useState([]);

    const fetchMovies = async () => {
        try {
            const response = await fetch(
                "https://api.themoviedb.org/3/discover/movie?api_key=e64500ed35aa80d6aa47b51eaca63cbf"
            );
            const data = await response.json();
            setMovies(data.result);
            console.log(data);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    return <></>;
};

export default MovieList;