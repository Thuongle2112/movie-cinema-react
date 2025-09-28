import { useState, useEffect } from "react"
import { getPopularMovies, getTrendingMovies, getTopRatedMovies } from "../services/api"
import { useNavigate } from "react-router-dom"
import { useLanguage } from "../contexts/LanguageContext"
import MovieCard from "../components/Home/MovieCard"
import ToggleSwitch from "../components/Home/ToggleSwitch"
import background1 from '../assets/background1.jpg'

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [setTrendingLoading] = useState(false);
    const [popularContentType, setPopularContentType] = useState('movie');
    const [topRatedContentType, setTopRatedContentType] = useState('movie');
    const [trendingContentType, setTrendingContentType] = useState('day');
    const navigate = useNavigate();
    const { t, getAPILanguage, language } = useLanguage();



    // Initial loading - chỉ chạy 1 lần
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

    // Trending movies - chỉ khi trending thay đổi
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

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    }
    const handlePopularContentTypeSwitch = (type) => {
        setPopularContentType(type);
    }

    const handleTopRatedContentTypeSwitch = (type) => {
        setTopRatedContentType(type);
    }

    const handleTrendingContentTypeSwitch = (timeframe) => {
        setTrendingContentType(timeframe);
    }


    const contentTypeOptions = [
        { value: 'movie', label: t('movies') },
        { value: 'tv', label: t('tvShows') }
    ];

    const trendingOptions = [
        { value: 'day', label: t('today') },
        { value: 'week', label: t('thisWeek') }
    ];

    if (loading) {
        return (
            <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">{t('loading')}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-gray-900 to-black py-8 px-4">
            <div className="w-full max-w-7xl mx-auto">
                {/* Header Section với background */}
                <div
                    className="rounded-2xl shadow-xl mb-8 p-8 text-center relative overflow-hidden bg-cover bg-center"
                    style={{ backgroundImage: `url(${background1})` }}
                >

                    {/* Decorative elements */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-10">
                        <div className="absolute top-4 left-4 w-16 h-16 bg-white rounded-full"></div>
                        <div className="absolute top-8 right-8 w-8 h-8 bg-white rounded-full"></div>
                        <div className="absolute bottom-4 left-8 w-12 h-12 bg-white rounded-full"></div>
                        <div className="absolute bottom-8 right-4 w-6 h-6 bg-white rounded-full"></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 pt-50">
                        <h1 className="text-6xl font-bold text-white mb-2">{t('movieCinema')}</h1>
                        <p className="text-2xl mb-8 text-white">{t('contentSearch')}</p>

                        {/* Search Container với glassmorphism */}
                        <div className=" bg-opacity-20">
                            <form onSubmit={handleSearch} className="max-w-2xl mx-auto w-full">
                                <div className="flex gap-3">
                                    <div className="flex-1 relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            name="search"
                                            placeholder={t('searchPlaceholder')}
                                            className="w-full pl-10 pr-4 py-3 bg-white bg-opacity-90 backdrop-blur-sm border border-white border-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:border-transparent shadow-sm text-gray-700 placeholder-gray-500"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="px-6 py-3 bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 text-white font-semibold rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all duration-200 shadow-sm flex items-center space-x-2"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                        <span>{t('search')}</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Trending Section - Horizontal Scroll */}
                <div className="mt-16 mb-10">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                        <h2 className="text-2xl font-semibold text-white">
                            {t('trending')}
                        </h2>

                        <ToggleSwitch
                            options={trendingOptions}
                            activeOption={trendingContentType}
                            onOptionChange={handleTrendingContentTypeSwitch}
                        />
                    </div>
                    {/* Horizontal Scroll Container */}
                    <div className="relative">
                        <div className="flex overflow-x-auto scrollbar-hide gap-4 pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                            {trendingMovies.map(movie => (
                                <div key={`trending-${movie.id}`} className="flex-shrink-0 w-48">
                                    <MovieCard movie={movie} contentType={movie.media_type || "movie"} />
                                </div>
                            ))}
                        </div>

                        <div className="absolute right-0 top-0 bottom-4 w-8 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none"></div>
                    </div>
                </div>

                <div className="mt-16 mb-10">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                        <h2 className="text-2xl font-semibold text-white">
                            {t('whatPopular')}
                        </h2>

                        <ToggleSwitch
                            options={contentTypeOptions}
                            activeOption={popularContentType}
                            onOptionChange={handlePopularContentTypeSwitch}
                        />
                    </div>

                    <div className="relative">
                        <div className="flex overflow-x-auto scrollbar-hide gap-4 pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                            {movies.map(movie => (
                                <div key={`top-rated-${movie.id}`} className="flex-shrink-0 w-48">
                                    <MovieCard movie={movie} contentType={popularContentType} />
                                </div>
                            ))}
                        </div>

                        <div className="absolute right-0 top-0 bottom-4 w-8 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none"></div>
                    </div>

                </div>

                {/* Top Rated Section - Horizontal Scroll */}
                <div className="mt-16 mb-10">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                        <h2 className="text-2xl font-semibold text-white">
                            {t('topRated')}
                        </h2>

                        <ToggleSwitch
                            options={contentTypeOptions}
                            activeOption={topRatedContentType}
                            onOptionChange={handleTopRatedContentTypeSwitch}
                        />
                    </div>
                    {/* Horizontal Scroll Container */}
                    <div className="relative">
                        <div className="flex overflow-x-auto scrollbar-hide gap-4 pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                            {topRatedMovies.map(movie => (
                                <div key={`top-rated-${movie.id}`} className="flex-shrink-0 w-48">
                                    <MovieCard movie={movie} contentType={topRatedContentType} />
                                </div>
                            ))}
                        </div>

                        <div className="absolute right-0 top-0 bottom-4 w-8 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home
