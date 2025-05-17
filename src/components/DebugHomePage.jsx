import { useState, useEffect } from 'react';
import { fetchTrending } from '../services/api';

const DebugHomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const testFetch = async () => {
      try {
        const data = await fetchTrending();
        console.log('API Response:', data);
        setMovies(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Fetch Error:', error);
      } finally {
        setLoading(false);
      }
    };
    testFetch();
  }, []);

  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-white mb-4">Debug Output</h1>
      
      <div className="grid grid-cols-2 gap-4">
        {movies.slice(0, 4).map(movie => (
          <div key={movie.id} className="bg-gray-800 p-2 rounded">
            <h3 className="text-white">{movie.title}</h3>
            {movie.poster_path && (
              <img 
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} 
                alt={movie.title}
                className="w-full"
              />
            )}
            <p className="text-gray-400 text-sm">ID: {movie.id}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-900 text-white">
        <h2 className="text-xl font-bold mb-2">Debug Info</h2>
        <p>Movies count: {movies.length}</p>
        <p>First movie title: {movies[0]?.title || 'None'}</p>
        <p>First movie poster: {movies[0]?.poster_path || 'None'}</p>
      </div>
    </div>
  );
};

export default DebugHomePage;