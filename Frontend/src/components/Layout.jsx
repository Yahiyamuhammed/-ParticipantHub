import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, ShieldCheck } from 'lucide-react';

export default function Layout() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Recognize Face', path: '/' },
    { name: 'Register', path: '/register' },
    { name: 'Participants', path: '/participants' },
    { name: 'Logs', path: '/logs' },
    { name: 'WhatsApp Test', path: '/whatsapp-test' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans">
      {/* Sleek Indigo Navbar */}
      <nav className="bg-indigo-700 text-white shadow-md relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-indigo-200" size={24} />
              <span className="font-bold text-xl tracking-wide">Sahithyolsav <span className="font-light">Portal</span></span>
            </div>
            
            {/* Hamburger Button */}
            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="p-2 hover:bg-indigo-600 rounded-md">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex space-x-2">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  className={`px-4 py-2 rounded-md font-medium text-sm ${
                    location.pathname === link.path 
                      ? 'bg-indigo-800 text-white' 
                      : 'text-indigo-100 hover:bg-indigo-600 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-indigo-800 shadow-xl border-t border-indigo-700">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === link.path ? 'bg-indigo-900 text-white' : 'text-indigo-100 hover:bg-indigo-600'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Page Content */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        <Outlet />
      </main>

      {/* Professional Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-white font-semibold text-lg">Sahithyolsav Smart Portal</p>
            <p className="text-sm mt-1">Kerala's literary festival, reimagined.</p>
          </div>
          <div className="text-sm text-center md:text-right">
            <p>Built for participants. Runs at the festival.</p>
            <p className="mt-1 opacity-75">Securely managed by the Smart Portal Team</p>
          </div>
        </div>
      </footer>
    </div>
  );
}