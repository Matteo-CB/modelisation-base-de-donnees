'use client'

import { Exercise } from '@/lib/types'
import QCMExercise from './QCMExercise'
import TrueFalseExercise from './TrueFalseExercise'
import MatchingExercise from './MatchingExercise'
import FillBlankExercise from './FillBlankExercise'
import OrderingExercise from './OrderingExercise'

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
      // For drag-drop, we'll use the QCM component for simplicity
      return <QCMExercise exercise={exercise} onComplete={onComplete} />
    default:
      return <QCMExercise exercise={exercise} onComplete={onComplete} />
  }
}
