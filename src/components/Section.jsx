import React from 'react';

const Section = ({ title, movies, onMovieClick }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{title}</h2>

      {movies?.length === 0 ? (
        <p className="text-gray-500">No movies found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map(movie => (
            <div
              key={movie.id}
              onClick={() => onMovieClick(movie)}
              className="cursor-pointer bg-white hover:shadow-lg rounded-lg overflow-hidden transition duration-300"
            >
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : 'https://via.placeholder.com/500x750?text=No+Image'
                }
                alt={movie.title}
                className="w-full h-72 object-cover"
              />
              <div className="p-3">
                <h3 className="text-base font-semibold text-gray-800 truncate">
                  {movie.title || movie.name}
                </h3>
                <p className="text-sm text-gray-600">
                  ⭐ {movie.vote_average.toFixed(1)} / 10
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Section;
