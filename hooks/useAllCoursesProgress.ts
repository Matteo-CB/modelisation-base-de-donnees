'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { UserProgress } from '@/lib/types'

export function useAllCoursesProgress() {
  const [progressByCourse, setProgressByCourse] = useState<Record<string, string[]>>({})
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

  const fetchAllProgress = useCallback(async () => {
    if (!userId) return

    setLoading(true)

    const { data: progressData } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('completed', true)

    if (progressData) {
      const grouped: Record<string, string[]> = {}

      progressData.forEach((progress: UserProgress) => {
        if (!grouped[progress.course_id]) {
          grouped[progress.course_id] = []
        }
        grouped[progress.course_id].push(progress.section_id)
      })

      setProgressByCourse(grouped)
    }

    setLoading(false)
  }, [userId, supabase])

  useEffect(() => {
    if (userId) {
      fetchAllProgress()
    }
  }, [userId, fetchAllProgress])

  return {
    progressByCourse,
    loading,
    refetch: fetchAllProgress
  }
}
