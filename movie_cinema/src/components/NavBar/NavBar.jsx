import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import Logo from '../../assets/images/logo.png';

function NavBar({ headerState }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileMoviesOpen, setIsMobileMoviesOpen] = useState(false);
    const [isMobileTVOpen, setIsMobileTVOpen] = useState(false);
    const { language, toggleLanguage, t } = useLanguage();

    useEffect(() => {
        if (!headerState.isVisible) {
            setIsMobileMenuOpen(false);
            setIsMobileMoviesOpen(false);
            setIsMobileTVOpen(false);
        }
    }, [headerState.isVisible]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
        setIsMobileMoviesOpen(false);
        setIsMobileTVOpen(false);
    };

    const toggleMobileMovies = () => {
        setIsMobileMoviesOpen(!isMobileMoviesOpen);
        setIsMobileTVOpen(false);
    };

    const toggleMobileTV = () => {
        setIsMobileTVOpen(!isMobileTVOpen);
        setIsMobileMoviesOpen(false);
    };



    // ✅ Dynamic Tailwind classes
    const logoClasses = `
        text-2xl font-bold transition-all duration-200 text-white hover:text-blue-300
    `;

    const navLinkClasses = `
        px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 text-white/90 hover:text-white hover:bg-white/10
    `;

    const languageButtonClasses = `
        flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium 
        border transition-all duration-200 text-white/90 hover:text-white hover:bg-white/10 border-white/30 hover:border-white
    `;

    const mobileButtonClasses = `
        p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 text-white/90 hover:text-white hover:bg-white/10
    `;

    const mobileLinkClasses = `
        block px-3 py-2 text-base font-medium rounded-md transition-all duration-200
        text-white/90 hover:text-white hover:bg-white/10
    `;

    const mobileSubLinkClasses = `
        block px-6 py-2 text-sm font-medium rounded-md transition-all duration-200 ml-3
        text-white/70 hover:text-white/90 hover:bg-white/5
    `;

    const mobileMenuBackgroundClasses = `
        py-3 space-y-1 bg-black/20 backdrop-blur-md
    `;

    const mobileDropdownButtonClasses = `
        flex items-center justify-between w-full px-3 py-2 text-base font-medium rounded-md transition-all duration-200
        text-white/90 hover:text-white hover:bg-white/10
    `;



    return (
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
                <div className="flex items-center space-x-4">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link
                            to="/"
                            className="flex items-center justify-center bg-white/50 backdrop-blur-sm rounded-md transition-all duration-200 hover:bg-white/20 hover:scale-105 p-2"
                            onClick={closeMobileMenu}
                        >
                            <img
                                src={Logo}
                                alt="Movie Cinema Logo"
                                className="h-6 sm:h-8 md:h-10 w-auto object-contain"
                            />
                        </Link>
                    </div>

                    <div className="relative group hidden md:block">
                        <button className="px-4 py-2 text-white cursor-pointer">
                            {t('movies')}
                        </button>
                        <div className="absolute left-0 mt-3 w-44 bg-white shadow-lg rounded-lg opacity-0 py-2 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                            <Link to="/collection/movie/popular" className="block px-4 py-2 hover:bg-gray-100 text-sm">{t('popular')}</Link>
                            <Link to="/collection/movie/now-playing" className="block px-4 py-2 hover:bg-gray-100 text-sm">{t('nowPlaying')}</Link>
                            <Link to="/collection/movie/top-rated" className="block px-4 py-2 hover:bg-gray-100 text-sm">{t('topRated')}</Link>
                            <Link to="/collection/movie/upcoming" className="block px-4 py-2 hover:bg-gray-100 text-sm">{t('upcoming')}</Link>
                        </div>
                    </div>

                    <div className="relative group hidden md:block">
                        <button className="px-4 py-2 text-white cursor-pointer">
                            {t('tvShows')}
                        </button>
                        <div className="absolute left-0 mt-3 w-44 bg-white shadow-lg rounded-lg opacity-0 py-2 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                            <Link to="/collection/tv/popular" className="block px-4 py-2 hover:bg-gray-100 text-sm">{t('popular')}</Link>
                            <Link to="/collection/tv/airing-today" className="block px-4 py-2 hover:bg-gray-100 text-sm">{t('airingToday')}</Link>
                            <Link to="/collection/tv/on-tv" className="block px-4 py-2 hover:bg-gray-100 text-sm">{t('onTV')}</Link>
                            <Link to="/collection/tv/top-rated" className="block px-4 py-2 hover:bg-gray-100 text-sm">{t('topRated')}</Link>
                        </div>
                    </div>
                </div>


                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-1">
                    <Link to="/" className={navLinkClasses}>
                        {t('home')}
                    </Link>
                    <Link to="/favorites" className={navLinkClasses}>
                        {t('favorites')}
                    </Link>

                    {/* Language Switcher */}
                    <button
                        onClick={toggleLanguage}
                        className={languageButtonClasses}
                        title={language === 'en' ? 'Switch to Vietnamese' : 'Chuyển sang Tiếng Anh'}
                    >
                        <span className="text-lg">
                            {language === 'en' ? '🇺🇸' : '🇻🇳'}
                        </span>
                        <span className="font-semibold">
                            {language === 'en' ? 'EN' : 'VI'}
                        </span>
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button
                        onClick={toggleMobileMenu}
                        className={mobileButtonClasses}
                        aria-label="Toggle mobile menu"
                    >
                        <svg
                            className={`h-6 w-6 transform transition-transform duration-200 ${isMobileMenuOpen ? 'rotate-45' : ''
                                }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`
                md:hidden overflow-hidden transition-all duration-300 ease-in-out
                ${isMobileMenuOpen
                    ? 'max-h opacity-100 rounded-b border-t border-white/20'
                    : 'max-h-0 opacity-0'
                }
            `}>
                <div className={mobileMenuBackgroundClasses}>
                    <Link to="/" onClick={closeMobileMenu} className={mobileLinkClasses}>
                        {t('home')}
                    </Link>

                    {/* Mobile Movies Dropdown */}
                    <div>
                        <button
                            onClick={toggleMobileMovies}
                            className={mobileDropdownButtonClasses}
                        >
                            <span>{t('movies')}</span>
                            <svg
                                className={`w-4 h-4 transform transition-transform duration-200 ${isMobileMoviesOpen ? 'rotate-180' : ''
                                    }`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <div className={`
                            overflow-hidden transition-all duration-300 ease-in-out
                            ${isMobileMoviesOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}
                        `}>
                            <Link to="/collection/movie/popular" onClick={closeMobileMenu} className={mobileSubLinkClasses}>
                                {t('popular')}
                            </Link>
                            <Link to="/collection/movie/now-playing" onClick={closeMobileMenu} className={mobileSubLinkClasses}>
                                {t('nowPlaying')}
                            </Link>
                            <Link to="/collection/movie/top-rated" onClick={closeMobileMenu} className={mobileSubLinkClasses}>
                                {t('topRated')}
                            </Link>
                            <Link to="/collection/movie/upcoming" onClick={closeMobileMenu} className={mobileSubLinkClasses}>
                                {t('upcoming')}
                            </Link>
                        </div>
                    </div>

                    {/* Mobile TV Shows Dropdown */}
                    <div>
                        <button
                            onClick={toggleMobileTV}
                            className={mobileDropdownButtonClasses}
                        >
                            <span>{t('tvShows')}</span>
                            <svg
                                className={`w-4 h-4 transform transition-transform duration-200 ${isMobileTVOpen ? 'rotate-180' : ''
                                    }`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <div className={`
                            overflow-hidden transition-all duration-300 ease-in-out
                            ${isMobileTVOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}
                        `}>
                            <Link to="/collection/tv/popular" onClick={closeMobileMenu} className={mobileSubLinkClasses}>
                                {t('popular')}
                            </Link>
                            <Link to="/collection/tv/airing-today" onClick={closeMobileMenu} className={mobileSubLinkClasses}>
                                {t('airingToday')}
                            </Link>
                            <Link to="/collection/tv/on-tv" onClick={closeMobileMenu} className={mobileSubLinkClasses}>
                                {t('onTV')}
                            </Link>
                            <Link to="/collection/tv/top-rated" onClick={closeMobileMenu} className={mobileSubLinkClasses}>
                                {t('topRated')}
                            </Link>
                        </div>
                    </div>

                    <Link to="/favorites" onClick={closeMobileMenu} className={mobileLinkClasses}>
                        {t('favorites')}
                    </Link>

                    {/* Mobile Language Switcher */}
                    <div className="border-t border-white/10 pt-3 px-3 mt-3">
                        <button
                            onClick={() => {
                                toggleLanguage();
                                closeMobileMenu();
                            }}
                            className={`
                                flex items-center justify-center space-x-3 w-full px-3 py-3 
                                rounded-md text-base font-medium border transition-all duration-200 text-white/90 hover:text-white hover:bg-white/10 border-white/30
                            `}
                        >
                            <span className="text-xl">
                                {language === 'en' ? '🇺🇸' : '🇻🇳'}
                            </span>
                            <span className="font-semibold">
                                {language === 'en' ? t('english') : t('vietnamese')}
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;