"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Loading from "@/components/Loading";
import Error from "@/components/Error";

interface MovieDetail {
    title: string;
    overview: string;
}

const DetailMovie: React.FC = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [movieDetail, setMovieDetail] = useState<MovieDetail | null>(null);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        const url = `${pathname}?${searchParams}`;
        const match = url.match(/\/(\d+)\?/);
        const id = match ? match[1] : null;
        console.log(id);
        const fetchMovieDetail = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
                    { next: { revalidate: 3600 } }
                );
                const data = await response.json();
                setMovieDetail(data);
            } catch (error) {
                console.error("Error fetching movie details:", error);
            }
        };

        if (id) {
            fetchMovieDetail();
        }
    }, [pathname, searchParams]);

    if (!movieDetail) {
        return <Loading />;
    }

    if (error) {
        return <Error />;
    }

    return (
        <div>
            <h1>{movieDetail.title}</h1>
            <p>{movieDetail.overview}</p>
        </div>
    );
};

export default DetailMovie;
