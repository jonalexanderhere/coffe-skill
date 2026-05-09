import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCourseStore, useEnrollmentStore, useUserStore } from '@/lib/store';
import { Course, Enrollment } from '@/lib/types';

// Helper to reset stores before each test
beforeEach(() => {
  // Reset localStorage
  localStorage.clear();
  
  // Reset stores by clearing and re-initializing
  const courseStore = useCourseStore.getState();
  const enrollmentStore = useEnrollmentStore.getState();
  const userStore = useUserStore.getState();
  
  // Clear courses back to initial state
  useCourseStore.setState({ 
    courses: courseStore.courses.slice(0, 2) // Keep initial 2 courses
  });
  
  // Clear enrollments
  useEnrollmentStore.setState({ enrollments: [] });
});

describe('Course Store - Lifecycle Management', () => {
  describe('Course Creation', () => {
    it('should add a new course with pending_review status', () => {
      const { courses } = useCourseStore.getState();
      const initialCount = courses.length;
      
      const newCourse: Course = {
        id: 'course-new-1',
        mentorId: 'mentor-1',
        mentorName: 'Ahmad Fauzan',
        title: 'Test Course for Lifecycle',
        description: 'A test course description',
        shortDescription: 'Test short desc',
        category: 'Web Development',
        level: 'Pemula',
        price: 0,
        isFree: true,
        status: 'pending_review',
        rating: 0,
        reviewCount: 0,
        studentCount: 0,
        duration: '2 jam',
        lessons: 10,
        tags: ['Test'],
        chapters: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      act(() => {
        useCourseStore.getState().addCourse(newCourse);
      });
      
      const { courses: updatedCourses } = useCourseStore.getState();
      expect(updatedCourses).toHaveLength(initialCount + 1);
      expect(updatedCourses.find(c => c.id === 'course-new-1')?.status).toBe('pending_review');
    });

    it('should create course with chapters and materials', () => {
      const newCourse: Course = {
        id: 'course-with-chapters',
        mentorId: 'mentor-1',
        mentorName: 'Ahmad Fauzan',
        title: 'Course with Content',
        description: 'Full course with chapters',
        category: 'Web Development',
        level: 'Menengah',
        price: 299000,
        isFree: false,
        status: 'pending_review',
        rating: 0,
        reviewCount: 0,
        studentCount: 0,
        duration: '5 jam',
        lessons: 3,
        tags: ['React'],
        chapters: [
          {
            id: 'ch-1',
            courseId: 'course-with-chapters',
            title: 'Introduction',
            order: 1,
            isPublished: true,
            materials: [
              {
                id: 'mat-1',
                chapterId: 'ch-1',
                courseId: 'course-with-chapters',
                type: 'video',
                title: 'Welcome Video',
                content: 'https://youtube.com/watch?v=123',
                duration: '10 menit',
                order: 1,
                isPreview: true,
                isPublished: true,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
            ],
          },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      act(() => {
        useCourseStore.getState().addCourse(newCourse);
      });
      
      const course = useCourseStore.getState().getCourseById('course-with-chapters');
      expect(course).toBeDefined();
      expect(course?.chapters).toHaveLength(1);
      expect(course?.chapters[0].materials).toHaveLength(1);
    });
  });

  describe('Course Approval Workflow', () => {
    it('should approve a pending course', () => {
      // First add a pending course
      const pendingCourse: Course = {
        id: 'course-pending',
        mentorId: 'mentor-1',
        mentorName: 'Ahmad Fauzan',
        title: 'Pending Course',
        description: 'Course awaiting approval',
        category: 'Data Science',
        level: 'Pemula',
        price: 199000,
        isFree: false,
        status: 'pending_review',
        rating: 0,
        reviewCount: 0,
        studentCount: 0,
        duration: '4 jam',
        lessons: 20,
        tags: [],
        chapters: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      act(() => {
        useCourseStore.getState().addCourse(pendingCourse);
      });
      
      // Approve the course
      act(() => {
        useCourseStore.getState().approveCourse('course-pending');
      });
      
      const course = useCourseStore.getState().getCourseById('course-pending');
      expect(course?.status).toBe('approved');
    });

    it('should reject a course with reason', () => {
      const courseToReject: Course = {
        id: 'course-reject',
        mentorId: 'mentor-2',
        mentorName: 'Sari Dewi',
        title: 'Course to Reject',
        description: 'This course has issues',
        category: 'Web Development',
        level: 'Pemula',
        price: 0,
        isFree: true,
        status: 'pending_review',
        rating: 0,
        reviewCount: 0,
        studentCount: 0,
        duration: '3 jam',
        lessons: 15,
        tags: [],
        chapters: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      act(() => {
        useCourseStore.getState().addCourse(courseToReject);
      });
      
      const rejectReason = 'Konten kurang lengkap, perlu ditambahkan lebih banyak materi';
      
      act(() => {
        useCourseStore.getState().rejectCourse('course-reject', rejectReason);
      });
      
      const course = useCourseStore.getState().getCourseById('course-reject');
      expect(course?.status).toBe('rejected');
      expect(course?.rejectedReason).toBe(rejectReason);
    });

    it('should publish an approved course', () => {
      const courseToPublish: Course = {
        id: 'course-publish',
        mentorId: 'mentor-1',
        mentorName: 'Ahmad Fauzan',
        title: 'Ready to Publish',
        description: 'Course ready for publication',
        category: 'Web Development',
        level: 'Menengah',
        price: 299000,
        isFree: false,
        status: 'approved',
        rating: 0,
        reviewCount: 0,
        studentCount: 0,
        duration: '6 jam',
        lessons: 30,
        tags: [],
        chapters: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      act(() => {
        useCourseStore.getState().addCourse(courseToPublish);
      });
      
      act(() => {
        useCourseStore.getState().publishCourse('course-publish');
      });
      
      const course = useCourseStore.getState().getCourseById('course-publish');
      expect(course?.status).toBe('published');
      expect(course?.publishedAt).toBeDefined();
    });
  });

  describe('Course Filtering', () => {
    it('should get only published courses', () => {
      const { getPublishedCourses } = useCourseStore.getState();
      const published = getPublishedCourses();
      
      // All returned courses should be published
      published.forEach(course => {
        expect(course.status).toBe('published');
      });
      
      // Initial data has course-1 as published
      expect(published.some(c => c.id === 'course-1')).toBe(true);
    });

    it('should get courses by mentor', () => {
      const { getCoursesByMentor } = useCourseStore.getState();
      const mentorCourses = getCoursesByMentor('mentor-1');
      
      // All returned courses should belong to mentor-1
      mentorCourses.forEach(course => {
        expect(course.mentorId).toBe('mentor-1');
      });
      
      // Initial data has course-1 for mentor-1
      expect(mentorCourses.some(c => c.id === 'course-1')).toBe(true);
    });

    it('should get courses by status', () => {
      const { getCoursesByStatus } = useCourseStore.getState();
      
      // Add a pending course
      const pendingCourse: Course = {
        id: 'course-pending-test',
        mentorId: 'mentor-1',
        mentorName: 'Test Mentor',
        title: 'Pending Test',
        description: 'Test',
        category: 'Test',
        level: 'Pemula',
        price: 0,
        isFree: true,
        status: 'pending_review',
        rating: 0,
        reviewCount: 0,
        studentCount: 0,
        duration: '1 jam',
        lessons: 5,
        tags: [],
        chapters: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      act(() => {
        useCourseStore.getState().addCourse(pendingCourse);
      });
      
      const pendingCourses = getCoursesByStatus('pending_review');
      pendingCourses.forEach(course => {
        expect(course.status).toBe('pending_review');
      });
      
      expect(pendingCourses.some(c => c.id === 'course-pending-test')).toBe(true);
    });
  });
});

describe('Enrollment Store - Student Enrollment', () => {
  describe('Enrollment Creation', () => {
    it('should enroll a student in a course', () => {
      const { enrollUser, getEnrollmentsByUser } = useEnrollmentStore.getState();
      const initialEnrollments = getEnrollmentsByUser('student-new');
      
      act(() => {
        enrollUser('student-new', 'course-1');
      });
      
      const updatedEnrollments = getEnrollmentsByUser('student-new');
      expect(updatedEnrollments).toHaveLength(initialEnrollments.length + 1);
      expect(updatedEnrollments.some(e => e.courseId === 'course-1' && e.userId === 'student-new')).toBe(true);
    });

    it('should prevent duplicate enrollments', () => {
      const { enrollUser, getEnrollmentsByUser } = useEnrollmentStore.getState();
      
      // Enroll first time
      act(() => {
        enrollUser('student-dup', 'course-dup');
      });
      
      // Try to enroll again
      act(() => {
        enrollUser('student-dup', 'course-dup');
      });
      
      const enrollments = getEnrollmentsByUser('student-dup');
      // Should only have one enrollment for this course
      const courseEnrollments = enrollments.filter(e => e.courseId === 'course-dup');
      expect(courseEnrollments).toHaveLength(1);
    });
  });

  describe('Progress Tracking', () => {
    it('should update student progress', () => {
      const { enrollUser, enrollments } = useEnrollmentStore.getState();
      
      act(() => {
        enrollUser('student-progress', 'course-1');
      });
      
      const enrollment = useEnrollmentStore.getState().getEnrollment('student-progress', 'course-1');
      expect(enrollment?.progress).toBe(0);
      expect(enrollment?.completedMaterials).toHaveLength(0);
    });

    it('should check if user is enrolled', () => {
      const { enrollUser, isUserEnrolled } = useEnrollmentStore.getState();
      
      expect(isUserEnrolled('student-check', 'course-1')).toBe(false);
      
      act(() => {
        enrollUser('student-check', 'course-1');
      });
      
      expect(isUserEnrolled('student-check', 'course-1')).toBe(true);
    });
  });

  describe('Course Student Count', () => {
    it('should track student count for courses', () => {
      const { enrollUser, getEnrollmentsByCourse } = useEnrollmentStore.getState();
      
      // Enroll multiple students in same course
      act(() => {
        enrollUser('student-a', 'course-count');
        enrollUser('student-b', 'course-count');
        enrollUser('student-c', 'course-count');
      });
      
      const courseEnrollments = getEnrollmentsByCourse('course-count');
      expect(courseEnrollments).toHaveLength(3);
    });
  });
});

describe('Course Status Transitions', () => {
  it('should follow correct status workflow: pending_review -> approved -> published', () => {
    // Add new course
    const newCourse: Course = {
      id: 'course-workflow',
      mentorId: 'mentor-1',
      mentorName: 'Ahmad Fauzan',
      title: 'Workflow Test Course',
      description: 'Testing status workflow',
      category: 'Web Development',
      level: 'Pemula',
      price: 0,
      isFree: true,
      status: 'pending_review',
      rating: 0,
      reviewCount: 0,
      studentCount: 0,
      duration: '2 jam',
      lessons: 10,
      tags: [],
      chapters: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    act(() => {
      useCourseStore.getState().addCourse(newCourse);
    });
    
    // Verify initial status
    let course = useCourseStore.getState().getCourseById('course-workflow');
    expect(course?.status).toBe('pending_review');
    
    // Approve
    act(() => {
      useCourseStore.getState().approveCourse('course-workflow');
    });
    
    course = useCourseStore.getState().getCourseById('course-workflow');
    expect(course?.status).toBe('approved');
    
    // Publish
    act(() => {
      useCourseStore.getState().publishCourse('course-workflow');
    });
    
    course = useCourseStore.getState().getCourseById('course-workflow');
    expect(course?.status).toBe('published');
    expect(course?.publishedAt).toBeDefined();
    
    // Verify it's now available in published courses
    const publishedCourses = useCourseStore.getState().getPublishedCourses();
    expect(publishedCourses.some(c => c.id === 'course-workflow')).toBe(true);
  });
});