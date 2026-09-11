'use client'

import React, { useEffect, useState, useRef } from 'react'

export interface SkillItem {
  label: string
  percentage: number
}

export const SkillBars: React.FC<{ skills: SkillItem[] }> = ({ skills }) => {
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.15 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [])

  return (
    <div ref={containerRef} className="skill__area space-y-6">
      {skills.map((skill, idx) => (
        <div key={idx} className="skill__area-item">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-base text-foreground dark:text-white">{skill.label}</span>
            <span className="text-sm font-bold text-brand-crimson">{skill.percentage}%</span>
          </div>
          <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-2.5 rounded-full overflow-hidden relative">
            <div
              className="bg-brand-crimson h-full rounded-full transition-all duration-1000 ease-out"
              style={{
                width: isVisible ? `${skill.percentage}%` : '0%',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
