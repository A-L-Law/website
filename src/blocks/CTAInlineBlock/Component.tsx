'use client'
import React from 'react'
import Link from 'next/link'
import { FormBlock } from '@/blocks/Form/Component'
import type { CTAInlineBlock as CTAInlineBlockProps } from '@/payload-types'

export const CTAInlineBlock: React.FC<CTAInlineBlockProps> = ({
  title,
  subtitle,
  form,
  buttonText,
  buttonLink,
}) => {
  return (
    <div className="cta__area relative z-10 py-8 lg:py-16 overflow-x-clip">
      <div className="container mx-auto px-0 sm:px-4">
        <div className="cta__area-bg relative z-10 bg-brand-crimson text-white p-6 sm:p-8 lg:p-12 lg:pr-8 rounded-none sm:rounded-xl lg:rounded-l-2xl lg:rounded-r-none shadow-xl after:content-[''] after:hidden lg:after:block after:absolute after:top-0 after:left-full after:w-[2000px] after:h-full after:bg-brand-crimson after:z-[-1]">
          {/* Subtle background geometric pattern overlay matching template */}
          <div className="absolute inset-0 bg-[url('/assets/img/shape/cta.png')] bg-cover bg-no-repeat opacity-20 pointer-events-none z-0 lg:w-[150%]" />

          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-8 relative z-10">
            <div className="lg:col-span-5">
              <div className="cta__area-title">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-2 leading-tight">
                  {title || 'Get Free Quote'}
                </h2>
                <span className="text-white/90 text-sm sm:text-base leading-relaxed block">
                  {subtitle || 'Perfect solution for your company.'}
                </span>
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="cta__area-form">
                {form && typeof form === 'object' ? (
                  <FormBlock form={form as unknown as Parameters<typeof FormBlock>[0]['form']} enableIntro={false} />
                ) : (
                  <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-end">
                    <div className="w-full sm:w-auto flex-1">
                      <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        required
                        className="w-full px-4 py-3.5 rounded-md bg-white text-slate-900 placeholder:text-slate-400 border border-transparent outline-none focus:ring-2 focus:ring-black/20 dark:bg-white dark:text-slate-900 dark:placeholder:text-slate-400 text-sm font-medium"
                      />
                    </div>
                    <div className="w-full sm:w-auto flex-1">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        required
                        className="w-full px-4 py-3.5 rounded-md bg-white text-slate-900 placeholder:text-slate-400 border border-transparent outline-none focus:ring-2 focus:ring-black/20 dark:bg-white dark:text-slate-900 dark:placeholder:text-slate-400 text-sm font-medium"
                      />
                    </div>
                    <div className="w-full sm:w-auto shrink-0">
                      {buttonLink ? (
                        <Link
                          className="w-full sm:w-auto btn-four bg-brand-charcoal hover:bg-black text-white px-7 py-3.5 rounded-md font-bold uppercase text-xs tracking-wider whitespace-nowrap inline-flex items-center justify-center gap-2 transition-colors shadow-md shrink-0 cursor-pointer"
                          href={buttonLink}
                        >
                          {buttonText || 'GET QUOTE'}
                          <i className="far fa-chevron-double-right text-xs"></i>
                        </Link>
                      ) : (
                        <button
                          type="submit"
                          className="w-full sm:w-auto btn-four bg-brand-charcoal hover:bg-black text-white px-7 py-3.5 rounded-md font-bold uppercase text-xs tracking-wider whitespace-nowrap inline-flex items-center justify-center gap-2 transition-colors shadow-md shrink-0 cursor-pointer"
                        >
                          {buttonText || 'GET QUOTE'}
                          <i className="far fa-chevron-double-right text-xs"></i>
                        </button>
                      )}
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

