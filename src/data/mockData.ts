import { Course, Review, Instructor } from '../types';

export const INSTRUCTORS: Instructor[] = [
  { id: 'i1', name: 'Dr. Sarah Connor', title: 'Data Scientist & AI Researcher', avatar: 'https://i.pravatar.cc/150?u=sarah', rating: 4.9, studentsCount: 154200 },
  { id: 'i2', name: 'James Morrison', title: 'Senior Full Stack Engineer', avatar: 'https://i.pravatar.cc/150?u=james', rating: 4.8, studentsCount: 89000 },
  { id: 'i3', name: 'Elena Rodriguez', title: 'UX/UI Design Lead', avatar: 'https://i.pravatar.cc/150?u=elena', rating: 4.7, studentsCount: 65000 },
  { id: 'i4', name: 'Marcus Chen', title: 'Cloud Solutions Architect', avatar: 'https://i.pravatar.cc/150?u=marcus', rating: 4.9, studentsCount: 120500 },
];

export const COURSES: Course[] = [
  {
    id: 'c1',
    title: 'The Complete Full-Stack Java Bootcamp',
    description: 'Master Java, Spring Boot, React, and build enterprise-scale applications from scratch.',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    instructor: INSTRUCTORS[1],
    rating: 4.8,
    reviewsCount: 12450,
    duration: '45h 30m',
    difficulty: 'Intermediate',
    price: 89.99,
    progress: 45,
    category: 'Development',
    tags: ['Java', 'Spring Boot', 'React']
  },
  {
    id: 'c2',
    title: 'Advanced Machine Learning & AI',
    description: 'Deep dive into neural networks, PyTorch, and deploying AI models to production.',
    thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    instructor: INSTRUCTORS[0],
    rating: 4.9,
    reviewsCount: 8900,
    duration: '32h 15m',
    difficulty: 'Advanced',
    price: 99.99,
    progress: 0,
    category: 'AI & Data Science',
    tags: ['Python', 'AI', 'Machine Learning']
  },
  {
    id: 'c3',
    title: 'UI/UX Masterclass: From Figma to Webflow',
    description: 'Learn visual design, user research, wireframing, and interactive prototyping.',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    instructor: INSTRUCTORS[2],
    rating: 4.7,
    reviewsCount: 5600,
    duration: '22h 45m',
    difficulty: 'Beginner',
    price: 69.99,
    progress: 100,
    category: 'Design',
    tags: ['Figma', 'UI/UX', 'Design']
  },
  {
    id: 'c4',
    title: 'AWS Certified Solutions Architect',
    description: 'Pass the AWS SAA-C03 exam with hands-on labs and real cloud architecture projects.',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    instructor: INSTRUCTORS[3],
    rating: 4.9,
    reviewsCount: 22100,
    duration: '60h 10m',
    difficulty: 'Intermediate',
    price: 129.99,
    progress: 12,
    category: 'IT & Software',
    tags: ['AWS', 'Cloud', 'DevOps']
  },
  {
    id: 'c5',
    title: 'Modern React & Next.js Ecosystem',
    description: 'Build fast, SEO-friendly apps using React 19, Next.js 14, Tailwind, and Framer Motion.',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    instructor: INSTRUCTORS[1],
    rating: 4.8,
    reviewsCount: 15300,
    duration: '28h 20m',
    difficulty: 'Intermediate',
    price: 79.99,
    progress: 0,
    category: 'Development',
    tags: ['React', 'Next.js', 'Frontend']
  },
  {
    id: 'c6',
    title: 'Cybersecurity Ethical Hacking Lab',
    description: 'Hands-on ethical hacking, penetration testing, and securing networks.',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    instructor: INSTRUCTORS[3],
    rating: 4.6,
    reviewsCount: 4200,
    duration: '40h 00m',
    difficulty: 'Advanced',
    price: 109.99,
    progress: 0,
    category: 'Security',
    tags: ['Cybersecurity', 'Hacking', 'Networks']
  }
];

export const REVIEWS: Review[] = [
  { id: 'r1', useName: 'Alex Mercer', avatar: 'https://i.pravatar.cc/150?u=alex', rating: 5, comment: 'Hands down the best course I have ever taken. Got a job right after completing.', date: '2 days ago' },
  { id: 'r2', useName: 'Samantha Lee', avatar: 'https://i.pravatar.cc/150?u=sam', rating: 4, comment: 'Great depth of material. Sometimes a bit fast-paced but you can always rewatch.', date: '1 week ago' },
];
