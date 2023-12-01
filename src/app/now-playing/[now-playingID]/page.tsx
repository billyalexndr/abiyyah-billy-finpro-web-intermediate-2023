"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import Loading from "@/components/Loading";
import Error from "@/components/Error";

interface MovieDetail {
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: string;
  backdrop_path: string;
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
      <div className="relative mt-10 flex justify-center self-center">
        <div className="blur-xl z-0 absolute inset-0">
          <Image
            src={`${process.env.NEXT_PUBLIC_URL_POSTER}${movieDetail.backdrop_path}`}
            alt="background"
            layout="fill"
            objectFit="cover"
            className="w-full h-full"
          />
        </div>
        <div className="flex justify-center p-10 self-center z-10 gap-5 ">
          <Image
            className="p-5 center drop-shadow-xl"
            src={`${process.env.NEXT_PUBLIC_URL_POSTER}${movieDetail.poster_path}`}
            alt={movieDetail.title}
            width={350}
            height={150}
          />
          <div className="p-5 self-center">
            <h1 className="text-red-500 text-5xl font-bold">
              {movieDetail.title}
            </h1>
            <p className="flex justify-start font-bold text-xl text-white ">
              <svg
                className="w-7 h-7 text-yellow-300  p-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              {parseFloat(movieDetail.vote_average).toFixed(2)}
            </p>
            <p className="flex text-white font-semibold text-xl">
              <svg
                className="w-7 h-7 text-white p-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm14-7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm-5-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm-5-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4Z" />
              </svg>
              {movieDetail.release_date}
            </p>
            <p className="text-white font-semibold text-xl">
              {movieDetail.overview}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailMovie;
