'use client'

import { Exercise } from '@/lib/types'
import QCMExercise from './QCMExercise'
import TrueFalseExercise from './TrueFalseExercise'
import MatchingExercise from './MatchingExercise'
import FillBlankExercise from './FillBlankExercise'
import OrderingExercise from './OrderingExercise'
import DragDropExercise from './DragDropExercise'

interface ExerciseWrapperProps {
  exercise: Exercise
  onComplete: (correct: boolean) => void
}

export default function ExerciseWrapper({ exercise, onComplete }: ExerciseWrapperProps) {
  switch (exercise.type) {
    case 'qcm':
      return <QCMExercise exercise={exercise} onComplete={onComplete} />
    case 'true-false':
      return <TrueFalseExercise exercise={exercise} onComplete={onComplete} />
    case 'matching':
      return <MatchingExercise exercise={exercise} onComplete={onComplete} />
    case 'fill-blank':
      return <FillBlankExercise exercise={exercise} onComplete={onComplete} />
    case 'ordering':
      return <OrderingExercise exercise={exercise} onComplete={onComplete} />
    case 'drag-drop':
      return <DragDropExercise exercise={exercise} onComplete={onComplete} />
    case 'code-complete':
      // code-complete uses QCM as fallback for now
      return <QCMExercise exercise={exercise} onComplete={onComplete} />
    default: {
      // Exhaustive check: if TypeScript doesn't error here, we missed a type
      const _exhaustive: never = exercise.type
      console.error(`Unknown exercise type: ${_exhaustive}`)
      return null
    }
  }
}
