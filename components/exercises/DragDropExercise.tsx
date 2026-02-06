'use client'

import { useState, useMemo } from 'react'
import { Exercise } from '@/lib/types'

interface DragDropExerciseProps {
  exercise: Exercise
  onComplete: (correct: boolean) => void
}

export default function DragDropExercise({ exercise, onComplete }: DragDropExerciseProps) {
  const items = exercise.items || []
  const correctAnswer = exercise.correctAnswer as string[]

  // Derive unique categories from correctAnswer
  const categories = useMemo(() => {
    const seen = new Set<string>()
    const ordered: string[] = []
    for (const cat of correctAnswer) {
      if (!seen.has(cat)) {
        seen.add(cat)
        ordered.push(cat)
      }
    }
    return ordered
  }, [correctAnswer])

  // Map: itemIndex -> category name (or null if unassigned)
  const [assignments, setAssignments] = useState<Map<number, string>>(new Map())
  const [selectedItem, setSelectedItem] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)

  // Items not yet assigned to a category
  const unassignedItems = items.map((_, i) => i).filter(i => !assignments.has(i))

  // Items assigned to a specific category
  const itemsInCategory = (category: string) =>
    Array.from(assignments.entries())
      .filter(([, cat]) => cat === category)
      .map(([idx]) => idx)

  const handleItemClick = (itemIndex: number) => {
    if (showResult) return
    if (selectedItem === itemIndex) {
      setSelectedItem(null)
    } else {
      setSelectedItem(itemIndex)
    }
  }

  const handleCategoryClick = (category: string) => {
    if (showResult || selectedItem === null) return
    const newAssignments = new Map(assignments)
    newAssignments.set(selectedItem, category)
    setAssignments(newAssignments)
    setSelectedItem(null)
  }

  const handleRemoveFromCategory = (itemIndex: number) => {
    if (showResult) return
    const newAssignments = new Map(assignments)
    newAssignments.delete(itemIndex)
    setAssignments(newAssignments)
  }

  // Drag-and-drop handlers
  const handleDragStart = (e: React.DragEvent, itemIndex: number) => {
    if (showResult) return
    e.dataTransfer.setData('text/plain', String(itemIndex))
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDropOnCategory = (e: React.DragEvent, category: string) => {
    e.preventDefault()
    if (showResult) return
    const itemIndex = parseInt(e.dataTransfer.getData('text/plain'), 10)
    if (isNaN(itemIndex)) return
    const newAssignments = new Map(assignments)
    newAssignments.set(itemIndex, category)
    setAssignments(newAssignments)
    setSelectedItem(null)
  }

  const handleDropOnPool = (e: React.DragEvent) => {
    e.preventDefault()
    if (showResult) return
    const itemIndex = parseInt(e.dataTransfer.getData('text/plain'), 10)
    if (isNaN(itemIndex)) return
    const newAssignments = new Map(assignments)
    newAssignments.delete(itemIndex)
    setAssignments(newAssignments)
  }

  const handleSubmit = () => {
    if (assignments.size !== items.length) return
    setShowResult(true)
    const allCorrect = items.every((_, idx) => assignments.get(idx) === correctAnswer[idx])
    onComplete(allCorrect)
  }

  const isItemCorrect = (idx: number) => assignments.get(idx) === correctAnswer[idx]

  const allCorrect = items.every((_, idx) => isItemCorrect(idx))
  const correctCount = items.filter((_, idx) => isItemCorrect(idx)).length

  const categoryColors: Record<string, { bg: string; border: string; text: string; chip: string }> = {}
  const colorPalette = [
    { bg: 'bg-purple-500/10', border: 'border-purple-500/40', text: 'text-purple-400', chip: 'bg-purple-500/20' },
    { bg: 'bg-blue-500/10', border: 'border-blue-500/40', text: 'text-blue-400', chip: 'bg-blue-500/20' },
    { bg: 'bg-emerald-500/10', border: 'border-emerald-500/40', text: 'text-emerald-400', chip: 'bg-emerald-500/20' },
    { bg: 'bg-orange-500/10', border: 'border-orange-500/40', text: 'text-orange-400', chip: 'bg-orange-500/20' },
    { bg: 'bg-rose-500/10', border: 'border-rose-500/40', text: 'text-rose-400', chip: 'bg-rose-500/20' },
  ]
  categories.forEach((cat, i) => {
    categoryColors[cat] = colorPalette[i % colorPalette.length]
  })

  return (
    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">🎯</span>
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/20 text-cyan-400">
          Classement
        </span>
      </div>

      <h3 className="text-lg font-semibold text-white mb-2">{exercise.question}</h3>
      <p className="text-white/60 text-sm mb-6">
        Clique sur un élément puis sur une catégorie pour le classer (ou glisse-dépose)
      </p>

      {/* Pool of unassigned items */}
      {!showResult && (
        <div
          className="mb-6 min-h-[52px] rounded-xl border-2 border-dashed border-white/20 p-3 flex flex-wrap gap-2"
          onDragOver={handleDragOver}
          onDrop={handleDropOnPool}
        >
          {unassignedItems.length === 0 && (
            <span className="text-white/30 text-sm italic m-auto">
              Tous les éléments sont classés
            </span>
          )}
          {unassignedItems.map((itemIdx) => (
            <button
              key={itemIdx}
              draggable
              onDragStart={(e) => handleDragStart(e, itemIdx)}
              onClick={() => handleItemClick(itemIdx)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-grab active:cursor-grabbing ${
                selectedItem === itemIdx
                  ? 'bg-cyan-500 text-white scale-105 ring-2 ring-cyan-400/50'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {items[itemIdx]}
            </button>
          ))}
        </div>
      )}

      {/* Category zones */}
      <div className={`grid gap-4 ${categories.length <= 2 ? 'grid-cols-2' : categories.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
        {categories.map((category) => {
          const color = categoryColors[category]
          const catItems = itemsInCategory(category)
          return (
            <div
              key={category}
              onClick={() => handleCategoryClick(category)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDropOnCategory(e, category)}
              className={`rounded-xl border-2 p-4 transition-all min-h-[100px] ${
                showResult
                  ? 'border-white/10'
                  : selectedItem !== null
                  ? `${color.border} ${color.bg} cursor-pointer hover:scale-[1.02]`
                  : `${color.border} ${color.bg}`
              }`}
            >
              <div className={`text-sm font-bold mb-3 ${color.text}`}>
                {category}
              </div>
              <div className="flex flex-wrap gap-2">
                {catItems.map((itemIdx) => (
                  <div
                    key={itemIdx}
                    draggable={!showResult}
                    onDragStart={(e) => handleDragStart(e, itemIdx)}
                    onClick={(e) => {
                      e.stopPropagation()
                      if (!showResult) handleRemoveFromCategory(itemIdx)
                    }}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      showResult
                        ? isItemCorrect(itemIdx)
                          ? 'bg-green-500/30 text-green-300 border border-green-500/50'
                          : 'bg-red-500/30 text-red-300 border border-red-500/50'
                        : `${color.chip} text-white cursor-grab active:cursor-grabbing hover:opacity-80`
                    }`}
                  >
                    {items[itemIdx]}
                    {showResult && (
                      <span className="ml-2">{isItemCorrect(itemIdx) ? '✓' : '✗'}</span>
                    )}
                    {!showResult && (
                      <span className="ml-2 text-white/40 text-xs">✕</span>
                    )}
                  </div>
                ))}
                {catItems.length === 0 && !showResult && (
                  <span className="text-white/20 text-xs italic">
                    Dépose ici
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Submit button */}
      {!showResult && (
        <button
          onClick={handleSubmit}
          disabled={assignments.size !== items.length}
          className="mt-6 w-full py-3 bg-cyan-500 text-white font-semibold rounded-xl hover:bg-cyan-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Vérifier mon classement ({assignments.size}/{items.length})
        </button>
      )}

      {/* Result */}
      {showResult && (
        <div className={`mt-6 rounded-xl overflow-hidden border ${allCorrect ? 'border-green-500/30' : 'border-orange-500/30'}`}>
          <div className={`px-5 py-3 ${allCorrect ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
            <div className="flex items-center gap-2">
              {allCorrect ? (
                <>
                  <span className="text-2xl">🎉</span>
                  <span className="font-bold text-green-400 text-lg">Classement parfait !</span>
                </>
              ) : (
                <>
                  <span className="text-2xl">✗</span>
                  <span className="font-bold text-red-400 text-lg">
                    {correctCount}/{items.length} bien classé{correctCount > 1 ? 's' : ''}
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="px-5 py-4 bg-white/5 space-y-3">
            {!allCorrect && (
              <>
                <div>
                  <span className="text-green-400 font-semibold text-sm">Le bon classement :</span>
                  <div className="mt-2 space-y-1">
                    {items.map((item, idx) => {
                      const color = categoryColors[correctAnswer[idx]]
                      return (
                        <div key={idx} className={`flex items-center gap-3 p-2 rounded-lg ${isItemCorrect(idx) ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                          <span className={isItemCorrect(idx) ? 'text-green-400' : 'text-red-400'}>
                            {isItemCorrect(idx) ? '✓' : '✗'}
                          </span>
                          <span className="text-white/80 text-sm">{item}</span>
                          <span className="text-white/40">→</span>
                          <span className={`text-sm font-medium ${color.text}`}>{correctAnswer[idx]}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className="border-t border-white/10" />
              </>
            )}

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
