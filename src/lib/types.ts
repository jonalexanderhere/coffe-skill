// ============================
// Type Definitions for CoffeeSkill Platform
// ============================

export type UserRole = 'student' | 'mentor' | 'superadmin';
export type UserStatus = 'active' | 'inactive' | 'pending' | 'suspended';
export type CourseStatus = 'draft' | 'pending_review' | 'approved' | 'rejected' | 'published' | 'archived';
export type MaterialType = 'video' | 'article' | 'quiz' | 'assignment' | 'resource';
export type CourseLevel = 'Pemula' | 'Menengah' | 'Lanjutan';

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  status: UserStatus;
  avatar?: string;
  bio?: string;
  joinedDate: string;
  lastLogin?: string;
}

export interface Course {
  id: string;
  mentorId: string;
  mentorName: string;
  title: string;
  description: string;
  shortDescription?: string;
  thumbnail?: string;
  category: string;
  level: CourseLevel;
  price: number;
  originalPrice?: number;
  isFree: boolean;
  status: CourseStatus;
  rating: number;
  reviewCount: number;
  studentCount: number;
  duration: string;
  lessons: number;
  tags: string[];
  chapters: Chapter[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  rejectedReason?: string;
}

export interface Chapter {
  id: string;
  courseId: string;
  title: string;
  description?: string;
  order: number;
  materials: Material[];
  isPublished: boolean;
}

export interface Material {
  id: string;
  chapterId: string;
  courseId: string;
  type: MaterialType;
  title: string;
  description?: string;
  content: string; // Video URL, article text, or quiz ID reference
  duration?: string; // For videos
  order: number;
  isPreview: boolean; // Free preview material
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Quiz {
  id: string;
  courseId: string;
  chapterId?: string;
  title: string;
  description?: string;
  questions: QuizQuestion[];
  passingScore: number; // Percentage 0-100
  timeLimit?: number; // In minutes
  maxAttempts: number;
  createdAt: string;
  updatedAt: string;
}

export interface QuizQuestion {
  id: string;
  quizId: string;
  question: string;
  options: QuizOption[];
  correctAnswer: number; // Index of correct option
  explanation?: string;
  points: number;
  order: number;
}

export interface QuizOption {
  text: string;
  isCorrect: boolean;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  userId: string;
  answers: number[];
  score: number;
  passed: boolean;
  startedAt: string;
  completedAt?: string;
  timeSpent?: number; // In seconds
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: string;
  completedAt?: string;
  progress: number; // Percentage 0-100
  lastAccessedAt?: string;
  completedChapters: string[];
  completedMaterials: string[];
  certificateIssued: boolean;
  certificateId?: string;
}

export interface Review {
  id: string;
  courseId: string;
  userId: string;
  userName: string;
  rating: number; // 1-5
  comment: string;
  createdAt: string;
  isVerified: boolean;
}

export interface Transaction {
  id: string;
  userId: string;
  courseId?: string;
  mentorId?: string;
  amount: number;
  platformFee: number;
  mentorPayout: number;
  type: 'purchase' | 'payout' | 'refund';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  createdAt: string;
}

export interface Announcement {
  id: string;
  courseId?: string; // If null, it's a platform-wide announcement
  mentorId?: string;
  title: string;
  content: string;
  createdAt: string;
  isPublished: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  courseCount: number;
  description?: string;
}

export interface PlatformSettings {
  commissionRate: number; // Percentage
  platformName: string;
  platformLogo?: string;
  minimumPayout: number;
  payoutSchedule: 'weekly' | 'monthly';
  supportEmail: string;
  maintenanceMode: boolean;
}

// Auth types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'student' | 'mentor';
}