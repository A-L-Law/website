'use client'

import React, { useState } from 'react'
import * as LucideIcons from 'lucide-react'
import type { Media } from '@/payload-types'

export const Subscribe: React.FC<{ addClass?: string; bgMedia?: Media | string | null }> = ({
  addClass = '',
  bgMedia,
}) => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  let bgUrl = '/assets/img/bg/subscribe-bg.jpg'
  if (bgMedia && typeof bgMedia === 'object' && 'url' in bgMedia && bgMedia.url) {
    bgUrl = bgMedia.url
  } else if (typeof bgMedia === 'string') {
    bgUrl = bgMedia
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    console.log('Newsletter subscription submission (Console mode for Phase 3 Resend sync):', email)
    setSubscribed(true)
    setEmail('')
    setTimeout(() => setSubscribed(false), 5000)
  }

  return (
    <div className={`subscribe__area relative z-20 -mb-20 sm:-mb-24 ${addClass}`}>
      <div className="container mx-auto px-4">
        <div
          className="subscribe__area-bg bg-brand-crimson bg-cover bg-center text-white rounded-2xl p-8 lg:p-12 shadow-2xl relative overflow-hidden"
          style={{ backgroundImage: `url(${bgUrl})` }}
        >
          {/* Subtle dark overlay over background image */}
          <div className="absolute inset-0 bg-brand-crimson/90 mix-blend-multiply rounded-2xl" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-5">
              <div className="subscribe__area-left">
                <h2 className="text-3xl font-bold text-white mb-3">Stay Connected</h2>
                <div className="subscribe__area-left-notification flex items-center gap-3">
                  <h6 className="text-xs font-semibold text-white/90 uppercase tracking-widest">
                    Get all notifications
                  </h6>
                  <div className="subscribe__area-left-notification-icon w-9 h-9 rounded-full bg-white/20 text-white flex items-center justify-center animate-bounce">
                    <LucideIcons.Bell className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="subscribe__area-form">
                {subscribed ? (
                  <div className="bg-white/20 text-white p-4 rounded-full font-medium text-center backdrop-blur-sm">
                    Thank you for subscribing! You will receive our latest updates.
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="relative flex flex-col sm:flex-row items-center w-full bg-white rounded-2xl sm:rounded-full p-2 shadow-lg gap-2"
                  >
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email address..."
                      required
                      className="w-full pl-5 pr-4 py-3 bg-transparent text-gray-900 placeholder:text-gray-400 outline-none text-sm font-medium rounded-full"
                    />
                    <button
                      type="submit"
                      className="w-full sm:w-auto bg-brand-crimson hover:bg-black text-white font-bold px-8 py-3.5 rounded-full whitespace-nowrap transition-colors shadow-md cursor-pointer shrink-0"
                    >
                      Subscribe Now
                    </button>
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

export default Subscribe

