const PersonCard = ({ person }) => {
    const profileImage = person.profile_path
        ? `https://image.tmdb.org/t/p/w200${person.profile_path}`
        : 'https://via.placeholder.com/200x300/374151/ffffff?text=No+Photo';

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <img
                src={profileImage}
                alt={person.name}
                className="w-full h-64 object-cover"
                onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/200x300/374151/ffffff?text=No+Photo';
                }}
            />
            <div className="p-4">
                <h3 className="font-medium text-gray-900 truncate">{person.name}</h3>
                {person.known_for_department && (
                    <p className="text-sm text-gray-500 mt-1">{person.known_for_department}</p>
                )}
                {person.known_for && person.known_for.length > 0 && (
                    <p className="text-xs text-gray-400 mt-2 line-clamp-2">
                        Known for: {person.known_for.map(item => item.title || item.name).join(', ')}
                    </p>
                )}
            </div>
        </div>
    );
};

export default PersonCard;