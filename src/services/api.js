const TMDB_API_KEY = '32814a17bd8b493b485e1a7c2d50ce55';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchTrending = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}`
    );
    if (!response.ok) throw new Error('Failed to fetch trending movies');
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw error;
  }
};

export const fetchPopular = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`
    );
    if (!response.ok) throw new Error('Failed to fetch popular movies');
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};

export const fetchTopRated = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}`
    );
    if (!response.ok) throw new Error('Failed to fetch top rated movies');
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching top rated movies:', error);
    throw error;
  }
};

export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}`
    );
    if (!response.ok) throw new Error('Failed to fetch movie details');
    return await response.json();
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

export const fetchMovieVideos = async (movieId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/videos?api_key=${TMDB_API_KEY}`
    );
    if (!response.ok) throw new Error('Failed to fetch movie videos');
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error fetching movie videos:', error);
    throw error;
  }
};
export const fetchMovies = async (type, page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${type}?api_key=${TMDB_API_KEY}&page=${page}`
    );
    if (!response.ok) throw new Error(`Failed to fetch ${type} movies`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${type} movies:`, error);
    throw error;
  }
};