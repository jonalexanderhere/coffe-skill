import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Course, Enrollment, Category, PlatformSettings, Quiz, QuizQuestion, Chapter, Material } from './types';

// ============================
// User Store
// ============================
interface UserStore {
  users: User[];
  addUser: (user: User) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  deleteUser: (id: string) => void;
  getUserById: (id: string) => User | undefined;
  getUsersByRole: (role: User['role']) => User[];
  updateUserStatus: (id: string, status: User['status']) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      users: [
        {
          id: 'admin-1',
          name: 'Super Admin',
          email: 'admin@coffeeskill.id',
          password: 'admin123',
          role: 'superadmin',
          status: 'active',
          joinedDate: '2024-01-01',
        },
        {
          id: 'mentor-1',
          name: 'Ahmad Fauzan',
          email: 'mentor@coffeeskill.id',
          password: 'mentor123',
          role: 'mentor',
          status: 'active',
          bio: 'Senior Full-Stack Developer with 10+ years experience',
          joinedDate: '2024-06-15',
        },
        {
          id: 'mentor-2',
          name: 'Sari Dewi',
          email: 'sari@coffeeskill.id',
          password: 'mentor123',
          role: 'mentor',
          status: 'pending',
          bio: 'Data Scientist & AI Researcher',
          joinedDate: '2025-03-10',
        },
        {
          id: 'student-1',
          name: 'Ghifari Azhar',
          email: 'student@coffeeskill.id',
          password: 'student123',
          role: 'student',
          status: 'active',
          joinedDate: '2025-01-15',
        },
        {
          id: 'student-2',
          name: 'Andi Wijaya',
          email: 'andi@email.com',
          password: 'student123',
          role: 'student',
          status: 'active',
          joinedDate: '2025-03-10',
        },
        {
          id: 'student-3',
          name: 'Maya Putri',
          email: 'maya@email.com',
          password: 'student123',
          role: 'student',
          status: 'active',
          joinedDate: '2025-05-22',
        },
      ],
      addUser: (user) => set((state) => ({ users: [...state.users, user] })),
      updateUser: (id, updates) =>
        set((state) => ({
          users: state.users.map((u) => (u.id === id ? { ...u, ...updates } : u)),
        })),
      deleteUser: (id) =>
        set((state) => ({ users: state.users.filter((u) => u.id !== id) })),
      getUserById: (id) => get().users.find((u) => u.id === id),
      getUsersByRole: (role) => get().users.filter((u) => u.role === role),
      updateUserStatus: (id, status) =>
        set((state) => ({
          users: state.users.map((u) => (u.id === id ? { ...u, status } : u)),
        })),
    }),
    { name: 'coffeeskill-users' }
  )
);

// ============================
// Course Store
// ============================
interface CourseStore {
  courses: Course[];
  addCourse: (course: Course) => void;
  updateCourse: (id: string, updates: Partial<Course>) => void;
  deleteCourse: (id: string) => void;
  getCourseById: (id: string) => Course | undefined;
  getCoursesByMentor: (mentorId: string) => Course[];
  getCoursesByStatus: (status: Course['status']) => Course[];
  getPublishedCourses: () => Course[];
  approveCourse: (id: string) => void;
  rejectCourse: (id: string, reason: string) => void;
  publishCourse: (id: string) => void;
  addChapter: (courseId: string, chapter: Chapter) => void;
  updateChapter: (courseId: string, chapterId: string, updates: Partial<Chapter>) => void;
  deleteChapter: (courseId: string, chapterId: string) => void;
  addMaterial: (courseId: string, chapterId: string, material: Material) => void;
  updateMaterial: (courseId: string, chapterId: string, materialId: string, updates: Partial<Material>) => void;
  deleteMaterial: (courseId: string, chapterId: string, materialId: string) => void;
}

export const useCourseStore = create<CourseStore>()(
  persist(
    (set, get) => ({
      courses: [
        {
          id: 'course-1',
          mentorId: 'mentor-1',
          mentorName: 'Ahmad Fauzan',
          title: 'Full-Stack Web Development dengan Next.js',
          description: 'Pelajari cara membangun aplikasi web modern full-stack menggunakan Next.js, React, dan TypeScript dari dasar hingga production.',
          shortDescription: 'Kuasai Next.js dari dasar hingga production-ready app',
          category: 'Web Development',
          level: 'Menengah',
          price: 299000,
          originalPrice: 599000,
          isFree: false,
          status: 'published',
          rating: 4.9,
          reviewCount: 342,
          studentCount: 2840,
          duration: '24 jam',
          lessons: 128,
          tags: ['Next.js', 'React', 'TypeScript'],
          chapters: [
            {
              id: 'ch-1',
              courseId: 'course-1',
              title: 'Pengenalan Next.js',
              order: 1,
              isPublished: true,
              materials: [
                {
                  id: 'mat-1',
                  chapterId: 'ch-1',
                  courseId: 'course-1',
                  type: 'video',
                  title: 'Apa itu Next.js?',
                  description: 'Pengenalan konsep Next.js dan alasan mengapa memilih Next.js',
                  content: 'https://youtube.com/watch?v=example1',
                  duration: '15 menit',
                  order: 1,
                  isPreview: true,
                  isPublished: true,
                  createdAt: '2025-01-01',
                  updatedAt: '2025-01-01',
                },
              ],
            },
          ],
          createdAt: '2025-01-01',
          updatedAt: '2025-01-15',
          publishedAt: '2025-01-16',
        },
        {
          id: 'course-2',
          mentorId: 'mentor-2',
          mentorName: 'Sari Dewi',
          title: 'Python untuk Data Science & AI',
          description: 'Kuasai Python untuk analisis data, machine learning, dan artificial intelligence dengan proyek-proyek nyata.',
          category: 'Data Science',
          level: 'Pemula',
          price: 349000,
          isFree: false,
          status: 'pending_review',
          rating: 0,
          reviewCount: 0,
          studentCount: 0,
          duration: '32 jam',
          lessons: 156,
          tags: ['Python', 'Data Science', 'AI'],
          chapters: [],
          createdAt: '2025-04-20',
          updatedAt: '2025-05-01',
        },
      ],
      addCourse: (course) => set((state) => ({ courses: [...state.courses, course] })),
      updateCourse: (id, updates) =>
        set((state) => ({
          courses: state.courses.map((c) => (c.id === id ? { ...c, ...updates } : c)),
        })),
      deleteCourse: (id) =>
        set((state) => ({ courses: state.courses.filter((c) => c.id !== id) })),
      getCourseById: (id) => get().courses.find((c) => c.id === id),
      getCoursesByMentor: (mentorId) => get().courses.filter((c) => c.mentorId === mentorId),
      getCoursesByStatus: (status) => get().courses.filter((c) => c.status === status),
      getPublishedCourses: () => get().courses.filter((c) => c.status === 'published'),
      approveCourse: (id) =>
        set((state) => ({
          courses: state.courses.map((c) =>
            c.id === id ? { ...c, status: 'approved' as const } : c
          ),
        })),
      rejectCourse: (id, reason) =>
        set((state) => ({
          courses: state.courses.map((c) =>
            c.id === id ? { ...c, status: 'rejected' as const, rejectedReason: reason } : c
          ),
        })),
      publishCourse: (id: string) =>
        set((state) => ({
          courses: state.courses.map((c) =>
            c.id === id ? { ...c, status: 'published' as const, publishedAt: new Date().toISOString() } : c
          ),
        })),
      addChapter: (courseId, chapter) =>
        set((state) => ({
          courses: state.courses.map((c) =>
            c.id === courseId ? { ...c, chapters: [...c.chapters, chapter], lessons: c.lessons + 1 } : c
          ),
        })),
      updateChapter: (courseId, chapterId, updates) =>
        set((state) => ({
          courses: state.courses.map((c) =>
            c.id === courseId
              ? {
                  ...c,
                  chapters: c.chapters.map((ch) => (ch.id === chapterId ? { ...ch, ...updates } : ch)),
                }
              : c
          ),
        })),
      deleteChapter: (courseId, chapterId) =>
        set((state) => ({
          courses: state.courses.map((c) =>
            c.id === courseId
              ? {
                  ...c,
                  chapters: c.chapters.filter((ch) => ch.id !== chapterId),
                  lessons: c.lessons - 1,
                }
              : c
          ),
        })),
      addMaterial: (courseId, chapterId, material) =>
        set((state) => ({
          courses: state.courses.map((c) =>
            c.id === courseId
              ? {
                  ...c,
                  chapters: c.chapters.map((ch) =>
                    ch.id === chapterId ? { ...ch, materials: [...ch.materials, material] } : ch
                  ),
                  lessons: c.lessons + 1,
                }
              : c
          ),
        })),
      updateMaterial: (courseId, chapterId, materialId, updates) =>
        set((state) => ({
          courses: state.courses.map((c) =>
            c.id === courseId
              ? {
                  ...c,
                  chapters: c.chapters.map((ch) =>
                    ch.id === chapterId
                      ? {
                          ...ch,
                          materials: ch.materials.map((m) =>
                            m.id === materialId ? { ...m, ...updates } : m
                          ),
                        }
                      : ch
                  ),
                }
              : c
          ),
        })),
      deleteMaterial: (courseId, chapterId, materialId) =>
        set((state) => ({
          courses: state.courses.map((c) =>
            c.id === courseId
              ? {
                  ...c,
                  chapters: c.chapters.map((ch) =>
                    ch.id === chapterId
                      ? { ...ch, materials: ch.materials.filter((m) => m.id !== materialId) }
                      : ch
                  ),
                  lessons: c.lessons - 1,
                }
              : c
          ),
        })),
    }),
    { name: 'coffeeskill-courses' }
  )
);

// ============================
// Enrollment Store
// ============================
interface EnrollmentStore {
  enrollments: Enrollment[];
  enrollUser: (userId: string, courseId: string) => void;
  unenrollUser: (userId: string, courseId: string) => void;
  updateProgress: (userId: string, courseId: string, completedMaterialId: string) => void;
  getEnrollmentsByUser: (userId: string) => Enrollment[];
  getEnrollmentsByCourse: (courseId: string) => Enrollment[];
  getEnrollment: (userId: string, courseId: string) => Enrollment | undefined;
  isUserEnrolled: (userId: string, courseId: string) => boolean;
}

export const useEnrollmentStore = create<EnrollmentStore>()(
  persist(
    (set, get) => ({
      enrollments: [
        {
          id: 'enroll-1',
          userId: 'student-1',
          courseId: 'course-1',
          enrolledAt: '2025-02-01',
          progress: 75,
          lastAccessedAt: '2026-05-05',
          completedChapters: ['ch-1'],
          completedMaterials: ['mat-1'],
          certificateIssued: false,
        },
      ],
      enrollUser: (userId, courseId) =>
        set((state) => {
          // Prevent duplicate enrollments
          const exists = state.enrollments.some(
            (e) => e.userId === userId && e.courseId === courseId
          );
          if (exists) return state;
          
          return {
            enrollments: [
              ...state.enrollments,
              {
                id: `enroll-${Date.now()}`,
                userId,
                courseId,
                enrolledAt: new Date().toISOString().split('T')[0],
                progress: 0,
                completedChapters: [],
                completedMaterials: [],
                certificateIssued: false,
              },
            ],
          };
        }),
      unenrollUser: (userId, courseId) =>
        set((state) => ({
          enrollments: state.enrollments.filter(
            (e) => !(e.userId === userId && e.courseId === courseId)
          ),
        })),
      updateProgress: (userId, courseId, completedMaterialId) =>
        set((state) => ({
          enrollments: state.enrollments.map((e) =>
            e.userId === userId && e.courseId === courseId
              ? {
                  ...e,
                  completedMaterials: e.completedMaterials.includes(completedMaterialId)
                    ? e.completedMaterials
                    : [...e.completedMaterials, completedMaterialId],
                  lastAccessedAt: new Date().toISOString().split('T')[0],
                }
              : e
          ),
        })),
      getEnrollmentsByUser: (userId) => get().enrollments.filter((e) => e.userId === userId),
      getEnrollmentsByCourse: (courseId) => get().enrollments.filter((e) => e.courseId === courseId),
      getEnrollment: (userId, courseId) =>
        get().enrollments.find((e) => e.userId === userId && e.courseId === courseId),
      isUserEnrolled: (userId, courseId) =>
        get().enrollments.some((e) => e.userId === userId && e.courseId === courseId),
    }),
    { name: 'coffeeskill-enrollments' }
  )
);

// ============================
// Quiz Store
// ============================
interface QuizStore {
  quizzes: Quiz[];
  addQuiz: (quiz: Quiz) => void;
  updateQuiz: (id: string, updates: Partial<Quiz>) => void;
  deleteQuiz: (id: string) => void;
  addQuestion: (quizId: string, question: QuizQuestion) => void;
  updateQuestion: (quizId: string, questionId: string, updates: Partial<QuizQuestion>) => void;
  deleteQuestion: (quizId: string, questionId: string) => void;
  getQuizById: (id: string) => Quiz | undefined;
  getQuizzesByCourse: (courseId: string) => Quiz[];
}

export const useQuizStore = create<QuizStore>()(
  persist(
    (set, get) => ({
      quizzes: [],
      addQuiz: (quiz) => set((state) => ({ quizzes: [...state.quizzes, quiz] })),
      updateQuiz: (id, updates) =>
        set((state) => ({
          quizzes: state.quizzes.map((q) => (q.id === id ? { ...q, ...updates } : q)),
        })),
      deleteQuiz: (id) => set((state) => ({ quizzes: state.quizzes.filter((q) => q.id !== id) })),
      addQuestion: (quizId, question) =>
        set((state) => ({
          quizzes: state.quizzes.map((q) =>
            q.id === quizId ? { ...q, questions: [...q.questions, question] } : q
          ),
        })),
      updateQuestion: (quizId, questionId, updates) =>
        set((state) => ({
          quizzes: state.quizzes.map((q) =>
            q.id === quizId
              ? {
                  ...q,
                  questions: q.questions.map((q2) =>
                    q2.id === questionId ? { ...q2, ...updates } : q2
                  ),
                }
              : q
          ),
        })),
      deleteQuestion: (quizId, questionId) =>
        set((state) => ({
          quizzes: state.quizzes.map((q) =>
            q.id === quizId
              ? { ...q, questions: q.questions.filter((q2) => q2.id !== questionId) }
              : q
          ),
        })),
      getQuizById: (id) => get().quizzes.find((q) => q.id === id),
      getQuizzesByCourse: (courseId) => get().quizzes.filter((q) => q.courseId === courseId),
    }),
    { name: 'coffeeskill-quizzes' }
  )
);

// ============================
// Category Store
// ============================
interface CategoryStore {
  categories: Category[];
  addCategory: (category: Category) => void;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
}

export const useCategoryStore = create<CategoryStore>()(
  persist(
    (set, get) => ({
      categories: [
        { id: '1', name: 'Web Development', icon: 'Globe', courseCount: 42, color: '#3B82F6' },
        { id: '2', name: 'Mobile Development', icon: 'Smartphone', courseCount: 28, color: '#8B5CF6' },
        { id: '3', name: 'Data Science', icon: 'BarChart3', courseCount: 35, color: '#10B981' },
        { id: '4', name: 'UI/UX Design', icon: 'Palette', courseCount: 24, color: '#F59E0B' },
        { id: '5', name: 'Cloud Computing', icon: 'Cloud', courseCount: 18, color: '#06B6D4' },
        { id: '6', name: 'Cyber Security', icon: 'Shield', courseCount: 15, color: '#EF4444' },
        { id: '7', name: 'AI & Machine Learning', icon: 'Brain', courseCount: 31, color: '#EC4899' },
        { id: '8', name: 'DevOps', icon: 'Settings', courseCount: 12, color: '#6366F1' },
      ],
      addCategory: (category) => set((state) => ({ categories: [...state.categories, category] })),
      updateCategory: (id, updates) =>
        set((state) => ({
          categories: state.categories.map((c) => (c.id === id ? { ...c, ...updates } : c)),
        })),
      deleteCategory: (id) =>
        set((state) => ({ categories: state.categories.filter((c) => c.id !== id) })),
    }),
    { name: 'coffeeskill-categories' }
  )
);

// ============================
// Platform Settings Store
// ============================
interface SettingsStore {
  settings: PlatformSettings;
  updateSettings: (updates: Partial<PlatformSettings>) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      settings: {
        commissionRate: 30,
        platformName: 'CoffeeSkill',
        minimumPayout: 100000,
        payoutSchedule: 'monthly',
        supportEmail: 'support@coffeeskill.id',
        maintenanceMode: false,
      },
      updateSettings: (updates) =>
        set((state) => ({ settings: { ...state.settings, ...updates } })),
    }),
    { name: 'coffeeskill-settings' }
  )
);