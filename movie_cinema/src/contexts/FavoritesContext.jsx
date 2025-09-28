import { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load từ localStorage khi khởi tạo
    useEffect(() => {
        const savedFavorites = localStorage.getItem('movieFavorites');
        if (savedFavorites) {
            try {
                const parsed = JSON.parse(savedFavorites);
                setFavorites(Array.isArray(parsed) ? parsed : []);
            } catch (error) {
                console.error('Error loading favorites from localStorage:', error);
                setFavorites([]);
            }
        }
        setIsLoaded(true);
    }, []);

    // Chỉ lưu vào localStorage sau khi đã load xong và có thay đổi
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('movieFavorites', JSON.stringify(favorites));
        }
    }, [favorites, isLoaded]);

    const addToFavorites = (movie) => {
        setFavorites(prev => {
            // Kiểm tra xem movie đã có trong favorites chưa
            if (prev.some(fav => fav.id === movie.id)) {
                return prev;
            }
            return [...prev, movie];
        });
    };

    const removeFromFavorites = (movieId) => {
        setFavorites(prev => prev.filter(m => m.id !== movieId));
    };

    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId);
    };

    const toggleFavorite = (movie) => {
        if (isFavorite(movie.id)) {
            removeFromFavorites(movie.id);
        } else {
            addToFavorites(movie);
        }
    };

    return (
        <FavoritesContext.Provider value={{
            favorites,
            addToFavorites,
            removeFromFavorites,
            isFavorite,
            toggleFavorite
        }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within FavoritesProvider');
    }
    return context;
};