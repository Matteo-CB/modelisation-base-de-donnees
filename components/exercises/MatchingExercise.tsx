'use client'

import { useState } from 'react'
import { Exercise } from '@/lib/types'

interface MatchingExerciseProps {
  exercise: Exercise
  onComplete: (correct: boolean) => void
}

export default function MatchingExercise({ exercise, onComplete }: MatchingExerciseProps) {
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null)
  const [matches, setMatches] = useState<Map<number, number>>(new Map())
  const [showResult, setShowResult] = useState(false)

  const pairs = exercise.pairs || []
  const shuffledRight = useState(() => {
    const indices = pairs.map((_, i) => i)
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]]
    }
    return indices
  })[0]

  const handleLeftClick = (index: number) => {
    if (showResult) return
    setSelectedLeft(selectedLeft === index ? null : index)
  }

  const handleRightClick = (shuffledIndex: number) => {
    if (showResult || selectedLeft === null) return
    const newMatches = new Map(matches)

    // Remove any existing match for this left item
    newMatches.forEach((value, key) => {
      if (key === selectedLeft) newMatches.delete(key)
    })

    // Remove any existing match for this right item
    newMatches.forEach((value, key) => {
      if (value === shuffledIndex) newMatches.delete(key)
    })

    newMatches.set(selectedLeft, shuffledIndex)
    setMatches(newMatches)
    setSelectedLeft(null)
  }

  const handleSubmit = () => {
    if (matches.size !== pairs.length) return
    setShowResult(true)

    let correctCount = 0
    matches.forEach((rightIdx, leftIdx) => {
      if (shuffledRight[rightIdx] === leftIdx) correctCount++
    })

    onComplete(correctCount === pairs.length)
  }

  const getMatchColor = (leftIdx: number) => {
    const colors = [
      'bg-purple-500',
      'bg-blue-500',
      'bg-emerald-500',
      'bg-orange-500',
      'bg-rose-500'
    ]
    return colors[leftIdx % colors.length]
  }

  const isCorrectMatch = (leftIdx: number) => {
    const rightIdx = matches.get(leftIdx)
    if (rightIdx === undefined) return false
    return shuffledRight[rightIdx] === leftIdx
  }

  const allCorrect = Array.from(matches.entries()).every(([left]) => isCorrectMatch(left))
  const correctCount = Array.from(matches.entries()).filter(([left]) => isCorrectMatch(left)).length

  return (
    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">🔗</span>
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400">
          Association
        </span>
      </div>

      <h3 className="text-lg font-semibold text-white mb-6">{exercise.question}</h3>

      <div className="grid grid-cols-2 gap-6">
        {/* Left column */}
        <div className="space-y-3">
          {pairs.map((pair, idx) => (
            <button
              key={`left-${idx}`}
              onClick={() => handleLeftClick(idx)}
              disabled={showResult}
              className={`w-full p-4 rounded-xl text-left transition-all ${
                showResult
                  ? isCorrectMatch(idx)
                    ? 'bg-green-500/30 border-2 border-green-500'
                    : matches.has(idx)
                    ? 'bg-red-500/30 border-2 border-red-500'
                    : 'bg-white/5 border border-white/10'
                  : selectedLeft === idx
                  ? `${getMatchColor(idx)} text-white`
                  : matches.has(idx)
                  ? `${getMatchColor(idx)} opacity-60`
                  : 'bg-white/5 border border-white/10 hover:bg-white/10'
              }`}
            >
              <span className="text-white">{pair.left}</span>
            </button>
          ))}
        </div>

        {/* Right column */}
        <div className="space-y-3">
          {shuffledRight.map((originalIdx, shuffledIdx) => {
            const matchedLeftIdx = Array.from(matches.entries()).find(([_, v]) => v === shuffledIdx)?.[0]

            return (
              <button
                key={`right-${shuffledIdx}`}
                onClick={() => handleRightClick(shuffledIdx)}
                disabled={showResult}
                className={`w-full p-4 rounded-xl text-left transition-all ${
                  showResult
                    ? matchedLeftIdx !== undefined && shuffledRight[matches.get(matchedLeftIdx)!] === matchedLeftIdx
                      ? 'bg-green-500/30 border-2 border-green-500'
                      : matchedLeftIdx !== undefined
                      ? 'bg-red-500/30 border-2 border-red-500'
                      : 'bg-white/5 border border-white/10'
                    : matchedLeftIdx !== undefined
                    ? `${getMatchColor(matchedLeftIdx)} opacity-60`
                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                }`}
              >
                <span className="text-white">{pairs[originalIdx].right}</span>
              </button>
            )
          })}
        </div>
      </div>

      {!showResult && (
        <button
          onClick={handleSubmit}
          disabled={matches.size !== pairs.length}
          className="mt-6 w-full py-3 bg-cyan-500 text-white font-semibold rounded-xl hover:bg-cyan-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Vérifier mes associations ({matches.size}/{pairs.length})
        </button>
      )}

      {showResult && (
        <div className={`mt-6 rounded-xl overflow-hidden border ${allCorrect ? 'border-green-500/30' : 'border-orange-500/30'}`}>
          {/* Header */}
          <div className={`px-5 py-3 ${allCorrect ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
            <div className="flex items-center gap-2">
              {allCorrect ? (
                <>
                  <span className="text-2xl">🎉</span>
                  <span className="font-bold text-green-400 text-lg">Toutes les associations sont correctes !</span>
                </>
              ) : (
                <>
                  <span className="text-2xl">✗</span>
                  <span className="font-bold text-red-400 text-lg">
                    {correctCount}/{pairs.length} association{correctCount > 1 ? 's' : ''} correcte{correctCount > 1 ? 's' : ''}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="px-5 py-4 bg-white/5 space-y-3">
            {!allCorrect && (
              <>
                <div className="space-y-2">
                  <span className="text-green-400 font-semibold text-sm">Les bonnes associations :</span>
                  {pairs.map((pair, idx) => (
                    <div key={idx} className={`flex items-center gap-3 p-2 rounded-lg ${isCorrectMatch(idx) ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                      <span className={isCorrectMatch(idx) ? 'text-green-400' : 'text-red-400'}>
                        {isCorrectMatch(idx) ? '✓' : '✗'}
                      </span>
                      <span className="text-white/80 text-sm">{pair.left}</span>
                      <span className="text-white/40">→</span>
                      <span className={`text-sm ${isCorrectMatch(idx) ? 'text-green-300' : 'text-green-300'}`}>{pair.right}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/10" />
              </>
            )}

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
