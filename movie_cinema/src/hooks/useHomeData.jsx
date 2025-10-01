import { useState, useEffect } from 'react';
import { getPopularMovies, getTrendingMovies, getTopRatedMovies } from '../services/api';

export const useHomeData = (language, getAPILanguage) => {
    const [movies, setMovies] = useState([]);
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [trendingLoading, setTrendingLoading] = useState(false);
    const [popularContentType, setPopularContentType] = useState('movie');
    const [topRatedContentType, setTopRatedContentType] = useState('movie');
    const [trendingContentType, setTrendingContentType] = useState('day');

    // Initial loading
    useEffect(() => {
        const fetchInitialData = async () => {
            setLoading(true);
            try {
                const apiLanguage = getAPILanguage();

                const [contentData, trendingData, topRatedData] = await Promise.all([
                    getPopularMovies(apiLanguage),
                    getTrendingMovies(apiLanguage),
                    getTopRatedMovies(apiLanguage)
                ]);

                setMovies(contentData);
                setTrendingMovies(trendingData);
                setTopRatedMovies(topRatedData);
            } catch (error) {
                console.error('Error fetching initial data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchInitialData();
    }, [language, getAPILanguage]);

    // Popular movies
    useEffect(() => {
        if (loading) return;

        const fetchPopularMovies = async () => {
            try {
                const apiLanguage = getAPILanguage();
                let contentData;
                if (popularContentType === 'movie') {
                    contentData = await getPopularMovies(apiLanguage);
                } else {
                    contentData = await getPopularMovies(apiLanguage, 'tv');
                }
                setMovies(contentData);
            } catch (error) {
                console.error(`Error fetching ${popularContentType}s:`, error);
            }
        };

        fetchPopularMovies();
    }, [popularContentType, getAPILanguage, loading]);

    // Trending movies
    useEffect(() => {
        if (loading) return;

        const fetchTrendingMovies = async () => {
            setTrendingLoading(true);
            try {
                const apiLanguage = getAPILanguage();
                const trendingData = await getTrendingMovies(apiLanguage, trendingContentType);
                setTrendingMovies(trendingData);
            } catch (error) {
                console.error('Error fetching trending movies:', error);
            } finally {
                setTrendingLoading(false);
            }
        };

        fetchTrendingMovies();
    }, [trendingContentType, getAPILanguage, loading]);

    // Top rated movies
    useEffect(() => {
        if (loading) return;

        const fetchTopRatedMovies = async () => {
            try {
                const apiLanguage = getAPILanguage();
                let topRatedData;
                if (topRatedContentType === 'movie') {
                    topRatedData = await getTopRatedMovies(apiLanguage);
                } else {
                    topRatedData = await getTopRatedMovies(apiLanguage, 'tv');
                }
                setTopRatedMovies(topRatedData);
            } catch (error) {
                console.error(`Error fetching ${topRatedContentType}s:`, error);
            }
        };

        fetchTopRatedMovies();
    }, [topRatedContentType, getAPILanguage, loading]);

    return {
        movies,
        trendingMovies,
        topRatedMovies,
        loading,
        trendingLoading,
        popularContentType,
        topRatedContentType,
        trendingContentType,
        setPopularContentType,
        setTopRatedContentType,
        setTrendingContentType
    };
};