import React, { useRef, useEffect } from 'react';

const ImageCarousel = () => {
    const line1Ref = useRef(null);
    const line2Ref = useRef(null);
    const line3Ref = useRef(null);

    useEffect(() => {
        // Define different speeds for each row (smaller values = slower)
        const speed1 = 1.1; // Slowest for line-1
        const speed2 = 2.1; // Medium for line-2
        const speed3 = 1.2; // Fastest for line-3

        const scrollRow = (ref, speed) => {
            const container = ref.current;
            if (!container) return;

            const images = container.children;
            const lastImage = images[images.length - 1];
            const containerWidth = container.offsetWidth;
            const lastImageRight = lastImage.offsetLeft + lastImage.offsetWidth;

            // Move the scroll position at the specified speed
            container.scrollLeft += speed;

            // Check if the last image is fully in view
            if (lastImageRight <= containerWidth + container.scrollLeft) {
                container.scrollLeft = 0; // Reset to start
            }

            // Continue animation
            requestAnimationFrame(() => scrollRow(ref, speed));
        };

        const line1 = line1Ref.current;
        const line2 = line2Ref.current;
        const line3 = line3Ref.current;

        // Start scrolling for each row with different speeds
        const animationId1 = requestAnimationFrame(() => scrollRow(line1Ref, speed1));
        const animationId2 = requestAnimationFrame(() => scrollRow(line2Ref, speed2));
        const animationId3 = requestAnimationFrame(() => scrollRow(line3Ref, speed3));

        // Cleanup animation frames
        return () => {
            cancelAnimationFrame(animationId1);
            cancelAnimationFrame(animationId2);
            cancelAnimationFrame(animationId3);
        };
    }, []);

    return (
        <div className="bg-white flex items-center justify-center min-h-screen">
            <div className="w-full max-w-4xl space-y-4">
                {/* First Row (line-1) */}
                <div className="overflow-x-hidden whitespace-nowrap" ref={line1Ref}>
                    <div className="inline-flex line-1 items-center">
                        <img src="images/Logo1.jpeg" className="carousel-image w-32 mx-2" alt="Image 1" />
                        <img src="images/Logo2.jpeg" className="carousel-image w-32 mx-2" alt="Image 2" />
                        <img src="images/Logo1.jpeg" className="carousel-image w-32 mx-2" alt="Image 1" />
                        <img src="images/Logo2.jpeg" className="carousel-image w-32 mx-2" alt="Image 2" />
                        <img src="images/Logo1.jpeg" className="carousel-image w-32 mx-2" alt="Image 1" />
                        <img src="images/Logo2.jpeg" className="carousel-image w-32 mx-2" alt="Image 2" />
                        <img src="images/Logo1.jpeg" className="carousel-image w-32 mx-2" alt="Image 1" />
                        <img src="images/Logo2.jpeg" className="carousel-image w-32 mx-2" alt="Image 2" />
                        <img src="images/Logo1.jpeg" className="carousel-image w-32 mx-2" alt="Image 1" />
                        <img src="images/Logo2.jpeg" className="carousel-image w-32 mx-2" alt="Image 2" />
                        <img src="images/Logo1.jpeg" className="carousel-image w-32 mx-2" alt="Image 1" />
                        <img src="images/Logo2.jpeg" className="carousel-image w-32 mx-2" alt="Image 2" />
                    </div>
                </div>

                {/* Second Row (line-2) */}
                <div className="overflow-x-hidden whitespace-nowrap" ref={line2Ref}>
                    <div className="inline-flex line-2 items-center">
                        <img src="images/Logo1.jpeg" className="carousel-image w-32 mx-2" alt="Image 1" />
                        <img src="images/Logo2.jpeg" className="carousel-image w-32 mx-2" alt="Image 2" />
                        <img src="images/Logo1.jpeg" className="carousel-image w-32 mx-2" alt="Image 1" />
                        <img src="images/Logo2.jpeg" className="carousel-image w-32 mx-2" alt="Image 2" />
                        <img src="images/Logo1.jpeg" className="carousel-image w-32 mx-2" alt="Image 1" />
                        <img src="images/Logo2.jpeg" className="carousel-image w-32 mx-2" alt="Image 2" />
                        <img src="images/Logo1.jpeg" className="carousel-image w-32 mx-2" alt="Image 1" />
                        <img src="images/Logo2.jpeg" className="carousel-image w-32 mx-2" alt="Image 2" />
                        <img src="images/Logo1.jpeg" className="carousel-image w-32 mx-2" alt="Image 1" />
                        <img src="images/Logo2.jpeg" className="carousel-image w-32 mx-2" alt="Image 2" />
                        <img src="images/Logo1.jpeg" className="carousel-image w-32 mx-2" alt="Image 1" />
                        <img src="images/Logo2.jpeg" className="carousel-image w-32 mx-2" alt="Image 2" />
                    </div>
                </div>

                {/* Third Row (line-3) */}
                <div className="overflow-x-hidden whitespace-nowrap" ref={line3Ref}>
                    <div className="inline-flex line-3 items-center">
                        <img src="images/Logo1.jpeg" className="carousel-image w-32 mx-2" alt="Image 1" />
                        <img src="images/Logo2.jpeg" className="carousel-image w-32 mx-2" alt="Image 2" />
                        <img src="images/Logo1.jpeg" className="carousel-image w-32 mx-2" alt="Image 1" />
                        <img src="images/Logo2.jpeg" className="carousel-image w-32 mx-2" alt="Image 2" />
                        <img src="images/Logo1.jpeg" className="carousel-image w-32 mx-2" alt="Image 1" />
                        <img src="images/Logo2.jpeg" className="carousel-image w-32 mx-2" alt="Image 2" />
                        <img src="images/Logo1.jpeg" className="carousel-image w-32 mx-2" alt="Image 1" />
                        <img src="images/Logo2.jpeg" className="carousel-image w-32 mx-2" alt="Image 2" />
                        <img src="images/Logo1.jpeg" className="carousel-image w-32 mx-2" alt="Image 1" />
                        <img src="images/Logo2.jpeg" className="carousel-image w-32 mx-2" alt="Image 2" />
                        <img src="images/Logo1.jpeg" className="carousel-image w-32 mx-2" alt="Image 1" />
                        <img src="images/Logo2.jpeg" className="carousel-image w-32 mx-2" alt="Image 2" />
                        <img src="images/Logo1.jpeg" className="carousel-image w-32 mx-2" alt="Image 1" />
                        <img src="images/Logo2.jpeg" className="carousel-image w-32 mx-2" alt="Image 2" />
                        <img src="images/Logo1.jpeg" className="carousel-image w-32 mx-2" alt="Image 1" />
                        <img src="images/Logo2.jpeg" className="carousel-image w-32 mx-2" alt="Image 2" />
                        <img src="images/Logo1.jpeg" className="carousel-image w-32 mx-2" alt="Image 1" />
                        <img src="images/Logo2.jpeg" className="carousel-image w-32 mx-2" alt="Image 2" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageCarousel;