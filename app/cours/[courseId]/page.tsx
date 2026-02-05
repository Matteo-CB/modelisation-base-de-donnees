'use client'

import { use } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import { getCourse } from '@/lib/courses'
import { useProgress } from '@/hooks/useProgress'

export default function CoursePage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = use(params)
  const course = getCourse(courseId)
  const { getChapterProgress, isSectionCompleted, loading } = useProgress(courseId)

  if (!course) {
    notFound()
  }

  const totalSections = course.chapters.reduce((acc, ch) => acc + ch.sections.length, 0)

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navbar />

      {/* Header */}
      <header className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-indigo-900/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-6 transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour aux cours
          </Link>

          <h1 className="text-4xl font-bold text-white mb-4">{course.title}</h1>
          <p className="text-xl text-white/60 max-w-2xl mb-6">{course.description}</p>

          <div className="flex items-center gap-6 text-sm text-white/50">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              {course.chapters.length} chapitres
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              {totalSections} sections
            </span>
          </div>
        </div>
      </header>

      {/* Chapters */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-6">
          {course.chapters.map((chapter, chapterIndex) => {
            const chapterProgress = getChapterProgress(chapter.id, chapter.sections.length)

            return (
              <div key={chapter.id} className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                {/* Chapter Header */}
                <div className={`p-6 ${chapter.color}`}>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center text-3xl">
                      {chapter.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-white/50 text-sm">Chapitre {chapterIndex + 1}</span>
                        {!loading && chapterProgress.percentage === 100 && (
                          <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">
                            Terminé
                          </span>
                        )}
                      </div>
                      <h2 className="text-xl font-bold text-white">{chapter.title}</h2>
                      <p className="text-white/60 text-sm mt-1">{chapter.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">{chapterProgress.percentage}%</div>
                      <div className="text-white/50 text-sm">{chapterProgress.completed}/{chapterProgress.total} sections</div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-4 h-2 bg-black/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white/80 rounded-full transition-all duration-500"
                      style={{ width: `${chapterProgress.percentage}%` }}
                    />
                  </div>
                </div>

                {/* Sections */}
                <div className="p-4">
                  <div className="grid gap-2">
                    {chapter.sections.map((section, sectionIndex) => {
                      const isCompleted = isSectionCompleted(section.id)

                      return (
                        <Link
                          key={section.id}
                          href={`/cours/${courseId}/${chapter.id}/${section.id}`}
                          className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                            isCompleted
                              ? 'bg-green-500/10 hover:bg-green-500/20'
                              : 'bg-white/5 hover:bg-white/10'
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            isCompleted
                              ? 'bg-green-500 text-white'
                              : 'bg-white/10 text-white/60'
                          }`}>
                            {isCompleted ? (
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <span className="font-bold">{sectionIndex + 1}</span>
                            )}
                          </div>

                          <div className="flex-1">
                            <h3 className="font-medium text-white">{section.title}</h3>
                            <p className="text-white/50 text-sm">
                              {section.exercises.length} exercice{section.exercises.length > 1 ? 's' : ''}
                            </p>
                          </div>

                          <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}
