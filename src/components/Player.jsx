import { useEffect, useState } from 'react';
import { fetchMovieVideos } from '../services/api';

const Player = ({ movie, onClose }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [playOption, setPlayOption] = useState(null); // 'trailer' or 'full'

  useEffect(() => {
    const loadVideos = async () => {
      try {
        setLoading(true);
        const videos = await fetchMovieVideos(movie.id);
        setVideos(videos);
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, [movie.id]);

  const trailer = videos.find(video => 
    video.type === 'Trailer' && video.site === 'YouTube'
  );

  const fullMovieLink = `https://www.youtube.com/results?search_query=${encodeURIComponent(movie.title + ' full movie')}`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-3xl hover:text-red-500"
      >
        &times;
      </button>
      
      {!playOption ? (
        <div className="bg-gray-800 p-8 rounded-lg max-w-md text-center">
          <h3 className="text-xl font-bold text-white mb-6">Play Options</h3>
          <div className="space-y-4">
            <button
              onClick={() => setPlayOption('trailer')}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-md"
            >
              Watch Trailer
            </button>
            <button
              onClick={() => {
                window.open(fullMovieLink, '_blank');
                onClose();
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md"
            >
              Find Full Movie (External)
            </button>
          </div>
        </div>
      ) : playOption === 'trailer' ? (
        <div className="w-full max-w-4xl">
          {loading ? (
            <div className="aspect-w-16 aspect-h-9 bg-gray-800 flex items-center justify-center">
              <p className="text-white">Loading trailer...</p>
            </div>
          ) : trailer ? (
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                className="w-full h-full"
                frameBorder="0"
                allowFullScreen
                title={trailer.name}
              />
            </div>
          ) : (
            <div className="aspect-w-16 aspect-h-9 bg-gray-800 flex items-center justify-center">
              <p className="text-white">No trailer available</p>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Player;