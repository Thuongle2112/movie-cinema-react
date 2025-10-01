import { useState, useEffect } from 'react';

export const useTrailerModal = () => {
    const [showTrailer, setShowTrailer] = useState(false);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape' && showTrailer) {
                setShowTrailer(false);
            }
        };

        if (showTrailer) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [showTrailer]);

    return {
        showTrailer,
        openTrailer: () => setShowTrailer(true),
        closeTrailer: () => setShowTrailer(false)
    };
};