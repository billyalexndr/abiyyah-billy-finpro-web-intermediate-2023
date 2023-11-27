import React, { useState, useEffect } from "react";
import Image from "next/image";

type TMovie = {
    id: number;
    title: string;
    release_date: string;
    popularity: number;
    vote_average: number;
    overview: string;
    poster_path: string;
};

interface MovieListProps {
    movies: TMovie[];
}

const MovieList: React.FC<MovieListProps> = () => {
    const [movies, setMovies] = useState<TMovie[]>([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
                );
                const data = await response.json();
                setMovies(data.results);
                console.log(data.results);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        fetchMovies();
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 h-auto">
            {movies.map((movie) => (
                <div
                    key={movie.id}
                    className="flex flex-col items-center justify-center left-1/2"
                >
                    <Image
                        src={`${process.env.NEXT_PUBLIC_URL_POSTER}${movie.poster_path}`}
                        alt={movie.title}
                        className="border-black object-cover rounded-lg"
                        width={300}
                        height={100}
                    />
                    <div className="justify-center text-center mt-3 mb-8 bg-transparent">
                        <h2 className="text-lg font-bold">{movie.title}</h2>
                        <p className="text-sm font-bold">
                            {movie.release_date}
                        </p>
                        <p className="text-sm font-normal">
                            Popularity:{" "}
                            <span className="font-bold">
                                {movie.popularity}
                            </span>
                        </p>
                        <p className="text-sm font-normal">
                            Vote Average:{" "}
                            <span className="font-bold mb-5">
                                {movie.vote_average}
                            </span>
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MovieList;
