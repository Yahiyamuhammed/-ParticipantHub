import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Layout() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Recognize Face', path: '/' },
    { name: 'Register', path: '/register' },
    { name: 'Participants', path: '/participants' },
    { name: 'Logs', path: '/logs' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Navbar adhering to Sahithyolsav theme colors (adjust bg color class) */}
      <nav className="bg-emerald-700 text-white shadow-md relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="font-bold text-xl tracking-wide">Smart Portal</span>
            </div>
            
            {/* Hamburger Button */}
            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="p-2 hover:bg-emerald-600 rounded-md">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex space-x-4">
              {navLinks.map((link) => (
                <Link key={link.name} to={link.path} className="hover:bg-emerald-600 px-3 py-2 rounded-md font-medium transition">
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-emerald-800 shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-emerald-600"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Page Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <Outlet />
      </main>
    </div>
  );
}