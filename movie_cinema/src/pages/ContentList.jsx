// components/ContentList.jsx - Version mới hoàn toàn
import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import {
    getPopularMovies,
    getTopRatedMovies,
    getNowPlayingMovies,
    getUpcomingMovies,
    getAiringTodayTV,
    getOnTheAirTV,
    getPopularTV,
    getTopRatedTV
} from '../services/api';
import MovieCard from '../components/Home/MovieCard';

function ContentList() {
    const { type, category } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [content, setContent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const { t, getAPILanguage } = useLanguage();

    const currentPage = parseInt(searchParams.get('page')) || 1;

    useEffect(() => {
        setContent([]);
        setLoading(true);
    }, [type, category]);

    useEffect(() => {
        fetchContent();
    }, [type, category, currentPage, getAPILanguage]);

    const fetchContent = async () => {
        setLoading(true);
        try {
            const apiLanguage = getAPILanguage();
            let response;

            console.log('🔄 Fetching:', { type, category, page: currentPage, language: apiLanguage });

            // ✅ Gọi API dựa trên type và category
            switch (`${type}-${category}`) {
                // Movie cases
                case 'movie-popular':
                    response = await getPopularMovies(apiLanguage, 'movie', currentPage);
                    break;
                case 'movie-top-rated':
                    response = await getTopRatedMovies(apiLanguage, 'movie', currentPage);
                    break;
                case 'movie-now-playing':
                    response = await getNowPlayingMovies(apiLanguage, currentPage);
                    break;
                case 'movie-upcoming':
                    response = await getUpcomingMovies(apiLanguage, currentPage);
                    break;

                // TV cases
                case 'tv-popular':
                    response = await getPopularTV(apiLanguage, currentPage);
                    break;
                case 'tv-top-rated':
                    response = await getTopRatedTV(apiLanguage, currentPage);
                    break;
                case 'tv-airing-today':
                    response = await getAiringTodayTV(apiLanguage, currentPage);
                    break;
                case 'tv-on-tv':
                    response = await getOnTheAirTV(apiLanguage, currentPage);
                    break;

                default:
                    console.warn('Unknown route:', `${type}-${category}`);
                    // Fallback to popular movies
                    response = await getPopularMovies(apiLanguage, 'movie', currentPage);
            }

            console.log('📦 API Response:', response);

            // ✅ Xử lý response nhất quán
            if (Array.isArray(response)) {
                // Nếu API trả về trực tiếp array (getPopularMovies, getTopRatedMovies)
                setContent(response);
                setTotalPages(500); // TMDB limit
            } else if (response && response.results) {
                // Nếu API trả về object có results
                setContent(response.results || []);
                setTotalPages(Math.min(response.total_pages || 1, 500));
            } else {
                setContent([]);
                setTotalPages(1);
            }

        } catch (error) {
            console.error('❌ Error fetching content:', error);
            setContent([]);
            setTotalPages(1);
        } finally {
            setLoading(false);
        }
    };

    const getPageTitle = () => {
        const titleMap = {
            'movie-popular': t('popular') + ' Movies',
            'movie-top-rated': t('topRated') + ' Movies',
            'movie-now-playing': t('nowPlaying') + ' Movies',
            'movie-upcoming': t('upcoming') + ' Movies',
            'tv-popular': t('popular') + ' TV Shows',
            'tv-top-rated': t('topRated') + ' TV Shows',
            'tv-airing-today': t('airingToday'),
            'tv-on-tv': t('onTV')
        };
        return titleMap[`${type}-${category}`] || `${type} ${category}`;
    };

    const getPageDescription = () => {
        const descMap = {
            'movie-popular': 'Discover the most popular movies right now',
            'movie-top-rated': 'Highest rated movies of all time',
            'movie-now-playing': 'Movies currently in theaters',
            'movie-upcoming': 'Coming soon to theaters',
            'tv-popular': 'Most popular TV shows trending now',
            'tv-top-rated': 'Highest rated TV shows ever',
            'tv-airing-today': 'TV shows airing today',
            'tv-on-tv': 'Currently on air TV shows'
        };
        return descMap[`${type}-${category}`] || `Browse ${category} ${type} content`;
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages && newPage !== currentPage) {
            setSearchParams({ page: newPage.toString() });
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black pt-20">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    {/* Header Skeleton */}
                    <div className="mb-8">
                        <div className="h-8 bg-gray-800 rounded w-64 mb-4 animate-pulse"></div>
                        <div className="h-4 bg-gray-800 rounded w-96 animate-pulse"></div>
                    </div>

                    {/* Grid Skeleton */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {[...Array(20)].map((_, i) => (
                            <div key={i} className="animate-pulse">
                                <div className="aspect-[2/3] bg-gray-800 rounded-lg mb-4"></div>
                                <div className="h-4 bg-gray-800 rounded mb-2"></div>
                                <div className="h-3 bg-gray-800 rounded w-3/4"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black pt-20">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Page Header */}
                <div className="mb-8">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                            <span className="text-2xl">
                                {type === 'movie' ? '🎬' : '📺'}
                            </span>
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                                {getPageTitle()}
                            </h1>
                            <p className="text-gray-400 text-lg">
                                {getPageDescription()}
                            </p>
                        </div>
                    </div>

                    {/* Breadcrumb */}
                    <nav className="text-sm text-gray-400 mb-6">
                        <span className="hover:text-white transition-colors duration-200">
                            <a href="/">Home</a>
                        </span>
                        <span className="mx-2">›</span>
                        <span className="capitalize text-white">
                            {type === 'movie' ? 'Movies' : 'TV Shows'}
                        </span>
                        <span className="mx-2">›</span>
                        <span className="text-blue-400 capitalize">
                            {category.replace('-', ' ')}
                        </span>
                    </nav>

                    {/* Stats */}
                    <div className="flex items-center space-x-6 text-sm text-gray-400">
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span>{content.length} items found</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span>Page {currentPage} of {totalPages}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                            <span>Route: {type}-{category}</span>
                        </div>
                    </div>
                </div>

                {/* Content Grid */}
                {content.length > 0 ? (
                    <>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 mb-8">
                            {content.map((item) => (
                                <MovieCard
                                    key={`${item.id}-${currentPage}`}
                                    movie={item}
                                    contentType={type}
                                />
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center space-x-2 flex-wrap gap-2">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                                >
                                    Previous
                                </button>

                                {[...Array(Math.min(5, totalPages))].map((_, i) => {
                                    const pageNum = Math.max(1, currentPage - 2) + i;
                                    if (pageNum > totalPages) return null;

                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => handlePageChange(pageNum)}
                                            className={`px-3 py-2 rounded-lg transition-colors duration-200 ${currentPage === pageNum
                                                ? 'bg-blue-600 text-white shadow-lg'
                                                : 'bg-gray-800 text-white hover:bg-gray-700'
                                                }`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}

                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">😔</div>
                        <h3 className="text-xl text-white mb-2">No content found</h3>
                        <p className="text-gray-400">Try checking back later or browse other categories</p>

                        <div className="mt-4 text-xs text-gray-500 space-y-1">
                            <p>Debug Info:</p>
                            <p>Type: {type}</p>
                            <p>Category: {category}</p>
                            <p>Switch Key: {type}-{category}</p>
                            <p>Page: {currentPage}</p>
                            <p>API Language: {getAPILanguage()}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ContentList;