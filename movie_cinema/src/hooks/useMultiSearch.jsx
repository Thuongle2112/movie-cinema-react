import { useState, useEffect } from 'react';
import { 
    searchMulti, 
    searchMoviesOnly, 
    searchTVShows, 
    searchPeople, 
    searchCollections, 
    searchCompanies, 
    searchKeywords 
} from '../services/api';

export const useMultiSearch = (query, apiLanguage) => {
    const [searchResults, setSearchResults] = useState({
        all: [],
        movies: [],
        tvShows: [],
        people: [],
        collections: [],
        companies: [],
        keywords: []
    });
    
    const [pagination, setPagination] = useState({
        all: { page: 1, totalPages: 0, totalResults: 0 },
        movies: { page: 1, totalPages: 0, totalResults: 0 },
        tvShows: { page: 1, totalPages: 0, totalResults: 0 },
        people: { page: 1, totalPages: 0, totalResults: 0 },
        collections: { page: 1, totalPages: 0, totalResults: 0 },
        companies: { page: 1, totalPages: 0, totalResults: 0 },
        keywords: { page: 1, totalPages: 0, totalResults: 0 }
    });
    
    const [loading, setLoading] = useState({
        all: false,
        movies: false,
        tvShows: false,
        people: false,
        collections: false,
        companies: false,
        keywords: false
    });

    const [activeTab, setActiveTab] = useState('all');

    // Initial search for all categories
    useEffect(() => {
        const performInitialSearch = async () => {
            if (!query.trim()) {
                setSearchResults({
                    all: [],
                    movies: [],
                    tvShows: [],
                    people: [],
                    collections: [],
                    companies: [],
                    keywords: []
                });
                return;
            }

            // Set loading for all categories
            setLoading({
                all: true,
                movies: true,
                tvShows: true,
                people: true,
                collections: true,
                companies: true,
                keywords: true
            });

            try {
                const [
                    multiResults,
                    movieResults,
                    tvResults,
                    peopleResults,
                    collectionResults,
                    companyResults,
                    keywordResults
                ] = await Promise.all([
                    searchMulti(query, 1, apiLanguage),
                    searchMoviesOnly(query, 1, apiLanguage),
                    searchTVShows(query, 1, apiLanguage),
                    searchPeople(query, 1, apiLanguage),
                    searchCollections(query, 1, apiLanguage),
                    searchCompanies(query, 1, apiLanguage),
                    searchKeywords(query, 1, apiLanguage)
                ]);

                setSearchResults({
                    all: multiResults.results,
                    movies: movieResults.results,
                    tvShows: tvResults.results,
                    people: peopleResults.results,
                    collections: collectionResults.results,
                    companies: companyResults.results,
                    keywords: keywordResults.results
                });

                setPagination({
                    all: { page: 1, totalPages: multiResults.total_pages, totalResults: multiResults.total_results },
                    movies: { page: 1, totalPages: movieResults.total_pages, totalResults: movieResults.total_results },
                    tvShows: { page: 1, totalPages: tvResults.total_pages, totalResults: tvResults.total_results },
                    people: { page: 1, totalPages: peopleResults.total_pages, totalResults: peopleResults.total_results },
                    collections: { page: 1, totalPages: collectionResults.total_pages, totalResults: collectionResults.total_results },
                    companies: { page: 1, totalPages: companyResults.total_pages, totalResults: companyResults.total_results },
                    keywords: { page: 1, totalPages: keywordResults.total_pages, totalResults: keywordResults.total_results }
                });

            } catch (error) {
                console.error('Error performing multi search:', error);
            } finally {
                setLoading({
                    all: false,
                    movies: false,
                    tvShows: false,
                    people: false,
                    collections: false,
                    companies: false,
                    keywords: false
                });
            }
        };

        performInitialSearch();
    }, [query, apiLanguage]);

    // Load more function for each category
    const loadMore = async (category) => {
        const currentPagination = pagination[category];
        if (currentPagination.page >= currentPagination.totalPages) return;

        setLoading(prev => ({ ...prev, [category]: true }));

        try {
            let response;
            const nextPage = currentPagination.page + 1;

            switch (category) {
                case 'all':
                    response = await searchMulti(query, nextPage, apiLanguage);
                    break;
                case 'movies':
                    response = await searchMoviesOnly(query, nextPage, apiLanguage);
                    break;
                case 'tvShows':
                    response = await searchTVShows(query, nextPage, apiLanguage);
                    break;
                case 'people':
                    response = await searchPeople(query, nextPage, apiLanguage);
                    break;
                case 'collections':
                    response = await searchCollections(query, nextPage, apiLanguage);
                    break;
                case 'companies':
                    response = await searchCompanies(query, nextPage, apiLanguage);
                    break;
                case 'keywords':
                    response = await searchKeywords(query, nextPage, apiLanguage);
                    break;
                default:
                    return;
            }

            setSearchResults(prev => ({
                ...prev,
                [category]: [...prev[category], ...response.results]
            }));

            setPagination(prev => ({
                ...prev,
                [category]: { ...prev[category], page: nextPage }
            }));

        } catch (error) {
            console.error(`Error loading more ${category}:`, error);
        } finally {
            setLoading(prev => ({ ...prev, [category]: false }));
        }
    };

    return {
        searchResults,
        pagination,
        loading,
        activeTab,
        setActiveTab,
        loadMore
    };
};