import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { searchMoviesWithPagination } from "../services/api";
import MovieCard from "../components/Home/MovieCard";
import { useLanguage } from "../contexts/LanguageContext";

function SearchResults() {
    const [searchParams] = useSearchParams();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalResults, setTotalResults] = useState(0);
    const [loadingMore, setLoadingMore] = useState(false);
    const query = searchParams.get('q') || '';
    const { t, getAPILanguage, language } = useLanguage();

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (query.trim()) {
                setLoading(true);
                setCurrentPage(1);
                setMovies([]);
                try {
                    const apiLanguage = getAPILanguage();
                    const response = await searchMoviesWithPagination(query, 1, apiLanguage);
                    setMovies(response.results);
                    setTotalPages(response.total_pages);
                    setTotalResults(response.total_results);
                } catch (error) {
                    console.error("Error searching movies:", error);
                    setMovies([]);
                    setTotalPages(0);
                    setTotalResults(0);
                } finally {
                    setLoading(false);
                }
            } else {
                setMovies([]);
                setTotalPages(0);
                setTotalResults(0);
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [query, language, getAPILanguage]);

    const loadMoreMovies = async () => {
        if (currentPage < totalPages && !loadingMore) {
            setLoadingMore(true);
            try {
                const nextPage = currentPage + 1;
                const apiLanguage = getAPILanguage();
                const response = await searchMoviesWithPagination(query, nextPage, apiLanguage);
                setMovies(prevMovies => [...prevMovies, ...response.results]);
                setCurrentPage(nextPage);
            } catch (error) {
                console.error("Error loading more movies:", error);
            } finally {
                setLoadingMore(false);
            }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">{t('searchingMovies')}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-gray-50 py-8 px-4">
            <div className="w-full max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        {t('searchResults')}
                    </h1>
                    <p className="text-gray-600">
                        {query ? (
                            <>
                                {t('resultsFor')} "<span className="font-semibold">{query}</span>"
                                <span className="ml-2">
                                    ({totalResults.toLocaleString()} {t('moviesFound')}, {t('showing')} {movies.length})
                                </span>
                            </>
                        ) : 'No search query provided'}
                    </p>
                </div>

                {movies.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
                            {movies.map(movie => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </div>
                        {currentPage < totalPages && (
                            <div className="text-center">
                                <button
                                    onClick={loadMoreMovies}
                                    disabled={loadingMore}
                                    className={`inline-flex items-center px-6 py-3 font-medium rounded-lg transition-colors duration-200 ${loadingMore
                                        ? 'bg-gray-400 text-white cursor-not-allowed'
                                        : 'bg-blue-600 text-white hover:bg-blue-700'
                                        }`}
                                >
                                    {loadingMore ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                            {t('loading')}
                                        </>
                                    ) : (
                                        <>
                                            {t('loadMoreMovies')}
                                            <span className="ml-2 text-sm opacity-75">
                                                ({t('page')} {currentPage + 1} {t('of')} {totalPages})
                                            </span>
                                        </>
                                    )}
                                </button>
                            </div>
                        )}

                        <div className="text-center mt-4 text-sm text-gray-500">
                            {t('showingResults')} {movies.length} {t('of')} {totalResults.toLocaleString()} {t('results')}
                        </div>
                    </>
                ) : query ? (
                    <div className="text-center py-12">
                        <div className="text-gray-400 text-6xl mb-4">🔍</div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">{t('noMoviesFound')}</h2>
                        <p className="text-gray-600 mb-6">
                            {t('couldntFind')} "{query}". {t('tryDifferent')}
                        </p>
                        <Link
                            to="/"
                            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                        >
                            {t('browsePopularMovies')}
                        </Link>
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-gray-400 text-6xl mb-4">🎬</div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">{t('startSearching')}</h2>
                        <p className="text-gray-600 mb-6">
                            {t('enterMovieTitle')}
                        </p>
                        <Link
                            to="/"
                            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                        >
                            {t('goToHome')}
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchResults;