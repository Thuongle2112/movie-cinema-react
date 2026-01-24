import { useEffect } from 'react';

export const useDocumentTitle = (title, deps = []) => {
    useEffect(() => {
        const prevTitle = document.title;
        
        if (title) {
            document.title = title;
        }
        
        // Cleanup - restore previous title on unmount
        return () => {
            document.title = prevTitle;
        };
    }, [title, ...deps]);
};

// ✅ Hook with base title
export const usePageTitle = (pageTitle, movieTitle = null) => {
    const baseTitle = "Movie Cinema";
    
    useEffect(() => {
        let fullTitle = baseTitle;
        
        if (movieTitle) {
            // For movie/TV detail pages
            fullTitle = `${movieTitle} - ${baseTitle}`;
        } else if (pageTitle) {
            // For other pages
            fullTitle = `${pageTitle} - ${baseTitle}`;
        }
        
        document.title = fullTitle;
        
        // ✅ Also update meta description for better SEO
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            if (movieTitle) {
                metaDescription.setAttribute('content', `Watch ${movieTitle} and discover more movies and TV shows on Movie Cinema`);
            } else {
                metaDescription.setAttribute('content', `Discover amazing movies and TV shows on ${pageTitle || 'Movie Cinema'}`);
            }
        }
        
    }, [pageTitle, movieTitle]);
};