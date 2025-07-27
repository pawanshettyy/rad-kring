import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { name: 'Sankalpa v1', path: '/product' },
  { name: 'Services', path: '/services' },
  { name: 'Team', path: '/team' },
  { name: 'News', path: '/news' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-jet-black/80 backdrop-blur-xl border-b border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-orbitron font-black text-glacier-white">
              RAD <span className="text-electric-orange">KRING</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                      isActive
                        ? 'text-electric-orange font-semibold'
                        : 'text-gray-300 hover:text-glacier-white'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
             <Button asChild variant="outline" className="font-montserrat font-bold text-neon-blue border-neon-blue hover:bg-neon-blue/10 hover:text-neon-blue glow-blue">
                <Link to="/mr-experience">Experience in MR</Link>
            </Button>
            <Button asChild className="font-montserrat font-bold gradient-orange glow-orange text-white">
                <Link to="/booking">Book Your Flight</Link>
            </Button>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-glacier-white hover:text-electric-orange focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div 
          className="md:hidden absolute top-20 left-0 w-full bg-jet-black/95 backdrop-blur-xl border-b border-white/10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive ? 'text-electric-orange bg-gray-700/50' : 'text-gray-300 hover:bg-gray-700/50'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <div className="pt-4 px-3 flex flex-col space-y-3">
                <Button asChild variant="outline" className="w-full font-montserrat font-bold text-neon-blue border-neon-blue hover:bg-neon-blue/10 hover:text-neon-blue glow-blue">
                    <Link to="/mr-experience" onClick={() => setIsOpen(false)}>Experience in MR</Link>
                </Button>
                <Button asChild className="w-full font-montserrat font-bold gradient-orange glow-orange text-white">
                    <Link to="/booking" onClick={() => setIsOpen(false)}>Book Your Flight</Link>
                </Button>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}