import { useFavorites } from '../context/FavoritesContext'
import ContentCard from '../components/ContentCard'

const FavoritesPage = () => {
  const { favorites, removeFavorite } = useFavorites()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Favorites</h1>
      
      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl">You haven't added any favorites yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {favorites.map(item => (
            <ContentCard
              key={item.id}
              item={item}
              isFavorite={true}
              onFavoriteToggle={() => removeFavorite(item.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default FavoritesPage