"use client";

import { useEffect } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { 
  useUserStore, 
  useCourseStore, 
  useEnrollmentStore, 
  useCategoryStore, 
  useEventStore, 
  useTestimonialStore, 
  useFAQStore,
  useTransactionStore
} from "@/lib/store";

export default function DataSync() {
  const { setUsers } = useUserStore();
  const { setCourses } = useCourseStore();
  const { setEnrollments } = useEnrollmentStore();
  const { setCategories } = useCategoryStore();
  const { setEvents } = useEventStore();
  const { setTestimonials } = useTestimonialStore();
  const { setFAQs } = useFAQStore();
  const { setTransactions } = useTransactionStore();

  useEffect(() => {
    if (!isSupabaseConfigured) return;

    const fetchData = async () => {
      try {
        // Fetch all data in parallel
        const [
          { data: users },
          { data: courses },
          { data: enrollments },
          { data: categories },
          { data: events },
          { data: testimonials },
          { data: faqs },
          { data: transactions }
        ] = await Promise.all([
          supabase.from('users').select('*'),
          supabase.from('courses').select('*'),
          supabase.from('enrollments').select('*'),
          supabase.from('categories').select('*'),
          supabase.from('events').select('*'),
          supabase.from('testimonials').select('*'),
          supabase.from('faqs').select('*'),
          supabase.from('transactions').select('*')
        ]);

        if (users) setUsers(users);
        if (courses) setCourses(courses);
        if (enrollments) setEnrollments(enrollments);
        if (categories && categories.length > 0) setCategories(categories);
        if (events) setEvents(events);
        if (testimonials) setTestimonials(testimonials);
        if (faqs) setFAQs(faqs);
        if (transactions) setTransactions(transactions);

        console.log("Data sync complete");
      } catch (error) {
        console.error("Error syncing data from Supabase:", error);
      }
    };

    fetchData();

    // Optional: Set up real-time subscriptions
    const channels = [
      supabase.channel('public:users').on('postgres_changes', { event: '*', schema: 'public', table: 'users' }, fetchData).subscribe(),
      supabase.channel('public:courses').on('postgres_changes', { event: '*', schema: 'public', table: 'courses' }, fetchData).subscribe(),
      supabase.channel('public:enrollments').on('postgres_changes', { event: '*', schema: 'public', table: 'enrollments' }, fetchData).subscribe(),
      supabase.channel('public:categories').on('postgres_changes', { event: '*', schema: 'public', table: 'categories' }, fetchData).subscribe(),
      supabase.channel('public:events').on('postgres_changes', { event: '*', schema: 'public', table: 'events' }, fetchData).subscribe(),
      supabase.channel('public:transactions').on('postgres_changes', { event: '*', schema: 'public', table: 'transactions' }, fetchData).subscribe(),
    ];

    return () => {
      channels.forEach(channel => supabase.removeChannel(channel));
    };
  }, [setUsers, setCourses, setEnrollments, setCategories, setEvents, setTestimonials, setFAQs, setTransactions]);

  return null; // This component doesn't render anything
}
