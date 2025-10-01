const CollectionCard = ({ collection }) => {
    const posterImage = collection.poster_path
        ? `https://image.tmdb.org/t/p/w300${collection.poster_path}`
        : 'https://via.placeholder.com/300x450/374151/ffffff?text=No+Poster';

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <img
                src={posterImage}
                alt={collection.name}
                className="w-full h-64 object-cover"
                onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x450/374151/ffffff?text=No+Poster';
                }}
            />
            <div className="p-4">
                <h3 className="font-medium text-gray-900 line-clamp-2">{collection.name}</h3>
                {collection.overview && (
                    <p className="text-sm text-gray-500 mt-2 line-clamp-3">{collection.overview}</p>
                )}
            </div>
        </div>
    );
};

export default CollectionCard;