'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { UserProgress, ExerciseResult } from '@/lib/types'

export function useProgress(courseId: string) {
  const [progress, setProgress] = useState<UserProgress[]>([])
  const [exerciseResults, setExerciseResults] = useState<ExerciseResult[]>([])
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)

  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUserId(user.id)
      }
    }
    getUser()
  }, [supabase])

  const fetchProgress = useCallback(async () => {
    if (!userId) return

    setLoading(true)

    const [progressResult, exercisesResult] = await Promise.all([
      supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId)
        .eq('course_id', courseId),
      supabase
        .from('exercise_results')
        .select('*')
        .eq('user_id', userId)
        .eq('course_id', courseId)
    ])

    if (progressResult.data) setProgress(progressResult.data)
    if (exercisesResult.data) setExerciseResults(exercisesResult.data)

    setLoading(false)
  }, [userId, courseId, supabase])

  useEffect(() => {
    if (userId) {
      fetchProgress()
    }
  }, [userId, fetchProgress])

  const markSectionComplete = async (chapterId: string, sectionId: string) => {
    if (!userId) return

    const { error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: userId,
        course_id: courseId,
        chapter_id: chapterId,
        section_id: sectionId,
        completed: true,
        completed_at: new Date().toISOString()
      }, {
        onConflict: 'user_id,course_id,chapter_id,section_id'
      })

    if (!error) {
      fetchProgress()
    }
  }

  const saveExerciseResult = async (
    chapterId: string,
    sectionId: string,
    exerciseId: string,
    score: number,
    maxScore: number
  ) => {
    if (!userId) return

    const existing = exerciseResults.find(r => r.exercise_id === exerciseId)

    const { error } = await supabase
      .from('exercise_results')
      .upsert({
        user_id: userId,
        course_id: courseId,
        chapter_id: chapterId,
        section_id: sectionId,
        exercise_id: exerciseId,
        score,
        max_score: maxScore,
        attempts: (existing?.attempts || 0) + 1,
        last_attempt: new Date().toISOString()
      }, {
        onConflict: 'user_id,course_id,exercise_id'
      })

    if (!error) {
      fetchProgress()
    }
  }

  const isSectionCompleted = (sectionId: string) => {
    return progress.some(p => p.section_id === sectionId && p.completed)
  }

  const getCompletedSections = () => {
    return progress.filter(p => p.completed).map(p => p.section_id)
  }

  const getChapterProgress = (chapterId: string, totalSections: number) => {
    const completedInChapter = progress.filter(
      p => p.chapter_id === chapterId && p.completed
    ).length
    return {
      completed: completedInChapter,
      total: totalSections,
      percentage: totalSections > 0 ? Math.round((completedInChapter / totalSections) * 100) : 0
    }
  }

  const getCourseProgress = (totalSections: number) => {
    const completedTotal = progress.filter(p => p.completed).length
    return {
      completed: completedTotal,
      total: totalSections,
      percentage: totalSections > 0 ? Math.round((completedTotal / totalSections) * 100) : 0
    }
  }

  const getExerciseScore = (exerciseId: string) => {
    return exerciseResults.find(r => r.exercise_id === exerciseId)
  }

  return {
    progress,
    exerciseResults,
    loading,
    markSectionComplete,
    saveExerciseResult,
    isSectionCompleted,
    getCompletedSections,
    getChapterProgress,
    getCourseProgress,
    getExerciseScore,
    refetch: fetchProgress
  }
}
