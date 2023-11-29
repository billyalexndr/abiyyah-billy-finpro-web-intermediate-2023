import React from "react";
import Image from "next/image";
import Link from "next/link";

interface CardMovieProps {
    title: string;
    description: string;
    imageUrl: string;
    path: string;
    idMovie: number;
}

const CardMovie: React.FC<CardMovieProps> = ({
    title,
    description,
    imageUrl,
    path,
    idMovie,
}) => {
    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <Link href={`/${path}/${idMovie}`}>
                <Image
                    className="rounded-t-lg"
                    src={imageUrl}
                    alt={title}
                    width={500}
                    height={300}
                />
                <div className="p-5">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {title}
                    </h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        {description}
                    </p>
                </div>
            </Link>
        </div>
    );
};

export default CardMovie;
