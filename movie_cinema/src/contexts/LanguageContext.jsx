import { createContext, useContext, useState, useEffect } from 'react';
import { en } from '../translations/en';
import { vi } from '../translations/vi';

const LanguageContext = createContext();

const languageMapping = {
    'en': 'en-US',
    'vi': 'vi-VN'
};

const translations = {
    en,
    vi
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const savedLanguage = localStorage.getItem('movieCinemaLanguage');
        if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'vi')) {
            setLanguage(savedLanguage);
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('movieCinemaLanguage', language);
        }
    }, [language, isLoaded]);

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'en' ? 'vi' : 'en');
    };

    const setCurrentLanguage = (lang) => {
        if (lang === 'en' || lang === 'vi') {
            setLanguage(lang);
        }
    };

    const t = (key) => {
        return translations[language][key] || key;
    };

    const getAPILanguage = () => {
        return languageMapping[language] || 'en-US';
    };

    return (
        <LanguageContext.Provider value={{
            language,
            languageCode: languageMapping[language],
            translations: translations[language],
            setCurrentLanguage,
            t,
            getAPILanguage,
            toggleLanguage

        }}>
            {children}
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within LanguageProvider');
    }
    return context;
};
