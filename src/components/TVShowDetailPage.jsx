import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchTVShowDetails, fetchTVShowVideos, fetchSimilarTVShows } from '../services/api';
import LoadingSkeleton from '../components/LoadingSkeleton';
import Player from '../components/Player';
import Section from '../components/Section';
import { FaStar, FaCalendarAlt, FaPlay } from 'react-icons/fa';
import { MdArrowBack } from 'react-icons/md';

const TVShowDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tvShow, setTVShow] = useState(null);
  const [videos, setVideos] = useState([]);
  const [similarShows, setSimilarShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [details, videosData, similar] = await Promise.all([
          fetchTVShowDetails(id),
          fetchTVShowVideos(id),
          fetchSimilarTVShows(id)
        ]);

        setTVShow(details);
        setVideos(videosData.results || []);
        setSimilarShows(similar.results || []);
      } catch (err) {
        setError(err.message || 'Failed to load TV show details');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleBackClick = () => {
    navigate(-1); // Go back to previous page
  };

  const handlePlayClick = () => {
    setShowPlayer(true);
  };

  if (loading) return <LoadingSkeleton />;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  if (!tvShow) return <div className="text-center py-8">TV Show not found</div>;

  const trailer = videos.find(video => video.type === 'Trailer' && video.site === 'YouTube');

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {showPlayer && trailer && (
        <Player 
          videoId={trailer.key} 
          onClose={() => setShowPlayer(false)} 
        />
      )}

      {/* Backdrop Image */}
      <div className="relative h-96 w-full">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10" />
        <img
          src={
            tvShow.backdrop_path
              ? `https://image.tmdb.org/t/p/w1280${tvShow.backdrop_path}`
              : '/placeholder-backdrop.jpg'
          }
          alt={tvShow.name}
          className="w-full h-full object-cover"
        />
        
        {/* Back Button */}
        <button
          onClick={handleBackClick}
          className="absolute top-4 left-4 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
        >
          <MdArrowBack size={24} />
        </button>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10 -mt-20">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="w-full md:w-1/3 lg:w-1/4 -mt-16">
            <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-xl">
              <img
                src={
                  tvShow.poster_path
                    ? `https://image.tmdb.org/t/p/w500${tvShow.poster_path}`
                    : '/placeholder-poster.jpg'
                }
                alt={tvShow.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div className="w-full md:w-2/3 lg:w-3/4 py-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{tvShow.name}</h1>
            
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex items-center">
                <FaStar className="text-yellow-400 mr-1" />
                <span>{tvShow.vote_average.toFixed(1)}</span>
              </div>
              
              <div className="flex items-center">
                <FaCalendarAlt className="text-gray-400 mr-1" />
                <span>{tvShow.first_air_date}</span>
              </div>
              
              <span>|</span>
              
              <div>
                {tvShow.genres.map(genre => (
                  <span key={genre.id} className="mr-2">{genre.name}</span>
                ))}
              </div>
              
              <span>|</span>
              
              <div>
                {tvShow.number_of_seasons} season{tvShow.number_of_seasons !== 1 ? 's' : ''}
              </div>
            </div>

            {trailer && (
              <button
                onClick={handlePlayClick}
                className="mb-6 flex items-center bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
              >
                <FaPlay className="mr-2" />
                Watch Trailer
              </button>
            )}

            <div className="mb-8">
              <h2 className="text-xl font-bold mb-2">Overview</h2>
              <p className="text-gray-300">{tvShow.overview || 'No overview available.'}</p>
            </div>

            {tvShow.created_by?.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-2">Created By</h2>
                <div className="flex flex-wrap gap-4">
                  {tvShow.created_by.map(creator => (
                    <div key={creator.id} className="flex items-center">
                      {creator.profile_path && (
                        <img
                          src={`https://image.tmdb.org/t/p/w200${creator.profile_path}`}
                          alt={creator.name}
                          className="w-10 h-10 rounded-full object-cover mr-2"
                        />
                      )}
                      <span>{creator.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tvShow.networks?.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-2">Networks</h2>
                <div className="flex flex-wrap gap-4">
                  {tvShow.networks.map(network => (
                    <div key={network.id}>
                      {network.logo_path && (
                        <img
                          src={`https://image.tmdb.org/t/p/w200${network.logo_path}`}
                          alt={network.name}
                          className="h-8 object-contain"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Similar TV Shows */}
        {similarShows.length > 0 && (
          <div className="mt-12">
            <Section
              title="Similar TV Shows"
              items={similarShows}
              onItemClick={(show) => navigate(`/tv/${show.id}`)}
              mediaType="tv"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TVShowDetailPage;