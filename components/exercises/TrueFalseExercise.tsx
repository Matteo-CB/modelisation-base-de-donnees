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
          className="mt-6 w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl hover:from-blue-400 hover:to-cyan-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Valider
        </button>
      )}

      {showResult && (
        <div className={`mt-6 p-4 rounded-xl ${isCorrect ? 'bg-green-500/20' : 'bg-orange-500/20'}`}>
          <div className="flex items-center gap-2 mb-2">
            {isCorrect ? (
              <>
                <span className="text-2xl">🎯</span>
                <span className="font-bold text-green-400">Bien joué !</span>
              </>
            ) : (
              <>
                <span className="text-2xl">📚</span>
                <span className="font-bold text-orange-400">À retenir :</span>
              </>
            )}
          </div>
          <p className="text-white/80 text-sm">{exercise.explanation}</p>
        </div>
      )}
    </div>
  )
}
