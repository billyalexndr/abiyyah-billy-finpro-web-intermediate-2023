"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CardMovie from "@/components/CardMovie";

interface Movie {
    id: number;
    title: string;
    release_date: string;
    poster_path: string;
}

const MovieList: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);

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
        <div className="bg-slate-900 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 p-6">
          {movies.map((movie) => (
            <CardMovie
              key={movie.id}
              title={movie.title}
              description={`Release Date: ${movie.release_date}`}
              imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            />
          ))}
        </div>
      </div>
    );
};

export default MovieList;
