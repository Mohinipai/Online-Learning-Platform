import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { PlayCircle, CheckCircle2, Clock, Star, Users, BarChart, ChevronDown, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import api from '../lib/api';
import { Course, Lesson } from '../types';

export function CourseDetails() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCourseDetails();
    checkEnrollment();
  }, [courseId]);

  const fetchCourseDetails = async () => {
    setLoading(true);
    try {
      const response: any = await api.get(`/courses/${courseId}`);
      const lessonsResponse: any = await api.get(`/lessons/course/${courseId}`);
      
      if (response.success) {
        const c = response.data;
        setCourse({
          ...c,
          difficulty: c.difficultyLevel,
          instructor: {
            id: c.instructorId,
            name: c.instructorName,
            avatar: 'https://i.pravatar.cc/150?u=' + c.instructorId,
            title: 'Instructor',
            rating: 4.8,
            studentsCount: 15000
          },
          rating: 4.8,
          reviewsCount: 1240,
          tags: [c.category]
        });
      }
      
      if (lessonsResponse.success) {
        setLessons(lessonsResponse.data);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch course details');
    } finally {
      setLoading(false);
    }
  };

  const checkEnrollment = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    
    try {
      const response: any = await api.get(`/enrollments/progress/${courseId}`);
      if (response.success) setIsEnrolled(true);
    } catch (err) {
      setIsEnrolled(false);
    }
  };

  const handleEnroll = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/auth');
      return;
    }

    setEnrolling(true);
    try {
      const response: any = await api.post(`/enrollments/${courseId}`);
      if (response.success) {
        setIsEnrolled(true);
        navigate('/dashboard');
      }
    } catch (err: any) {
      alert(err.message || 'Failed to enroll');
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050507] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
        <p className="text-slate-400 font-bold italic tracking-widest">Loading Masterclass...</p>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-[#050507] flex flex-col items-center justify-center p-4">
        <p className="text-red-400 mb-6 font-bold">{error || 'Course not found'}</p>
        <Link to="/courses" className="text-blue-400 hover:underline font-bold">Back to Courses</Link>
      </div>
    );
  }

  return (
    <div className="pb-32 bg-[#050507] min-h-screen text-slate-200 font-sans">
      {/* Banner */}
      <div className="relative pt-24 pb-32 overflow-hidden border-b border-white/5 bg-black/40">
        <div className="absolute inset-0">
          <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover opacity-20 filter blur-sm mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-[#050507]/90 to-[#050507]/50" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row gap-12">
          <div className="flex-grow max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-blue-500/20 text-blue-400 border border-blue-500/20 text-[10px] font-bold px-3 py-1 rounded tracking-widest uppercase">
                {course.category}
              </span>
              <span className="bg-white/5 text-slate-300 border border-white/10 text-[10px] font-bold px-3 py-1 rounded tracking-widest uppercase flex items-center gap-1">
                <BarChart className="w-3 h-3" /> {course.difficulty}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
              {course.title}
            </h1>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-2xl font-medium">
              {course.description}
            </p>
            
            <div className="flex flex-wrap items-center gap-8 text-sm">
              <div className="flex items-center gap-3">
                <img src={course.instructor.avatar} alt="Instructor" className="w-10 h-10 rounded-full border-2 border-white/10" />
                <div>
                  <div className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">Instructor</div>
                  <div className="text-white font-bold">{course.instructor.name}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-400/10 flex items-center justify-center border border-yellow-400/20">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                </div>
                <div>
                  <div className="text-white font-bold">{course.rating}</div>
                  <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">({course.reviewsCount.toLocaleString()} ratings)</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                  <Users className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <div className="text-white font-bold">{course.instructor.studentsCount.toLocaleString()}</div>
                  <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Students</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sticky Sidebar */}
          <div className="w-full md:w-[400px] flex-shrink-0">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sticky top-32 overflow-hidden group shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="relative z-10">
                <div className="aspect-video rounded-xl overflow-hidden mb-6 relative group/video cursor-pointer border border-white/5">
                  <img src={course.thumbnail} className="w-full h-full object-cover transition-transform duration-700 group-hover/video:scale-105 opacity-80 mix-blend-overlay" alt="Course Video" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="bg-white/10 backdrop-blur-md rounded-full p-4 border border-white/20 transform group-hover/video:scale-110 transition-transform shadow-2xl">
                      <PlayCircle className="w-10 h-10 text-white" />
                    </div>
                  </div>
                </div>
                
                <div className="text-4xl font-bold text-white mb-6">
                  ${course.price}
                </div>
                
                {isEnrolled ? (
                  <Link to={`/lesson/${course.id}/start`} className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl mb-4 transition-colors flex justify-center items-center gap-2 shadow-lg shadow-emerald-600/20">
                    Go to Course
                  </Link>
                ) : (
                  <button 
                    onClick={handleEnroll}
                    disabled={enrolling}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl mb-4 transition-colors flex justify-center items-center gap-2 shadow-lg shadow-blue-600/20 disabled:opacity-50"
                  >
                    {enrolling ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Enroll Now'}
                  </button>
                )}
                
                <div className="text-center text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-6 underline underline-offset-4 decoration-slate-600">
                  30-Day Money-Back Guarantee
                </div>
                
                <div className="space-y-4 text-sm font-bold text-slate-300">
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-blue-400" /> {course.duration} on-demand video
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-blue-400" /> Full lifetime access
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-blue-400" /> Certificate of completion
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 flex flex-col md:flex-row gap-12">
        <div className="flex-grow max-w-3xl">
          {/* Learning Outcomes */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">What you'll learn</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300 leading-relaxed text-sm font-medium">Design and build real-world application architectures that scale to millions of users.</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Curriculum */}
          <div>
             <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">Course Curriculum</h2>
             <div className="space-y-4">
                <div className="border border-white/5 rounded-2xl overflow-hidden bg-white/5">
                  <div className="w-full px-6 py-5 flex items-center justify-between bg-white/5">
                    <span className="font-bold text-white">Full Course Content ({lessons.length} lessons)</span>
                  </div>
                  <div className="p-2 bg-black/20">
                    {lessons.map((lesson) => (
                      <Link 
                        to={isEnrolled ? `/lesson/${course.id}/${lesson.id}` : '#'} 
                        key={lesson.id} 
                        className={`flex items-center justify-between px-6 py-3 rounded-xl hover:bg-white/5 transition-colors group ${!isEnrolled ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <div className="flex items-center gap-3">
                          <PlayCircle className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                          <span className="text-slate-300 text-sm font-medium group-hover:text-white transition-colors">{lesson.title}</span>
                        </div>
                        <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500">10:00</span>
                      </Link>
                    ))}
                    {lessons.length === 0 && (
                      <p className="p-6 text-center text-slate-500 italic">Lessons coming soon...</p>
                    )}
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
