-- CoffeeSkill Supabase Extra Tables
-- Run this in your Supabase SQL Editor if you need the full course content structure

-- 1. Chapters Table
CREATE TABLE IF NOT EXISTS public.chapters (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "courseId" UUID REFERENCES public.courses("id") ON DELETE CASCADE,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "order" INTEGER DEFAULT 0,
    "isPublished" BOOLEAN DEFAULT true
);

-- 2. Materials Table
CREATE TABLE IF NOT EXISTS public.materials (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "chapterId" UUID REFERENCES public.chapters("id") ON DELETE CASCADE,
    "courseId" UUID REFERENCES public.courses("id") ON DELETE CASCADE,
    "type" TEXT NOT NULL CHECK ("type" IN ('video', 'article', 'quiz', 'pdf')),
    "title" TEXT NOT NULL,
    "description" TEXT,
    "content" TEXT NOT NULL, -- URL or Article text
    "duration" TEXT,
    "order" INTEGER DEFAULT 0,
    "isPreview" BOOLEAN DEFAULT false,
    "isPublished" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Quizzes Table
CREATE TABLE IF NOT EXISTS public.quizzes (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "courseId" UUID REFERENCES public.courses("id") ON DELETE CASCADE,
    "chapterId" UUID REFERENCES public.chapters("id") ON DELETE CASCADE,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "passingScore" INTEGER DEFAULT 70,
    "timeLimit" INTEGER, -- in minutes
    "maxAttempts" INTEGER DEFAULT 3,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Quiz Questions
CREATE TABLE IF NOT EXISTS public.quiz_questions (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "quizId" UUID REFERENCES public.quizzes("id") ON DELETE CASCADE,
    "question" TEXT NOT NULL,
    "options" JSONB NOT NULL, -- Array of {text: string, isCorrect: boolean}
    "correctAnswer" INTEGER NOT NULL,
    "explanation" TEXT,
    "points" INTEGER DEFAULT 10,
    "order" INTEGER DEFAULT 0
);

-- 5. Reviews Table (Detailed)
CREATE TABLE IF NOT EXISTS public.reviews (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "courseId" UUID REFERENCES public.courses("id") ON DELETE CASCADE,
    "userId" UUID REFERENCES public.users("id") ON DELETE CASCADE,
    "userName" TEXT NOT NULL,
    "rating" INTEGER CHECK ("rating" >= 1 AND "rating" <= 5),
    "comment" TEXT,
    "isVerified" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS for these tables
ALTER TABLE public.chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Simple Public Read Access (adjust as needed for your specific security model)
CREATE POLICY "Public Read Access Chapters" ON public.chapters FOR SELECT USING (true);
CREATE POLICY "Public Read Access Materials" ON public.materials FOR SELECT USING (true);
CREATE POLICY "Public Read Access Quizzes" ON public.quizzes FOR SELECT USING (true);
CREATE POLICY "Public Read Access Questions" ON public.quiz_questions FOR SELECT USING (true);
CREATE POLICY "Public Read Access Reviews" ON public.reviews FOR SELECT USING (true);
