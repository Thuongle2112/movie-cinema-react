import { useState, useRef, useEffect } from 'react';
import MovieCard from './MovieCard';

const HorizontalMovieScroll = ({
    title,
    movies = [],
    contentType,
    loading = false
}) => {
    const scrollRef = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    const scroll = (direction) => {
        const container = scrollRef.current;
        if (!container) return;

        const scrollAmount = 320;
        const newScrollLeft = direction === 'left'
            ? container.scrollLeft - scrollAmount
            : container.scrollLeft + scrollAmount;

        container.scrollTo({
            left: newScrollLeft,
            behavior: 'smooth'
        });
    };

    const handleScroll = () => {
        const container = scrollRef.current;
        if (!container) return;

        setShowLeftArrow(container.scrollLeft > 0);
        setShowRightArrow(
            container.scrollLeft < container.scrollWidth - container.clientWidth - 10
        );
    };

    // Check initial scroll state
    useEffect(() => {
        const container = scrollRef.current;
        if (container && movies.length > 0) {
            // Small delay to ensure content is rendered
            setTimeout(() => {
                handleScroll();
            }, 100);
        }
    }, [movies]);

    if (loading) {
        return (
            <div className="mt-16 mb-10">
                <div className="flex items-center justify-between mb-6">
                    <div className="h-8 bg-gray-300 rounded w-48 animate-pulse"></div>
                </div>
                <div className="flex gap-4 overflow-hidden">
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className="flex-shrink-0 w-48">
                            <div className="bg-gray-300 rounded-lg h-72 animate-pulse"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (!movies.length) {
        return (
            <div className="mt-16 mb-10">
                <h2 className="text-2xl font-semibold text-white mb-6">{title}</h2>
                <div className="text-center py-12 text-gray-400">
                    <p>No content available</p>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-16 mb-10">
            <h2 className="text-2xl font-semibold text-white mb-6">{title}</h2>

            <div className="relative group">
                {/* Left Arrow */}
                {showLeftArrow && (
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-70 hover:bg-opacity-90 text-white rounded-full p-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg"
                        aria-label="Scroll left"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                )}

                {/* Right Arrow */}
                {showRightArrow && (
                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-70 hover:bg-opacity-90 text-white rounded-full p-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg"
                        aria-label="Scroll right"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                )}

                {/* Scrollable Container */}
                <div
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="flex overflow-x-auto scrollbar-hide gap-4 pb-4"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        scrollBehavior: 'smooth'
                    }}
                >
                    {movies.map(movie => {
                        let itemContentType;

                        if (contentType === "trending") {
                            itemContentType = movie.media_type || "movie";
                        } else {
                            itemContentType = contentType;
                        }

                        return (
                            <div key={movie.id} className="flex-shrink-0 w-48">
                                <MovieCard
                                    movie={movie}
                                    contentType={itemContentType}
                                />
                            </div>
                        );
                    })}
                </div>

                {/* Gradient fade on right */}
                <div className="absolute right-0 top-0 bottom-4 w-8 bg-gradient-to-l from-slate-900 via-slate-900/50 to-transparent pointer-events-none"></div>
            </div>
        </div>
    );
};

export default HorizontalMovieScroll;