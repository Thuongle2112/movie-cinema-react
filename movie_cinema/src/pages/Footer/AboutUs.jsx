import { useLanguage } from '../../contexts/LanguageContext';
import { usePageTitle } from "../../hooks/useDocumentTitle";

function AboutUs() {
    const { t } = useLanguage();
    usePageTitle(t('aboutUs'));

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black py-20 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Mission Section */}
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 mb-8 border border-white/20">
                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                        <svg className="w-8 h-8 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        {t('ourMission')}
                    </h2>
                    <p className="text-gray-300 leading-relaxed">
                        {t('missionDescription')}
                    </p>
                </div>

                {/* Vision Section */}
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 mb-8 border border-white/20">
                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                        <svg className="w-8 h-8 mr-3 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        {t('ourVision')}
                    </h2>
                    <p className="text-gray-300 leading-relaxed">
                        {t('visionDescription')}
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                        <div className="text-blue-500 mb-3">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">{t('vastLibrary')}</h3>
                        <p className="text-gray-400 text-sm">{t('vastLibraryDesc')}</p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                        <div className="text-purple-500 mb-3">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">{t('fastUpdates')}</h3>
                        <p className="text-gray-400 text-sm">{t('fastUpdatesDesc')}</p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                        <div className="text-green-500 mb-3">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">{t('userFriendly')}</h3>
                        <p className="text-gray-400 text-sm">{t('userFriendlyDesc')}</p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                        <div className="text-yellow-500 mb-3">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">{t('multilingual')}</h3>
                        <p className="text-gray-400 text-sm">{t('multilingualDesc')}</p>
                    </div>
                </div>

                {/* Team Section */}
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20">
                    <h2 className="text-2xl font-bold text-white mb-6 text-center">{t('ourTeam')}</h2>
                    <p className="text-gray-300 text-center leading-relaxed">
                        {t('teamDescription')}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;