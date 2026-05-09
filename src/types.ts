export interface Instructor {
  id: string;
  name: string;
  title: string;
  avatar: string;
  rating: number;
  studentsCount: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  instructor: Instructor;
  rating: number;
  reviewsCount: number;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  price: number;
  progress?: number;
  category: string;
  tags: string[];
}

export interface Review {
  id: string;
  useName: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  isCompleted: boolean;
  isVideo: boolean;
}

export interface Section {
  id: string;
  title: string;
  lessons: Lesson[];
}
