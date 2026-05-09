// ============================
// Mock Data for CoffeeSkill
// ============================

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorAvatar: string;
  thumbnail: string;
  category: string;
  level: "Pemula" | "Menengah" | "Lanjutan";
  rating: number;
  reviewCount: number;
  studentCount: number;
  duration: string;
  lessons: number;
  price: number;
  originalPrice?: number;
  isFree: boolean;
  isBestseller: boolean;
  tags: string[];
}

export interface Mentor {
  id: string;
  name: string;
  role: string;
  avatar: string;
  courseCount: number;
  studentCount: number;
  rating: number;
  bio: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  courseCount: number;
  color: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  speaker: string;
  speakerRole: string;
  type: "webinar" | "workshop" | "meetup";
  attendees: number;
  isUpcoming: boolean;
  thumbnail: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  github: string;
  bio?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface CourseChapter {
  id: string;
  title: string;
  order: number;
  materials: string[];
}

export interface Material {
  id: string;
  courseId: string;
  chapterId: string;
  type: "video" | "article" | "quiz" | "assignment" | "resource";
  title: string;
  description: string;
  content: string;
  duration?: string;
  order: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CourseCreation {
  id: string;
  mentorId: string;
  title: string;
  description: string;
  category: string;
  level: "Pemula" | "Menengah" | "Lanjutan";
  price: number;
  thumbnail: string;
  status: "draft" | "published" | "archived";
  chapters: CourseChapter[];
  materials: Material[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface InstructorRequest {
  id: string;
  mentorId: string;
  type: "full-course" | "material" | "curriculum" | "review";
  title: string;
  description: string;
  specifications: string;
  requiredExpertise: string[];
  deadline: string;
  budget: number;
  status: "draft" | "posted" | "in-progress" | "completed" | "archived";
  createdAt: string;
  updatedAt: string;
}

export interface InstructorProposal {
  id: string;
  requestId: string;
  instructorId: string;
  instructorName: string;
  instructorEmail: string;
  proposal: string;
  bidAmount: number;
  estimatedDuration: string;
  status: "pending" | "accepted" | "rejected" | "completed";
  submittedAt: string;
  respondedAt?: string;
}

// Categories
export const categories: Category[] = [
  { id: "1", name: "Web Development", icon: "Globe", courseCount: 42, color: "#3B82F6" },
  { id: "2", name: "Mobile Development", icon: "Smartphone", courseCount: 28, color: "#8B5CF6" },
  { id: "3", name: "Data Science", icon: "BarChart3", courseCount: 35, color: "#10B981" },
  { id: "4", name: "UI/UX Design", icon: "Palette", courseCount: 24, color: "#F59E0B" },
  { id: "5", name: "Cloud Computing", icon: "Cloud", courseCount: 18, color: "#06B6D4" },
  { id: "6", name: "Cyber Security", icon: "Shield", courseCount: 15, color: "#EF4444" },
  { id: "7", name: "AI & Machine Learning", icon: "Brain", courseCount: 31, color: "#EC4899" },
  { id: "8", name: "DevOps", icon: "Settings", courseCount: 12, color: "#6366F1" },
];

// Courses
export const courses: Course[] = [
  {
    id: "1",
    title: "Full-Stack Web Development dengan Next.js",
    description: "Pelajari cara membangun aplikasi web modern full-stack menggunakan Next.js, React, dan TypeScript dari dasar hingga production.",
    instructor: "Ahmad Fauzan",
    instructorAvatar: "",
    thumbnail: "",
    category: "Web Development",
    level: "Menengah",
    rating: 4.9,
    reviewCount: 342,
    studentCount: 2840,
    duration: "24 jam",
    lessons: 128,
    price: 299000,
    originalPrice: 599000,
    isFree: false,
    isBestseller: true,
    tags: ["Next.js", "React", "TypeScript"],
  },
  {
    id: "2",
    title: "Python untuk Data Science & AI",
    description: "Kuasai Python untuk analisis data, machine learning, dan artificial intelligence dengan proyek-proyek nyata.",
    instructor: "Sari Dewi",
    instructorAvatar: "",
    thumbnail: "",
    category: "Data Science",
    level: "Pemula",
    rating: 4.8,
    reviewCount: 518,
    studentCount: 4200,
    duration: "32 jam",
    lessons: 156,
    price: 349000,
    originalPrice: 699000,
    isFree: false,
    isBestseller: true,
    tags: ["Python", "Data Science", "AI"],
  },
  {
    id: "3",
    title: "UI/UX Design Mastery dengan Figma",
    description: "Belajar desain antarmuka dan pengalaman pengguna menggunakan Figma, dari wireframing hingga prototyping.",
    instructor: "Rizky Pratama",
    instructorAvatar: "",
    thumbnail: "",
    category: "UI/UX Design",
    level: "Pemula",
    rating: 4.7,
    reviewCount: 289,
    studentCount: 1950,
    duration: "18 jam",
    lessons: 94,
    price: 0,
    isFree: true,
    isBestseller: false,
    tags: ["Figma", "UI Design", "UX Design"],
  },
  {
    id: "4",
    title: "React Native: Bangun Aplikasi Mobile",
    description: "Pelajari pengembangan aplikasi mobile cross-platform menggunakan React Native dan Expo.",
    instructor: "Budi Santoso",
    instructorAvatar: "",
    thumbnail: "",
    category: "Mobile Development",
    level: "Menengah",
    rating: 4.6,
    reviewCount: 198,
    studentCount: 1580,
    duration: "20 jam",
    lessons: 102,
    price: 279000,
    originalPrice: 499000,
    isFree: false,
    isBestseller: false,
    tags: ["React Native", "Expo", "Mobile"],
  },
  {
    id: "5",
    title: "Cloud Architecture dengan AWS",
    description: "Kuasai arsitektur cloud modern menggunakan Amazon Web Services, dari dasar hingga sertifikasi.",
    instructor: "Dimas Arya",
    instructorAvatar: "",
    thumbnail: "",
    category: "Cloud Computing",
    level: "Lanjutan",
    rating: 4.8,
    reviewCount: 156,
    studentCount: 980,
    duration: "28 jam",
    lessons: 134,
    price: 449000,
    originalPrice: 899000,
    isFree: false,
    isBestseller: true,
    tags: ["AWS", "Cloud", "DevOps"],
  },
  {
    id: "6",
    title: "Cyber Security Fundamentals",
    description: "Pelajari dasar-dasar keamanan siber, ethical hacking, dan penetration testing.",
    instructor: "Fajar Hidayat",
    instructorAvatar: "",
    thumbnail: "",
    category: "Cyber Security",
    level: "Pemula",
    rating: 4.5,
    reviewCount: 234,
    studentCount: 1720,
    duration: "22 jam",
    lessons: 108,
    price: 199000,
    originalPrice: 399000,
    isFree: false,
    isBestseller: false,
    tags: ["Security", "Ethical Hacking", "Network"],
  },
];

// Mentors
export const mentors: Mentor[] = [
  {
    id: "1",
    name: "Ahmad Fauzan",
    role: "Senior Full-Stack Developer",
    avatar: "",
    courseCount: 8,
    studentCount: 12400,
    rating: 4.9,
    bio: "10+ tahun pengalaman di industri teknologi. Ex-engineer di startup unicorn Indonesia.",
  },
  {
    id: "2",
    name: "Sari Dewi",
    role: "Data Scientist & AI Researcher",
    avatar: "",
    courseCount: 6,
    studentCount: 8900,
    rating: 4.8,
    bio: "PhD in Computer Science. Peneliti AI di laboratorium nasional.",
  },
  {
    id: "3",
    name: "Rizky Pratama",
    role: "Lead UI/UX Designer",
    avatar: "",
    courseCount: 5,
    studentCount: 6200,
    rating: 4.7,
    bio: "Designer lead di perusahaan fintech terkemuka. Spesialisasi design system.",
  },
  {
    id: "4",
    name: "Budi Santoso",
    role: "Mobile Developer",
    avatar: "",
    courseCount: 4,
    studentCount: 4800,
    rating: 4.6,
    bio: "Mobile developer berpengalaman, kontributor open source aktif.",
  },
];

// Testimonials
export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Andi Wijaya",
    role: "Junior Developer di GoTo",
    avatar: "",
    content: "CoffeeSkill membantu saya mendapatkan pekerjaan pertama sebagai developer. Materinya sangat relevan dengan industri saat ini.",
    rating: 5,
  },
  {
    id: "2",
    name: "Maya Putri",
    role: "UI Designer di Tokopedia",
    avatar: "",
    content: "Kursus UI/UX di sini benar-benar mengubah karir saya. Dari barista di Lampung Barat hingga designer di Jakarta.",
    rating: 5,
  },
  {
    id: "3",
    name: "Reno Saputra",
    role: "Data Analyst di Bank BCA",
    avatar: "",
    content: "Platform yang sangat terstruktur dan mudah dipahami. Sertifikatnya juga diakui oleh perusahaan tempat saya bekerja.",
    rating: 5,
  },
  {
    id: "4",
    name: "Lina Marlina",
    role: "Freelance Web Developer",
    avatar: "",
    content: "Belajar sambil bekerja jadi lebih mudah dengan CoffeeSkill. Fleksibel dan materinya selalu up-to-date.",
    rating: 4,
  },
];

// Events
export const events: Event[] = [
  {
    id: "1",
    title: "Webinar: Future of AI in Indonesia",
    description: "Diskusi mendalam tentang perkembangan AI dan dampaknya terhadap industri teknologi Indonesia.",
    date: "2026-05-15",
    time: "19:00 WIB",
    speaker: "Dr. Sari Dewi",
    speakerRole: "AI Researcher",
    type: "webinar",
    attendees: 450,
    isUpcoming: true,
    thumbnail: "",
  },
  {
    id: "2",
    title: "Workshop: Build Your First SaaS",
    description: "Workshop hands-on membangun aplikasi SaaS dari nol hingga deployment.",
    date: "2026-05-20",
    time: "09:00 WIB",
    speaker: "Ahmad Fauzan",
    speakerRole: "Full-Stack Developer",
    type: "workshop",
    attendees: 200,
    isUpcoming: true,
    thumbnail: "",
  },
  {
    id: "3",
    title: "Tech Meetup Lampung Barat",
    description: "Komunitas tech meetup bulanan untuk para developer dan designer di Lampung Barat.",
    date: "2026-05-25",
    time: "15:00 WIB",
    speaker: "Community",
    speakerRole: "CoffeeSkill Community",
    type: "meetup",
    attendees: 80,
    isUpcoming: true,
    thumbnail: "",
  },
];

// FAQs
export const faqs: FAQ[] = [
  {
    question: "Apa itu CoffeeSkill?",
    answer: "CoffeeSkill adalah platform pembelajaran teknologi modern yang berasal dari Lampung Barat. Kami menyediakan kursus berkualitas tinggi dalam bidang pengembangan web, data science, desain UI/UX, dan banyak lagi.",
  },
  {
    question: "Apakah ada kursus gratis?",
    answer: "Ya! Kami menyediakan beberapa kursus gratis untuk membantu Anda memulai perjalanan belajar. Anda bisa mengakses kursus gratis setelah membuat akun.",
  },
  {
    question: "Bagaimana cara mendapatkan sertifikat?",
    answer: "Setelah menyelesaikan semua modul dan quiz dalam sebuah kursus, Anda akan mendapatkan sertifikat digital yang bisa diunduh dan dibagikan di LinkedIn.",
  },
  {
    question: "Apakah sertifikat CoffeeSkill diakui?",
    answer: "Sertifikat kami diakui oleh berbagai perusahaan teknologi di Indonesia. Kami bekerja sama dengan industri untuk memastikan kurikulum kami relevan dengan kebutuhan pasar.",
  },
  {
    question: "Berapa lama akses kursus berlaku?",
    answer: "Setelah mendaftar kursus, Anda mendapatkan akses selamanya. Anda bisa belajar sesuai kecepatan sendiri tanpa batas waktu.",
  },
  {
    question: "Apakah ada fitur mentoring?",
    answer: "Ya, untuk kursus premium kami menyediakan sesi mentoring langsung dengan instruktur. Anda bisa bertanya dan berdiskusi secara real-time.",
  },
];

// Team Members
export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Fahri Azhar",
    email: "fahriazhar148@gmail.com",
    role: "Full-Stack Developer",
    avatar: "https://i.ibb.co.com/wZ2g7G5w/image.png",
    github: "jonalexanderhere",
    bio: "Passionate developer dan founder di CoffeeSkill. Membangun platform pembelajaran teknologi terdepan dari Lampung Barat.",
  },
  {
    id: "2",
    name: "Rico Developer",
    email: "rikoiqbal36@gmail.com",
    role: "Developer",
    avatar: "https://i.ibb.co.com/GQGdMzYV/Rico.jpg",
    github: "RikoDev-it",
    bio: "Developer berbakat yang berkontribusi dalam pengembangan platform CoffeeSkill. Spesialisasi dalam teknologi modern dan inovasi.",
  },
];

// Stats
export const platformStats = {
  students: 12500,
  courses: 200,
  mentors: 45,
  certificates: 8400,
  completionRate: 94,
};

// Dashboard mock data
export const userDashboard = {
  user: {
    name: "Ghifari Azhar",
    email: "ghifari@coffeeskill.id",
    avatar: "",
    role: "student",
    joinedDate: "2025-01-15",
    level: "Intermediate",
  },
  stats: {
    coursesEnrolled: 8,
    coursesCompleted: 5,
    hoursLearned: 124,
    certificates: 4,
    currentStreak: 12,
    totalPoints: 2450,
  },
  enrolledCourses: [
    {
      id: "1",
      title: "Full-Stack Web Development dengan Next.js",
      progress: 75,
      lastAccessed: "2026-05-05",
      nextLesson: "API Routes & Server Actions",
    },
    {
      id: "2",
      title: "Python untuk Data Science & AI",
      progress: 45,
      lastAccessed: "2026-05-04",
      nextLesson: "Pandas DataFrame Operations",
    },
    {
      id: "5",
      title: "Cloud Architecture dengan AWS",
      progress: 20,
      lastAccessed: "2026-05-01",
      nextLesson: "EC2 Instance Management",
    },
  ],
  recentActivity: [
    { type: "lesson", title: "Menyelesaikan React Hooks Advanced", time: "2 jam lalu", icon: "CheckCircle" },
    { type: "quiz", title: "Quiz: TypeScript Generics — Score 90%", time: "5 jam lalu", icon: "Award" },
    { type: "comment", title: "Berkomentar di diskusi Next.js", time: "1 hari lalu", icon: "MessageCircle" },
    { type: "certificate", title: "Mendapatkan sertifikat UI/UX Design", time: "3 hari lalu", icon: "Award" },
  ],
  achievements: [
    { name: "Fast Learner", description: "Selesaikan 5 lesson dalam sehari", unlocked: true },
    { name: "Quiz Master", description: "Dapatkan skor 100% di 3 quiz berturut-turut", unlocked: true },
    { name: "Streak Champion", description: "Belajar 30 hari berturut-turut", unlocked: false },
    { name: "Community Star", description: "Bantu 10 siswa di forum diskusi", unlocked: false },
  ],
};

// Admin mock data
export const adminStats = {
  totalUsers: 12500,
  activeUsers: 3200,
  totalCourses: 200,
  totalRevenue: 450000000,
  newUsersThisMonth: 840,
  coursesCreatedThisMonth: 12,
  averageRating: 4.7,
  supportTickets: 23,
};

export const adminUsers = [
  { id: "1", name: "Andi Wijaya", email: "andi@email.com", role: "student", status: "active", joinDate: "2025-03-10", coursesEnrolled: 4 },
  { id: "2", name: "Maya Putri", email: "maya@email.com", role: "student", status: "active", joinDate: "2025-05-22", coursesEnrolled: 6 },
  { id: "3", name: "Reno Saputra", email: "reno@email.com", role: "mentor", status: "active", joinDate: "2024-11-15", coursesEnrolled: 0 },
  { id: "4", name: "Lina Marlina", email: "lina@email.com", role: "student", status: "inactive", joinDate: "2025-08-01", coursesEnrolled: 2 },
  { id: "5", name: "Dimas Arya", email: "dimas@email.com", role: "mentor", status: "active", joinDate: "2024-09-20", coursesEnrolled: 0 },
  { id: "6", name: "Siti Nurhaliza", email: "siti@email.com", role: "student", status: "active", joinDate: "2025-12-05", coursesEnrolled: 3 },
  { id: "7", name: "Bagus Prakoso", email: "bagus@email.com", role: "student", status: "active", joinDate: "2026-01-18", coursesEnrolled: 7 },
  { id: "8", name: "Citra Anggraini", email: "citra@email.com", role: "admin", status: "active", joinDate: "2024-06-01", coursesEnrolled: 0 },
];

// Mentor dashboard mock
export const mentorDashboard = {
  mentor: {
    name: "Ahmad Fauzan",
    email: "ahmad@coffeeskill.id",
    role: "Senior Full-Stack Developer",
    totalStudents: 12400,
    totalCourses: 8,
    totalEarnings: 125000000,
    rating: 4.9,
  },
  monthlySummary: {
    newStudents: 340,
    revenue: 12500000,
    completionRate: 87,
    avgRating: 4.8,
  },
  recentStudents: [
    { name: "Andi Wijaya", course: "Full-Stack Web Development", progress: 75, lastActive: "2 jam lalu" },
    { name: "Bagus Prakoso", course: "Full-Stack Web Development", progress: 45, lastActive: "5 jam lalu" },
    { name: "Siti Nurhaliza", course: "React Masterclass", progress: 90, lastActive: "1 hari lalu" },
  ],
};
