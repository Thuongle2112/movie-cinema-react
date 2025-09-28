import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import Logo from '../assets/logo.png';

function Footer() {
    const { t } = useLanguage();

    const currentYear = new Date().getFullYear();

    const socialLinks = [
        {
            name: 'Facebook',
            url: 'https://facebook.com',
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
            )
        },
        {
            name: 'Twitter',
            url: 'https://twitter.com',
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
            )
        },
        {
            name: 'YouTube',
            url: 'https://youtube.com',
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
            )
        },
        {
            name: 'LinkedIn',
            url: 'https://linkedin.com',
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.327-.026-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.352V9h3.414v1.561h.049c.476-.9 1.637-1.852 3.37-1.852 3.602 0 4.268 2.37 4.268 5.455v6.288zM5.337 7.433a2.062 2.062 0 1 1 .001-4.124 2.062 2.062 0 0 1-.001 4.124zm1.777 13.019H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                </svg>
            )
        }
    ];

    const footerLinks = [
        {
            title: t('movies'),
            links: [
                { name: t('popularMovies'), to: '/movies/popular' },
                { name: t('topRated'), to: '/movies/top-rated' },
                { name: t('upComing'), to: '/movies/upcoming' },
                { name: t('nowPlaying'), to: '/movies/now-playing' }
            ]
        },
        {
            title: t('tvShows'),
            links: [
                { name: t('popularShows'), to: '/tv/popular' },
                { name: t('topRated'), to: '/tv/top-rated' },
                { name: t('onTV'), to: '/tv/on-air' },
                { name: t('airingToday'), to: '/tv/airing-today' }
            ]
        },
        {
            title: t('about'),
            links: [
                { name: t('aboutUs'), to: '/about' },
                { name: t('contact'), to: '/contact' },
                { name: t('privacyPolicy'), to: '/privacy' },
                { name: t('termsOfService'), to: '/terms' }
            ]
        }
    ];

    return (
        <footer className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center mb-4">
                            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg mr-3">
                                <img src={Logo} alt="Movie Cinema Logo" className="h-10 w-10 object-contain" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                                    {t('brandName')}
                                </h3>
                                <p className="text-sm text-gray-400">{t('brandTagline')}</p>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            {t('brandDescription')}
                        </p>

                        {/* Social Media Icons */}
                        <div className="flex space-x-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative"
                                    aria-label={`Follow us on ${social.name}`}
                                >
                                    <div className="p-3 rounded-full bg-gray-800 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 transition-all duration-300 transform hover:scale-110">
                                        <div className="text-gray-400 group-hover:text-white transition-colors duration-300">
                                            {social.icon}
                                        </div>
                                    </div>

                                    {/* Tooltip */}
                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-700 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                                        {social.name}
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Footer Links */}
                    {footerLinks.map((section) => (
                        <div key={section.title}>
                            <h4 className="text-lg font-semibold mb-4 text-white">
                                {section.title}
                            </h4>
                            <ul className="space-y-2">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            to={link.to}
                                            className="text-gray-400 hover:text-white transition-colors duration-200 text-sm hover:underline"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Newsletter Section */}
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="mb-4 md:mb-0">
                            <h4 className="text-lg font-semibold text-white mb-1">
                                {t('stayUpdated')}
                            </h4>
                            <p className="text-gray-400 text-sm">
                                {t('letterDescription')}
                            </p>
                        </div>

                        <div className="flex w-full md:w-auto">
                            <input
                                type="email"
                                placeholder={`${t('enterEmail')}`}
                                className="flex-1 md:w-64 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                            />
                            <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-r-lg transition-all duration-200 flex items-center">
                                <span className="hidden sm:inline">{t('subscribe')}</span>
                                <svg className="w-4 h-4 sm:ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800 bg-gray-900/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between">
                        <div className="text-gray-400 text-sm mb-4 sm:mb-0">
                            © {currentYear} {t('brandName')}. {t('rights')}
                        </div>

                        <div className="flex items-center space-x-6 text-sm text-gray-400">
                            <Link to="/privacy" className="hover:text-white transition-colors duration-200">
                                {t('privacyPolicy')}
                            </Link>
                            <Link to="/terms" className="hover:text-white transition-colors duration-200">
                                {t('termsOfService')}
                            </Link>
                            <Link to="/cookies" className="hover:text-white transition-colors duration-200">
                                {t('cookiePolicy')}
                            </Link>
                        </div>
                    </div>

                    {/* Credits */}
                    <div className="mt-4 pt-4 border-t border-gray-800 text-center">
                        <p className="text-xs text-gray-500">
                            {t('poweredBy')} {' '}
                            <a
                                href="https://www.themoviedb.org/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                            >
                                {t('tmdb')}
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;