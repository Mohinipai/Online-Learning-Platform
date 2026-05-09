import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PlayCircle, CheckCircle2, ChevronLeft, MessageSquare, StickyNote, Loader2 } from 'lucide-react';
import api from '../lib/api';
import { Course, Lesson } from '../types';

export function LessonPlayer() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);
  const [activeTab, setActiveTab] = useState('curriculum');
  const [progress, setProgress] = useState<any>(null);

  useEffect(() => {
    fetchData();
  }, [courseId]);

  useEffect(() => {
    if (lessons.length > 0) {
      const lesson = lessons.find(l => l.id === lessonId) || lessons[0];
      setActiveLesson(lesson);
    }
  }, [lessonId, lessons]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const courseRes: any = await api.get(`/courses/${courseId}`);
      const lessonsRes: any = await api.get(`/lessons/course/${courseId}`);
      const progressRes: any = await api.get(`/enrollments/progress/${courseId}`);
      
      if (courseRes.success) setCourse(courseRes.data);
      if (lessonsRes.success) setLessons(lessonsRes.data);
      if (progressRes.success) setProgress(progressRes.data);
    } catch (err) {
      console.error('Failed to fetch lesson player data', err);
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async () => {
    if (!activeLesson) return;
    
    setCompleting(true);
    try {
      const res: any = await api.post(`/progress/complete/${activeLesson.id}`);
      if (res.success) {
        // Refresh data to show updated progress
        const progressRes: any = await api.get(`/enrollments/progress/${courseId}`);
        if (progressRes.success) setProgress(progressRes.data);
        
        // Go to next lesson if available
        const currentIndex = lessons.findIndex(l => l.id === activeLesson.id);
        if (currentIndex < lessons.length - 1) {
          navigate(`/lesson/${courseId}/${lessons[currentIndex + 1].id}`);
        }
      }
    } catch (err) {
      console.error('Failed to mark lesson as completed', err);
    } finally {
      setCompleting(false);
    }
  };

  if (loading || !course) {
    return (
      <div className="h-screen bg-[#050507] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
        <p className="text-slate-400 font-bold italic tracking-widest uppercase">Opening Lecture Hall...</p>
      </div>
    );
  }

  const isCompleted = progress?.completedLessons?.includes(activeLesson?.id);

  return (
    <div className="flex flex-col h-screen bg-[#050507] text-slate-200 overflow-hidden font-sans">
      {/* Top Navbar */}
      <header className="h-16 border-b border-white/5 flex items-center justify-between px-4 sm:px-6 flex-shrink-0 bg-black/40 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <Link to={`/courses/${course.id}`} className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-400 hover:text-white">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div className="h-6 w-px bg-white/10" />
          <h1 className="text-sm font-bold text-white tracking-wide truncate max-w-xs md:max-w-md">
            {course.title}
          </h1>
        </div>
        <button 
          onClick={handleComplete}
          disabled={completing || isCompleted}
          className={`flex items-center gap-2 px-4 py-2 ${isCompleted ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/20' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20'} rounded-lg text-sm font-bold transition-colors`}
        >
          {completing ? <Loader2 className="w-4 h-4 animate-spin" /> : isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <PlayCircle className="w-4 h-4" />}
          {isCompleted ? 'Completed' : 'Mark as Completed'}
        </button>
      </header>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row flex-grow overflow-hidden relative">
        {/* Background Glows */}
        <div className="absolute top-[-100px] left-1/2 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none -translate-x-1/2"></div>
        
        {/* Video Player Area */}
        <div className="flex-grow flex flex-col h-full overflow-y-auto relative z-10">
          <div className="w-full aspect-video bg-black flex items-center justify-center relative group border-b border-white/5">
             {/* Mock Video Player */}
             {activeLesson?.videoUrl ? (
               <iframe 
                src={activeLesson.videoUrl.replace('watch?v=', 'embed/')} 
                className="w-full h-full" 
                allowFullScreen 
                title={activeLesson.title}
               />
             ) : (
               <img src={course.thumbnail} className="w-full h-full object-cover opacity-60 mix-blend-overlay" alt="Video frame" />
             )}
          </div>
          
          <div className="p-8 max-w-4xl max-w-[100%]">
            <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">{activeLesson?.title || 'Lesson Details'}</h2>
            <div className="flex items-center gap-6 text-sm text-slate-400 border-b border-white/5 pb-6 mb-6">
              <span className="flex items-center gap-3 font-semibold text-white">
                <img src={`https://i.pravatar.cc/100?u=${course.instructorId}`} className="w-8 h-8 rounded-full border border-white/10" alt="instructor"/> 
                {course.instructorName}
              </span>
            </div>
            
            <div className="prose prose-invert prose-blue max-w-none text-slate-300">
              <div dangerouslySetInnerHTML={{ __html: activeLesson?.content || '' }} />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-96 flex-shrink-0 bg-black/40 border-l border-white/5 flex flex-col h-full relative z-10 backdrop-blur-xl">
           <div className="flex px-4 border-b border-white/5 flex-shrink-0">
             <button onClick={() => setActiveTab('curriculum')} className={`flex-1 py-4 text-[11px] uppercase tracking-widest font-bold border-b-2 transition-colors ${activeTab === 'curriculum' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}>
               Curriculum
             </button>
             <button onClick={() => setActiveTab('notes')} className={`flex-1 py-4 text-[11px] uppercase tracking-widest font-bold border-b-2 transition-colors flex items-center justify-center gap-2 ${activeTab === 'notes' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}>
               <StickyNote className="w-4 h-4"/> Notes
             </button>
             <button onClick={() => setActiveTab('qa')} className={`flex-1 py-4 text-[11px] uppercase tracking-widest font-bold border-b-2 transition-colors flex items-center justify-center gap-2 ${activeTab === 'qa' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}>
               <MessageSquare className="w-4 h-4"/> Q&A
             </button>
           </div>
           
           <div className="flex-grow overflow-y-auto p-4 custom-scrollbar">
             {activeTab === 'curriculum' && (
               <div className="space-y-6">
                 <div>
                   <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-2">Course Lessons</h4>
                   <div className="space-y-1">
                     {lessons.map(lesson => {
                       const lessonCompleted = progress?.completedLessons?.includes(lesson.id);
                       const isActive = activeLesson?.id === lesson.id;
                       
                       return (
                         <div 
                           key={lesson.id} 
                           onClick={() => navigate(`/lesson/${courseId}/${lesson.id}`)}
                           className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-colors ${isActive ? 'bg-blue-500/10 border border-blue-500/20 text-blue-400' : 'hover:bg-white/5 text-slate-400'}`}
                         >
                           <div className="mt-0.5">
                             {lessonCompleted ? (
                               <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                             ) : isActive ? (
                               <PlayCircle className="w-4 h-4 text-blue-400 fill-blue-400/20" />
                             ) : (
                               <div className="w-4 h-4 rounded-full border-2 border-slate-600" />
                             )}
                           </div>
                           <div className="flex-grow">
                             <div className={`text-sm font-bold ${isActive ? 'text-white' : ''}`}>{lesson.title}</div>
                             <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1 flex items-center gap-1">
                               <PlayCircle className="w-3 h-3" /> 10:00
                             </div>
                           </div>
                         </div>
                       );
                     })}
                   </div>
                 </div>
               </div>
             )}
             
             {activeTab === 'notes' && (
               <div className="text-center py-10">
                 <StickyNote className="w-12 h-12 text-slate-700 font-light mx-auto mb-4" />
                 <p className="text-slate-400 text-sm">Add personal notes for this lesson.</p>
                 <button className="mt-4 text-sm font-bold text-blue-400 hover:text-blue-300 hover:underline underline-offset-4">Create Note</button>
               </div>
             )}
             
             {activeTab === 'qa' && (
               <div className="text-center py-10">
                 <MessageSquare className="w-12 h-12 text-slate-700 font-light mx-auto mb-4" />
                 <p className="text-slate-400 text-sm">Ask questions and discuss with the community.</p>
                 <button className="mt-4 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white font-bold hover:bg-white/10 transition-colors shadow-lg shadow-black/20">Ask a Question</button>
               </div>
             )}
           </div>
        </div>
      </div>
    </div>
  );
}
