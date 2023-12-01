import React from "react";
import { useRouter } from "next/navigation";

const ErrorPage: React.FC = () => {
    const router = useRouter();

    const handleGoBack = () => {
        router.back();
    };

    return (
        <div className="bg-slate-900 flex items-center justify-center h-screen">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4 text-red-500">Error!</h1>
                <p className="text-xl text-white">
                    Oops! Something went wrong.
                </p>
                <button
                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                    onClick={handleGoBack}
                >
                    Go back
                </button>
            </div>
        </div>
    );
};

export default ErrorPage;
