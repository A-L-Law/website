import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

type BlogSidebarProps = {
  postType: 'guide' | 'news'
}

export default async function BlogSidebar({ postType }: BlogSidebarProps) {
  const payload = await getPayload({ config: configPromise })

  const [recentPosts, allTags] = await Promise.all([
    payload.find({
      collection: 'posts',
      where: {
        postType: { equals: postType },
      },
      sort: '-publishedAt',
      limit: 3,
    }),
    payload.find({
      collection: 'tags',
      limit: 20,
    }),
  ])

  return (
    <div className="all__sidebar font-body">
      <div className="all__sidebar-item bg-white dark:bg-background border border-gray-200 dark:border-brand-slate/30 rounded-lg shadow-sm mb-8 p-6 lg:p-8">
        <h4 className="font-heading font-bold text-xl mb-6 text-brand-charcoal dark:text-white border-b border-gray-100 dark:border-brand-slate/30 pb-3">
          Recent {postType === 'news' ? 'News' : 'Guides'}
        </h4>
        <div className="all__sidebar-item-post">
          {recentPosts.docs.map((data) => {
            const date = data.publishedAt ? new Date(data.publishedAt) : new Date()
            const formattedDate = date.toLocaleDateString('en-GB', { 
              day: 'numeric', month: 'short', year: 'numeric' 
            })
            const heroImg = data.heroImage || (data as any).featuredImage
            const imageUrl = heroImg && typeof heroImg === 'object' && heroImg.url
              ? heroImg.url
              : '/assets/img/blog/blog-standard-1.jpg' // Fallback
            const postLink = postType === 'news' ? `/news/${data.slug}` : `/guides/${data.slug}`
              
            return (
              <div className="post__item group flex items-center gap-4 mb-5 pb-5 border-b border-gray-100 dark:border-brand-slate/30 last:mb-0 last:pb-0 last:border-0" key={data.id}>
                <div className="post__item-image shrink-0 w-20 h-20 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <Link href={postLink} className="block w-full h-full">
                    <img src={imageUrl} alt={data.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </Link>
                </div>
                <div className="post__item-title flex-1 min-w-0">
                  <h6 className="font-heading font-bold text-base mb-1.5 leading-snug line-clamp-2">
                    <Link href={postLink} className="text-brand-charcoal dark:text-white hover:text-brand-crimson dark:hover:text-brand-crimson transition-colors line-clamp-2" title={data.title}>
                      {data.title}
                    </Link>
                  </h6>
                  <span className="text-xs text-brand-slate dark:text-gray-400 flex items-center">
                    <i className="far fa-calendar-alt text-brand-crimson mr-1.5"></i>
                    {formattedDate}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {allTags.docs.length > 0 && (
        <div className="all__sidebar-item bg-white dark:bg-background border border-gray-200 dark:border-brand-slate/30 rounded-lg shadow-sm p-6 lg:p-8">
          <h4 className="font-heading font-bold text-xl mb-6 text-brand-charcoal dark:text-white border-b border-gray-100 dark:border-brand-slate/30 pb-3">
            Popular Tags
          </h4>
          <div className="all__sidebar-item-tag">
            <ul className="flex flex-wrap gap-2 m-0 p-0">
              {allTags.docs.map((tag) => (
                <li key={tag.id} className="list-none">
                  <Link 
                    href={`${postType === 'news' ? '/news' : '/guides'}?tag=${tag.slug || tag.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="border border-gray-200 dark:border-brand-slate/30 bg-white dark:bg-background text-brand-slate dark:text-gray-300 px-3 py-1.5 rounded text-sm hover:bg-brand-crimson hover:text-white dark:hover:bg-brand-crimson dark:hover:text-white hover:border-brand-crimson dark:hover:border-brand-crimson transition-colors"
                  >
                    {tag.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
