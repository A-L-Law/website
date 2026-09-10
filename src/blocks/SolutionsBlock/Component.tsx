import React from 'react'
import * as LucideIcons from 'lucide-react'
import type { SolutionsBlock as SolutionsBlockProps } from '@/payload-types'

export const SolutionsBlock: React.FC<SolutionsBlockProps> = ({
  subtitle,
  title,
  description,
  items,
}) => {
  return (
    <div className="solutions__two section-padding py-16 lg:py-24 bg-brand-ice/30 dark:bg-brand-charcoal/40">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
          <div className="solutions__two-title">
            {subtitle && <span className="subtitle-one block mb-3">{subtitle}</span>}
            <h2 className="text-3xl font-bold mb-4 text-foreground leading-tight">
              {title || 'We Help With Strategic Planning'}
            </h2>
            {description && (
              <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
            )}
          </div>
          {items?.map((item, id) => {
            const IconComponent =
              (LucideIcons as unknown as Record<string, React.ElementType>)[item.icon] ||
              LucideIcons.Lightbulb

            return (
              <div
                key={id}
                className="solutions__two-item p-6 rounded-xl bg-background border border-border shadow-sm hover:shadow-md transition-all group"
              >
                <div className="solutions__two-item-icon w-14 h-14 rounded-lg bg-brand-crimson/10 text-brand-crimson flex items-center justify-center mb-5 group-hover:bg-brand-crimson group-hover:text-white transition-colors">
                  <IconComponent className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-bold mb-2 text-foreground group-hover:text-brand-crimson transition-colors">
                  {item.title}
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
