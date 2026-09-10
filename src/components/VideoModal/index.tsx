'use client'

import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import * as LucideIcons from 'lucide-react'

interface VideoModalProps {
  videoUrl?: string | null
}

export const VideoModal: React.FC<VideoModalProps> = ({ videoUrl }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!videoUrl) return null

  // Extract YouTube/Vimeo embed URL
  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/)
      const videoId = match ? match[1] : ''
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`
    }
    if (url.includes('vimeo.com')) {
      const match = url.match(/vimeo\.com\/(?:video\/)?([0-9]+)/)
      const videoId = match ? match[1] : ''
      return `https://player.vimeo.com/video/${videoId}?autoplay=1`
    }
    return url
  }

  const modalContent = isOpen ? (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 sm:p-6"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="relative w-full max-w-4xl bg-black rounded-2xl shadow-2xl aspect-video border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button outside top right corner of the video player modal */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute -top-10 -right-2 sm:-top-12 sm:-right-6 text-white/90 hover:text-brand-crimson p-2 transition-colors cursor-pointer flex items-center justify-center"
          aria-label="Close video"
        >
          <LucideIcons.X className="w-8 h-8 sm:w-10 sm:h-10 stroke-[2.5]" />
        </button>
        <iframe
          src={getEmbedUrl(videoUrl)}
          className="w-full h-full rounded-2xl border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  ) : null

  return (
    <>
      <div
        className="banner__one-content-video-icon inline-block ml-4 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <span className="flex items-center justify-center w-14 h-14 rounded-full bg-white text-brand-crimson hover:scale-110 transition-transform shadow-xl">
          <LucideIcons.Play className="w-5 h-5 fill-brand-crimson text-brand-crimson ml-0.5" />
        </span>
      </div>

      {mounted && modalContent && createPortal(modalContent, document.body)}
    </>
  )
}


