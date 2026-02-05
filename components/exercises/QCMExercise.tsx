'use client'

import { useState } from 'react'
import { Exercise } from '@/lib/types'

interface QCMExerciseProps {
  exercise: Exercise
  onComplete: (correct: boolean) => void
}

export default function QCMExercise({ exercise, onComplete }: QCMExerciseProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const isCorrect = selectedAnswer === exercise.correctAnswer

  const handleSubmit = () => {
    if (selectedAnswer === null) return
    setShowResult(true)
    onComplete(isCorrect)
  }

  const getDifficultyColor = () => {
    switch (exercise.difficulty) {
      case 'easy': return 'bg-green-500/20 text-green-400'
      case 'medium': return 'bg-yellow-500/20 text-yellow-400'
      case 'hard': return 'bg-red-500/20 text-red-400'
    }
  }

  const getDifficultyLabel = () => {
    switch (exercise.difficulty) {
      case 'easy': return 'Facile'
      case 'medium': return 'Moyen'
      case 'hard': return 'Difficile'
    }
  }

  return (
    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">🎯</span>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor()}`}>
          {getDifficultyLabel()}
        </span>
      </div>

      <h3 className="text-lg font-semibold text-white mb-4">{exercise.question}</h3>

      <div className="space-y-3">
        {exercise.options?.map((option, index) => (
          <button
            key={index}
            onClick={() => !showResult && setSelectedAnswer(index)}
            disabled={showResult}
            className={`w-full p-4 rounded-xl text-left transition-all ${
              showResult
                ? index === exercise.correctAnswer
                  ? 'bg-green-500/30 border-2 border-green-500 text-white'
                  : index === selectedAnswer
                  ? 'bg-red-500/30 border-2 border-red-500 text-white'
                  : 'bg-white/5 border border-white/10 text-white/60'
                : selectedAnswer === index
                ? 'bg-purple-500/30 border-2 border-purple-500 text-white'
                : 'bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold ${
                showResult
                  ? index === exercise.correctAnswer
                    ? 'bg-green-500 text-white'
                    : index === selectedAnswer
                    ? 'bg-red-500 text-white'
                    : 'bg-white/10 text-white/60'
                  : selectedAnswer === index
                  ? 'bg-purple-500 text-white'
                  : 'bg-white/10 text-white/60'
              }`}>
                {String.fromCharCode(65 + index)}
              </span>
              <span>{option}</span>
              {showResult && index === exercise.correctAnswer && (
                <span className="ml-auto text-green-400">✓</span>
              )}
              {showResult && index === selectedAnswer && index !== exercise.correctAnswer && (
                <span className="ml-auto text-red-400">✗</span>
              )}
            </div>
          </button>
        ))}
      </div>

      {!showResult && (
        <button
          onClick={handleSubmit}
          disabled={selectedAnswer === null}
          className="mt-6 w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-400 hover:to-pink-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Valider ma réponse
        </button>
      )}

      {showResult && (
        <div className={`mt-6 rounded-xl overflow-hidden border ${isCorrect ? 'border-green-500/30' : 'border-orange-500/30'}`}>
          {/* Header */}
          <div className={`px-5 py-3 ${isCorrect ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
            <div className="flex items-center gap-2">
              {isCorrect ? (
                <>
                  <span className="text-2xl">🎉</span>
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
            {!isCorrect && selectedAnswer !== null && exercise.options && (
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-red-400 font-semibold text-sm shrink-0 mt-0.5">Ta réponse :</span>
                  <span className="text-red-300 text-sm line-through">{exercise.options[selectedAnswer]}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400 font-semibold text-sm shrink-0 mt-0.5">Bonne réponse :</span>
                  <span className="text-green-300 text-sm">{exercise.options[exercise.correctAnswer as number]}</span>
                </div>
              </div>
            )}

            {/* Separator */}
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
