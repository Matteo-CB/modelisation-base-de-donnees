import { Course } from '../types'
import { modelisationBDD } from './modelisation-bdd'

export const courses: Course[] = [
  modelisationBDD
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

export function getExercisesForRevision(courseId: string, completedSections: string[]) {
  const allExercises = getAllExercises(courseId)
  return allExercises.filter(ex => completedSections.includes(ex.sectionId))
}
