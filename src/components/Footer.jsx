import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';
import { RiCustomerService2Fill } from 'react-icons/ri';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 w-full border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        {/* Social Links and App Download */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="flex space-x-6 mb-6 md:mb-0">
            <a href="#" className="text-2xl hover:text-white transition-colors">
              <FaFacebook />
            </a>
            <a href="#" className="text-2xl hover:text-white transition-colors">
              <FaTwitter />
            </a>
            <a href="#" className="text-2xl hover:text-white transition-colors">
              <FaInstagram />
            </a>
            <a href="#" className="text-2xl hover:text-white transition-colors">
              <FaYoutube />
            </a>
            <a href="#" className="text-2xl hover:text-white transition-colors">
              <FaLinkedin />
            </a>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" 
                alt="App Store" 
                className="h-10"
              />
            </button>
            <button className="flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                alt="Google Play" 
                className="h-10"
              />
            </button>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          <div>
            <h3 className="text-white font-bold mb-4">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">News</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Investor Relations</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-4">Help</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-white transition-colors">Account</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Plans</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Supported Devices</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Accessibility</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Use</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookie Preferences</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Corporate Information</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Advertise</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Partnerships</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Content Providers</a></li>
            </ul>
          </div>
          
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-white font-bold mb-4">Customer Service</h3>
            <a href="#" className="inline-flex items-center text-red-500 hover:text-red-400 transition-colors">
              <RiCustomerService2Fill className="mr-2" />
              24/7 Support Center
            </a>
            <p className="mt-3 text-sm">Questions? Call 91+ 7903268015</p>
          </div>
        </div>

        {/* Copyright and Region */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">&copy; {currentYear} MovieHub, Inc. All Rights Reserved.</p>
          </div>
          
          <div className="flex items-center space-x-4">
            
            
            {/* Language Selector - Hindi */}
            <div className="flex items-center">
              <svg className="h-4 w-6 mr-2" viewBox="0 0 640 480">
                <path fill="#f93" d="M0 0h640v160H0z"/>
                <path fill="#fff" d="M0 160h640v160H0z"/>
                <path fill="#128807" d="M0 320h640v160H0z"/>
                <circle cx="320" cy="240" r="68" fill="#008"/>
                <circle cx="320" cy="240" r="60" fill="#fff"/>
                <circle cx="320" cy="240" r="48" fill="#008"/>
                <circle cx="320" cy="240" r="12" fill="#fff"/>
                <g fill="#fff" stroke="#008" strokeWidth="4">
                  <circle cx="270" cy="220" r="20"/>
                  <circle cx="370" cy="220" r="20"/>
                </g>
              </svg>
              <span className="text-sm">हिंदी</span>
            </div>
            
            {/* Country Selector - India */}
            <div className="flex items-center">
              <svg className="h-4 w-6 mr-2" viewBox="0 0 640 480">
                <path fill="#f93" d="M0 0h640v160H0z"/>
                <path fill="#fff" d="M0 160h640v160H0z"/>
                <path fill="#128807" d="M0 320h640v160H0z"/>
                <circle cx="320" cy="240" r="68" fill="#008"/>
              </svg>
              <span className="text-sm">India</span>
            </div>
            
            {/* Country Selector - Bharat (Hindi) */}
            <div className="flex items-center">
              <svg className="h-4 w-6 mr-2" viewBox="0 0 640 480">
                <path fill="#f93" d="M0 0h640v160H0z"/>
                <path fill="#fff" d="M0 160h640v160H0z"/>
                <path fill="#128807" d="M0 320h640v160H0z"/>
                <circle cx="320" cy="240" r="68" fill="#008"/>
              </svg>
              <span className="text-sm">भारत</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;