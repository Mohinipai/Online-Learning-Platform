import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Search, BookOpen, Menu, Bell, User } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../lib/utils';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll to add background blur
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      setIsScrolled(window.scrollY > 20);
    });
  }

  const isDashboard = location.pathname.includes('/dashboard') || location.pathname.includes('/admin');

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-transparent',
        isScrolled ? 'bg-black/60 backdrop-blur-xl border-white/10' : 'bg-transparent'
      )}
    >
      <div className="w-full px-4 sm:px-10 lg:px-16 h-20 flex items-center justify-between">
        <Link className="flex items-center gap-2 group" to="/">
          <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 text-white p-2 rounded-xl shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <BookOpen className="w-6 h-6" />
          </div>
          <span className="font-sans font-bold text-2xl tracking-tight text-white">Edu<span className="text-blue-500">Nova</span></span>
        </Link>

        {/* Desktop Nav */}
        {!isDashboard && (
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/courses" className="text-sm font-bold text-slate-300 hover:text-white transition-colors">Explore</Link>
            <Link to="/courses" className="text-sm font-bold text-slate-300 hover:text-white transition-colors">Career Paths</Link>
            <Link to="/dashboard" className="text-sm font-bold text-slate-300 hover:text-white transition-colors">My Learning</Link>
            
            <div className="relative group flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-3" />
              <input 
                type="text" 
                placeholder="Search courses..." 
                className="bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all w-64 text-white placeholder-slate-500 font-medium"
              />
            </div>
          </nav>
        )}

        <div className="hidden md:flex items-center gap-4">
          <Link to="/auth" className="text-sm font-bold text-slate-300 hover:text-white transition-colors">Log In</Link>
          <Link to="/auth" className="text-sm font-bold bg-white text-black px-5 py-2.5 rounded-full hover:bg-slate-100 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)] inline-block">
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden p-2 text-gray-400 hover:text-white">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </motion.header>
  );
}
