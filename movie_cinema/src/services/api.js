const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL

if (!API_KEY) {
    console.error('❌ TMDB API Key is missing! Please check your .env file.');
}

export const getPopularMovies = async (language = 'vi-VN', contentType = 'movie', page = 1) => {
    const response = await fetch(`${BASE_URL}/${contentType}/popular?api_key=${API_KEY}&language=${language}&page=${page}`);
    const data = await response.json();
    return data.results;
}

// export const searchMovies = async (query, language = 'vi-VN') => {
//     const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=${language}&query=${query}&page=1&include_adult=false`);
//     const data = await response.json();
//     return data.results;
// }



// export const searchMoviesWithPagination = async (query, page = 1, language = 'vi-VN') => {
//     const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=${language}&query=${query}&page=${page}&include_adult=false`);
//     const data = await response.json();
//     return data;
// }

export const getTrendingMovies = async (language = 'vi-VN', timeWindow = 'day') => {
    const response = await fetch(`${BASE_URL}/trending/all/${timeWindow}?api_key=${API_KEY}&language=${language}`);
    const data = await response.json();
    return data.results;
}

export const getTopRatedMovies = async (language = 'vi-VN', contentType = 'movie', page = 1) => {
    const response = await fetch(`${BASE_URL}/${contentType}/top_rated?api_key=${API_KEY}&language=${language}&page=${page}`);
    const data = await response.json();
    return data.results;
}

export const getNowPlayingMovies = async (language = 'vi-VN', page = 1) => {
    try {
        const response = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=${language}&page=${page}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching now playing movies:', error);
        return { results: [] };
    }
};

export const getUpcomingMovies = async (language = 'vi-VN', page = 1) => {
    try {
        const response = await fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=${language}&page=${page}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching upcoming movies:', error);
        return { results: [] };
    }
};

export const getAiringTodayTV = async (language = 'vi-VN', page = 1) => {
    try {
        const response = await fetch(`${BASE_URL}/tv/airing_today?api_key=${API_KEY}&language=${language}&page=${page}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching airing today TV:', error);
        return { results: [] };
    }
};

export const getOnTheAirTV = async (language = 'vi-VN', page = 1) => {
    try {
        const response = await fetch(`${BASE_URL}/tv/on_the_air?api_key=${API_KEY}&language=${language}&page=${page}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching on the air TV:', error);
        return { results: [] };
    }
};

export const getPopularTV = async (language = 'vi-VN', page = 1) => {
    try {
        const response = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=${language}&page=${page}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching popular TV:', error);
        return { results: [] };
    }
};

export const getTopRatedTV = async (language = 'vi-VN', page = 1) => {
    try {
        const response = await fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=${language}&page=${page}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching top rated TV:', error);
        return { results: [] };
    }
};

export const getMovieTrailer = async (id, contentType = 'movie') => {
    try {
        const endpoint = contentType === 'tv' ? 'tv' : 'movie';
        const response = await fetch(
            `${BASE_URL}/${endpoint}/${id}/videos?api_key=${API_KEY}&language=en-US`
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch ${contentType} trailers`);
        }

        const data = await response.json();

        const trailer =
            data.results.find(video =>
                video.type === 'Trailer' &&
                video.site === 'YouTube' &&
                video.official === true
            ) ||
            data.results.find(video =>
                video.type === 'Trailer' &&
                video.site === 'YouTube'
            ) ||
            data.results.find(video =>
                video.type === 'Teaser' &&
                video.site === 'YouTube'
            );

        return trailer || null;
    } catch (error) {
        console.error(`Error fetching ${contentType} trailers:`, error);
        return null;
    }
};

export const getMovieDetails = async (id, language = 'vi-VN', contentType = 'movie') => {
    try {
        const endpoint = contentType === 'tv' ? 'tv' : 'movie';
        const response = await fetch(
            `${BASE_URL}/${endpoint}/${id}?api_key=${API_KEY}&language=${language}`
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch ${contentType} details`);
        }

        const data = await response.json();
        if (contentType === 'tv') {
            return {
                ...data,

                title: data.name,
                release_date: data.first_air_date,
                runtime: data.episode_run_time?.[0] || null
            };
        }

        return data;
    } catch (error) {
        console.error(`Error fetching ${contentType} details:`, error);
        throw error;
    }
};


export const getCredits = async (id, contentType = 'movie') => {
    try {
        const endpoint = contentType === 'tv' ? 'tv' : 'movie';
        const response = await fetch(
            `${BASE_URL}/${endpoint}/${id}/credits?api_key=${API_KEY}`
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch ${contentType} credits`);
        }

        const data = await response.json();
        return {
            cast: data.cast || [],
            crew: data.crew || []
        };
    } catch (error) {
        console.error(`Error fetching ${contentType} credits:`, error);
        return { cast: [], crew: [] };
    }
};

export const getSimilarMovies = async (id, language = 'vi-VN', contentType = 'movie', page = 1) => {
    try {
        const endpoint = contentType === 'tv' ? 'tv' : 'movie';
        const response = await fetch(
            `${BASE_URL}/${endpoint}/${id}/similar?api_key=${API_KEY}&language=${language}&page=${page}`
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch similar ${contentType}s`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching similar ${contentType}s:`, error);
        return { results: [], total_pages: 0 };
    }
};

export const getMovieRecommendations = async (id, language = 'vi-VN', contentType = 'movie', page = 1) => {
    try {
        const endpoint = contentType === 'tv' ? 'tv' : 'movie';
        const response = await fetch(
            `${BASE_URL}/${endpoint}/${id}/recommendations?api_key=${API_KEY}&language=${language}&page=${page}`
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch ${contentType} recommendations`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching ${contentType} recommendations:`, error);
        return { results: [], total_pages: 0 };
    }
};

export const getMovieReviews = async (id, language = 'en-US', contentType = 'movie', page = 1) => {
    try {
        const endpoint = contentType === 'tv' ? 'tv' : 'movie';
        const response = await fetch(
            `${BASE_URL}/${endpoint}/${id}/reviews?api_key=${API_KEY}&language=${language}&page=${page}`
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch ${contentType} reviews`);
        }

        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error(`Error fetching ${contentType} reviews:`, error);
        return [];
    }
};

export const getOfficialVideos = async (id, contentType = 'movie') => {
    try {
        const endpoint = contentType === 'tv' ? 'tv' : 'movie';
        const response = await fetch(
            `${BASE_URL}/${endpoint}/${id}/videos?api_key=${API_KEY}&language=en-US`
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch ${contentType} videos`);
        }

        const data = await response.json();

        // Filter for official videos only
        const officialVideos = data.results.filter(video =>
            video.site === 'YouTube' && video.official === true
        );

        return officialVideos;
    } catch (error) {
        console.error(`Error fetching ${contentType} videos:`, error);
        return [];
    }
};

// Multi search - tìm kiếm tất cả loại content
export const searchMulti = async (query, page = 1, language = 'vi-VN') => {
    try {
        const response = await fetch(
            `${BASE_URL}/search/multi?api_key=${API_KEY}&language=${language}&query=${query}&page=${page}&include_adult=false`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error searching multi content:', error);
        return { results: [], total_pages: 0, total_results: 0 };
    }
};

// Tìm kiếm movies
export const searchMoviesOnly = async (query, page = 1, language = 'vi-VN') => {
    try {
        const response = await fetch(
            `${BASE_URL}/search/movie?api_key=${API_KEY}&language=${language}&query=${query}&page=${page}&include_adult=false`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error searching movies:', error);
        return { results: [], total_pages: 0, total_results: 0 };
    }
};

// Tìm kiếm TV shows
export const searchTVShows = async (query, page = 1, language = 'vi-VN') => {
    try {
        const response = await fetch(
            `${BASE_URL}/search/tv?api_key=${API_KEY}&language=${language}&query=${query}&page=${page}&include_adult=false`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error searching TV shows:', error);
        return { results: [], total_pages: 0, total_results: 0 };
    }
};

// Tìm kiếm người
export const searchPeople = async (query, page = 1, language = 'vi-VN') => {
    try {
        const response = await fetch(
            `${BASE_URL}/search/person?api_key=${API_KEY}&language=${language}&query=${query}&page=${page}&include_adult=false`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error searching people:', error);
        return { results: [], total_pages: 0, total_results: 0 };
    }
};

// Tìm kiếm collections
export const searchCollections = async (query, page = 1, language = 'vi-VN') => {
    try {
        const response = await fetch(
            `${BASE_URL}/search/collection?api_key=${API_KEY}&language=${language}&query=${query}&page=${page}&include_adult=false`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error searching collections:', error);
        return { results: [], total_pages: 0, total_results: 0 };
    }
};

// Tìm kiếm companies
export const searchCompanies = async (query, page = 1, language = 'vi-VN') => {
    try {
        const response = await fetch(
            `${BASE_URL}/search/company?api_key=${API_KEY}&language=${language}&query=${query}&page=${page}&include_adult=false`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error searching companies:', error);
        return { results: [], total_pages: 0, total_results: 0 };
    }
};

// Tìm kiếm keywords
export const searchKeywords = async (query, page = 1, language = 'vi-VN') => {
    try {
        const response = await fetch(
            `${BASE_URL}/search/keyword?api_key=${API_KEY}&language=${language}&query=${query}&page=${page}&include_adult=false`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error searching keywords:', error);
        return { results: [], total_pages: 0, total_results: 0 };
    }
};
