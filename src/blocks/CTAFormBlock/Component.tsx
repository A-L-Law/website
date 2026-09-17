'use client'
import React from 'react'
import Link from 'next/link'
import { PhoneCall, Mail } from 'lucide-react'
import { FormBlock } from '@/blocks/Form/Component'
import type { CTAFormBlock as CTAFormBlockProps } from '@/payload-types'

export const CTAFormBlock: React.FC<CTAFormBlockProps> = ({
  subtitle,
  title,
  form,
  rightTitle,
  rightDescription,
  bgImage,
  avatarImages,
  emergencyPhone,
  emergencyEmail,
}) => {
  const bgUrl =
    bgImage && typeof bgImage === 'object' && 'url' in bgImage && bgImage.url
      ? bgImage.url
      : '/assets/img/pages/getInTouch.jpg'

  const phone = emergencyPhone || '+012 652 689 523'
  const email = emergencyEmail || 'conbix@gmail.com'

  const defaultAvatars = [
    '/assets/img/avatar/avatar-1.jpg',
    '/assets/img/avatar/avatar-2.jpg',
    '/assets/img/avatar/avatar-3.jpg',
    '/assets/img/avatar/avatar-4.jpg',
  ]

  const avatarsToDisplay =
    Array.isArray(avatarImages) && avatarImages.length > 0
      ? avatarImages.map((item, idx) =>
          item.avatar && typeof item.avatar === 'object' && 'url' in item.avatar && item.avatar.url
            ? item.avatar.url
            : defaultAvatars[idx % defaultAvatars.length]
        )
      : defaultAvatars

  return (
    <div className="getIn__touch-wrapper relative">
      {/* Upper Hero Section with Background Image */}
      <div
        className="getIn__touch section-padding pt-16 sm:pt-20 lg:pt-28 pb-0 bg-cover bg-center relative text-white overflow-x-clip"
        style={{ backgroundImage: `url(${bgUrl})` }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-slate-950/80 z-0" />

        {/* Animated translucent red shape overlay matching template getInTouch.png */}
        <img
          src="/assets/img/shape/getInTouch.png"
          alt="animated shape overlay"
          className="getIn__touch-shape left-right-animate2 absolute right-0 lg:right-24 top-0 z-0 pointer-events-none opacity-40 mix-blend-soft-light max-h-full"
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Form Square overlapping downwards outside the image */}
            <div className="lg:col-span-5">
              <div className="getIn__touch-left bg-card text-card-foreground p-8 sm:p-10 lg:p-12 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-border mb-[-80px] lg:mb-[-120px] relative z-30">
                <div className="getIn__touch-left-title mb-6">
                  {subtitle && (
                    <span className="subtitle-one text-brand-crimson uppercase tracking-wider font-bold text-sm mb-2 block">
                      {subtitle || 'GET IN TOUCH'}
                    </span>
                  )}
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground">
                    {title || 'Free Consultation'}
                  </h2>
                </div>
                <div className="getIn__touch-left-form">
                  {form && typeof form === 'object' ? (
                    <FormBlock form={form as unknown as Parameters<typeof FormBlock>[0]['form']} />
                  ) : (
                    <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                      <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        required
                        className="w-full px-4 py-3.5 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm font-medium outline-none focus:ring-2 focus:ring-brand-crimson/30"
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        required
                        className="w-full px-4 py-3.5 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm font-medium outline-none focus:ring-2 focus:ring-brand-crimson/30"
                      />
                      <input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        required
                        className="w-full px-4 py-3.5 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm font-medium outline-none focus:ring-2 focus:ring-brand-crimson/30"
                      />
                      <button
                        className="btn-one w-full bg-brand-crimson hover:bg-black text-white py-4 rounded-md font-bold uppercase text-xs tracking-wider transition-colors shadow-md cursor-pointer mt-2"
                        type="submit"
                      >
                        FREE CONSULTING
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Title, Description, Client Satisfaction & Avatars */}
            <div className="lg:col-span-7">
              <div className="getIn__touch-right">
                <div className="getIn__touch-right-title mb-8">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
                    {rightTitle || 'We Serving 30% Of Global 600 Companies'}
                  </h2>
                  {rightDescription && (
                    <p className="text-slate-300 text-base leading-relaxed max-w-xl">{rightDescription}</p>
                  )}
                </div>

                <div className="getIn__touch-right-bottom flex flex-wrap items-center gap-6 lg:gap-8">
                  <div className="getIn__touch-right-bottom-text">
                    <h4 className="text-base sm:text-lg font-extrabold uppercase tracking-wide text-white max-w-[200px]">
                      Client Satisfaction In The Globally
                    </h4>
                  </div>

                  {/* Hand-drawn arrow accent icon matching template */}
                  <img
                    src="/assets/img/icon/getInTouch.png"
                    alt="arrow accent"
                    className="w-16 lg:w-20 hidden sm:block opacity-90 filter invert dark:invert-0"
                  />

                  {/* Overlapping client avatar images */}
                  <div className="getIn__touch-right-bottom-image flex -space-x-3">
                    {avatarsToDisplay.map((avatarUrl, idx) => (
                      <img
                        key={idx}
                        src={avatarUrl}
                        alt={`client avatar ${idx + 1}`}
                        className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-md transition-transform hover:scale-110 hover:z-20"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lower Section: Emergency Phone & Email Help Area beside overlapping form */}
      <div className="container mx-auto px-4 pt-8 lg:pt-10 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Empty space for desktop form card overlap */}
          <div className="lg:col-span-5" />

          {/* Help Info Beside Bottom of Form: Phone (with animated shake) and Email */}
          <div className="lg:col-span-7">
            <div className="help__area flex flex-col sm:flex-row items-start sm:items-center justify-start gap-8 lg:gap-16">
              {/* Emergency Phone Item */}
              <div className="help__area-item flex items-center gap-5">
                <div className="help__area-item-icon w-16 h-16 rounded-full border-2 border-brand-crimson/30 text-brand-crimson flex items-center justify-center shrink-0 transition-colors hover:bg-brand-crimson hover:text-white group">
                  <PhoneCall className="w-7 h-7 stroke-[1.75] icon-animation" />
                </div>
                <div className="help__area-item-info">
                  <span className="text-xs uppercase font-bold text-slate-500 dark:text-slate-400 block mb-1">
                    Emergency Help
                  </span>
                  <h5 className="text-xl font-extrabold text-foreground">
                    <Link href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-brand-crimson transition-colors">
                      {phone}
                    </Link>
                  </h5>
                </div>
              </div>

              {/* Email Drop Us Item */}
              <div className="help__area-item flex items-center gap-5">
                <div className="help__area-item-icon w-16 h-16 rounded-full border-2 border-brand-crimson/30 text-brand-crimson flex items-center justify-center shrink-0 transition-colors hover:bg-brand-crimson hover:text-white group">
                  <Mail className="w-7 h-7 stroke-[1.75]" />
                </div>
                <div className="help__area-item-info">
                  <span className="text-xs uppercase font-bold text-slate-500 dark:text-slate-400 block mb-1">
                    Email Drop Us
                  </span>
                  <h5 className="text-xl font-extrabold text-foreground">
                    <Link href={`mailto:${email}`} className="hover:text-brand-crimson transition-colors">
                      {email}
                    </Link>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

