import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, Loader2 } from 'lucide-react';
import { CourseCard } from '../components/ui/CourseCard';
import api from '../lib/api';
import { Course } from '../types';

const CATEGORIES = ['All', 'Development', 'Design', 'AI & Data Science', 'Security', 'IT & Software'];
const DIFFICULTIES = ['All', 'Beginner', 'Intermediate', 'Advanced'];

export function Courses() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeDifficulty, setActiveDifficulty] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCourses();
  }, [activeCategory, searchQuery]);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      let url = '/courses';
      if (activeCategory !== 'All') {
        url = `/courses/category/${activeCategory}`;
      } else if (searchQuery) {
        url = `/courses/search?query=${searchQuery}`;
      }

      const response: any = await api.get(url);
      if (response.success) {
        // Map backend response to frontend Course type
        const mappedCourses = response.data.content.map((c: any) => ({
          ...c,
          difficulty: c.difficultyLevel, // Backend uses difficultyLevel, frontend expects difficulty
          instructor: {
             id: c.instructorId,
             name: c.instructorName,
             avatar: 'https://i.pravatar.cc/150?u=' + c.instructorId,
             title: 'Instructor',
             rating: 4.8,
             studentsCount: 1200
          },
          rating: 4.8, // Mocked for now
          reviewsCount: 120, // Mocked for now
          tags: [c.category]
        }));
        setCourses(mappedCourses);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = courses.filter(course => {
    const matchesDifficulty = activeDifficulty === 'All' || course.difficulty === activeDifficulty;
    return matchesDifficulty;
  });

  return (
    <div className="min-h-screen pb-24 bg-[#050507]">
      {/* Header */}
      <div className="bg-[#050507] border-b border-white/5 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight"
          >
            Explore Courses
          </motion.h1>
          
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mt-8">
            <div className="relative flex-grow max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="What do you want to learn?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all font-semibold shadow-inner"
              />
            </div>
            
            <button className="flex items-center justify-center gap-2 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors text-white font-bold shadow-lg shadow-black/20">
              <Filter className="w-5 h-5" /> Filters
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 flex flex-col md:flex-row gap-12">
        {/* Sidebar Filters */}
        <div className="w-full md:w-64 flex-shrink-0 space-y-10">
          <div>
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Categories</h3>
            <div className="flex flex-col gap-2">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => {setActiveCategory(category); setSearchQuery('');}}
                  className={`text-left px-4 py-2.5 rounded-xl transition-all font-bold text-[13px] ${activeCategory === category ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Difficulty</h3>
            <div className="flex flex-col gap-2">
              {DIFFICULTIES.map(level => (
                <button
                  key={level}
                  onClick={() => setActiveDifficulty(level)}
                  className={`text-left px-4 py-2.5 rounded-xl transition-all font-bold text-[13px] ${activeDifficulty === level ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'}`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div className="flex-grow">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
              <p className="text-slate-400 font-medium">Fetching excellence...</p>
            </div>
          ) : error ? (
             <div className="text-center py-20">
               <p className="text-red-400">{error}</p>
             </div>
          ) : filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCourses.map((course, i) => (
                <CourseCard key={course.id} course={course} index={i} />
              ))}
            </div>
          ) : (
             <div className="text-center py-20">
               <p className="text-slate-400">No courses match your criteria.</p>
               <button 
                onClick={() => {setActiveCategory('All'); setActiveDifficulty('All'); setSearchQuery('');}}
                className="mt-4 text-blue-400 font-bold hover:underline underline-offset-4"
              >
                Clear all filters
               </button>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
