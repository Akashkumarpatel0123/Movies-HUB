import PropTypes from 'prop-types';

const MovieCard = ({ movie, onClick }) => {
  const { poster_url, title } = movie;
  
  return (
    <div 
      className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
      onClick={() => onClick(movie)}
    >
      {poster_url ? (
        <img
          src={poster_url}
          alt={title || 'Movie poster'}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            e.target.src = '/placeholder-movie.png';
          }}
        />
      ) : (
        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
          <span className="text-white text-center p-4">No poster available</span>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end p-4">
        <h3 className="text-white font-semibold truncate w-full">
          {title || 'Untitled Movie'}
        </h3>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    poster_url: PropTypes.string,
    title: PropTypes.string,
    id: PropTypes.number.isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired
};

export default MovieCard;