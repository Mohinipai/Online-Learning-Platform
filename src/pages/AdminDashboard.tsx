import { DashboardLayout } from '../components/layout/DashboardLayout';
import { DollarSign, Users, BookOpen, TrendingUp, MoreVertical, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import api from '../lib/api';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const revenueData = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 5000 },
  { name: 'Apr', revenue: 4500 },
  { name: 'May', revenue: 8000 },
  { name: 'Jun', revenue: 6500 },
];

export function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const statsRes: any = await api.get('/admin/stats');
      const coursesRes: any = await api.get('/courses');
      
      if (statsRes.success) setStats(statsRes.data);
      if (coursesRes.success) setCourses(coursesRes.data.content);
    } catch (err) {
      console.error('Failed to fetch admin data', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          <p className="text-slate-400 font-medium italic">Generating executive report...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
       <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-white">Admin Overview</h1>
          <button className="px-5 py-2.5 bg-blue-600 text-white shadow-lg shadow-blue-600/20 font-bold rounded-xl text-sm hover:bg-blue-500 transition-colors">
            Create Course
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Total Revenue', value: `$${stats?.totalRevenue?.toLocaleString() || '0'}`, icon: DollarSign, trend: '+12.5%' },
            { label: 'Active Students', value: stats?.totalUsers?.toString() || '0', icon: Users, trend: '+5.2%' },
            { label: 'Total Courses', value: stats?.totalCourses?.toString() || '0', icon: BookOpen, trend: '+2' },
            { label: 'Total Enrollments', value: stats?.totalEnrollments?.toString() || '0', icon: TrendingUp, trend: '+1.4%' },
          ].map((stat, i) => (
            <div key={i} className="bg-white/5 border border-white/5 rounded-3xl p-6 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <stat.icon className="w-20 h-20 text-blue-500 transform rotate-12" />
              </div>
              <div className="relative z-10">
                <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">{stat.label}</div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-xs font-semibold text-emerald-500">{stat.trend} from last month</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-white/5 border border-white/5 rounded-3xl p-8 shadow-xl">
             <div className="flex items-center justify-between mb-8">
               <h3 className="text-lg font-bold text-white tracking-tight">Revenue Analytics</h3>
               <select className="bg-white/5 border border-white/10 text-white text-sm font-semibold rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500/50">
                 <option>This Year</option>
                 <option>Last 6 Months</option>
               </select>
             </div>
             
             <div className="h-[300px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={revenueData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                   <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
                   <XAxis dataKey="name" stroke="#64748b" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 'bold' }} axisLine={false} tickLine={false} />
                   <YAxis stroke="#64748b" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 'bold' }} axisLine={false} tickLine={false} />
                   <Tooltip 
                     cursor={{ fill: '#ffffff05' }}
                     contentStyle={{ backgroundColor: '#050507', border: '1px solid #1e293b', borderRadius: '12px' }}
                     itemStyle={{ color: '#f8fafc', fontWeight: 'bold', fontSize: '12px' }}
                   />
                   <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                 </BarChart>
               </ResponsiveContainer>
             </div>
          </div>

          {/* Recent Enrollments */}
          <div className="bg-white/5 border border-white/5 rounded-3xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-white tracking-tight mb-6">Recent Enrollments</h3>
            <div className="flex flex-col gap-4">
               {[1, 2, 3, 4, 5].map((item) => (
                 <div key={item} className="flex items-center gap-4 bg-black/40 border border-white/5 rounded-2xl p-4">
                   <img src={`https://i.pravatar.cc/100?u=student${item}`} className="w-10 h-10 rounded-full border-2 border-white/10 object-cover" />
                   <div className="flex-grow min-w-0">
                     <div className="text-sm font-bold text-white truncate">Student {item}</div>
                     <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest truncate">Java Masterclass</div>
                   </div>
                   <div className="text-[10px] text-blue-400 font-bold uppercase">Just now</div>
                 </div>
               ))}
            </div>
            <button className="w-full mt-6 py-2.5 text-sm font-bold text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-colors">
              View All
            </button>
          </div>
        </div>

        {/* Course Management Table */}
        <div className="bg-white/5 border border-white/5 rounded-3xl shadow-xl overflow-hidden">
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <h3 className="text-lg font-bold text-white tracking-tight">Manage Courses</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-[10px] uppercase tracking-widest text-slate-500 font-bold bg-black/40">
                  <th className="px-6 py-4">Course Name</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 bg-black/20">
                {courses.map((course, i) => (
                  <tr key={course.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-sm font-bold text-white">{course.title}</div>
                    </td>
                    <td className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">{course.category}</td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-300">${course.price}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20`}>
                        Published
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-right">
                      <button className="text-slate-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

       </div>
    </DashboardLayout>
  );
}
