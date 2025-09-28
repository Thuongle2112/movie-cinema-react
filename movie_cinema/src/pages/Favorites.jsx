import { useFavorites } from '../contexts/FavoritesContext';
import { useLanguage } from '../contexts/LanguageContext';
import MovieCard from '../components/Home/MovieCard';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getMovieDetails } from '../services/api';

function Favorites() {
    const { favorites } = useFavorites();
    const { t, getAPILanguage, language } = useLanguage();
    const [updatedFavorites, setUpdatedFavorites] = useState([]);
    const [loading, setLoading] = useState(false);

    // Re-fetch favorite movies với current language
    useEffect(() => {
        const updateFavoritesWithCurrentLanguage = async () => {
            if (favorites.length === 0) {
                setUpdatedFavorites([]);
                return;
            }

            setLoading(true);
            try {
                const apiLanguage = getAPILanguage();
                const updatedMovies = await Promise.all(
                    favorites.map(async (movie) => {
                        try {
                            // Determine content type from movie data
                            const contentType = movie.title ? 'movie' : 'tv';
                            const updatedMovie = await getMovieDetails(movie.id, apiLanguage, contentType);

                            // Keep original favorite metadata
                            return {
                                ...updatedMovie,
                                favoriteDate: movie.favoriteDate || new Date().toISOString()
                            };
                        } catch (error) {
                            console.error(`Error updating movie ${movie.id}:`, error);
                            // Return original movie if API call fails
                            return movie;
                        }
                    })
                );

                setUpdatedFavorites(updatedMovies);
            } catch (error) {
                console.error('Error updating favorites:', error);
                setUpdatedFavorites(favorites);
            } finally {
                setLoading(false);
            }
        };

        updateFavoritesWithCurrentLanguage();
    }, [favorites, language, getAPILanguage]);

    if (loading) {
        return (
            <div className="min-h-screen w-full bg-gray-50 py-8 px-4">
                <div className="w-full max-w-7xl mx-auto">
                    <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
                        {t('yourFavorites')}
                    </h1>

                    <div className="flex items-center justify-center min-h-96">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
                            <p className="mt-4 text-gray-600">{t('updatingFavorites')}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-gray-900 to-black py-8 px-4">
            <div className="w-full max-w-7xl  pt-20 mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-4xl font-bold text-white">
                        {t('yourFavorites')} ({updatedFavorites.length})
                    </h1>
                </div>

                {updatedFavorites.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {updatedFavorites.map(movie => {
                                // Determine contentType for each movie
                                const contentType = movie.title ? 'movie' : 'tv';
                                return (
                                    <MovieCard
                                        key={movie.id}
                                        movie={movie}
                                        contentType={contentType}
                                    />
                                );
                            })}
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center min-h-96 bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                        <div className="text-center">
                            <div className="text-gray-400 text-6xl mb-4">❤️</div>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                                {t('noFavoritesYet')}
                            </h2>
                            <p className="text-gray-600 mb-6">
                                {t('startAddingMovies')}
                            </p>
                            <Link
                                to="/"
                                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                            >
                                {t('browseMovies')}
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Favorites;