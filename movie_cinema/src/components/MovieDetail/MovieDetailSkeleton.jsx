import { ShimmerBox, ShimmerText, ShimmerPoster, ShimmerButton, ShimmerInfoCard } from './Shimmer';

function MovieDetailSkeleton({ contentBackground }) {
    return (
        <div
            className="min-h-screen w-full py-8 px-4"
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
            <div className="w-full max-w-6xl mx-auto">
                <div className="md:flex">
                    {/* Poster Skeleton */}
                    <div className="md:w-1/3 rounded-lg overflow-hidden">
                        <ShimmerPoster />
                    </div>

                    {/* Content Skeleton */}
                    <div className="md:w-2/3 md:pl-8 mt-6 md:mt-0">
                        {/* Title Skeleton */}
                        <div className="mb-4">
                            <ShimmerBox className="h-10 w-3/4 mb-2" />
                            <ShimmerBox className="h-4 w-1/2" />
                        </div>

                        {/* Trailer Button Skeleton */}
                        <div className="mb-6">
                            <ShimmerButton />
                        </div>

                        {/* Tagline Skeleton */}
                        <div className="mb-4">
                            <ShimmerBox className="h-3 w-2/3" />
                        </div>

                        {/* Genres Skeleton */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {Array.from({ length: 3 }).map((_, index) => (
                                <ShimmerBox key={index} className="h-6 w-16 rounded-full" />
                            ))}
                        </div>

                        {/* Info Grid Skeleton */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <ShimmerInfoCard />
                            <ShimmerInfoCard />
                            <ShimmerInfoCard />
                            <ShimmerInfoCard />
                        </div>

                        {/* Overview Skeleton */}
                        <div>
                            <ShimmerBox className="h-6 w-24 mb-3" />
                            <ShimmerText lines={4} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieDetailSkeleton;