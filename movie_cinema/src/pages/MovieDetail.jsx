import { useParams, Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { formatDate } from "../utils/dateUtils";
import MovieDetailSkeleton from "../components/MovieDetail/MovieDetailSkeleton";
import TrailerModal from "../components/MovieDetail/TrailerModal";
import HorizontalScrollSection from "../components/MovieDetail/HorizontalScrollSection";
import CastCard from "../components/MovieDetail/CastCard";
import MovieCard from "../components/Home/MovieCard";
import VideoCard from "../components/MovieDetail/VideoCard";
import { useMovieDetail } from "../hooks/useMovieDetail";
import { useTrailerModal } from "../hooks/useTrailerModal";
import { getOfficialVideos } from "../services/api";
import { useState } from "react";

function MovieDetail() {
    const { id } = useParams();
    const location = useLocation();
    const { t, getAPILanguage, language } = useLanguage();
    const [officialVideos, setOfficialVideos] = useState([]);

    const contentType = location.pathname.startsWith('/tv') ? 'tv' : 'movie';
    const apiLanguage = getAPILanguage();

    // Custom hooks
    const {
        content,
        trailerKey,
        credits,
        similarContent,
        recommendations,
        loading,
        error
    } = useMovieDetail(id, contentType, apiLanguage);

    const [currentVideoKey, setCurrentVideoKey] = useState(null);
    const [currentVideoTitle, setCurrentVideoTitle] = useState(null);
    const { showTrailer, openTrailer, closeTrailer } = useTrailerModal();

    // Fetch official videos
    useEffect(() => {
        const fetchOfficialVideos = async () => {
            if (id) {
                const videos = await getOfficialVideos(id, contentType);
                setOfficialVideos(videos);
            }
        };
        fetchOfficialVideos();
    }, [id, contentType]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id, language, getAPILanguage, contentType]);

    const defaultBackground = 'https://images.unsplash.com/photo-1489599809568-8c7f8d8c2b69?q=80&w=2070';

    const contentBackground = content?.backdrop_path
        ? `https://image.tmdb.org/t/p/original${content.backdrop_path}`
        : defaultBackground;

    const getTitle = () => {
        return content?.title || content?.name || 'Unknown Title';
    };

    const getReleaseDate = () => {
        return content?.release_date || content?.first_air_date;
    };

    const handleVideoPlay = (videoKey, videoTitle) => {
        setCurrentVideoKey(videoKey);
        setCurrentVideoTitle(videoTitle);
        openTrailer();
    };

    const handleTrailerPlay = () => {
        setCurrentVideoKey(trailerKey);
        setCurrentVideoTitle(null);
        openTrailer();
    };

    if (loading) {
        return <MovieDetailSkeleton contentBackground={defaultBackground} />;
    }

    if (error || !content) {
        return (
            <div
                className="min-h-screen w-full flex items-center justify-center"
                style={{
                    backgroundImage: `
                        linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(30, 64, 175, 0.1) 100%),
                        linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
                        url(${contentBackground})
                    `,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed'
                }}
            >
                <div className="text-center bg-white bg-opacity-95 backdrop-blur-md rounded-lg p-8 shadow-xl border border-white border-opacity-20">
                    <div className="text-gray-400 text-6xl mb-4">
                        {contentType === 'tv' ? '📺' : '🎬'}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        {contentType === 'tv' ? t('tvShowNotFound') : t('movieNotFound')}
                    </h2>
                    <p className="text-gray-600 mb-6">
                        {contentType === 'tv' ? t('tvShowNotExist') : t('movieNotExist')}
                    </p>
                    <Link
                        to="/"
                        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                    >
                        ← {t('backToHome')}
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen w-full py-8 px-4"
            style={{
                backgroundImage: `
                    linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(30, 64, 175, 0.1) 100%),
                    linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
                    url(${contentBackground})
                `,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
            }}
        >
            <div className="w-full max-w-6xl mx-auto p-20">
                {/* Main Content Section */}
                <div className="md:flex mb-12">
                    <div className="md:w-1/3 rounded-lg overflow-hidden">
                        <div className="relative">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${content.poster_path}`}
                                alt={`${getTitle()} Poster`}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/500x750/374151/ffffff?text=No+Poster';
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-30"></div>
                        </div>
                    </div>

                    <div className="md:w-2/3 md:pl-8">
                        <div className="flex items-center mb-2">
                            <h1 className="text-4xl text-white">
                                {getTitle()}
                                {getReleaseDate() && (
                                    <span className="text-white ml-2">
                                        ({new Date(getReleaseDate()).getFullYear()})
                                    </span>
                                )}
                            </h1>
                        </div>

                        {content.tagline && (
                            <h2 className="text-sm italic text-gray-300 mb-4">{content.tagline}</h2>
                        )}

                        {content.genres && content.genres.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1 mb-4">
                                {content.genres.map(genre => (
                                    <span
                                        key={genre.id}
                                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                                    >
                                        {genre.name}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Watch Trailer Button */}
                        {trailerKey && (
                            <div className="mb-6">
                                <button
                                    onClick={handleTrailerPlay}
                                    className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-semi rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                    </svg>
                                    {t('watchTrailer')}
                                </button>
                            </div>
                        )}

                        {/* Content info grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div className="bg-gray-50 bg-opacity-50 backdrop-blur-sm rounded-lg p-4">
                                <p className="text-sm text-gray-600 font-medium">
                                    {contentType === 'tv' ? t('firstAirDate') : t('releaseDate')}
                                </p>
                                <p className="text-gray-800 font-semibold">
                                    {formatDate(getReleaseDate(), language)}
                                </p>
                            </div>

                            {/* Runtime for movies, Number of seasons for TV shows */}
                            {contentType === 'movie' && content.runtime ? (
                                <div className="bg-gray-50 bg-opacity-50 backdrop-blur-sm rounded-lg p-4">
                                    <p className="text-sm text-gray-600 font-medium">{t('runtime')}</p>
                                    <p className="text-gray-800 font-semibold">{content.runtime} {t('minutes')}</p>
                                </div>
                            ) : contentType === 'tv' && content.number_of_seasons ? (
                                <div className="bg-gray-50 bg-opacity-50 backdrop-blur-sm rounded-lg p-4">
                                    <p className="text-sm text-gray-600 font-medium">{t('seasons')}</p>
                                    <p className="text-gray-800 font-semibold">
                                        {content.number_of_seasons} {t('seasons')}
                                    </p>
                                </div>
                            ) : null}

                            <div className="bg-gray-50 bg-opacity-50 backdrop-blur-sm rounded-lg p-4">
                                <p className="text-sm text-gray-600 font-medium">{t('rating')}</p>
                                <div className="flex items-center">
                                    <span className="text-gray-800 font-semibold">
                                        {content.vote_average.toFixed(1)}/10
                                    </span>
                                    <div className="flex ml-2">
                                        {[...Array(5)].map((_, i) => (
                                            <svg
                                                key={i}
                                                className={`w-4 h-4 ${i < Math.floor(content.vote_average / 2)
                                                    ? 'text-yellow-400'
                                                    : 'text-gray-300'
                                                    }`}
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* TV Show specific info */}
                            {contentType === 'tv' && content.number_of_episodes && (
                                <div className="bg-gray-50 bg-opacity-50 backdrop-blur-sm rounded-lg p-4">
                                    <p className="text-sm text-gray-600 font-medium">{t('episodes')}</p>
                                    <p className="text-gray-800 font-semibold">
                                        {content.number_of_episodes} {t('episodes')}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Overview */}
                        <div>
                            <h2 className="text-xl font-semibold text-white mb-3">{t('overview')}</h2>
                            <p className="text-gray-300 leading-relaxed">
                                {content.overview || t('noOverviewAvailable')}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Cast Section */}
                <HorizontalScrollSection
                    title={t('cast')}
                    items={credits.cast?.slice(0, 20) || []}
                    renderItem={(person) => <CastCard key={person.id} person={person} />}
                />

                {/* Official Videos Section */}
                <HorizontalScrollSection
                    title={t('officialVideos')}
                    items={officialVideos}
                    renderItem={(video) => (
                        <VideoCard
                            key={video.id}
                            video={video}
                            onPlay={(videoKey) => {
                                setCurrentVideoKey(videoKey);
                                // Optionally pass video name to modal
                                setCurrentVideoTitle(video.name);
                                openTrailer();
                            }}
                        />
                    )}
                />

                {/* Similar Content Section */}
                <HorizontalScrollSection
                    title={contentType === 'tv' ? t('similarTVShows') : t('similarMovies')}
                    items={(similarContent?.results || []).slice(0, 20)}
                    renderItem={(item) => (
                        <div key={item.id} className="flex-shrink-0 w-48">
                            <MovieCard movie={item}
                                contentType={contentType}
                            />
                        </div>
                    )}
                />

                {/* Recommendations Section */}
                <HorizontalScrollSection
                    title={t('recommendations')}
                    items={(recommendations?.results || []).slice(0, 20)}
                    renderItem={(item) => (
                        <div key={item.id} className="flex-shrink-0 w-48">
                            <MovieCard movie={item}
                                contentType={contentType}
                            />
                        </div>
                    )}
                />
            </div>

            {/* Trailer Modal */}
            <TrailerModal
                isOpen={showTrailer}
                onClose={() => {
                    closeTrailer();
                    setCurrentVideoKey(null);
                    setCurrentVideoTitle(null);
                }}
                trailerKey={currentVideoKey}
                title={getTitle()}
                videoTitle={currentVideoTitle}
            />
        </div>
    );
}

export default MovieDetail;