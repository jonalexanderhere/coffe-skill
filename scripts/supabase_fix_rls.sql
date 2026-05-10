-- Fix RLS and Policies for all tables
-- This ensures Superadmins can see and manage everything

-- 1. Categories
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read categories" ON public.categories;
CREATE POLICY "Allow public read categories" ON public.categories FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow admin manage categories" ON public.categories;
CREATE POLICY "Allow admin manage categories" ON public.categories FOR ALL USING (public.check_is_superadmin());

-- 2. Courses
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read courses" ON public.courses;
CREATE POLICY "Allow public read courses" ON public.courses FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow admin manage courses" ON public.courses;
CREATE POLICY "Allow admin manage courses" ON public.courses FOR ALL USING (public.check_is_superadmin());
DROP POLICY IF EXISTS "Allow mentor manage own courses" ON public.courses;
CREATE POLICY "Allow mentor manage own courses" ON public.courses FOR ALL USING (auth.uid() = "mentorId");

-- 3. Enrollments
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow users see own enrollments" ON public.enrollments;
CREATE POLICY "Allow users see own enrollments" ON public.enrollments FOR SELECT USING (auth.uid() = "userId");
DROP POLICY IF EXISTS "Allow admin see all enrollments" ON public.enrollments;
CREATE POLICY "Allow admin see all enrollments" ON public.enrollments FOR SELECT USING (public.check_is_superadmin());
DROP POLICY IF EXISTS "Allow mentor see course enrollments" ON public.enrollments;
CREATE POLICY "Allow mentor see course enrollments" ON public.enrollments FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.courses WHERE id = "courseId" AND "mentorId" = auth.uid())
);

-- 4. Transactions
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow admin see all transactions" ON public.transactions;
CREATE POLICY "Allow admin see all transactions" ON public.transactions FOR SELECT USING (public.check_is_superadmin());

-- 5. Events
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read events" ON public.events;
CREATE POLICY "Allow public read events" ON public.events FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow admin manage events" ON public.events;
CREATE POLICY "Allow admin manage events" ON public.events FOR ALL USING (public.check_is_superadmin());

-- 6. Testimonials
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read testimonials" ON public.testimonials;
CREATE POLICY "Allow public read testimonials" ON public.testimonials FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow admin manage testimonials" ON public.testimonials;
CREATE POLICY "Allow admin manage testimonials" ON public.testimonials FOR ALL USING (public.check_is_superadmin());

-- 7. FAQs
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read faqs" ON public.faqs;
CREATE POLICY "Allow public read faqs" ON public.faqs FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow admin manage faqs" ON public.faqs;
CREATE POLICY "Allow admin manage faqs" ON public.faqs FOR ALL USING (public.check_is_superadmin());
