"use client";
import React from "react";
import MovieList from "@/components/MovieList";
// import TrendingMovie from "components/cover";

type TMovie = {
    id: number;
    title: string;
    release_date: string;
    popularity: number;
    vote_average: number;
    overview: string;
    poster_path: string;
};

interface HomeProps {
    movies: TMovie[];
}

const Home = ({ movies }: HomeProps) => {
    return <MovieList movies={movies} />;
};

export default Home;
