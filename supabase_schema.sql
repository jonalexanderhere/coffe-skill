-- CoffeeSkill Supabase Schema Initialization
-- Run this in your Supabase SQL Editor

-- 1. Users Table
CREATE TABLE IF NOT EXISTS public.users (
    "id" UUID PRIMARY KEY DEFAULT auth.uid(),
    "name" TEXT NOT NULL,
    "email" TEXT UNIQUE NOT NULL,
    "role" TEXT NOT NULL CHECK ("role" IN ('student', 'mentor', 'superadmin')),
    "status" TEXT NOT NULL DEFAULT 'active' CHECK ("status" IN ('active', 'inactive', 'pending', 'suspended')),
    "avatar" TEXT,
    "bio" TEXT,
    "wishlist" TEXT[] DEFAULT '{}',
    "joinedDate" DATE DEFAULT CURRENT_DATE,
    "lastLogin" TIMESTAMP WITH TIME ZONE
);

-- Helper function to check if user is superadmin (avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.check_is_superadmin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.users 
    WHERE "id" = auth.uid() AND "role" = 'superadmin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable RLS for Users
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone" ON public.users FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = "id");
CREATE POLICY "Superadmins have full access" ON public.users FOR ALL TO authenticated USING (public.check_is_superadmin());

-- 2. Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
    "id" TEXT PRIMARY KEY,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "description" TEXT,
    "courseCount" INTEGER DEFAULT 0
);

-- 3. Courses Table
CREATE TABLE IF NOT EXISTS public.courses (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "mentorId" UUID REFERENCES public.users("id"),
    "mentorName" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "shortDescription" TEXT,
    "thumbnail" TEXT,
    "ebookUrl" TEXT,
    "category" TEXT REFERENCES public.categories("id"),
    "level" TEXT NOT NULL CHECK ("level" IN ('Pemula', 'Menengah', 'Lanjutan')),
    "price" INTEGER NOT NULL DEFAULT 0,
    "originalPrice" INTEGER,
    "isFree" BOOLEAN DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'draft' CHECK ("status" IN ('draft', 'pending_review', 'approved', 'rejected', 'published', 'archived')),
    "rating" DECIMAL(2,1) DEFAULT 0,
    "reviewCount" INTEGER DEFAULT 0,
    "studentCount" INTEGER DEFAULT 0,
    "duration" TEXT,
    "lessons" INTEGER DEFAULT 0,
    "tags" TEXT[] DEFAULT '{}',
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "publishedAt" TIMESTAMP WITH TIME ZONE
);

-- 4. Enrollments Table
CREATE TABLE IF NOT EXISTS public.enrollments (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" UUID REFERENCES public.users("id"),
    "courseId" UUID REFERENCES public.courses("id"),
    "enrolledAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP WITH TIME ZONE,
    "progress" INTEGER DEFAULT 0,
    "lastAccessedAt" DATE,
    "completedChapters" TEXT[] DEFAULT '{}',
    "completedMaterials" TEXT[] DEFAULT '{}',
    "certificateIssued" BOOLEAN DEFAULT false,
    "certificateId" TEXT
);

-- 5. Transactions Table
CREATE TABLE IF NOT EXISTS public.transactions (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" UUID REFERENCES public.users("id"),
    "courseId" UUID REFERENCES public.courses("id"),
    "mentorId" UUID REFERENCES public.users("id"),
    "amount" INTEGER NOT NULL,
    "platformFee" INTEGER NOT NULL,
    "mentorPayout" INTEGER NOT NULL,
    "type" TEXT NOT NULL CHECK ("type" IN ('purchase', 'payout', 'refund')),
    "status" TEXT NOT NULL CHECK ("status" IN ('pending', 'completed', 'failed', 'refunded')),
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Events Table
CREATE TABLE IF NOT EXISTS public.events (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "time" TEXT NOT NULL,
    "speaker" TEXT NOT NULL,
    "speakerRole" TEXT,
    "type" TEXT CHECK ("type" IN ('webinar', 'workshop', 'meetup')),
    "attendees" INTEGER DEFAULT 0,
    "isUpcoming" BOOLEAN DEFAULT true,
    "thumbnail" TEXT
);

-- 7. Testimonials Table
CREATE TABLE IF NOT EXISTS public.testimonials (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "avatar" TEXT,
    "content" TEXT NOT NULL,
    "rating" INTEGER DEFAULT 5
);

-- 8. FAQs Table
CREATE TABLE IF NOT EXISTS public.faqs (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL
);

-- Functions & Triggers
-- Automatically update updatedAt timestamp
CREATE OR REPLACE FUNCTION update_updatedAt_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_courses_updatedAt ON public.courses;
CREATE TRIGGER update_courses_updatedAt
    BEFORE UPDATE ON public.courses
    FOR EACH ROW
    EXECUTE PROCEDURE update_updatedAt_column();

-- Initial Categories
INSERT INTO public.categories ("id", "name", "icon", "color") VALUES
('cat-1', 'Cyber Security', 'Shield', '#EF4444'),
('cat-2', 'Web Development', 'Globe', '#3B82F6'),
('cat-3', 'Mobile Dev', 'Smartphone', '#10B981'),
('cat-4', 'Data Science', 'BarChart3', '#8B5CF6'),
('cat-5', 'UI/UX Design', 'Palette', '#F59E0B'),
('cat-6', 'Cloud Computing', 'Cloud', '#06B6D4'),
('cat-7', 'Artificial Intelligence', 'Brain', '#EC4899'),
('cat-8', 'Digital Marketing', 'Settings', '#6366F1')
ON CONFLICT ("id") DO NOTHING;
