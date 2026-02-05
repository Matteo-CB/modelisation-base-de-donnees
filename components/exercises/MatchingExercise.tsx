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
      'from-purple-500 to-pink-500',
      'from-blue-500 to-cyan-500',
      'from-green-500 to-emerald-500',
      'from-orange-500 to-yellow-500',
      'from-red-500 to-rose-500'
    ]
    return colors[leftIdx % colors.length]
  }

  const isCorrectMatch = (leftIdx: number) => {
    const rightIdx = matches.get(leftIdx)
    if (rightIdx === undefined) return false
    return shuffledRight[rightIdx] === leftIdx
  }

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
                  ? `bg-gradient-to-r ${getMatchColor(idx)} text-white`
                  : matches.has(idx)
                  ? `bg-gradient-to-r ${getMatchColor(idx)} opacity-60`
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
                    ? `bg-gradient-to-r ${getMatchColor(matchedLeftIdx)} opacity-60`
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
          className="mt-6 w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-400 hover:to-pink-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Vérifier mes associations ({matches.size}/{pairs.length})
        </button>
      )}

      {showResult && (
        <div className={`mt-6 p-4 rounded-xl ${
          Array.from(matches.entries()).every(([left]) => isCorrectMatch(left))
            ? 'bg-green-500/20'
            : 'bg-orange-500/20'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            {Array.from(matches.entries()).every(([left]) => isCorrectMatch(left)) ? (
              <>
                <span className="text-2xl">🎉</span>
                <span className="font-bold text-green-400">Parfait !</span>
              </>
            ) : (
              <>
                <span className="text-2xl">💡</span>
                <span className="font-bold text-orange-400">Quelques erreurs...</span>
              </>
            )}
          </div>
          <p className="text-white/80 text-sm">{exercise.explanation}</p>
        </div>
      )}
    </div>
  )
}
