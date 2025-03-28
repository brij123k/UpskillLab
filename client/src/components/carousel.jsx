// Carousel.jsx
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const CustomCarousel = ({ cards }) => {
    const responsive = {
        superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 3 },
        desktop: { breakpoint: { max: 1024, min: 768 }, items: 3 },
        tablet: { breakpoint: { max: 768, min: 464 }, items: 2 },
        mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
    };

    return (
        <div className="px-4"> {/* Add padding to prevent overflow issues */}
            <Carousel
                responsive={responsive}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={3000}
                keyBoardControl={true}
                transitionDuration={500}
                removeArrowOnDeviceType={["tablet", "mobile"]}
                itemClass="px-2" // Adds gap between items
            >
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className="bg-gray-200 rounded-lg flex justify-center items-center p-6"
                    >
                        {card}
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default CustomCarousel;
