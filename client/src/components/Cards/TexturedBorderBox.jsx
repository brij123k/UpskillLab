import React from 'react';

function TexturedBorderBox({ imageSrc, title, description }) {
    return (

        <div className="w-full bg-white flex flex-col items-center p-4 shadow-md rounded-lg">
            {/* Image */}
            <img
                src={imageSrc}
                alt={title}
                className="w-full h-40 object-cover rounded-md mb-4"
            />
            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
            {/* Description */}
            <p className="text-sm text-gray-600 text-center">{description}</p>
        </div>

    );
}

export default TexturedBorderBox;