import YouTube from 'react-youtube';
import { useLanguage } from '../../contexts/LanguageContext';

const TrailerModal = ({ isOpen, onClose, trailerKey, title, videoTitle }) => {
    const { t } = useLanguage();

    if (!isOpen || !trailerKey) return null;

    // Sử dụng videoTitle nếu có, không thì dùng title + "Trailer"
    const modalTitle = videoTitle || title;
    const modalSubtitle = videoTitle ? t('video') : t('trailer');

    return (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 p-2 sm:p-4"
            style={{
                background: 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 100%)'
            }}>
            {/* Modal Backdrop */}
            <div className="absolute inset-0" onClick={onClose}></div>

            {/* Modal Content */}
            <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl max-w-4xl w-full max-h-[90vh] animate-fade-in">
                {/* Modal Header */}
                <div className="flex justify-between items-center p-4 bg-gray-900 border-b border-gray-700">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-white font-semibold text-lg line-clamp-1">{modalTitle}</h3>
                            <p className="text-gray-400 text-sm">{modalSubtitle}</p>
                        </div>
                    </div>

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors duration-200 p-2 hover:bg-gray-800 rounded-full"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Video Player */}
                <div className="relative">
                    <YouTube
                        videoId={trailerKey}
                        opts={{
                            height: '500',
                            width: '100%',
                            playerVars: {
                                autoplay: 1,
                                modestbranding: 1,
                                rel: 0,
                                iv_load_policy: 3
                            }
                        }}
                        onReady={(event) => {
                            event.target.playVideo();
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default TrailerModal;