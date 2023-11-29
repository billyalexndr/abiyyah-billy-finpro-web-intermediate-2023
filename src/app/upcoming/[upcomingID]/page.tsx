"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import axios from "axios";

interface MovieDetail {
    title: string;
    overview: string;
}

const DetailMovie: React.FC = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [movieDetail, setMovieDetail] = useState<MovieDetail | null>(null);

    useEffect(() => {
        const url = `${pathname}?${searchParams}`;
        const match = url.match(/\/(\d+)\?/);
        const id = match ? match[1] : null;
        console.log(id);
        const fetchMovieDetail = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
                );
                setMovieDetail(response.data);
            } catch (error) {
                console.error("Error fetching movie details:", error);
            }
        };

        if (id) {
            fetchMovieDetail();
        }
    }, [pathname, searchParams]);

    if (!movieDetail) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>{movieDetail.title}</h1>
            <p>{movieDetail.overview}</p>
        </div>
    );
};

export default DetailMovie;
