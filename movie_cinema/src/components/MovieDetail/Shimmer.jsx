export const ShimmerBox = ({ className = "" }) => (
    <div
        className={`bg-gray-300 animate-pulse rounded ${className}`}
        style={{
            background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite'
        }}
    />
);

export const ShimmerText = ({ lines = 1, className = "" }) => (
    <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, index) => (
            <ShimmerBox
                key={index}
                className={`h-4 ${index === lines - 1 ? 'w-3/4' : 'w-full'}`}
            />
        ))}
    </div>
);

export const ShimmerPoster = ({ className = "" }) => (
    <div className={`aspect-[3/4] ${className}`}>
        <ShimmerBox className="w-full h-full" />
    </div>
);

export const ShimmerButton = ({ className = "" }) => (
    <ShimmerBox className={`h-12 w-32 ${className}`} />
);

export const ShimmerInfoCard = ({ className = "" }) => (
    <div className={`bg-gray-50 bg-opacity-50 backdrop-blur-sm rounded-lg p-4 ${className}`}>
        <ShimmerBox className="h-3 w-20 mb-2" />
        <ShimmerBox className="h-5 w-32" />
    </div>
);