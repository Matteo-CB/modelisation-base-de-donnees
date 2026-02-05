'use client'

import { use, useState, useEffect } from 'react'
import Link from 'next/link'
import { notFound, useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import { getCourse, getChapter, getSection } from '@/lib/courses'
import { useProgress } from '@/hooks/useProgress'
import { ExerciseWrapper } from '@/components/exercises'

function parseMarkdown(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    .replace(/### (.*)/g, '<h3>$1</h3>')
    .replace(/## (.*)/g, '<h2>$1</h2>')
    .replace(/# (.*)/g, '<h1>$1</h1>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br/>')
}

export default function SectionPage({
  params
}: {
  params: Promise<{ courseId: string; chapterId: string; sectionId: string }>
}) {
  const { courseId, chapterId, sectionId } = use(params)
  const router = useRouter()

  const course = getCourse(courseId)
  const chapter = getChapter(courseId, chapterId)
  const section = getSection(courseId, chapterId, sectionId)

  const { markSectionComplete, saveExerciseResult, isSectionCompleted } = useProgress(courseId)

  const [currentStep, setCurrentStep] = useState<'content' | 'exercises' | 'complete'>('content')
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [exerciseResults, setExerciseResults] = useState<boolean[]>([])
  const [showKeyPoints, setShowKeyPoints] = useState(false)

  if (!course || !chapter || !section) {
    notFound()
  }

  const exercises = section.exercises
  const totalExercises = exercises.length
  const currentExercise = exercises[currentExerciseIndex]

  // Find next section
  const chapterIndex = course.chapters.findIndex(c => c.id === chapterId)
  const sectionIndex = chapter.sections.findIndex(s => s.id === sectionId)
  const nextSection = chapter.sections[sectionIndex + 1]
  const nextChapter = course.chapters[chapterIndex + 1]

  const handleExerciseComplete = (correct: boolean) => {
    const newResults = [...exerciseResults, correct]
    setExerciseResults(newResults)

    // Save result to database
    saveExerciseResult(
      chapterId,
      sectionId,
      currentExercise.id,
      correct ? 1 : 0,
      1
    )

    // Wait a bit then move to next exercise or complete
    setTimeout(() => {
      if (currentExerciseIndex < totalExercises - 1) {
        setCurrentExerciseIndex(currentExerciseIndex + 1)
      } else {
        setCurrentStep('complete')
        markSectionComplete(chapterId, sectionId)
      }
    }, 2000)
  }

  const handleContinue = () => {
    if (nextSection) {
      router.push(`/cours/${courseId}/${chapterId}/${nextSection.id}`)
    } else if (nextChapter) {
      router.push(`/cours/${courseId}/${nextChapter.id}/${nextChapter.sections[0].id}`)
    } else {
      router.push(`/cours/${courseId}`)
    }
  }

  const correctAnswers = exerciseResults.filter(r => r).length

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navbar />

      {/* Progress Header */}
      <div className="sticky top-16 z-40 bg-[#0a0a0f]/95 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <Link
              href={`/cours/${courseId}`}
              className="flex items-center gap-2 text-white/60 hover:text-white transition text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {chapter.title}
            </Link>

            <div className="flex items-center gap-2 text-sm">
              {currentStep === 'content' && (
                <span className="text-white/60">Lecture</span>
              )}
              {currentStep === 'exercises' && (
                <span className="text-cyan-400">
                  Exercice {currentExerciseIndex + 1}/{totalExercises}
                </span>
              )}
              {currentStep === 'complete' && (
                <span className="text-green-400">Terminé !</span>
              )}
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-500"
              style={{
                width: currentStep === 'content'
                  ? '10%'
                  : currentStep === 'complete'
                  ? '100%'
                  : `${10 + (90 * (currentExerciseIndex + (exerciseResults.length > currentExerciseIndex ? 1 : 0)) / totalExercises)}%`
              }}
            />
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Content Step */}
        {currentStep === 'content' && (
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{chapter.icon}</span>
                <div>
                  <p className="text-white/50 text-sm">Section {sectionIndex + 1}</p>
                  <h1 className="text-3xl font-bold text-white">{section.title}</h1>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="bg-white/5 rounded-2xl border border-white/10 p-8">
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: `<p>${parseMarkdown(section.content)}</p>` }}
              />
            </div>

            {/* Tip */}
            {section.tip && (
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">💡</span>
                  <div>
                    <h3 className="font-bold text-amber-400 mb-1">Astuce</h3>
                    <p className="text-white/80">{section.tip}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Example */}
            {section.example && (
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📝</span>
                  <div>
                    <h3 className="font-bold text-purple-400 mb-2">{section.example.title}</h3>
                    <p className="text-white/80">{section.example.content}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Key Points */}
            {section.keyPoints && section.keyPoints.length > 0 && (
              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-6">
                <button
                  onClick={() => setShowKeyPoints(!showKeyPoints)}
                  className="flex items-center gap-3 w-full text-left"
                >
                  <span className="text-2xl">🎯</span>
                  <h3 className="font-bold text-cyan-400 flex-1">Points clés à retenir</h3>
                  <svg
                    className={`w-5 h-5 text-cyan-400 transition-transform ${showKeyPoints ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showKeyPoints && (
                  <ul className="mt-4 space-y-2">
                    {section.keyPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-white/80">
                        <span className="text-cyan-400 mt-1">•</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* Start Exercises Button */}
            <div className="flex justify-center pt-4">
              <button
                onClick={() => setCurrentStep('exercises')}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-xl hover:from-cyan-400 hover:to-purple-500 transition transform hover:scale-105 flex items-center gap-3"
              >
                <span>Passer aux exercices</span>
                <span className="text-xl">🎯</span>
              </button>
            </div>
          </div>
        )}

        {/* Exercises Step */}
        {currentStep === 'exercises' && currentExercise && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">
                Exercice {currentExerciseIndex + 1} sur {totalExercises}
              </h2>
              <p className="text-white/60">Teste tes connaissances !</p>
            </div>

            <ExerciseWrapper
              key={currentExercise.id}
              exercise={currentExercise}
              onComplete={handleExerciseComplete}
            />

            {/* Exercise Progress */}
            <div className="flex justify-center gap-2 mt-8">
              {exercises.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-3 h-3 rounded-full transition-all ${
                    idx < exerciseResults.length
                      ? exerciseResults[idx]
                        ? 'bg-green-500'
                        : 'bg-red-500'
                      : idx === currentExerciseIndex
                      ? 'bg-cyan-500 scale-125'
                      : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Complete Step */}
        {currentStep === 'complete' && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h2 className="text-3xl font-bold text-white mb-4">Section terminée !</h2>

            <div className="bg-white/5 rounded-2xl p-6 max-w-md mx-auto mb-8">
              <div className="text-5xl font-bold text-white mb-2">
                {correctAnswers}/{totalExercises}
              </div>
              <p className="text-white/60">réponses correctes</p>

              <div className="flex justify-center gap-2 mt-4">
                {exerciseResults.map((correct, idx) => (
                  <div
                    key={idx}
                    className={`w-4 h-4 rounded-full ${correct ? 'bg-green-500' : 'bg-red-500'}`}
                  />
                ))}
              </div>
            </div>

            {correctAnswers === totalExercises ? (
              <p className="text-green-400 text-lg mb-8">
                🎉 Parfait ! Tu as tout compris !
              </p>
            ) : correctAnswers >= totalExercises / 2 ? (
              <p className="text-cyan-400 text-lg mb-8">
                👍 Bien joué ! Continue comme ça !
              </p>
            ) : (
              <p className="text-orange-400 text-lg mb-8">
                📚 N'hésite pas à relire la section et réessayer !
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setCurrentStep('content')
                  setCurrentExerciseIndex(0)
                  setExerciseResults([])
                }}
                className="px-6 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition"
              >
                Revoir la section
              </button>

              <button
                onClick={handleContinue}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-xl hover:from-cyan-400 hover:to-purple-500 transition"
              >
                {nextSection
                  ? 'Section suivante'
                  : nextChapter
                  ? 'Chapitre suivant'
                  : 'Retour au cours'
                }
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
