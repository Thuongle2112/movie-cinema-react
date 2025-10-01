import { useState, useEffect } from 'react';
import {
    getMovieDetails,
    getMovieTrailer,
    getCredits,
    getSimilarMovies,
    getMovieRecommendations
} from '../services/api';

export const useMovieDetail = (id, contentType, apiLanguage) => {
    const [content, setContent] = useState(null);
    const [trailerKey, setTrailerKey] = useState(null);
    const [credits, setCredits] = useState({ cast: [], crew: [] });
    const [similarContent, setSimilarContent] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                setLoading(true);
                setError(null);

                const [
                    contentData,
                    trailerData,
                    creditsData,
                    similarData,
                    recommendationsData
                ] = await Promise.all([
                    getMovieDetails(id, apiLanguage, contentType),
                    getMovieTrailer(id, contentType),
                    getCredits(id, contentType),
                    getSimilarMovies(id, apiLanguage, contentType),
                    getMovieRecommendations(id, apiLanguage, contentType)
                ]);

                setContent(contentData);
                setTrailerKey(trailerData?.key);
                setCredits(creditsData);
                setSimilarContent(similarData);
                setRecommendations(recommendationsData);
            } catch (error) {
                console.error(`Error fetching ${contentType} details:`, error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchAllData();
        }
    }, [id, contentType, apiLanguage]);

    return {
        content,
        trailerKey,
        credits,
        similarContent,
        recommendations,
        loading,
        error
    };
};