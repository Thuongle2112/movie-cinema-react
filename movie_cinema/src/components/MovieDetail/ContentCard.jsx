import { Link } from 'react-router-dom';

const ContentCard = ({ item, contentType }) => {
    const posterImage = item.poster_path
        ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
        : 'https://via.placeholder.com/300x450/374151/ffffff?text=No+Poster';

    const title = item.title || item.name;
    const releaseYear = item.release_date || item.first_air_date
        ? new Date(item.release_date || item.first_air_date).getFullYear()
        : '';

    const linkPath = contentType === 'tv' ? `/tv/${item.id}` : `/movie/${item.id}`;

    return (
        <Link to={linkPath} className="flex-shrink-0 w-48 group">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg overflow-hidden hover:bg-opacity-20 transition-all duration-200 hover:scale-105">
                <div className="relative">
                    <img
                        src={posterImage}
                        alt={title}
                        className="w-full h-64 object-cover"
                        onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/300x450/374151/ffffff?text=No+Poster';
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-200"></div>
                    
                    {/* Rating Badge */}
                    {item.vote_average > 0 && (
                        <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                            {item.vote_average.toFixed(1)}
                        </div>
                    )}
                </div>
                
                <div className="p-3">
                    <h3 className="text-white font-medium text-sm line-clamp-2 group-hover:text-blue-400 transition-colors">
                        {title}
                    </h3>
                    {releaseYear && (
                        <p className="text-gray-300 text-xs mt-1">{releaseYear}</p>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default ContentCard;