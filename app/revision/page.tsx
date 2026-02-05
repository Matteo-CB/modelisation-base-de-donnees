'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { courses, getExercisesForRevision } from '@/lib/courses'
import { useProgress } from '@/hooks/useProgress'
import { ExerciseWrapper } from '@/components/exercises'
import { Exercise } from '@/lib/types'

interface ExerciseWithMeta extends Exercise {
  chapterId: string
  sectionId: string
  chapterTitle: string
  sectionTitle: string
}

export default function RevisionPage() {
  const course = courses[0]
  const { getCompletedSections, loading } = useProgress(course.id)

  const [mode, setMode] = useState<'select' | 'quiz' | 'results'>('select')
  const [selectedExercises, setSelectedExercises] = useState<ExerciseWithMeta[]>([])
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [results, setResults] = useState<boolean[]>([])
  const [waitingForNext, setWaitingForNext] = useState(false)
  const [difficulty, setDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard'>('all')
  const [quizSize, setQuizSize] = useState(5)

  const completedSections = getCompletedSections()
  const allExercises = useMemo(() => {
    return getExercisesForRevision(course.id, completedSections) as ExerciseWithMeta[]
  }, [course.id, completedSections])

  const filteredExercises = useMemo(() => {
    if (difficulty === 'all') return allExercises
    return allExercises.filter(ex => ex.difficulty === difficulty)
  }, [allExercises, difficulty])

  const startQuiz = () => {
    const shuffled = [...filteredExercises].sort(() => Math.random() - 0.5)
    const selected = shuffled.slice(0, Math.min(quizSize, shuffled.length))
    setSelectedExercises(selected)
    setCurrentExerciseIndex(0)
    setResults([])
    setMode('quiz')
  }

  const handleExerciseComplete = (correct: boolean) => {
    const newResults = [...results, correct]
    setResults(newResults)
    setWaitingForNext(true)
  }

  const handleNextExercise = () => {
    setWaitingForNext(false)
    if (currentExerciseIndex < selectedExercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1)
    } else {
      setMode('results')
    }
  }

  const currentExercise = selectedExercises[currentExerciseIndex]
  const correctCount = results.filter(r => r).length

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f]">
        <Navbar />
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-spin w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Select Mode */}
        {mode === 'select' && (
          <div className="space-y-8">
            <div className="text-center">
              <span className="text-6xl mb-4 block">🧠</span>
              <h1 className="text-4xl font-bold text-white mb-4">Mode Révision</h1>
              <p className="text-xl text-white/60">
                Révise les notions que tu as déjà vues avec des exercices aléatoires
              </p>
            </div>

            {completedSections.length === 0 ? (
              <div className="bg-white/5 rounded-2xl border border-white/10 p-8 text-center">
                <span className="text-5xl mb-4 block">📚</span>
                <h2 className="text-xl font-bold text-white mb-2">Aucune section terminée</h2>
                <p className="text-white/60 mb-6">
                  Commence par étudier quelques sections du cours pour débloquer le mode révision !
                </p>
                <Link
                  href={`/cours/${course.id}`}
                  className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-xl hover:from-cyan-400 hover:to-purple-500 transition"
                >
                  Commencer le cours
                </Link>
              </div>
            ) : (
              <>
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white/5 rounded-xl p-6 text-center">
                    <div className="text-3xl font-bold text-cyan-400">{completedSections.length}</div>
                    <div className="text-white/60 text-sm">Sections terminées</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-6 text-center">
                    <div className="text-3xl font-bold text-purple-400">{allExercises.length}</div>
                    <div className="text-white/60 text-sm">Exercices disponibles</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-6 text-center">
                    <div className="text-3xl font-bold text-pink-400">{filteredExercises.length}</div>
                    <div className="text-white/60 text-sm">Avec le filtre actuel</div>
                  </div>
                </div>

                {/* Settings */}
                <div className="bg-white/5 rounded-2xl border border-white/10 p-6 space-y-6">
                  <h2 className="text-lg font-bold text-white">Paramètres du quiz</h2>

                  {/* Difficulty */}
                  <div>
                    <label className="block text-white/60 text-sm mb-3">Difficulté</label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { value: 'all', label: 'Toutes', color: 'bg-white/10' },
                        { value: 'easy', label: 'Facile', color: 'bg-green-500/20 text-green-400' },
                        { value: 'medium', label: 'Moyen', color: 'bg-yellow-500/20 text-yellow-400' },
                        { value: 'hard', label: 'Difficile', color: 'bg-red-500/20 text-red-400' }
                      ].map(opt => (
                        <button
                          key={opt.value}
                          onClick={() => setDifficulty(opt.value as any)}
                          className={`px-4 py-2 rounded-lg font-medium transition ${
                            difficulty === opt.value
                              ? 'bg-cyan-500 text-white'
                              : `${opt.color} hover:opacity-80`
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quiz Size */}
                  <div>
                    <label className="block text-white/60 text-sm mb-3">
                      Nombre de questions : <span className="text-white font-bold">{quizSize}</span>
                    </label>
                    <input
                      type="range"
                      min="3"
                      max={Math.min(15, filteredExercises.length)}
                      value={quizSize}
                      onChange={(e) => setQuizSize(Number(e.target.value))}
                      className="w-full accent-cyan-500"
                    />
                    <div className="flex justify-between text-white/40 text-sm mt-1">
                      <span>3</span>
                      <span>{Math.min(15, filteredExercises.length)}</span>
                    </div>
                  </div>
                </div>

                {/* Start Button */}
                <div className="text-center">
                  <button
                    onClick={startQuiz}
                    disabled={filteredExercises.length === 0}
                    className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-xl hover:from-cyan-400 hover:to-purple-500 transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    Lancer le quiz ({Math.min(quizSize, filteredExercises.length)} questions)
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Quiz Mode */}
        {mode === 'quiz' && currentExercise && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setMode('select')}
                className="text-white/60 hover:text-white transition flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Quitter
              </button>

              <div className="text-white/60">
                Question {currentExerciseIndex + 1}/{selectedExercises.length}
              </div>
            </div>

            {/* Progress */}
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-500"
                style={{ width: `${((currentExerciseIndex + (results.length > currentExerciseIndex ? 1 : 0)) / selectedExercises.length) * 100}%` }}
              />
            </div>

            {/* Context */}
            <div className="text-center text-white/50 text-sm">
              {currentExercise.chapterTitle} → {currentExercise.sectionTitle}
            </div>

            {/* Exercise */}
            <ExerciseWrapper
              key={currentExercise.id + currentExerciseIndex}
              exercise={currentExercise}
              onComplete={handleExerciseComplete}
            />

            {/* Next Question Button */}
            {waitingForNext && (
              <div className="flex justify-center">
                <button
                  onClick={handleNextExercise}
                  className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-xl hover:from-cyan-400 hover:to-purple-500 transition transform hover:scale-105 flex items-center gap-2"
                >
                  {currentExerciseIndex < selectedExercises.length - 1 ? (
                    <>
                      <span>Question suivante</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </>
                  ) : (
                    <>
                      <span>Voir mes résultats</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Dots */}
            <div className="flex justify-center gap-2">
              {selectedExercises.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-3 h-3 rounded-full transition-all ${
                    idx < results.length
                      ? results[idx]
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

        {/* Results Mode */}
        {mode === 'results' && (
          <div className="text-center py-8 space-y-8">
            <div>
              <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
                correctCount === selectedExercises.length
                  ? 'bg-gradient-to-r from-green-400 to-emerald-500'
                  : correctCount >= selectedExercises.length / 2
                  ? 'bg-gradient-to-r from-cyan-400 to-blue-500'
                  : 'bg-gradient-to-r from-orange-400 to-red-500'
              }`}>
                <span className="text-4xl">
                  {correctCount === selectedExercises.length ? '🏆' : correctCount >= selectedExercises.length / 2 ? '👍' : '📚'}
                </span>
              </div>

              <h2 className="text-3xl font-bold text-white mb-2">Quiz terminé !</h2>

              <div className="text-6xl font-bold text-white my-6">
                {correctCount}/{selectedExercises.length}
              </div>

              <p className="text-white/60">
                {correctCount === selectedExercises.length
                  ? 'Parfait ! Tu maîtrises ces notions !'
                  : correctCount >= selectedExercises.length / 2
                  ? 'Bien joué ! Continue à réviser !'
                  : 'Continue à étudier, tu vas y arriver !'}
              </p>
            </div>

            {/* Results breakdown */}
            <div className="bg-white/5 rounded-2xl p-6 max-w-md mx-auto">
              <h3 className="font-bold text-white mb-4">Détail des réponses</h3>
              <div className="space-y-2">
                {selectedExercises.map((ex, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-left">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      results[idx] ? 'bg-green-500' : 'bg-red-500'
                    }`}>
                      {results[idx] ? '✓' : '✗'}
                    </div>
                    <span className="text-white/80 text-sm truncate flex-1">
                      {ex.question.substring(0, 50)}...
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setMode('select')
                  setSelectedExercises([])
                  setResults([])
                }}
                className="px-6 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition"
              >
                Nouveau quiz
              </button>

              <Link
                href="/"
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-xl hover:from-cyan-400 hover:to-purple-500 transition"
              >
                Retour à l'accueil
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
