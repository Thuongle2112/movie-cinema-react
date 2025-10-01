import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../../contexts/FavoritesContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { formatShortDate, getYear } from "../../utils/dateUtils";
import noPosterImage from '../../assets/images/noposter.jpg';

function MovieCard({ movie, contentType }) {
    const navigate = useNavigate();
    const { toggleFavorite, isFavorite } = useFavorites();
    const isMovieFavorite = isFavorite(movie.id);
    const { t, language } = useLanguage();
    const basePath = contentType === 'tv' ? '/tv' : '/movie';
    
    // ✅ Thêm state hover riêng cho từng card
    const [isHovered, setIsHovered] = useState(false);

    const handleFavoriteClick = (e) => {
        e.stopPropagation();
        toggleFavorite(movie);
    };

    function onCardClick() {
        navigate(`${basePath}/${movie.id}`);
    }

    const getTitle = () => {
        return movie?.title || movie?.name || 'Unknown Title';
    };

    const getReleaseDate = () => {
        return movie?.release_date || movie?.first_air_date;
    };

    const getRating = () => {
        return movie?.vote_average ? movie.vote_average.toFixed(1) : '0.0';
    };

    const getRatingPercentage = () => {
        return movie?.vote_average ? Math.round(movie.vote_average * 10) : 0;
    };

    const getRatingColor = (rating) => {
        const numRating = parseFloat(rating);
        if (numRating >= 7.0) return { bg: 'bg-green-600/90', border: 'border-green-400', stroke: '#10b981' };
        if (numRating >= 5.0) return { bg: 'bg-yellow-600/90', border: 'border-yellow-400', stroke: '#f59e0b' };
        return { bg: 'bg-red-600/90', border: 'border-red-400', stroke: '#ef4444' };
    };

    const getPosterImage = () => {
        return movie?.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : noPosterImage;
    };

    const rating = getRating();
    const ratingPercentage = getRatingPercentage();
    const ratingColors = getRatingColor(rating);

    return (
        <div 
            className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={onCardClick}
            onMouseEnter={() => setIsHovered(true)} // ✅ Handle hover state
            onMouseLeave={() => setIsHovered(false)} // ✅ Handle hover state
        >
            <div className="relative overflow-visible">
                <img
                    src={getPosterImage()}
                    alt={`${getTitle()} Poster`}
                    className={`w-full h-full object-cover rounded-lg transition-transform duration-300 ${
                        isHovered ? 'scale-105' : 'scale-100'
                    }`} // ✅ Conditional transform
                    onError={(e) => {
                        e.target.src = noPosterImage;
                    }}
                />

                {/* ✅ Favorite button với conditional opacity */}
                <button
                    onClick={handleFavoriteClick}
                    className={`absolute top-2 right-2 w-10 h-10 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ${
                        isHovered ? 'opacity-100' : 'opacity-0'
                    } ${
                        isMovieFavorite ? 'text-red-500' : 'text-gray-400'
                    }`}
                >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                </button>

                {/* ✅ Rating circle với conditional scale */}
                <div className={`absolute -bottom-5 left-3 w-12 h-12 bg-black/80 backdrop-blur-sm rounded-full flex flex-col items-center justify-center border-2 border-white/20 transition-transform duration-200 ${
                    isHovered ? 'scale-110' : 'scale-100'
                }`}>
                    {/* Background circle for progress */}
                    <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 56 56">
                        <circle
                            cx="28"
                            cy="28"
                            r="24"
                            fill="none"
                            stroke="rgba(255, 255, 255, 0.2)"
                            strokeWidth="3"
                        />
                        <circle
                            cx="28"
                            cy="28"
                            r="24"
                            fill="none"
                            stroke={ratingColors.stroke}
                            strokeWidth="3"
                            strokeDasharray={`${2 * Math.PI * 24}`}
                            strokeDashoffset={`${2 * Math.PI * 24 * (1 - ratingPercentage / 100)}`}
                            strokeLinecap="round"
                            className="transition-all duration-700 ease-out"
                        />
                    </svg>

                    {/* Rating text */}
                    <div className="flex flex-col items-center z-10">
                        <span className="text-white text-xs font-bold leading-none">
                            {rating}
                        </span>
                    </div>
                </div>
            </div>
            
            <div className="pt-8">
                <h2 className="text-xl font-bold text-white mb-2 line-clamp-2">{getTitle()}</h2>
                <p className="text-white/90 text-sm mb-2">
                    {formatShortDate(getReleaseDate(), language)}
                </p>
            </div>
        </div>
    );
}

export default MovieCard;