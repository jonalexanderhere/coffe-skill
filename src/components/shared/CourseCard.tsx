"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, Clock, BookOpen, Users } from "lucide-react";
import { Course } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

export default function CourseCard({ course }: { course: Course }) {
  return (
    <Link href={`/course/${course.id}`} className="group block">
      <div className="bg-white dark:bg-charcoal-light rounded-2xl border border-coffee-100 dark:border-charcoal-200 overflow-hidden hover:shadow-md hover:border-coffee-200 dark:hover:border-charcoal-300 transition-all duration-300 hover:-translate-y-0.5">
        {/* Thumbnail */}
        <div className="relative aspect-video bg-gradient-to-br from-coffee-100 to-coffee-50 dark:from-charcoal-200 dark:to-charcoal overflow-hidden">
          {course.thumbnail ? (
            <Image 
              src={course.thumbnail} 
              alt={course.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <BookOpen size={32} className="text-coffee-300 dark:text-charcoal-300" />
            </div>
          )}
          
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {course.status === 'published' && course.studentCount > 1000 && (
              <span className="px-2.5 py-1 text-[10px] font-bold text-white bg-accent rounded-lg shadow-lg shadow-accent/20 uppercase tracking-wider">
                Popular
              </span>
            )}
            {course.isFree && (
              <span className="px-2.5 py-1 text-[10px] font-bold text-white bg-emerald-500 rounded-lg shadow-lg shadow-emerald-500/20 uppercase tracking-wider">
                Gratis
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-2.5">
            <span className="px-2.5 py-0.5 text-xs font-medium text-coffee-600 dark:text-coffee-300 bg-coffee-50 dark:bg-charcoal-200 rounded-md">
              {course.category}
            </span>
            <span className="px-2.5 py-0.5 text-xs font-medium text-coffee-500 dark:text-coffee-400 bg-coffee-50 dark:bg-charcoal-200 rounded-md">
              {course.level}
            </span>
          </div>

          <h3 className="text-base font-semibold text-coffee-800 dark:text-white leading-snug mb-2 line-clamp-2 group-hover:text-accent transition-colors">
            {course.title}
          </h3>

          <p className="text-sm text-coffee-500 dark:text-coffee-400 mb-3">
            {course.mentorName}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-3 mb-4 text-xs text-coffee-400 dark:text-coffee-400">
            <span className="flex items-center gap-1">
              <Star size={13} className="text-amber-400 fill-amber-400" />
              {course.rating > 0 ? course.rating.toFixed(1) : "-"}
              <span className="text-coffee-300">({course.reviewCount})</span>
            </span>
            <span className="flex items-center gap-1">
              <Clock size={13} />
              {course.duration}
            </span>
            <span className="flex items-center gap-1">
              <Users size={13} />
              {course.studentCount.toLocaleString()}
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 pt-3 border-t border-coffee-50 dark:border-charcoal-200">
            {course.isFree ? (
              <span className="text-base font-bold text-emerald-600">Gratis</span>
            ) : (
              <>
                <span className="text-base font-bold text-coffee-800 dark:text-white">
                  {formatCurrency(course.price)}
                </span>
                {course.originalPrice && (
                  <span className="text-sm text-coffee-400 line-through">
                    {formatCurrency(course.originalPrice)}
                  </span>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
