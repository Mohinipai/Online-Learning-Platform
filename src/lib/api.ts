import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Expanded Mock data for fallback when backend is down
const MOCK_COURSES = [
  {
    id: '1',
    title: 'Full-Stack Java Masterclass',
    description: 'Master Spring Boot and React by building real-world applications.',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop',
    price: 89.99,
    category: 'Development',
    difficultyLevel: 'Beginner',
    instructorName: 'Dr. Sarah Johnson'
  },
  {
    id: '2',
    title: 'Advanced Machine Learning',
    description: 'Dive deep into neural networks and predictive modeling.',
    thumbnail: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?q=80&w=1974&auto=format&fit=crop',
    price: 99.99,
    category: 'AI & Data Science',
    difficultyLevel: 'Advanced',
    instructorName: 'Prof. Michael Chen'
  },
  {
    id: '3',
    title: 'UI/UX Design Systems',
    description: 'Learn to create scalable design systems for modern web apps.',
    thumbnail: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=2070&auto=format&fit=crop',
    price: 74.99,
    category: 'Design',
    difficultyLevel: 'Intermediate',
    instructorName: 'Emma Richardson'
  },
  {
    id: '4',
    title: 'Cybersecurity Professional',
    description: 'Protect networks and systems from advanced security threats.',
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
    price: 109.99,
    category: 'Security',
    difficultyLevel: 'Intermediate',
    instructorName: 'Alex Thorne'
  },
  {
    id: '5',
    title: 'Cloud Architecture with AWS',
    description: 'Design and deploy scalable infrastructure on Amazon Web Services.',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
    price: 119.99,
    category: 'IT & Software',
    difficultyLevel: 'Advanced',
    instructorName: 'David Miller'
  }
];

// Add a request interceptor to add the JWT token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors and provide fallback
api.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    // FALLBACK: If backend is unreachable or returns 404, provide mock data for demo
    const url = error.config?.url || '';
    if (!error.response || error.response.status === 404 || error.code === 'ERR_NETWORK') {
      console.warn(`Backend unreachable at ${url}. Providing mock fallback.`);
      
      // Course Detail Fallback
      if (url.match(/\/courses\/\d+$/) || url.match(/\/courses\/c\d+$/)) {
        const id = url.split('/').pop();
        const mockCourse = MOCK_COURSES.find(c => c.id === id) || MOCK_COURSES[0];
        const backendStyleCourse = {
          ...mockCourse,
          instructorId: 'i1',
          instructorName: mockCourse.instructorName,
          difficultyLevel: mockCourse.difficultyLevel || 'Intermediate',
          category: mockCourse.category || 'Development'
        };
        return { success: true, data: backendStyleCourse };
      }
      
      // Courses List Fallback
      if (url.includes('/courses')) {
        let filteredCourses = [...MOCK_COURSES];
        if (url.includes('/category/')) {
          const category = url.split('/category/')[1].split('?')[0];
          filteredCourses = MOCK_COURSES.filter(c => c.category.toLowerCase() === category.toLowerCase());
        }
        const params = new URLSearchParams(url.split('?')[1]);
        const query = params.get('query');
        if (query) {
          filteredCourses = filteredCourses.filter(c => 
            c.title.toLowerCase().includes(query.toLowerCase()) || 
            c.description.toLowerCase().includes(query.toLowerCase())
          );
        }
        return { success: true, data: { content: filteredCourses } };
      }
      
      // Admin Stats Fallback
      if (url.includes('/admin/stats')) {
        return { success: true, data: { totalRevenue: 12500, totalUsers: 1420, totalCourses: 45, totalEnrollments: 890 } };
      }

      // Auth Fallback
      if (url.includes('/auth/login') || url.includes('/auth/register')) {
        localStorage.setItem('token', 'mock-jwt-token-for-demo');
        return {
          success: true,
          message: 'Mock login successful',
          data: { token: 'mock-jwt-token-for-demo', user: { id: 'u1', name: 'Demo User', role: 'STUDENT' } }
        };
      }

      // User Profile Fallback
      if (url.includes('/users/me') || url.includes('/users/profile')) {
        return {
          success: true,
          data: { id: 'u1', name: 'Demo User', fullName: 'Demo User', email: 'demo@edunova.com', role: 'STUDENT' }
        };
      }

      // My Courses / Enrollments Fallback
      if (url.includes('/enrollments/my-courses')) {
        return {
          success: true,
          data: [
            { 
              id: 'e1', 
              courseId: '1', 
              courseTitle: 'Full-Stack Java Masterclass', 
              courseThumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop',
              progressPercentage: 45 
            }
          ]
        };
      }

      // Lessons Fallback
      if (url.includes('/lessons/course/')) {
        return {
          success: true,
          data: [
            { id: 'l1', title: 'Introduction to the Course', content: '<p>Welcome to the course!</p>', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', isCompleted: false, isVideo: true, duration: '10:00' },
            { id: 'l2', title: 'Setting up the Environment', content: '<p>Install Java and Maven.</p>', videoUrl: '', isCompleted: false, isVideo: false, duration: '15:00' },
            { id: 'l3', title: 'Your First Java Program', content: '<p>Hello World!</p>', videoUrl: '', isCompleted: false, isVideo: true, duration: '12:00' }
          ]
        };
      }

      // Enrollment / Purchase Fallback (POST)
      if (url.includes('/enrollments/') && error.config?.method === 'post') {
        return {
          success: true,
          message: 'Enrolled successfully in demo mode',
          data: { id: 'e' + Date.now(), progressPercentage: 0 }
        };
      }

      // Enrollment Progress Check Fallback
      if (url.includes('/enrollments/progress')) {
        return { success: true, data: { completedLessons: [], progressPercentage: 0 } };
      }
    }

    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/auth';
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

export default api;
