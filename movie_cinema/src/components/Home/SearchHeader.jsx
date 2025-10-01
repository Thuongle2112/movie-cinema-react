import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import background1 from '../../assets/images/background1.jpg';

const SearchHeader = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const { t } = useLanguage();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
        <div
            className="rounded-2xl shadow-xl mb-8 p-8 text-center relative overflow-hidden bg-cover bg-center"
            style={{ backgroundImage: `url(${background1})` }}
        >
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <div className="absolute top-4 left-4 w-16 h-16 bg-white rounded-full"></div>
                <div className="absolute top-8 right-8 w-8 h-8 bg-white rounded-full"></div>
                <div className="absolute bottom-4 left-8 w-12 h-12 bg-white rounded-full"></div>
                <div className="absolute bottom-8 right-4 w-6 h-6 bg-white rounded-full"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 pt-50">
                <h1 className="text-6xl font-bold text-white mb-2">{t('movieCinema')}</h1>
                <p className="text-2xl mb-8 text-white">{t('contentSearch')}</p>

                {/* Search Container */}
                <div className="bg-opacity-20">
                    <form onSubmit={handleSearch} className="max-w-2xl mx-auto w-full">
                        <div className="flex gap-3">
                            <div className="flex-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    name="search"
                                    placeholder={t('searchPlaceholder')}
                                    className="w-full pl-10 pr-4 py-3 bg-white bg-opacity-90 backdrop-blur-sm border border-white border-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:border-transparent shadow-sm text-gray-700 placeholder-gray-500"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <button
                                type="submit"
                                className="px-6 py-3 bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 text-white font-semibold rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all duration-200 shadow-sm flex items-center space-x-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <span>{t('search')}</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SearchHeader;