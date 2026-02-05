import { MetadataRoute } from 'next'
import { courses } from '@/lib/courses'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://studyhub.app'

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/revision`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  const coursePages: MetadataRoute.Sitemap = courses.flatMap((course) => {
    const coursePage: MetadataRoute.Sitemap = [
      {
        url: `${baseUrl}/cours/${course.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.9,
      },
    ]

    const sectionPages: MetadataRoute.Sitemap = course.chapters.flatMap(
      (chapter) =>
        chapter.sections.map((section) => ({
          url: `${baseUrl}/cours/${course.id}/${chapter.id}/${section.id}`,
          lastModified: new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        }))
    )

    return [...coursePage, ...sectionPages]
  })

  return [...staticPages, ...coursePages]
}
