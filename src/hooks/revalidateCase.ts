import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'
import type { Case } from '@/payload-types'

export const revalidateCase: CollectionAfterChangeHook<Case> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/cases/${doc.slug}`

      payload.logger.info(`Revalidating case at path: ${path}`)

      revalidatePath(path)
      revalidatePath('/cases')
      revalidateTag('cases-sitemap', 'max')
    }

    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldPath = `/cases/${previousDoc.slug}`

      payload.logger.info(`Revalidating old case at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidatePath('/cases')
      revalidateTag('cases-sitemap', 'max')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Case> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate && doc) {
    const path = `/cases/${doc.slug}`
    revalidatePath(path)
    revalidatePath('/cases')
    revalidateTag('cases-sitemap', 'max')
  }

  return doc
}
