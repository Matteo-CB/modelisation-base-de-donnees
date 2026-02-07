import { Course } from '../types'
import { modelisationBDD } from './modelisation-bdd'
import { programmationFonctionnelle } from './programmation-fonctionnelle'

export const courses: Course[] = [
  modelisationBDD,
  programmationFonctionnelle
]

export function getCourse(id: string): Course | undefined {
  return courses.find(course => course.id === id)
}

export function getChapter(courseId: string, chapterId: string) {
  const course = getCourse(courseId)
  return course?.chapters.find(ch => ch.id === chapterId)
}

export function getSection(courseId: string, chapterId: string, sectionId: string) {
  const chapter = getChapter(courseId, chapterId)
  return chapter?.sections.find(sec => sec.id === sectionId)
}

export function getAllExercises(courseId: string) {
  const course = getCourse(courseId)
  if (!course) return []

  return course.chapters.flatMap(chapter =>
    chapter.sections.flatMap(section =>
      section.exercises.map(exercise => ({
        ...exercise,
        chapterId: chapter.id,
        sectionId: section.id,
        chapterTitle: chapter.title,
        sectionTitle: section.title
      }))
    )
  )
}

export function getExercisesForRevision(courseIds: string[], completedSectionsByCourse: Record<string, string[]>) {
  const exercises: any[] = []

  courseIds.forEach(courseId => {
    const completedSections = completedSectionsByCourse[courseId] || []
    const allExercises = getAllExercises(courseId)
    const filtered = allExercises.filter(ex => completedSections.includes(ex.sectionId))

    filtered.forEach(ex => {
      exercises.push({
        ...ex,
        courseId,
        courseTitle: getCourse(courseId)?.title || ''
      })
    })
  })

  return exercises
}
