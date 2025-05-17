import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import FavoritesPage from './pages/FavoritesPage'
import NotFoundPage from './pages/NotFoundPage'
import Navbar from './components/Navbar'
import ErrorBoundary from './components/ErrorBoundary'
import MovieDetails from './components/MovieDetails'
import Footer from './components/Footer'
import DebugHomePage from './components/DebugHomePage'


function App() {
  return (
    <Router>
      <Navbar />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<HomePage />} />
           <Route path="/" element={<DebugHomePage />} />
          <Route path="/auth/:type" element={<AuthPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
         
        </Routes>
        <Footer />
      </ErrorBoundary>
    </Router>
  )
}

export default App