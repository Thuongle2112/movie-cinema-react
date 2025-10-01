import { useSearchParams, Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { useMultiSearch } from "../hooks/useMultiSearch";
import MovieCard from "../components/Home/MovieCard";
import PersonCard from "../components/Search/PersonCard";
import CollectionCard from "../components/Search/CollectionCard";
import SearchTabs from "../components/Search/SearchTabs";

function SearchResults() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const { t, getAPILanguage, language } = useLanguage();
    const apiLanguage = getAPILanguage();

    const {
        searchResults,
        pagination,
        loading,
        activeTab,
        setActiveTab,
        loadMore
    } = useMultiSearch(query, apiLanguage);

    const renderContent = () => {
        const currentResults = searchResults[activeTab];
        const currentLoading = loading[activeTab];
        const currentPagination = pagination[activeTab];

        if (currentLoading && currentResults.length === 0) {
            return (
                <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
                </div>
            );
        }

        if (currentResults.length === 0) {
            return (
                <div className="text-center py-12">
                    <div className="text-gray-400 text-6xl mb-4">🔍</div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                        {t('noResultsFound')}
                    </h2>
                    <p className="text-gray-600">
                        {t('tryDifferentKeywords')}
                    </p>
                </div>
            );
        }

        return (
            <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
                    {currentResults.map(item => {
                        // ✅ Sửa logic xử lý itemType
                        let itemType;

                        if (activeTab === 'all') {
                            // Với tab 'all', dùng media_type hoặc detect từ data
                            itemType = item.media_type || (item.title ? 'movie' : item.name && item.first_air_date ? 'tv' : 'person');
                        } else if (activeTab === 'tvShows') {
                            itemType = 'tv'; // ✅ Force TV type cho tab tvShows
                        } else if (activeTab === 'movies') {
                            itemType = 'movie'; // ✅ Force movie type cho tab movies
                        } else {
                            // Cho các tab khác (people, collections, etc.)
                            itemType = activeTab.slice(0, -1); // Remove 's' from plural
                        }

                        console.log('Rendering item:', { activeTab, itemType, item: item.id }); // Debug log

                        switch (itemType) {
                            case 'movie':
                                return (
                                    <MovieCard
                                        key={item.id}
                                        movie={item}
                                        contentType="movie"
                                    />
                                );
                            case 'tv':
                                return (
                                    <MovieCard
                                        key={item.id}
                                        movie={item}
                                        contentType="tv"
                                    />
                                );
                            case 'person':
                                return <PersonCard key={item.id} person={item} />;
                            case 'collection':
                                return <CollectionCard key={item.id} collection={item} />;
                            case 'company':
                                return (
                                    <div key={item.id} className="bg-white rounded-lg shadow-md p-4">
                                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                                        <p className="text-sm text-gray-500">{t('company')}</p>
                                    </div>
                                );
                            case 'keyword':
                                return (
                                    <div key={item.id} className="bg-white rounded-lg shadow-md p-4">
                                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                                        <p className="text-sm text-gray-500">{t('keyword')}</p>
                                    </div>
                                );
                            default:
                                console.warn('Unknown item type:', itemType, item); // Debug log
                                return null;
                        }
                    })}
                </div>

                {/* Load More Button */}
                {currentPagination.page < currentPagination.totalPages && (
                    <div className="text-center">
                        <button
                            onClick={() => loadMore(activeTab)}
                            disabled={currentLoading}
                            className={`inline-flex items-center px-6 py-3 font-medium rounded-lg transition-colors duration-200 ${currentLoading
                                ? 'bg-gray-400 text-white cursor-not-allowed'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                                }`}
                        >
                            {currentLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    {t('loading')}
                                </>
                            ) : (
                                <>
                                    {t('loadMore')}
                                    <span className="ml-2 text-sm opacity-75">
                                        ({currentPagination.page} / {currentPagination.totalPages})
                                    </span>
                                </>
                            )}
                        </button>
                    </div>
                )}

                {/* Results Counter */}
                <div className="text-center mt-4 text-sm text-gray-500">
                    {t('showing')} {currentResults.length} {t('of')} {currentPagination.totalResults.toLocaleString()} {t('results')}
                </div>
            </>
        );
    };

    if (!query) {
        return (
            <div className="min-h-screen w-full bg-gray-50 py-8 px-4">
                <div className="w-full max-w-7xl mx-auto text-center py-12">
                    <div className="text-gray-400 text-6xl mb-4">🎬</div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">{t('startSearching')}</h2>
                    <p className="text-gray-600 mb-6">{t('enterSearchTerm')}</p>
                    <Link
                        to="/"
                        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                        {t('goToHome')}
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-gray-900 to-black py-8 px-4">
            <div className="w-full max-w-7xl mx-auto">
                {/* Header */}
                <div className="mt-16 mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        {t('searchResults')}
                    </h1>
                    <p className="text-gray-600">
                        {t('resultsFor')} "<span className="font-semibold">{query}</span>"
                    </p>
                </div>

                {/* Search Tabs */}
                <SearchTabs
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    searchResults={searchResults}
                />

                {/* Content */}
                {renderContent()}
            </div>
        </div>
    );
}

export default SearchResults;