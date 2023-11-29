"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CardMovie from "@/components/CardMovie";

interface Movie {
    id: number;
    title: string;
    release_date: string;
    poster_path: string;
    path: string;
    idMovie: string;
}

const MovieList: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        getMovies();
    }, []);

    const getMovies = async () => {
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
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
                        imageUrl={`${process.env.NEXT_PUBLIC_URL_POSTER}${movie.poster_path}`}
                        path="popular"
                        idMovie={movie.id}
                    />
                ))}
            </div>
        </div>
    );
};

export default MovieList;
