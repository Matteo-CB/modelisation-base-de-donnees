'use client'

import { useState } from 'react'
import { Exercise } from '@/lib/types'

interface OrderingExerciseProps {
  exercise: Exercise
  onComplete: (correct: boolean) => void
}

export default function OrderingExercise({ exercise, onComplete }: OrderingExerciseProps) {
  const items = exercise.items || []
  const [order, setOrder] = useState<number[]>(() => {
    const indices = items.map((_, i) => i)
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]]
    }
    return indices
  })
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)

  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedIndex === null || draggedIndex === index) return

    const newOrder = [...order]
    const draggedItem = newOrder[draggedIndex]
    newOrder.splice(draggedIndex, 1)
    newOrder.splice(index, 0, draggedItem)
    setOrder(newOrder)
    setDraggedIndex(index)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
  }

  const moveItem = (fromIndex: number, direction: 'up' | 'down') => {
    const toIndex = direction === 'up' ? fromIndex - 1 : fromIndex + 1
    if (toIndex < 0 || toIndex >= order.length) return

    const newOrder = [...order]
    const temp = newOrder[fromIndex]
    newOrder[fromIndex] = newOrder[toIndex]
    newOrder[toIndex] = temp
    setOrder(newOrder)
  }

  const handleSubmit = () => {
    setShowResult(true)
    const correctAnswer = exercise.correctAnswer as number[]
    const isCorrect = order.every((item, idx) => item === correctAnswer[idx])
    onComplete(isCorrect)
  }

  const isItemInCorrectPosition = (idx: number) => {
    const correctAnswer = exercise.correctAnswer as number[]
    return order[idx] === correctAnswer[idx]
  }

  const correctAnswer = exercise.correctAnswer as number[]
  const isAllCorrect = order.every((item, idx) => item === correctAnswer[idx])
  const correctPositions = order.filter((_, idx) => isItemInCorrectPosition(idx)).length

  return (
    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">📋</span>
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-400">
          Ordonner
        </span>
      </div>

      <h3 className="text-lg font-semibold text-white mb-2">{exercise.question}</h3>
      <p className="text-white/60 text-sm mb-6">Glisse et dépose ou utilise les flèches pour réordonner</p>

      <div className="space-y-2">
        {order.map((itemIndex, idx) => (
          <div
            key={itemIndex}
            draggable={!showResult}
            onDragStart={() => handleDragStart(idx)}
            onDragOver={(e) => handleDragOver(e, idx)}
            onDragEnd={handleDragEnd}
            className={`flex items-center gap-3 p-4 rounded-xl transition-all cursor-move ${
              showResult
                ? isItemInCorrectPosition(idx)
                  ? 'bg-green-500/30 border-2 border-green-500'
                  : 'bg-red-500/30 border-2 border-red-500'
                : draggedIndex === idx
                ? 'bg-amber-500/30 border-2 border-amber-500 scale-105'
                : 'bg-white/5 border border-white/10 hover:bg-white/10'
            }`}
          >
            <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
              showResult
                ? isItemInCorrectPosition(idx)
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white'
                : 'bg-amber-500/30 text-amber-400'
            }`}>
              {idx + 1}
            </span>

            <span className="flex-1 text-white">{items[itemIndex]}</span>

            {!showResult && (
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => moveItem(idx, 'up')}
                  disabled={idx === 0}
                  className="p-1 text-white/40 hover:text-white disabled:opacity-30"
                >
                  ▲
                </button>
                <button
                  onClick={() => moveItem(idx, 'down')}
                  disabled={idx === order.length - 1}
                  className="p-1 text-white/40 hover:text-white disabled:opacity-30"
                >
                  ▼
                </button>
              </div>
            )}

            {showResult && (
              <span className={isItemInCorrectPosition(idx) ? 'text-green-400' : 'text-red-400'}>
                {isItemInCorrectPosition(idx) ? '✓' : '✗'}
              </span>
            )}
          </div>
        ))}
      </div>

      {!showResult && (
        <button
          onClick={handleSubmit}
          className="mt-6 w-full py-3 bg-cyan-500 text-white font-semibold rounded-xl hover:bg-cyan-400 transition"
        >
          Valider l'ordre
        </button>
      )}

      {showResult && (
        <div className={`mt-6 rounded-xl overflow-hidden border ${isAllCorrect ? 'border-green-500/30' : 'border-orange-500/30'}`}>
          {/* Header */}
          <div className={`px-5 py-3 ${isAllCorrect ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
            <div className="flex items-center gap-2">
              {isAllCorrect ? (
                <>
                  <span className="text-2xl">🏆</span>
                  <span className="font-bold text-green-400 text-lg">Ordre parfait !</span>
                </>
              ) : (
                <>
                  <span className="text-2xl">✗</span>
                  <span className="font-bold text-red-400 text-lg">
                    {correctPositions}/{order.length} en bonne position
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="px-5 py-4 bg-white/5 space-y-3">
            {!isAllCorrect && (
              <>
                <div>
                  <span className="text-green-400 font-semibold text-sm">Le bon ordre :</span>
                  <div className="mt-2 space-y-1">
                    {correctAnswer.map((itemIdx, position) => (
                      <div key={position} className="flex items-center gap-3 p-2 rounded-lg bg-green-500/10">
                        <span className="w-6 h-6 rounded flex items-center justify-center bg-green-500/30 text-green-400 font-bold text-xs">
                          {position + 1}
                        </span>
                        <span className="text-green-300 text-sm">{items[itemIdx]}</span>
                      </div>
                    ))}
                  </div>
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
