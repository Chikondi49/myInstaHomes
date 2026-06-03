import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Pricing', path: '/#pricing' },
    { name: 'Blog', path: '/blog' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-2' : 'bg-white/80 backdrop-blur-md py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Left: Logo */}
        <div className="flex flex-col">
          <span className="text-2xl font-bold tracking-tight text-brand-teal leading-none">MAI INSTAHOMES</span>
          <span className="text-xs uppercase tracking-widest text-brand-gold font-medium">AirBnB</span>
        </div>

        {/* Center: Desktop Nav */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} className="nav-link text-sm uppercase tracking-wide">
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right: CTA */}
        <div className="hidden md:block">
          <Link to="/book" className="btn-teal inline-block">Book Now</Link>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-brand-teal">
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute top-full left-0 right-0 shadow-xl py-6 px-6 animate-in fade-in slide-in-from-top-4">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className="nav-link text-lg border-b border-gray-50 pb-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/book" className="btn-teal w-full py-3 mt-4 text-center" onClick={() => setIsMobileMenuOpen(false)}>Book Now</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
