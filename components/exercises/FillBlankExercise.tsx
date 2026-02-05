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

  const allCorrect = blanks.every((_, idx) => isAnswerCorrect(idx))

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
            </div>
            <span>{blank.text.split('_____')[1]}</span>
          </div>
        ))}
      </div>

      {!showResult && (
        <button
          onClick={handleSubmit}
          disabled={answers.some(a => !a.trim())}
          className="mt-8 w-full py-3 bg-cyan-500 text-white font-semibold rounded-xl hover:bg-cyan-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Vérifier
        </button>
      )}

      {showResult && (
        <div className={`mt-8 rounded-xl overflow-hidden border ${allCorrect ? 'border-green-500/30' : 'border-orange-500/30'}`}>
          {/* Header */}
          <div className={`px-5 py-3 ${allCorrect ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
            <div className="flex items-center gap-2">
              {allCorrect ? (
                <>
                  <span className="text-2xl">🎯</span>
                  <span className="font-bold text-green-400 text-lg">Tout est correct !</span>
                </>
              ) : (
                <>
                  <span className="text-2xl">✗</span>
                  <span className="font-bold text-red-400 text-lg">
                    {blanks.filter((_, idx) => !isAnswerCorrect(idx)).length} erreur{blanks.filter((_, idx) => !isAnswerCorrect(idx)).length > 1 ? 's' : ''}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="px-5 py-4 bg-white/5 space-y-3">
            {/* Show correction for each blank */}
            {!allCorrect && (
              <div className="space-y-2">
                {blanks.map((blank, idx) => (
                  <div key={idx} className={`flex items-start gap-3 p-2 rounded-lg ${isAnswerCorrect(idx) ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                    <span className={`mt-0.5 ${isAnswerCorrect(idx) ? 'text-green-400' : 'text-red-400'}`}>
                      {isAnswerCorrect(idx) ? '✓' : '✗'}
                    </span>
                    <div className="text-sm">
                      {isAnswerCorrect(idx) ? (
                        <span className="text-green-300">{answers[idx]}</span>
                      ) : (
                        <div className="space-y-1">
                          <div>
                            <span className="text-red-400 font-semibold">Ta réponse : </span>
                            <span className="text-red-300 line-through">{answers[idx]}</span>
                          </div>
                          <div>
                            <span className="text-green-400 font-semibold">Bonne réponse : </span>
                            <span className="text-green-300">{blank.answer}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!allCorrect && <div className="border-t border-white/10" />}

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
