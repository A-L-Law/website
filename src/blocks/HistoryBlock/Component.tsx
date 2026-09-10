import React from 'react'
import type { HistoryBlock as HistoryBlockProps } from '@/payload-types'

export const HistoryBlock: React.FC<HistoryBlockProps> = ({ subtitle, title, timeline }) => {
  const items = Array.isArray(timeline) && timeline.length > 0
    ? timeline
    : [
        {
          year: '2003',
          title: 'Start Company',
          description: 'A L Law was established to provide premier legal representation across commercial litigation and private client practice.',
        },
        {
          year: '2008',
          title: 'Opening Office',
          description: 'Expanded head office operations in Central London to serve high-net-worth individuals and corporate entities.',
        },
        {
          year: '2013',
          title: 'Improve Management',
          description: 'Incorporated digital practice management standards and specialized regulatory compliance counsel.',
        },
        {
          year: '2024',
          title: 'Winning Award',
          description: 'Recognized with national legal excellence awards for client satisfaction and dispute resolution.',
        },
      ]

  return (
    <div className="company__history section-padding py-16">
      <div className="container mx-auto px-4">
        <div className="row mb-12 text-center">
          <div className="col-xl-12">
            <div className="company__history-title">
              {subtitle && (
                <span className="subtitle-one text-brand-crimson uppercase tracking-wider font-semibold text-sm mb-2 block">
                  {subtitle}
                </span>
              )}
              <h2 className="text-3xl md:text-4xl font-bold">{title || 'Our Company History'}</h2>
            </div>
          </div>
        </div>
        <div className="relative border-l-2 border-brand-crimson/30 ml-4 md:ml-32 space-y-12">
          {items.map((item, idx) => {
            const imgUrl =
              item.image && typeof item.image === 'object' && 'url' in item.image && item.image.url
                ? item.image.url
                : `/assets/img/about/history-${(idx % 5) + 1}.jpg`

            return (
              <div className="relative pl-8 md:pl-12 group" key={idx}>
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-brand-crimson border-4 border-background group-hover:scale-125 transition-transform" />
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-card border border-border p-6 rounded-xl shadow-sm">
                  {item.image && (
                    <div className="lg:col-span-4">
                      <img
                        src={imgUrl}
                        alt={item.title}
                        className="rounded-lg w-full h-40 object-cover"
                      />
                    </div>
                  )}
                  <div className={item.image ? 'lg:col-span-8' : 'lg:col-span-12'}>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-brand-crimson/10 text-brand-crimson px-3 py-1 rounded text-sm font-bold">
                        {item.year}
                      </span>
                      <h3 className="text-xl font-bold">{item.title}</h3>
                    </div>
                    {item.description && (
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
