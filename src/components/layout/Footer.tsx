import { BookOpen, Github, Twitter, Linkedin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-[#050507] border-t border-white/5 pt-20 pb-10 font-sans">
      <div className="w-full px-4 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-2 text-white rounded-xl shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">Edu<span className="text-blue-500">Nova</span></span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed font-medium">
              Upgrade your skills with industry-ready courses. Build your portfolio, learn from experts, and accelerate your career.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors bg-white/5 p-2 rounded-full hover:bg-white/10"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors bg-white/5 p-2 rounded-full hover:bg-white/10"><Github className="w-4 h-4" /></a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors bg-white/5 p-2 rounded-full hover:bg-white/10"><Linkedin className="w-4 h-4" /></a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-white mb-6 tracking-tight">Explore</h3>
            <ul className="space-y-4">
              <li><Link to="/courses" className="text-slate-400 hover:text-white text-sm font-medium transition-colors">All Courses</Link></li>
              <li><Link to="/courses" className="text-slate-400 hover:text-white text-sm font-medium transition-colors">Data Science</Link></li>
              <li><Link to="/courses" className="text-slate-400 hover:text-white text-sm font-medium transition-colors">Software Engineering</Link></li>
              <li><Link to="/courses" className="text-slate-400 hover:text-white text-sm font-medium transition-colors">UI/UX Design</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-6 tracking-tight">EduNova</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-slate-400 hover:text-white text-sm font-medium transition-colors">About Us</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white text-sm font-medium transition-colors">Careers</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white text-sm font-medium transition-colors">Teach</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white text-sm font-medium transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-6 tracking-tight">Newsletter</h3>
            <p className="text-slate-400 text-sm mb-4 font-medium">Subscribe to get the latest course updates and news.</p>
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-white/5 border border-white/10 rounded-full pl-4 pr-12 py-2.5 text-sm focus:outline-none focus:border-blue-500/50 text-white placeholder-slate-500 font-medium"
              />
              <button type="submit" className="absolute right-1.5 top-1.5 bg-blue-600 text-white p-1.5 rounded-full hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20">
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm font-medium">© 2026 EduNova Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-slate-500 hover:text-white text-sm font-medium transition-colors">Privacy Policy</a>
            <a href="#" className="text-slate-500 hover:text-white text-sm font-medium transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
