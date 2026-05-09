import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Course, Enrollment, Category, PlatformSettings, Quiz, QuizQuestion, Chapter, Material, Event, Testimonial, FAQ, TeamMember, AuditLog, SystemHealth, CourseLevel } from './types';

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
  deleteDuplicateUsers: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      users: [
        {
          id: 'ghifari-azhar-admin',
          name: 'Ghifari Azhar',
          email: 'fahriazhar148@gmail.com',
          password: 'CoffeeSkill2026!',
          role: 'superadmin',
          status: 'active',
          joinedDate: new Date().toISOString().split('T')[0]
        },
        {
          id: 'rico-admin',
          name: 'Rico',
          email: 'rikoiqbal36@gmail.com',
          password: 'CoffeeSkill2026!',
          role: 'superadmin',
          status: 'active',
          joinedDate: new Date().toISOString().split('T')[0]
        },
        {
          id: 'mentor-1',
          name: 'Mentor 1',
          email: 'mentor1@coffeeskill.id',
          password: 'CoffeeSkill2026!',
          role: 'mentor',
          status: 'active',
          joinedDate: new Date().toISOString().split('T')[0]
        }
      ],
      addUser: (user) => set((state) => {
        const exists = state.users.some(u => u.email === user.email);
        if (exists) return state;
        return { users: [...state.users, user] };
      }),
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
      deleteDuplicateUsers: () => set((state) => {
        const seen = new Set();
        const uniqueUsers = state.users.filter(u => {
          if (seen.has(u.email)) return false;
          seen.add(u.email);
          return true;
        });
        return { users: uniqueUsers };
      }),
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
          title: 'Full-Stack Web Development dengan Next.js',
          description: 'Pelajari cara membangun aplikasi modern yang scalable dengan Next.js, TypeScript, dan Tailwind CSS.',
          price: 0,
          originalPrice: 499000,
          isFree: true,
          category: 'Development',
          level: 'Pemula',
          mentorId: 'mentor-1',
          mentorName: 'Mentor 1',
          thumbnail: 'https://i.ibb.co.com/wZ2g7G5w/image.png',
          rating: 4.8,
          reviewCount: 120,
          studentCount: 1500,
          duration: '12 Jam',
          lessons: 45,
          status: 'published',
          tags: ['Next.js', 'React', 'TypeScript'],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
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
                  title: 'Apa itu Next.js?', 
                  type: 'video', 
                  content: 'https://youtube.com/watch?v=1', 
                  duration: '10:00', 
                  order: 1, 
                  isPreview: true, 
                  isPublished: true, 
                  createdAt: new Date().toISOString(), 
                  updatedAt: new Date().toISOString() 
                },
                { 
                  id: 'mat-2', 
                  chapterId: 'ch-1', 
                  courseId: 'course-1', 
                  title: 'Setup Project Pertama', 
                  type: 'video', 
                  content: 'https://youtube.com/watch?v=2', 
                  duration: '15:00', 
                  order: 2, 
                  isPreview: false, 
                  isPublished: true, 
                  createdAt: new Date().toISOString(), 
                  updatedAt: new Date().toISOString() 
                }
              ]
            }
          ]
        },
        {
          id: 'course-2',
          title: 'UI/UX Design Mastery',
          description: 'Kuasai desain antarmuka dan pengalaman pengguna menggunakan Figma dari dasar hingga mahir.',
          price: 0,
          originalPrice: 350000,
          isFree: true,
          category: 'Design',
          level: 'Menengah',
          mentorId: 'rico-admin',
          mentorName: 'Rico',
          thumbnail: 'https://i.ibb.co.com/GQGdMzYV/Rico.jpg',
          rating: 4.9,
          reviewCount: 85,
          studentCount: 850,
          duration: '8 Jam',
          lessons: 30,
          status: 'published',
          tags: ['Design', 'Figma', 'UI/UX'],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          chapters: [
            {
              id: 'ch-2-1',
              courseId: 'course-2',
              title: 'Dasar-dasar UI Design',
              order: 1,
              isPublished: true,
              materials: [
                { 
                  id: 'mat-2-1', 
                  chapterId: 'ch-2-1', 
                  courseId: 'course-2', 
                  title: 'Prinsip Desain', 
                  type: 'video', 
                  content: 'https://youtube.com/watch?v=3', 
                  duration: '12:00', 
                  order: 1, 
                  isPreview: true, 
                  isPublished: true, 
                  createdAt: new Date().toISOString(), 
                  updatedAt: new Date().toISOString() 
                }
              ]
            }
          ]
        }
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
      getPublishedCourses: () => get().courses.filter((c) => c.status === 'published' || c.status === 'approved'),
      approveCourse: (id) =>
        set((state) => ({
          courses: state.courses.map((c) =>
            c.id === id ? { ...c, status: 'published' as const, publishedAt: new Date().toISOString() } : c
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
  deleteDuplicateEnrollments: () => void;
}

export const useEnrollmentStore = create<EnrollmentStore>()(
  persist(
    (set, get) => ({
      enrollments: [],
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
      deleteDuplicateEnrollments: () => set((state) => {
        const seen = new Set();
        const unique = state.enrollments.filter(e => {
          const key = `${e.userId}-${e.courseId}`;
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });
        return { enrollments: unique };
      }),
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
      categories: [],
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
// Event Store
// ============================
interface EventStore {
  events: Event[];
  addEvent: (event: Event) => void;
  updateEvent: (id: string, updates: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
}

export const useEventStore = create<EventStore>()(
  persist(
    (set) => ({
      events: [],
      addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
      updateEvent: (id, updates) =>
        set((state) => ({
          events: state.events.map((e) => (e.id === id ? { ...e, ...updates } : e)),
        })),
      deleteEvent: (id) =>
        set((state) => ({ events: state.events.filter((e) => e.id !== id) })),
    }),
    { name: 'coffeeskill-events' }
  )
);

// ============================
// Testimonial Store
// ============================
interface TestimonialStore {
  testimonials: Testimonial[];
  addTestimonial: (testimonial: Testimonial) => void;
  deleteTestimonial: (id: string) => void;
}

export const useTestimonialStore = create<TestimonialStore>()(
  persist(
    (set) => ({
      testimonials: [],
      addTestimonial: (testimonial) => set((state) => ({ testimonials: [...state.testimonials, testimonial] })),
      deleteTestimonial: (id) =>
        set((state) => ({ testimonials: state.testimonials.filter((t) => t.id !== id) })),
    }),
    { name: 'coffeeskill-testimonials' }
  )
);

// ============================
// FAQ Store
// ============================
interface FAQStore {
  faqs: FAQ[];
  addFAQ: (faq: FAQ) => void;
  deleteFAQ: (question: string) => void;
}

export const useFAQStore = create<FAQStore>()(
  persist(
    (set) => ({
      faqs: [],
      addFAQ: (faq) => set((state) => ({ faqs: [...state.faqs, faq] })),
      deleteFAQ: (question) =>
        set((state) => ({ faqs: state.faqs.filter((f) => f.question !== question) })),
    }),
    { name: 'coffeeskill-faqs' }
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

// ============================
// Team Store
// ============================
interface TeamStore {
  teamMembers: TeamMember[];
  addTeamMember: (member: TeamMember) => void;
  deleteTeamMember: (id: string) => void;
}

export const useTeamStore = create<TeamStore>()(
  persist(
    (set) => ({
      teamMembers: [
        {
          id: 'ghifari-azhar',
          name: 'Ghifari Azhar',
          email: 'fahriazhar148@gmail.com',
          role: 'Developer',
          avatar: 'https://i.ibb.co.com/wZ2g7G5w/image.png',
          github: 'jonalexanderhere',
          bio: 'Passionate developer dan founder di CoffeeSkill. Membangun platform pembelajaran teknologi terdepan dari Lampung Barat.'
        },
        {
          id: 'rico',
          name: 'Rico',
          email: 'rikoiqbal36@gmail.com',
          role: 'Developer',
          avatar: 'https://i.ibb.co.com/GQGdMzYV/Rico.jpg',
          github: 'RikoDev-it',
          bio: 'Creative Developer dan Co-Founder di CoffeeSkill. Berfokus pada pengembangan antarmuka pengguna yang intuitif dan performa aplikasi yang tinggi.'
        }
      ],
      addTeamMember: (member) => set((state) => ({ teamMembers: [...state.teamMembers, member] })),
      deleteTeamMember: (id) =>
        set((state) => ({ teamMembers: state.teamMembers.filter((t) => t.id !== id) })),
    }),
    { name: 'coffeeskill-team' }
  )
);

// ============================
// Draft Course Store (Persistence for creation)
// ============================
interface DraftCourseStore {
  currentStep: number;
  basicInfo: {
    title: string;
    shortDescription: string;
    description: string;
    category: string;
    level: CourseLevel;
    price: number;
    isFree: boolean;
    thumbnail: string;
    tags: string[];
  };
  chapters: any[];
  setStep: (step: number) => void;
  updateBasicInfo: (info: Partial<DraftCourseStore['basicInfo']>) => void;
  setChapters: (chapters: any[]) => void;
  resetDraft: () => void;
}

export const useDraftCourseStore = create<DraftCourseStore>()(
  persist(
    (set) => ({
      currentStep: 1,
      basicInfo: {
        title: "",
        shortDescription: "",
        description: "",
        category: "",
        level: "Pemula" as CourseLevel,
        price: 0,
        isFree: false,
        thumbnail: "",
        tags: []
      },
      chapters: [],
      setStep: (step) => set({ currentStep: step }),
      updateBasicInfo: (info) => set((state) => ({
        basicInfo: { ...state.basicInfo, ...info }
      })),
      setChapters: (chapters) => set({ chapters }),
      resetDraft: () => set({
        currentStep: 1,
        basicInfo: {
          title: "",
          shortDescription: "",
          description: "",
          category: "",
          level: "Pemula" as CourseLevel,
          price: 0,
          isFree: false,
          thumbnail: "",
          tags: []
        },
        chapters: []
      })
    }),
    { name: 'coffeeskill-course-draft' }
  )
);

// ============================
// System & Audit Store
// ============================
interface SystemStore {
  logs: AuditLog[];
  health: SystemHealth;
  addLog: (log: Omit<AuditLog, 'id' | 'timestamp'>) => void;
  updateHealth: (updates: Partial<SystemHealth>) => void;
  clearLogs: () => void;
}

export const useSystemStore = create<SystemStore>()(
  persist(
    (set) => ({
      logs: [
        {
          id: 'log-1',
          timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
          action: 'Login Success',
          category: 'auth',
          details: 'User fahriazhar148@gmail.com logged in from Chrome/Windows',
          ipAddress: '182.1.44.12',
          status: 'success',
          severity: 'info'
        },
        {
          id: 'log-2',
          timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
          action: 'Course Published',
          category: 'content',
          details: 'Course "Mastering Coffee Brewing" was published by Mentor 1',
          ipAddress: '182.1.44.12',
          status: 'success',
          severity: 'info'
        },
        {
          id: 'log-3',
          timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
          action: 'SQL Injection Attempt',
          category: 'security',
          details: 'Detected suspicious pattern in request to /api/courses',
          ipAddress: '45.122.1.9',
          status: 'failure',
          severity: 'high'
        }
      ],
      health: {
        cpuUsage: 12.5,
        memoryUsage: 450,
        diskUsage: 2.1,
        uptime: '14 Hari 5 Jam',
        activeRequests: 42,
        firewallStatus: 'active',
        threatLevel: 'low',
        blockedIps: 124,
        totalTraffic: 154000,
        p75ResponseTime: 120
      },
      addLog: (log) => set((state) => ({
        logs: [
          {
            ...log,
            id: `log-${Date.now()}`,
            timestamp: new Date().toISOString()
          },
          ...state.logs
        ].slice(0, 500) // Keep last 500 logs
      })),
      updateHealth: (updates) => set((state) => ({
        health: { ...state.health, ...updates }
      })),
      clearLogs: () => set({ logs: [] })
    }),
    { name: 'coffeeskill-system' }
  )
);