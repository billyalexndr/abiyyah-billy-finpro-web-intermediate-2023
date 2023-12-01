import React from "react";

const Loading: React.FC = () => {
    return (
        <div className="bg-slate-900 flex items-center justify-center h-screen">
            <div className="flex items-center justify-center w-24 h-24 rounded-full border-t-4 border-gray-500 border-solid animate-spin">
                <svg
                    className="w-12 h-12 text-gray-500"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    shapeRendering="geometricPrecision"
                >
                    <path d="M6 9l6 6 6-6" />
                </svg>
            </div>
        </div>
    );
};

export default Loading;
