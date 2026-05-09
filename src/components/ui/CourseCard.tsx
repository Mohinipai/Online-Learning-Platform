import { Link } from 'react-router-dom';
import { PlayCircle, Star, Clock, BarChart } from 'lucide-react';
import { Course } from '../../types';
import { motion } from 'motion/react';

interface CourseCardProps {
  course: Course;
  index: number;
}

export function CourseCard({ course, index }: CourseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-black/40 border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all shadow-[0_0_0_transparent] hover:shadow-[0_0_30px_rgba(37,99,235,0.15)] flex flex-col h-full"
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={course.thumbnail} 
          alt={course.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity" />
        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-widest">
          {course.category}
        </div>
        
        {/* Play button overlay on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-blue-600/90 text-white rounded-full p-4 shadow-[0_0_20px_rgba(37,99,235,0.5)] transform scale-90 group-hover:scale-100 transition-transform">
            <PlayCircle className="w-10 h-10 ml-1" />
          </div>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow bg-gradient-to-b from-transparent to-black/20">
        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center gap-1.5 text-yellow-400 text-[11px] font-bold">
            <Star className="w-3.5 h-3.5 fill-yellow-400" />
            {course.rating}
            <span className="text-slate-500 font-bold uppercase tracking-wide">({course.reviewsCount.toLocaleString()})</span>
          </div>
          <div className="h-1 w-1 rounded-full bg-slate-700" />
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-bold uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5" />
            {course.duration}
          </div>
        </div>

        <Link to={`/courses/${course.id}`} className="flex-grow">
          <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 leading-snug group-hover:text-blue-400 transition-colors">
            {course.title}
          </h3>
          <p className="text-slate-400 text-[13px] line-clamp-2 mb-6 leading-relaxed font-medium">
            {course.description}
          </p>
        </Link>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
          <div className="flex items-center gap-3">
            <img src={course.instructor.avatar} alt={course.instructor.name} className="w-8 h-8 rounded-full border-2 border-white/10" />
            <span className="text-xs font-bold text-slate-300">{course.instructor.name}</span>
          </div>
          <div className="text-lg font-bold text-white">
            ${course.price}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
