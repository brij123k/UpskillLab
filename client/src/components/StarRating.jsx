// StarRating.jsx
import React from 'react';

const StarRating = ({ rating = 5, totalStars = 5, color = 'yellow' }) => {
    const colorClasses = {
        yellow: 'text-yellow-300',
        red: 'text-red-300',
        blue: 'text-blue-300',
        green: 'text-green-300',
        purple: 'text-purple-300',
        gray: 'text-gray-300'
    };

    const filledColor = colorClasses[color] || colorClasses.yellow;
    const emptyColor = 'text-gray-100';

    return (
        <div className="flex items-start">
            {[...Array(totalStars)].map((_, index) => {
                const starValue = index + 1;
                let starStyle = emptyColor;

                if (rating >= starValue) {
                    starStyle = filledColor; // Full star
                } else if (rating > index && rating < starValue) {
                    // Partial star
                    const percentage = (rating - index) * 100;
                    return (
                        <div key={index} className="relative w-4 h-4 ms-1">
                            <svg
                                className={`w-4 h-4 ${emptyColor} absolute`}
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 22 20"
                            >
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                            <svg
                                className={`w-4 h-4 ${filledColor} absolute`}
                                style={{ clipPath: `inset(0 ${100 - percentage}% 0 0)` }}
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 22 20"
                            >
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                        </div>
                    );
                }

                return (
                    <svg
                        key={index}
                        className={`w-4 h-4 ms-1 ${starStyle}`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                    >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                );
            })}
        </div>
    );
};

export default StarRating;