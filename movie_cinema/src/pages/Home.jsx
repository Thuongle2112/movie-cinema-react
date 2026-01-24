import { useLanguage } from "../contexts/LanguageContext";
import { useHomeData } from "../hooks/useHomeData";
import SearchHeader from "../components/Home/SearchHeader";
import HorizontalMovieScroll from "../components/Home/HorizontalMovieScroll";
import SectionWithToggle from "../components/Home/SectionWithToggle";
import AdSense from "../components/AdSense";

function Home() {
    const { t, getAPILanguage, language } = useLanguage();

    const {
        movies,
        trendingMovies,
        topRatedMovies,
        loading,
        trendingLoading,
        popularContentType,
        topRatedContentType,
        trendingContentType,
        setPopularContentType,
        setTopRatedContentType,
        setTrendingContentType
    } = useHomeData(language, getAPILanguage);

    const contentTypeOptions = [
        { value: 'movie', label: t('movies') },
        { value: 'tv', label: t('tvShows') }
    ];

    const trendingOptions = [
        { value: 'day', label: t('today') },
        { value: 'week', label: t('thisWeek') }
    ];

    if (loading) {
        return (
            <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">{t('loading')}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-gray-900 to-black py-8 px-4">
            <div className="w-full max-w-7xl mx-auto">
                {/* Search Header */}
                <SearchHeader />

                {/* Trending Section */}
                <SectionWithToggle
                    title={t('trending')}
                    movies={trendingMovies}
                    contentType="trending"
                    toggleOptions={trendingOptions}
                    activeOption={trendingContentType}
                    onOptionChange={setTrendingContentType}
                    loading={trendingLoading}
                />

                {/* Popular Section */}
                <SectionWithToggle
                    title={t('whatPopular')}
                    movies={movies}
                    contentType={popularContentType}
                    toggleOptions={contentTypeOptions}
                    activeOption={popularContentType}
                    onOptionChange={setPopularContentType}
                    loading={false}
                />

                {/* AdSense Banner */}
                <div className="my-8">
                    <AdSense
                        client="ca-pub-2029502431652074"
                        slot="1234567890"
                        format="auto"
                        responsive={true}
                        className="rounded-lg overflow-hidden"
                    />
                </div>

                {/* Top Rated Section */}
                <SectionWithToggle
                    title={t('topRated')}
                    movies={topRatedMovies}
                    contentType={topRatedContentType}
                    toggleOptions={contentTypeOptions}
                    activeOption={topRatedContentType}
                    onOptionChange={setTopRatedContentType}
                    loading={false}
                />
            </div>
        </div>
    );
}

export default Home;