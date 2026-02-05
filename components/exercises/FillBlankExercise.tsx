'use client'

import { useState } from 'react'
import { Exercise } from '@/lib/types'

interface FillBlankExerciseProps {
  exercise: Exercise
  onComplete: (correct: boolean) => void
}

export default function FillBlankExercise({ exercise, onComplete }: FillBlankExerciseProps) {
  const blanks = exercise.blanks || []
  const [answers, setAnswers] = useState<string[]>(blanks.map(() => ''))
  const [showResult, setShowResult] = useState(false)

  const handleSubmit = () => {
    setShowResult(true)
    const allCorrect = blanks.every((blank, idx) =>
      answers[idx].toLowerCase().trim() === blank.answer.toLowerCase().trim()
    )
    onComplete(allCorrect)
  }

  const isAnswerCorrect = (idx: number) => {
    return answers[idx].toLowerCase().trim() === blanks[idx].answer.toLowerCase().trim()
  }

  return (
    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">✏️</span>
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/20 text-cyan-400">
          Compléter
        </span>
      </div>

      <h3 className="text-lg font-semibold text-white mb-6">{exercise.question}</h3>

      <div className="space-y-4">
        {blanks.map((blank, idx) => (
          <div key={idx} className="flex flex-wrap items-center gap-2 text-white/80">
            <span>{blank.text.split('_____')[0]}</span>
            <div className="relative">
              <input
                type="text"
                value={answers[idx]}
                onChange={(e) => {
                  const newAnswers = [...answers]
                  newAnswers[idx] = e.target.value
                  setAnswers(newAnswers)
                }}
                disabled={showResult}
                className={`px-4 py-2 rounded-lg bg-white/10 border-2 text-white placeholder-white/40 focus:outline-none transition ${
                  showResult
                    ? isAnswerCorrect(idx)
                      ? 'border-green-500 bg-green-500/20'
                      : 'border-red-500 bg-red-500/20'
                    : 'border-cyan-500/50 focus:border-cyan-500'
                }`}
                placeholder="Ta réponse..."
              />
              {showResult && !isAnswerCorrect(idx) && (
                <div className="absolute -bottom-6 left-0 text-green-400 text-sm">
                  → {blank.answer}
                </div>
              )}
            </div>
            <span>{blank.text.split('_____')[1]}</span>
          </div>
        ))}
      </div>

      {!showResult && (
        <button
          onClick={handleSubmit}
          disabled={answers.some(a => !a.trim())}
          className="mt-8 w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-blue-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Vérifier
        </button>
      )}

      {showResult && (
        <div className={`mt-8 p-4 rounded-xl ${
          blanks.every((_, idx) => isAnswerCorrect(idx))
            ? 'bg-green-500/20'
            : 'bg-orange-500/20'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            {blanks.every((_, idx) => isAnswerCorrect(idx)) ? (
              <>
                <span className="text-2xl">🎯</span>
                <span className="font-bold text-green-400">Parfait !</span>
              </>
            ) : (
              <>
                <span className="text-2xl">📝</span>
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
