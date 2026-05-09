import { Link } from 'react-router-dom';
import { BookOpen, LayoutDashboard, Settings, User, LogOut, CheckCircle2 } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-[#050507] text-slate-200 flex flex-col md:flex-row font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-black/40 border-r border-white/5 md:min-h-screen flex flex-col sticky top-0 z-40 p-6 space-y-8">
        <div className="flex items-center space-x-3 px-2">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">EduNova</span>
          </Link>
        </div>

        <nav className="flex-1 space-y-2">
          <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold px-3 mb-4">Main Menu</div>
          
          <Link to="/dashboard" className="flex items-center space-x-3 px-3 py-2.5 rounded-xl bg-white/5 text-blue-400 border border-white/10">
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link to="/courses" className="flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all border border-transparent">
            <BookOpen className="w-5 h-5" />
            <span>My Courses</span>
          </Link>
          <Link to="/certificates" className="flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all border border-transparent">
            <CheckCircle2 className="w-5 h-5" />
            <span>Certificates</span>
          </Link>
          
          <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold px-3 mb-4 mt-8">Account</div>
          <Link to="/settings" className="flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all border border-transparent">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </Link>
          <button className="w-full flex items-center space-x-3 px-3 py-2.5 text-red-400 hover:text-red-300 hover:bg-white/5 rounded-xl transition-colors border border-transparent">
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </nav>
        
        {/* Pro Membership Block */}
        <div className="mt-auto p-4 rounded-2xl bg-gradient-to-br from-indigo-900/40 to-blue-900/20 border border-indigo-500/20">
          <div className="text-sm font-semibold text-white mb-1">Pro Membership</div>
          <div className="text-[11px] text-slate-400 mb-3">Unlock 500+ certification courses.</div>
          <button className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-colors shadow-lg shadow-blue-600/20">UPGRADE</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative h-screen overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-[-100px] right-[-100px] w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-[-100px] left-[-100px] w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none"></div>

        {/* Top Header */}
        <header className="h-16 px-8 flex flex-shrink-0 items-center justify-between border-b border-white/5 z-10 backdrop-blur-xl bg-black/10">
          <h2 className="text-lg font-bold text-white tracking-tight">Overview</h2>
          <div className="flex items-center space-x-6">
            <Link to="/admin" className="text-xs border border-blue-500/50 bg-blue-500/10 text-blue-400 px-3 py-1.5 rounded-full hover:bg-blue-500/20 transition-colors font-semibold">
              Switch to Admin
            </Link>
            <div className="flex items-center space-x-3 border-l border-white/10 pl-6">
              <div className="text-right">
                <div className="text-sm font-semibold text-white">John Doe</div>
                <div className="text-[10px] text-blue-400 uppercase tracking-wider font-bold">Student ID: #8821</div>
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-blue-500/30 p-0.5">
                <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center font-bold text-white overflow-hidden">
                  <img src="https://i.pravatar.cc/150?u=current_user" className="w-full h-full object-cover" alt="User" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 z-10">
          {children}
        </div>
      </main>
    </div>
  );
}
