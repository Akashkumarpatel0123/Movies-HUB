import { useState } from 'react'
import Player from './Player'
import { fetchMovieDetails } from '../services/api' // Assuming you have this API function

const MovieDetails = ({ movieId }) => {
  const [showPlayer, setShowPlayer] = useState(false)
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch movie details when component mounts
  useEffect(() => {
    const loadMovieDetails = async () => {
      try {
        const data = await fetchMovieDetails(movieId)
        setMovie(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadMovieDetails()
  }, [movieId])

  if (loading) return <div className="text-center py-8">Loading movie details...</div>
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>
  if (!movie) return <div className="text-center py-8">Movie not found</div>

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Movie Header */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Movie Poster */}
        <div className="w-full md:w-1/3 lg:w-1/4">
          <img 
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
            alt={movie.title}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        {/* Movie Info */}
        <div className="w-full md:w-2/3 lg:w-3/4">
          <h1 className="text-3xl font-bold text-white mb-2">{movie.title}</h1>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-yellow-400">
              {movie.vote_average.toFixed(1)}/10
            </span>
            <span className="text-gray-300">{movie.release_date}</span>
            <span className="text-gray-300">
              {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
            </span>
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-2 mb-4">
            {movie.genres.map(genre => (
              <span 
                key={genre.id}
                className="px-3 py-1 bg-gray-700 rounded-full text-sm text-white"
              >
                {genre.name}
              </span>
            ))}
          </div>

          {/* Overview */}
          <p className="text-gray-300 mb-6">{movie.overview}</p>

          {/* Play Button */}
          <button 
            onClick={() => setShowPlayer(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md font-medium transition flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            Play Movie
          </button>
        </div>
      </div>

      {/* Player Modal */}
      {showPlayer && (
        <Player 
          movieId={movieId} 
          onClose={() => setShowPlayer(false)} 
        />
      )}
    </div>
  )
}

export default MovieDetails