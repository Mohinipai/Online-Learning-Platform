import { motion } from 'motion/react';
import { ArrowRight, Play, CheckCircle2, LayoutDashboard, Code, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COURSES } from '../data/mockData';
import { CourseCard } from '../components/ui/CourseCard';

export function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-[#050507] font-sans">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none opacity-50" />
        <div className="absolute top-40 -right-40 w-[600px] h-[400px] bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none opacity-50" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold tracking-wide mb-8"
            >
              <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
              New Java & Spring Boot Courses Added
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-sans font-bold tracking-tight text-white mb-6 leading-[1.1]"
            >
              Upgrade Your Skills <br className="hidden md:block" />
              with <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">EduNova</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed font-medium"
            >
              Learn from industry-ready courses and track your progress with an immersive learning experience built for modern professionals.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <Link to="/courses" className="h-14 px-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center gap-2 hover:bg-blue-500 transition-all transform hover:scale-105 shadow-lg shadow-blue-600/20">
                Explore Courses <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/auth" className="h-14 px-8 rounded-full bg-white/5 border border-white/10 text-white font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-all backdrop-blur-md">
                Start Learning <Play className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>

          {/* Hero Visual */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-20 relative mx-auto max-w-5xl"
          >
            <div className="rounded-3xl border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-2xl p-2 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
              <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="Dashboard Preview" className="w-full h-auto rounded-2xl opacity-90 object-cover object-top h-[300px] md:h-[500px]" />
              
              {/* Floating Element */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute top-10 right-10 z-20 bg-black/60 backdrop-blur-xl border border-white/10 p-4 rounded-2xl flex items-center gap-4 shadow-2xl hidden md:flex"
              >
                <div className="bg-emerald-500/20 text-emerald-400 p-3 rounded-xl border border-emerald-500/20">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Course Completed</div>
                  <div className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Java Masterclass</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-[#050507] border-y border-white/5 relative font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">Why learn with EduNova?</h2>
            <p className="text-slate-400 text-lg font-medium">Build the skills you need for your career.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: LayoutDashboard, title: 'Personalized Dashboard', desc: 'Track your progress and organize your learning efficiently.' },
              { icon: Code, title: 'Interactive Learning', desc: 'Code directly in the browser with real-world projects.' },
              { icon: Shield, title: 'Industry Certificates', desc: 'Earn verifiable certificates upon course completion.' }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/5 border border-white/5 p-8 rounded-3xl hover:border-blue-500/30 transition-colors group shadow-xl shadow-black/10"
              >
                <div className="bg-blue-600/10 border border-blue-500/20 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed font-medium">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="py-24 bg-[#050507] font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">Popular Courses</h2>
              <p className="text-slate-400 text-lg font-medium">Top rated courses by our students</p>
            </div>
            <Link to="/courses" className="hidden md:flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-bold tracking-wide">
              View all courses <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {COURSES.slice(0, 3).map((course, i) => (
              <CourseCard key={course.id} course={course} index={i} />
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
             <Link to="/courses" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-bold tracking-wide">
              View all courses <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
