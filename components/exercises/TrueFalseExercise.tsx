'use client'

import { useState } from 'react'
import { Exercise } from '@/lib/types'

interface TrueFalseExerciseProps {
  exercise: Exercise
  onComplete: (correct: boolean) => void
}

export default function TrueFalseExercise({ exercise, onComplete }: TrueFalseExerciseProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const isCorrect = selectedAnswer === exercise.correctAnswer

  const handleSubmit = () => {
    if (selectedAnswer === null) return
    setShowResult(true)
    onComplete(isCorrect)
  }

  const correctLabel = exercise.correctAnswer === 0 ? 'VRAI' : 'FAUX'
  const userLabel = selectedAnswer === 0 ? 'VRAI' : 'FAUX'

  return (
    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">⚡</span>
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400">
          Vrai ou Faux
        </span>
      </div>

      <h3 className="text-lg font-semibold text-white mb-6">{exercise.question}</h3>

      <div className="flex gap-4">
        <button
          onClick={() => !showResult && setSelectedAnswer(0)}
          disabled={showResult}
          className={`flex-1 p-6 rounded-xl text-center transition-all ${
            showResult
              ? exercise.correctAnswer === 0
                ? 'bg-green-500/30 border-2 border-green-500'
                : selectedAnswer === 0
                ? 'bg-red-500/30 border-2 border-red-500'
                : 'bg-white/5 border border-white/10'
              : selectedAnswer === 0
              ? 'bg-emerald-500/30 border-2 border-emerald-500'
              : 'bg-white/5 border border-white/10 hover:bg-emerald-500/10 hover:border-emerald-500/50'
          }`}
        >
          <span className="text-4xl mb-2 block">✓</span>
          <span className={`font-bold ${
            showResult && exercise.correctAnswer === 0 ? 'text-green-400' :
            showResult && selectedAnswer === 0 ? 'text-red-400' : 'text-white'
          }`}>VRAI</span>
        </button>

        <button
          onClick={() => !showResult && setSelectedAnswer(1)}
          disabled={showResult}
          className={`flex-1 p-6 rounded-xl text-center transition-all ${
            showResult
              ? exercise.correctAnswer === 1
                ? 'bg-green-500/30 border-2 border-green-500'
                : selectedAnswer === 1
                ? 'bg-red-500/30 border-2 border-red-500'
                : 'bg-white/5 border border-white/10'
              : selectedAnswer === 1
              ? 'bg-rose-500/30 border-2 border-rose-500'
              : 'bg-white/5 border border-white/10 hover:bg-rose-500/10 hover:border-rose-500/50'
          }`}
        >
          <span className="text-4xl mb-2 block">✗</span>
          <span className={`font-bold ${
            showResult && exercise.correctAnswer === 1 ? 'text-green-400' :
            showResult && selectedAnswer === 1 ? 'text-red-400' : 'text-white'
          }`}>FAUX</span>
        </button>
      </div>

      {!showResult && (
        <button
          onClick={handleSubmit}
          disabled={selectedAnswer === null}
          className="mt-6 w-full py-3 bg-cyan-500 text-white font-semibold rounded-xl hover:bg-cyan-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Valider
        </button>
      )}

      {showResult && (
        <div className={`mt-6 rounded-xl overflow-hidden border ${isCorrect ? 'border-green-500/30' : 'border-orange-500/30'}`}>
          {/* Header */}
          <div className={`px-5 py-3 ${isCorrect ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
            <div className="flex items-center gap-2">
              {isCorrect ? (
                <>
                  <span className="text-2xl">🎯</span>
                  <span className="font-bold text-green-400 text-lg">Bonne réponse !</span>
                </>
              ) : (
                <>
                  <span className="text-2xl">✗</span>
                  <span className="font-bold text-red-400 text-lg">Mauvaise réponse</span>
                </>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="px-5 py-4 bg-white/5 space-y-3">
            {!isCorrect && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-red-400 font-semibold text-sm">Ta réponse :</span>
                  <span className="text-red-300 text-sm line-through">{userLabel}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400 font-semibold text-sm">Bonne réponse :</span>
                  <span className="text-green-300 text-sm font-medium">{correctLabel}</span>
                </div>
              </div>
            )}

            {!isCorrect && <div className="border-t border-white/10" />}

            {/* Explanation */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">💡</span>
                <span className="text-white font-semibold text-sm">Explication</span>
              </div>
              <p className="text-white/80 text-sm leading-relaxed pl-7">{exercise.explanation}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
