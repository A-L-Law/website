import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'
import type { Post } from '@/payload-types'

export const revalidatePost: CollectionAfterChangeHook<Post> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const parentPath = doc.postType === 'guide' ? '/guides' : '/news'
      const path = `${parentPath}/${doc.slug}`

      payload.logger.info(`Revalidating post at path: ${path}`)

      revalidatePath(path)
      revalidatePath(parentPath)
      revalidateTag('posts-sitemap', 'max')
    }

    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldParentPath = previousDoc.postType === 'guide' ? '/guides' : '/news'
      const oldPath = `${oldParentPath}/${previousDoc.slug}`

      payload.logger.info(`Revalidating old post at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidatePath(oldParentPath)
      revalidateTag('posts-sitemap', 'max')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Post> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate && doc) {
    const parentPath = doc.postType === 'guide' ? '/guides' : '/news'
    const path = `${parentPath}/${doc.slug}`
    revalidatePath(path)
    revalidatePath(parentPath)
    revalidateTag('posts-sitemap', 'max')
  }

  return doc
}
