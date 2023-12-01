import React, { useState, useEffect } from "react";
import CardMovie from "@/components/CardMovie";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import Head from "next/head";

interface Movie {
    id: number;
    title: string;
    release_date: string;
    poster_path: string;
    path: string;
    idMovie: number;
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
                `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
                { next: { revalidate: 3600 } }
            );
            const data = await response.json();
            setMovies(data.results);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setError(true);
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
            <Head>
                <title>BbMovie</title>
                <meta
                    name="description"
                    content="Daftar FILM dengan Menggunakan TMDB API"
                />
            </Head>
            <div className="bg-slate-900 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 p-6">
                {movies.map((movie) => (
                    <CardMovie
                        key={movie.id}
                        title={movie.title}
                        description={`Release Date: ${movie.release_date}`}
                        imageUrl={`${process.env.NEXT_PUBLIC_URL_POSTER}${movie.poster_path}`}
                        path="/"
                        idMovie={movie.id}
                    />
                ))}
            </div>
        </div>
    );
};

export default MovieList;
