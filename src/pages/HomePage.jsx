import { useState, useEffect, useCallback } from 'react';
import Section from '../components/Section';
import LoadingSkeleton from '../components/LoadingSkeleton';
import Player from '../components/Player';
import Pagination from '../components/Pagination';
import { fetchMovies } from '../services/api';

const tabs = [
  { key: 'now_playing', label: 'Now Playing' },
  { key: 'popular', label: 'Popular' },
  { key: 'top_rated', label: 'Top Rated' },
  { key: 'upcoming', label: 'Upcoming' }
];

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('now_playing');
  const [moviesData, setMoviesData] = useState(
    tabs.reduce((acc, tab) => ({
      ...acc,
      [tab.key]: { results: [], page: 1, total_pages: 1 }
    }), {})
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const fetchSectionData = useCallback(async (type, page) => {
    try {
      const data = await fetchMovies(type, page);
      return {
        results: data.results || [],
        page: data.page || 1,
        total_pages: Math.min(data.total_pages || 1, 500)
      };
    } catch (err) {
      console.error(`Error fetching ${type} movies:`, err);
      throw err;
    }
  }, []);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchSectionData(activeTab, moviesData[activeTab].page);

      setMoviesData(prev => ({
        ...prev,
        [activeTab]: data
      }));

      if (isInitialLoad) setIsInitialLoad(false);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Failed to load movies. Please try again.');
    }
  }, [activeTab, fetchSectionData, moviesData, isInitialLoad]);

  useEffect(() => {
    if (moviesData[activeTab].results.length === 0 || isInitialLoad) {
      loadData();
    }
  }, [activeTab, loadData, moviesData, isInitialLoad]);

  useEffect(() => {
    if (!isInitialLoad) {
      loadData();
    }
  }, [moviesData[activeTab].page]);

  const handlePageChange = (page) => {
    setMoviesData(prev => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        page: Math.max(1, Math.min(page, prev[activeTab].total_pages))
      }
    }));
  };

  const handleMovieClick = (movie) => {
    if (movie?.id) {
      setSelectedMovie(movie);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePlayerClose = () => {
    setSelectedMovie(null);
  };

  const currentTabData = moviesData[activeTab];
  const activeTabLabel = tabs.find(tab => tab.key === activeTab)?.label || 'Movies';

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8 pt-20">
        {selectedMovie && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl">
              <Player movie={selectedMovie} onClose={handlePlayerClose} />
            </div>
          </div>
        )}

        {/* Enhanced Tabs Navigation with better visibility */}
        <div className="flex overflow-x-auto pb-2 mb-8 scrollbar-hide">
          <div className="flex space-x-2 mx-auto">
            {tabs.map(tab => (
              <button
                key={tab.key}
                className={`px-6 py-3 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  activeTab === tab.key
                    ? tab.key === 'now_playing'
                      ? 'bg-blue-600 text-white shadow-md' // Special color for Now Playing
                      : 'bg-red-600 text-white shadow-md' // Default active color
                    : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-300' // Inactive style
                }`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8 text-center">
            <div className="text-red-500 text-lg font-medium mb-4">
              {error}
            </div>
            <button
              onClick={loadData}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-medium transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {loading && <LoadingSkeleton />}

        {!loading && !error && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <Section
              title={activeTabLabel}
              movies={currentTabData.results}
              onMovieClick={handleMovieClick}
            />
            
            {currentTabData.total_pages > 1 && (
              <div className="px-6 py-4 border-t border-gray-100">
                <Pagination
                  currentPage={currentTabData.page}
                  totalPages={currentTabData.total_pages}
                  onPageChange={handlePageChange}
                  className="justify-center"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;