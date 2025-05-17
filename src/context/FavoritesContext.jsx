import { createContext, useState, useEffect, useContext } from 'react'

const FavoritesContext = createContext()

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites')
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }
  }, [])

  const addFavorite = (item) => {
    const newFavorites = [...favorites, item]
    setFavorites(newFavorites)
    localStorage.setItem('favorites', JSON.stringify(newFavorites))
  }

  const removeFavorite = (id) => {
    const newFavorites = favorites.filter(fav => fav.id !== id)
    setFavorites(newFavorites)
    localStorage.setItem('favorites', JSON.stringify(newFavorites))
  }

  const isFavorite = (id) => {
    return favorites.some(fav => fav.id === id)
  }

  return (
    <FavoritesContext.Provider 
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

// Add this custom hook
export const useFavorites = () => {
  return useContext(FavoritesContext)
}