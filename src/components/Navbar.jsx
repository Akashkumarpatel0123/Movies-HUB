import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FiSearch, FiBell, FiUser, FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsMobileMenuOpen(false);
    }
  };

  // Nav links
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'TV Shows', path: '/tv' },
    { name: 'New & Popular', path: '/latest' },
    { name: 'My List', path: '/mylist' },
  ];

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-gray-900/95 backdrop-blur-sm py-2' : 'bg-gradient-to-b from-gray-900/80 to-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-red-600 font-bold text-2xl">MOVIE</span>
          <span className="text-white font-bold text-2xl">HUB</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-white hover:text-red-500 transition-colors ${
                  isActive ? 'font-semibold text-red-500' : 'font-medium'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Search and User Controls - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search movies..."
              className="bg-gray-800 text-white px-4 py-2 rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-red-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <FiSearch size={20} />
            </button>
          </form>

          <button className="text-white hover:text-red-500 transition-colors">
            <FiBell size={22} />
          </button>

          <div className="relative group">
            <button className="flex items-center space-x-1 text-white hover:text-red-500 transition-colors">
              <FiUser size={22} />
              <span className="text-sm">Profile</span>
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 hidden group-hover:block">
              <Link
                to="/account"
                className="block px-4 py-2 text-white hover:bg-gray-700"
              >
                Account Settings
              </Link>
              <Link
                to="/logout"
                className="block px-4 py-2 text-white hover:bg-gray-700"
              >
                Sign Out
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white focus:outline-none"
          >
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-sm absolute top-full left-0 right-0 py-4 px-4">
          <nav className="flex flex-col space-y-4 mb-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-white hover:text-red-500 transition-colors py-2 ${
                    isActive ? 'font-semibold text-red-500' : 'font-medium'
                  }`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          <form onSubmit={handleSearch} className="relative mb-4">
            <input
              type="text"
              placeholder="Search movies..."
              className="bg-gray-800 text-white px-4 py-2 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-red-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <FiSearch size={20} />
            </button>
          </form>

          <div className="flex items-center justify-between border-t border-gray-700 pt-4">
            <button className="text-white hover:text-red-500 transition-colors">
              <FiBell size={22} />
            </button>
            <Link
              to="/account"
              className="flex items-center space-x-1 text-white hover:text-red-500 transition-colors"
            >
              <FiUser size={22} />
              <span>Account</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;