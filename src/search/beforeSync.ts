import { BeforeSync, DocToSync } from '@payloadcms/plugin-search/types'

export const beforeSyncWithSearch: BeforeSync = async ({ req, originalDoc, searchDoc }) => {
  const {
    doc: { relationTo: collection },
  } = searchDoc

  const { slug, id, categories, title, meta } = originalDoc

  // Determine human-readable resource type, URL, and relevant excerpt
  let resourceType = 'Page'
  let url = `/${slug || ''}`
  let excerpt = originalDoc.excerpt || originalDoc.meta?.description || ''

  if (collection === 'posts') {
    if (originalDoc.postType === 'guide') {
      resourceType = 'Guide'
      url = `/guides/${slug}`
    } else {
      resourceType = 'News'
      url = `/news/${slug}`
    }
  } else if (collection === 'cases') {
    resourceType = 'Case'
    url = `/cases/${slug}`
  } else if (collection === 'events') {
    resourceType = 'Event'
    url = `/events/${slug}`
  } else if (collection === 'vacancies') {
    resourceType = 'Vacancy'
    url = `/vacancies/${slug}`
  } else if (collection === 'practice-areas') {
    resourceType = 'Practice Area'
    excerpt = originalDoc.summary || originalDoc.meta?.description || ''
    url = `/practice-areas/${slug}`
  } else if (collection === 'pages') {
    resourceType = 'Page'
    url = slug === 'home' ? '/' : `/${slug}`
  }

  const heroImageId =
    typeof originalDoc?.heroImage === 'object' && originalDoc?.heroImage !== null
      ? originalDoc.heroImage.id
      : originalDoc?.heroImage
  const metaImageId =
    typeof meta?.image === 'object' && meta?.image !== null
      ? meta.image.id
      : meta?.image

  const imageToUse = metaImageId || heroImageId

  const modifiedDoc: DocToSync = {
    ...searchDoc,
    slug,
    resourceType,
    excerpt,
    url,
    meta: {
      ...meta,
      title: meta?.title || title,
      image: imageToUse,
      description: excerpt,
    },
    categories: [],
  }

  if (categories && Array.isArray(categories) && categories.length > 0) {
    const populatedCategories: { id: string | number; title: string }[] = []
    for (const category of categories) {
      if (!category) {
        continue
      }

      if (typeof category === 'object') {
        populatedCategories.push(category)
        continue
      }

      const doc = await req.payload.findByID({
        collection: 'categories',
        id: category,
        disableErrors: true,
        depth: 0,
        select: { title: true },
        req,
      })

      if (doc !== null) {
        populatedCategories.push(doc)
      } else {
        console.error(
          `Failed. Category not found when syncing collection '${collection}' with id: '${id}' to search.`,
        )
      }
    }

    modifiedDoc.categories = populatedCategories.map((each) => ({
      relationTo: 'categories',
      categoryID: String(each.id),
      title: each.title,
    }))
  }

  return modifiedDoc
}
