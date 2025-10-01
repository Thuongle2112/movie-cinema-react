import { useState } from 'react';
import boyAvatar from '../../assets/images/boy.jpg';
import girlAvatar from '../../assets/images/girl.jpg';

const CastCard = ({ person }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [imageError, setImageError] = useState(false);

    // Get profile image with gender-based fallback
    const getProfileImage = () => {
        if (person.profile_path && !imageError) {
            return `https://image.tmdb.org/t/p/w200${person.profile_path}`;
        }

        // Gender-based fallback: 1 = female, 2 = male, 0 = unknown
        switch (person.gender) {
            case 1:
                return girlAvatar;
            case 2:
                return boyAvatar;
            default:
                // Unknown gender - use neutral avatar or default to boy
                return boyAvatar;
        }
    };

    const handleImageError = () => {
        setImageError(true);
    };

    return (
        <div className="flex-shrink-0 w-32">
            <div
                className="backdrop-blur-sm rounded-lg overflow-hidden transition-all duration-200 cursor-pointer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="w-full h-40 relative">
                    <img
                        src={getProfileImage()}
                        alt={person.name}
                        className="w-full h-full object-cover rounded-lg"
                        onError={handleImageError}
                    />
                </div>

                <div className="p-3">
                    <h3 className={`font-medium text-sm truncate transition-colors ${isHovered ? 'text-blue-400' : 'text-white'
                        }`}>
                        {person.name}
                    </h3>
                    <p className="text-gray-300 text-xs mt-1 truncate">{person.character}</p>
                </div>
            </div>
        </div>
    );
};

export default CastCard;