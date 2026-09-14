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
    <div className="all__sidebar ml-25 xl-ml-0 font-body">
      <div className="all__sidebar-item">
        <h4 className="font-heading font-bold text-xl mb-4">Search</h4>
        <div className="all__sidebar-item-search">
          <form action={postType === 'news' ? '/news' : '/guides'} method="get">
            <input 
              type="text" 
              name="search"
              placeholder="Search....." 
              className="w-full px-4 py-3 rounded border border-gray-200 focus:outline-none focus:border-brand-crimson transition-colors"
            />
            <button type="submit" className="bg-brand-crimson text-white hover:bg-black transition-colors">
              <i className="fal fa-search"></i>
            </button>
          </form>
        </div>
      </div>
      
      <div className="all__sidebar-item">
        <h4 className="font-heading font-bold text-xl mb-4">Recent {postType === 'news' ? 'News' : 'Guides'}</h4>
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
              <div className="post__item group" key={data.id}>
                <div className="post__item-image">
                  <Link href={postLink}>
                    <img src={imageUrl} alt={data.title} className="group-hover:opacity-80 transition-opacity" />
                  </Link>
                </div>
                <div className="post__item-title">
                  <h6 className="font-heading font-bold mb-1">
                    <Link href={postLink}>{data.title}</Link>
                  </h6>
                  <span className="text-sm text-gray-500">
                    <i className="far fa-calendar-alt text-brand-crimson mr-2"></i>
                    {formattedDate}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {allTags.docs.length > 0 && (
        <div className="all__sidebar-item">
          <h4 className="font-heading font-bold text-xl mb-4">Popular Tags</h4>
          <div className="all__sidebar-item-tag">
            <ul className="flex flex-wrap gap-2">
              {allTags.docs.map((tag) => (
                <li key={tag.id}>
                  <Link 
                    href={`/${postType}s?tag=${tag.slug || tag.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="border border-gray-200 px-3 py-1 rounded text-sm hover:bg-brand-crimson hover:text-white transition-colors"
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
