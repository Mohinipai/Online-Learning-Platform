import { DashboardLayout } from '../components/layout/DashboardLayout';
import { BookOpen, Clock, Trophy, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../lib/api';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const learningData = [
  { name: 'Mon', minutes: 45 },
  { name: 'Tue', minutes: 120 },
  { name: 'Wed', minutes: 90 },
  { name: 'Thu', minutes: 60 },
  { name: 'Fri', minutes: 150 },
  { name: 'Sat', minutes: 200 },
  { name: 'Sun', minutes: 80 },
];

export function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const userRes: any = await api.get('/users/profile');
      const enrollRes: any = await api.get('/enrollments/my-courses');
      
      if (userRes.success) setUser(userRes.data);
      if (enrollRes.success) setEnrollments(enrollRes.data);
    } catch (err) {
      console.error('Failed to fetch dashboard data', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          <p className="text-slate-400 font-medium italic">Preparing your personalized dashboard...</p>
        </div>
      </DashboardLayout>
    );
  }

  const activelyLearning = enrollments.length > 0 ? enrollments[0] : null;
  
  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Welcome Section */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-600/20 via-indigo-600/10 to-transparent border border-white/10 flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-3xl font-bold text-white mb-2 italic">Welcome back, {user?.fullName?.split(' ')[0] || 'Learner'}!</h1>
            <p className="text-slate-400 text-sm max-w-md">You've completed {activelyLearning ? Math.round(activelyLearning.progressPercentage) : 0}% of your current course. Keep up the momentum!</p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              {activelyLearning && (
                <Link to={`/lesson/${activelyLearning.courseId}/next`} className="px-6 py-2.5 bg-white text-black text-sm font-bold rounded-xl shadow-lg shadow-white/10 hover:scale-105 transition-transform">
                  Continue Learning
                </Link>
              )}
              <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full bg-slate-700 border-2 border-white/10 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white border-2 border-white/10">+12</div>
              </div>
              <span className="text-xs text-slate-500 font-medium italic underline underline-offset-4">Friends online</span>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Courses in Progress', value: enrollments.filter(e => e.progressPercentage < 100).length.toString(), icon: BookOpen, color: 'text-blue-400', bg: 'bg-blue-500/20' },
            { label: 'Completed Courses', value: enrollments.filter(e => e.progressPercentage === 100).length.toString(), icon: Trophy, color: 'text-yellow-400', bg: 'bg-yellow-500/20' },
            { label: 'Learning Hours', value: '42.5h', icon: Clock, color: 'text-emerald-500', bg: 'bg-emerald-500/20' },
          ].map((stat, i) => (
            <div key={i} className="bg-white/5 border border-white/5 rounded-2xl p-5 flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">{stat.label}</div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
              </div>
              <div className={`w-12 h-12 rounded-full ${stat.bg} flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* Main Activity Area */}
           <div className="lg:col-span-2 space-y-8">
             {/* Current Courses */}
             <div className="flex flex-col">
               <div className="flex items-center justify-between mb-4">
                 <h3 className="text-lg font-bold text-white tracking-tight">Current Courses</h3>
                 <Link to="/courses" className="text-blue-400 text-xs font-semibold hover:underline underline-offset-4">View all courses</Link>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {enrollments.slice(0, 2).map((enrollment, idx) => (
                   <div key={enrollment.id} className={`bg-black/40 border border-white/10 rounded-2xl p-4 flex flex-col group hover:border-${idx === 0 ? 'blue' : 'purple'}-500/50 transition-all`}>
                     <div className="h-32 bg-slate-800 rounded-xl mb-4 relative overflow-hidden">
                       <img src={enrollment.courseThumbnail} className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay" alt={enrollment.courseTitle} />
                       <div className={`absolute inset-0 bg-gradient-to-br from-${idx === 0 ? 'blue' : 'purple'}-600/40 to-transparent`}></div>
                     </div>
                     <h4 className="text-sm font-bold text-white leading-tight mb-2 truncate">{enrollment.courseTitle}</h4>
                     <div className="mt-auto pt-2">
                       <div className="flex justify-between text-[10px] text-slate-400 mb-1.5 font-bold">
                         <span>PROGRESS</span>
                         <span>{Math.round(enrollment.progressPercentage)}%</span>
                       </div>
                       <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                         <div className={`h-full bg-${idx === 0 ? 'blue' : 'purple'}-500 rounded-full`} style={{ width: `${enrollment.progressPercentage}%` }}></div>
                       </div>
                     </div>
                   </div>
                 ))}
                 {enrollments.length === 0 && (
                   <div className="col-span-2 p-12 bg-white/5 border border-dashed border-white/10 rounded-3xl text-center">
                     <p className="text-slate-400 mb-4">You haven't enrolled in any courses yet.</p>
                     <Link to="/courses" className="text-blue-400 font-bold hover:underline">Browse Catalog</Link>
                   </div>
                 )}
               </div>
             </div>

             {/* Learning Chart */}
             <div className="bg-white/5 border border-white/5 rounded-3xl p-6 flex flex-col shadow-xl">
                <h3 className="text-lg font-bold text-white tracking-tight mb-4">Learning Activity</h3>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={learningData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorMinutes" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
                      <XAxis dataKey="name" stroke="#64748b" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 'bold' }} axisLine={false} tickLine={false} />
                      <YAxis stroke="#64748b" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 'bold' }} axisLine={false} tickLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#050507', border: '1px solid #1e293b', borderRadius: '12px' }}
                        itemStyle={{ color: '#f8fafc', fontWeight: 'bold', fontSize: '12px' }}
                      />
                      <Area type="monotone" dataKey="minutes" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorMinutes)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
             </div>
           </div>

           {/* Side Bar Activity */}
           <div className="space-y-8">
             <div className="bg-white/5 border border-white/5 rounded-3xl p-6 shadow-xl">
               <h3 className="text-lg font-bold text-white tracking-tight mb-6">Recent Achievements</h3>
               <div className="flex flex-col gap-4">
                 <div className="flex items-center gap-4 bg-black/40 border border-white/5 rounded-2xl p-4">
                   <div className="bg-yellow-500/20 p-3 rounded-xl border border-yellow-500/20">
                     <Trophy className="w-6 h-6 text-yellow-400" />
                   </div>
                   <div>
                     <div className="font-bold text-white text-sm">Fast Learner</div>
                     <div className="text-xs text-slate-400">Completed 5 lessons in a day</div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
