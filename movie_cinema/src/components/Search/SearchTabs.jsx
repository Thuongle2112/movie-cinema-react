import { useLanguage } from '../../contexts/LanguageContext';

const SearchTabs = ({ activeTab, setActiveTab, searchResults }) => {
    const { t } = useLanguage();

    const tabs = [
        { id: 'all', label: t('all'), count: searchResults.all.length },
        { id: 'movies', label: t('movies'), count: searchResults.movies.length },
        { id: 'tvShows', label: t('tvShows'), count: searchResults.tvShows.length },
        { id: 'people', label: t('people'), count: searchResults.people.length },
        { id: 'collections', label: t('collections'), count: searchResults.collections.length },
        { id: 'companies', label: t('companies'), count: searchResults.companies.length },
        { id: 'keywords', label: t('keywords'), count: searchResults.keywords.length }
    ];

    return (
        <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                            activeTab === tab.id
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    >
                        {tab.label}
                        {tab.count > 0 && (
                            <span className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
                                activeTab === tab.id
                                    ? 'bg-blue-100 text-blue-600'
                                    : 'bg-gray-100 text-gray-600'
                            }`}>
                                {tab.count}
                            </span>
                        )}
                    </button>
                ))}
            </nav>
        </div>
    );
};

export default SearchTabs;