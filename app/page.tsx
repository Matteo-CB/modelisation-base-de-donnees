'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { courses } from '@/lib/courses'
import { useProgress } from '@/hooks/useProgress'

function CourseCard({ course }: { course: typeof courses[0] }) {
  const { getCourseProgress } = useProgress(course.id)
  const totalSections = course.chapters.reduce((acc, ch) => acc + ch.sections.length, 0)
  const progress = getCourseProgress(totalSections)

  return (
    <Link href={`/cours/${course.id}`} className="block">
      <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden card-hover">
        <div className="h-32 bg-indigo-600 relative">
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute bottom-4 left-4">
            <span className="text-4xl">{course.chapters[0]?.icon || '📚'}</span>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
          <p className="text-white/60 text-sm mb-4">{course.description}</p>

          <div className="flex items-center gap-4 text-sm text-white/50 mb-4">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              {course.chapters.length} chapitres
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              {totalSections} sections
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/60">Progression</span>
              <span className="text-cyan-400 font-medium">{progress.percentage}%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-cyan-500 rounded-full transition-all duration-500"
                style={{ width: `${progress.percentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'StudyHub',
  description: "Plateforme d'apprentissage interactif pour étudiants avec exercices et révisions personnalisées.",
  url: 'https://studyhub.app',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'EUR',
  },
  inLanguage: 'fr',
}

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-white">Apprends</span>{' '}
              <span className="text-cyan-400">efficacement</span>
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto mb-8">
              Une plateforme d'apprentissage interactive avec des exercices ludiques,
              un suivi de progression et des révisions personnalisées.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-white/70">
                <span className="text-xl">🎯</span>
                <span>Exercices interactifs</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-white/70">
                <span className="text-xl">📊</span>
                <span>Suivi de progression</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-white/70">
                <span className="text-xl">🔄</span>
                <span>Révisions intelligentes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Mes cours</h2>
            <p className="text-white/60">Continue ton apprentissage</p>
          </div>
        </div>

        {mounted && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}

            {/* Add Course Card */}
            <div className="bg-white/5 rounded-2xl border-2 border-dashed border-white/20 flex flex-col items-center justify-center p-8 min-h-[300px] hover:border-white/40 transition cursor-pointer">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <p className="text-white/40 text-center">
                Ajouter un nouveau cours<br />
                <span className="text-sm">(Bientôt disponible)</span>
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Quick Actions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/revision" className="block">
            <div className="bg-cyan-500/10 rounded-2xl border border-cyan-500/30 p-6 card-hover">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                  <span className="text-3xl">🧠</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Mode Révision</h3>
                  <p className="text-white/60 text-sm">Révise ce que tu as déjà appris</p>
                </div>
              </div>
            </div>
          </Link>

          <div className="bg-purple-500/10 rounded-2xl border border-purple-500/30 p-6 opacity-60">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <span className="text-3xl">📈</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Statistiques</h3>
                <p className="text-white/60 text-sm">Bientôt disponible</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
