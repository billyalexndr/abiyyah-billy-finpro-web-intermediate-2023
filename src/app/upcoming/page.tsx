"use client";
import React, { useState, useEffect } from "react";
import CardMovie from "@/components/CardMovie";
import Loading from "@/components/Loading";
import Error from "@/components/Error";

interface Movie {
  id: number;
  title: string;
  vote_average: string;
  poster_path: string;
  path: string;
  idMovie: string;
}

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
        { next: { revalidate: 3600 } }
      );
      const data = await response.json();
      setMovies(data.results);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div>
      <div className="mt-10 bg-slate-900 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 p-10">
        {movies.map((movie) => (
          <CardMovie
            key={movie.id}
            title={movie.title}
            rating={`${parseFloat(movie.vote_average).toFixed(2)}`}
            imageUrl={`${process.env.NEXT_PUBLIC_URL_POSTER}${movie.poster_path}`}
            path="upcoming"
            idMovie={movie.id}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
