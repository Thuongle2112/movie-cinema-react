import { useState } from 'react';

const VideoCard = ({ video, onPlay }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const thumbnailUrl = `https://img.youtube.com/vi/${video.key}/hqdefault.jpg`;

    const getVideoTypeIcon = (type) => {
        switch (type.toLowerCase()) {
            case 'trailer':
                return '🎬';
            case 'teaser':
                return '👀';
            case 'clip':
                return '📹';
            case 'featurette':
                return '🎭';
            default:
                return '📺';
        }
    };

    return (
        <div className="flex-shrink-0 w-80">
            <div
                className=" transition-all duration-200 cursor-pointer hover:bg-opacity-20 hover:scale-105"
                onClick={() => onPlay(video.key, video.name)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="relative">
                    <img
                        src={thumbnailUrl}
                        alt={video.name}
                        className="w-full h-44 object-cover"
                        onLoad={() => setImageLoaded(true)}
                        onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/320x180/374151/ffffff?text=Video';
                        }}
                    />

                    {/* Play Button Overlay - Only show on individual card hover */}
                    <div className={`absolute inset-0 flex items-center justify-center bg-opacity-30 transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'
                        }`}>
                        <div className={`bg-red-600 rounded-full p-3 transition-transform duration-200 ${isHovered ? 'scale-110' : 'scale-100'
                            }`}>
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                            </svg>
                        </div>
                    </div>

                    {/* Video Type Badge */}
                    <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded flex items-center space-x-1">
                        <span>{getVideoTypeIcon(video.type)}</span>
                        <span>{video.type}</span>
                    </div>

                    {/* Duration/Quality Badge */}
                    {video.size && (
                        <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                            {video.size}p
                        </div>
                    )}
                </div>

                <div className="p-3">
                    <h3 className={`font-medium text-sm line-clamp-2 transition-colors ${isHovered ? 'text-blue-400' : 'text-white'
                        }`}>
                        {video.name}
                    </h3>
                    <p className="text-gray-300 text-xs mt-1">
                        {video.published_at && new Date(video.published_at).toLocaleDateString()}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VideoCard;