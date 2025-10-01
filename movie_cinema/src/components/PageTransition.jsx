import { useState, useEffect, useCallback, memo, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Lottie from 'lottie-react';
import loadingAnimation from '../assets/animations/dice_roll.json';

const PageTransition = memo(({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [displayChildren, setDisplayChildren] = useState(children);
    const location = useLocation();

    // ✅ useRef để cleanup timeouts properly
    const hideTimerRef = useRef();
    const showTimerRef = useRef();

    // ✅ Memoize scroll function
    const scrollToTop = useCallback(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        setIsLoading(true);

        // ✅ Cleanup previous timers nếu có
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
        if (showTimerRef.current) clearTimeout(showTimerRef.current);

        hideTimerRef.current = setTimeout(() => {
            setDisplayChildren(children);
        }, 150);

        showTimerRef.current = setTimeout(() => {
            setIsLoading(false);
            scrollToTop();
        }, 1500);

        return () => {
            // ✅ Proper cleanup
            if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
            if (showTimerRef.current) clearTimeout(showTimerRef.current);
        };
    }, [location.pathname, children, scrollToTop]);

    // ✅ Cleanup refs on unmount
    useEffect(() => {
        return () => {
            if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
            if (showTimerRef.current) clearTimeout(showTimerRef.current);
        };
    }, []);

    if (isLoading) {
        return (
            <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-black flex items-center justify-center z-50">
                <div className="text-center">
                    {/* Lottie Animation */}
                    <div className="w-48 h-48 mb-6">
                        <Lottie
                            animationData={loadingAnimation}
                            loop={true}
                            autoplay={true}
                            style={{ width: '100%', height: '100%' }}
                            rendererSettings={{
                                // ✅ Performance optimizations cho Lottie
                                preserveAspectRatio: 'xMidYMid slice',
                                clearCanvas: false,
                                progressiveLoad: true,
                                hideOnTransparent: true
                            }}
                        />
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-2">Movie Cinema</h2>
                    <p className="text-gray-400">Loading amazing content...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="animate-fadeIn">
            {displayChildren}
        </div>
    );
});

// ✅ DisplayName cho React DevTools
PageTransition.displayName = 'PageTransition';

export default PageTransition;