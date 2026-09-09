'use client'

import React, { useState } from 'react'
import * as LucideIcons from 'lucide-react'

export interface FAQItem {
  question: string
  answer: string
}

interface ServiceFaqAccordionProps {
  items?: FAQItem[]
}

const defaultFaqs: FAQItem[] = [
  {
    question: 'How do you structure legal fees for this practice area?',
    answer:
      'We provide transparent fee models tailored to the matter, including agreed fixed fees for discrete transactional tasks, staged retainers for ongoing counsel, or transparent hourly rates with detailed cost tracking.',
  },
  {
    question: 'Who will oversee and handle my matter?',
    answer:
      'Every client is assigned a dedicated senior solicitor with sector-specific expertise who acts as your primary point of contact, supported by our experienced London legal team to ensure complete continuity.',
  },
  {
    question: 'What is the typical timeline for resolution or completion?',
    answer:
      'Timelines vary according to whether your matter involves proactive commercial structuring, regulatory filings, or contentious dispute resolution. During our initial consultation, we provide an estimated timeline and key milestone schedule.',
  },
  {
    question: 'How do we initiate an initial consultation?',
    answer:
      'You can schedule a consultation directly via our contact page or call our London office. Our team conducts an immediate conflict check and arranges a confidential assessment within 24 hours.',
  },
]

export const ServiceFaqAccordion: React.FC<ServiceFaqAccordionProps> = ({ items = defaultFaqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(1) // default 2nd open like template (collapseTwo show)

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  return (
    <div className="faq__area space-y-4 mt-6">
      {items.map((faq, idx) => {
        const isOpen = openIndex === idx
        return (
          <div
            key={idx}
            className="faq__area-item border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden transition-all bg-white dark:bg-brand-charcoal"
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full text-left py-4 px-6 flex items-center justify-between gap-4 font-heading text-base md:text-lg font-bold text-brand-charcoal dark:text-brand-white hover:text-brand-crimson dark:hover:text-brand-crimson transition-colors cursor-pointer"
              aria-expanded={isOpen}
            >
              <span>{faq.question}</span>
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                  isOpen
                    ? 'bg-brand-crimson text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                }`}
              >
                {isOpen ? (
                  <LucideIcons.Minus className="w-4 h-4 stroke-[2.5]" />
                ) : (
                  <LucideIcons.Plus className="w-4 h-4 stroke-[2.5]" />
                )}
              </span>
            </button>
            {isOpen && (
              <div className="px-6 pb-5 pt-1 border-t border-gray-100 dark:border-gray-800/60 text-brand-slate dark:text-gray-300 font-body text-sm md:text-base leading-relaxed animate-fadeIn">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
