import React from "react";
import Image from "next/image";

interface CardMovieProps {
  title: string;
  rating: string;
  imageUrl: string;
}

const CardMovie: React.FC<CardMovieProps> = ({ title, rating, imageUrl }) => {
  return (
    <div className="max-w-sm bg-slate-800 shadow rounded-lg ">
      <a href="#">
        <Image
          className="rounded-t-lg"
          src={imageUrl}
          alt={title}
          width={400}
          height={200}
        />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="text-red-500 mb-2 text-base font-bold tracking-tight overflow-hidden whitespace-nowrap hover:whitespace-normal">
            {title}
          </h5>
        </a>
        <p className="flex mb-3 font-normal text-gray-300 ">
          <svg
            className="w-6 h-6 text-yellow-200  p-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          {rating}
        </p>
      </div>
    </div>
  );
};

export default CardMovie;
