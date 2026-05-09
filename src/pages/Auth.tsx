import { motion } from 'motion/react';
import { BookOpen, Github } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import api from '../lib/api';

export function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const response: any = await api.post(endpoint, formData);
      
      if (response.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data));
        navigate('/dashboard');
      } else {
        setError(response.message || 'Authentication failed');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#050507] relative overflow-hidden font-sans">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="w-full max-w-5xl flex flex-col md:flex-row bg-[#0A0A0A] border border-white/5 rounded-3xl overflow-hidden shadow-2xl relative z-10 min-h-[600px]">
        {/* Left Side: Branding / Visual */}
        <div className="flex-1 bg-gradient-to-br from-blue-900/50 to-indigo-900/50 p-12 hidden md:flex flex-col justify-between border-r border-white/5 relative overflow-hidden">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')] opacity-10 mix-blend-overlay object-cover" />
           <div className="relative z-10 space-y-6">
              <Link to="/" className="flex items-center gap-2 group mb-12">
                <div className="bg-blue-600 p-2 text-white rounded-xl shadow-lg shadow-blue-500/20">
                   <BookOpen className="w-6 h-6" />
                </div>
                <span className="font-bold text-3xl tracking-tight text-white">Edu<span className="text-blue-500">Nova</span></span>
              </Link>
              
              <h2 className="text-4xl font-bold text-white leading-tight tracking-tight">
                Unlock your potential. <br/> Join the best.
              </h2>
              <p className="text-slate-300 text-lg font-medium">
                Access hundreds of premium courses, track your progress, and earn certificates.
              </p>
           </div>
           
           <div className="relative z-10 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
             <div className="flex items-center gap-4 mb-4">
               <div className="flex -space-x-4">
                 {[1,2,3,4].map(i => (
                   <img key={i} src={`https://i.pravatar.cc/100?u=${i}`} className="w-10 h-10 rounded-full border-2 border-slate-900" alt="Avatar"/>
                 ))}
               </div>
               <div className="text-sm">
                 <span className="font-bold text-white">100k+</span>
                 <span className="text-slate-400 ml-1 font-bold">students</span>
               </div>
             </div>
           </div>
        </div>

        {/* Right Side: Form */}
        <div className="flex-1 p-8 md:p-12 flex flex-col justify-center bg-[#050507]">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl font-bold tracking-tight text-white mb-2">
              {isLogin ? 'Welcome back' : 'Create an account'}
            </h3>
            <p className="text-slate-400 text-sm mb-8 font-medium">
              {isLogin ? 'Enter your details to sign in to your account.' : 'Join the platform to start learning.'}
            </p>

            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                  <input 
                    name="fullName"
                    type="text" 
                    required 
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 shadow-inner font-medium" 
                    placeholder="John Doe" 
                  />
                </div>
              )}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                <input 
                  name="email"
                  type="email" 
                  required 
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 shadow-inner font-medium" 
                  placeholder="name@example.com" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Password</label>
                <input 
                  name="password"
                  type="password" 
                  required 
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 shadow-inner font-medium" 
                  placeholder="••••••••" 
                />
              </div>
              
              {isLogin && (
                <div className="flex justify-end">
                  <a href="#" className="text-sm font-bold text-blue-400 hover:text-blue-300">Forgot password?</a>
                </div>
              )}

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 bg-white text-black font-bold rounded-xl mt-6 hover:bg-slate-100 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
              </button>
            </form>

            <div className="my-8 flex items-center justify-between text-sm text-slate-500 font-bold tracking-wide">
              <span className="w-1/3 h-px bg-white/10"></span>
              Or continue with
              <span className="w-1/3 h-px bg-white/10"></span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 py-3.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors text-white font-bold shadow-sm">
                <Github className="w-5 h-5" /> GitHub
              </button>
              <button className="flex items-center justify-center gap-2 py-3.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors text-white font-bold shadow-sm">
                <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                Google
              </button>
            </div>

            <p className="mt-8 text-center text-slate-400 text-sm font-medium">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button onClick={() => setIsLogin(!isLogin)} className="text-white font-bold hover:underline cursor-pointer tracking-wide underline-offset-4">
                {isLogin ? 'Sign up' : 'Log in'}
              </button>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
