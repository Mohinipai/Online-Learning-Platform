import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { Home } from './pages/Home';
import { Courses } from './pages/Courses';
import { CourseDetails } from './pages/CourseDetails';
import { Auth } from './pages/Auth';
import { Dashboard } from './pages/Dashboard';
import { LessonPlayer } from './pages/LessonPlayer';
import { AdminDashboard } from './pages/AdminDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/courses" element={<MainLayout><Courses /></MainLayout>} />
        <Route path="/courses/:courseId" element={<MainLayout><CourseDetails /></MainLayout>} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/lesson/:courseId/:lessonId" element={<LessonPlayer />} />
      </Routes>
    </BrowserRouter>
  );
}
