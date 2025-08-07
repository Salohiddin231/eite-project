// src/shared/useFavorite.js
import { useState, useEffect, useCallback } from 'react';

export function useFavorite(item) {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('favorites') || '[]');
        setFavorites(stored);
    }, []);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const isFavorite = item ? favorites.some(fav => fav.id === item.id) : false;

    const addFavorite = useCallback(() => {
        if (!item) return;
        setFavorites(prev => {
            const exists = prev.some(fav => fav.id === item.id);
            return exists ? prev : [...prev, item];
        });
    }, [item]);

    const removeFavorite = useCallback(() => {
        if (!item) return;
        setFavorites(prev => prev.filter(fav => fav.id !== item.id));
    }, [item]);

    return { isFavorite, addFavorite, removeFavorite, favorites };
}
