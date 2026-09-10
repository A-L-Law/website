'use client'

import React, { useState } from 'react'
import type { FAQBlock as FAQBlockProps } from '@/payload-types'

export const FAQBlock: React.FC<FAQBlockProps> = ({ subtitle, title, faqsCol1, faqsCol2 }) => {
  const [openId, setOpenId] = useState<string | null>(null)

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  const col1 = Array.isArray(faqsCol1) && faqsCol1.length > 0
    ? faqsCol1
    : [
        {
          question: 'What types of legal services does A L Law provide?',
          answer: 'We offer full-service commercial litigation, corporate governance, employment law, regulatory compliance, and dispute resolution.',
        },
        {
          question: 'How do I arrange an initial legal consultation?',
          answer: 'You can request a consultation by filling out our online contact form or calling our London office directly.',
        },
      ]

  const col2 = Array.isArray(faqsCol2) && faqsCol2.length > 0
    ? faqsCol2
    : [
        {
          question: 'Are client conversations strictly confidential?',
          answer: 'Yes, all communications are subject to professional legal privilege and strict solicitor confidentiality rules.',
        },
        {
          question: 'How are legal fees and fee structures calculated?',
          answer: 'We provide transparent fixed-fee or hourly rate structures tailored to the scope and complexity of your matter.',
        },
      ]

  return (
    <div className="faq__area section-padding py-16">
      <div className="container mx-auto px-4">
        <div className="row mb-12 text-center">
          <div className="col-xl-12">
            <div className="faq__area-title">
              {subtitle && (
                <span className="subtitle-one text-brand-crimson uppercase tracking-wider font-semibold text-sm mb-2 block">
                  {subtitle}
                </span>
              )}
              <h2 className="text-3xl md:text-4xl font-bold">{title || 'Answers to Your Legal Enquiries'}</h2>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            {col1.map((item, idx) => {
              const id = `col1-${idx}`
              const isOpen = openId === id
              return (
                <div key={id} className="faq__area-item bg-card border border-border rounded-lg overflow-hidden shadow-sm">
                  <button
                    type="button"
                    onClick={() => toggleAccordion(id)}
                    className="w-full p-4 text-left font-bold flex justify-between items-center hover:text-brand-crimson transition-colors"
                  >
                    <span>{item.question}</span>
                    <i className={`far fa-chevron-${isOpen ? 'up' : 'down'} text-xs text-brand-crimson`}></i>
                  </button>
                  {isOpen && (
                    <div className="p-4 pt-0 text-sm text-muted-foreground border-t border-border/50">
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
          <div className="space-y-4">
            {col2.map((item, idx) => {
              const id = `col2-${idx}`
              const isOpen = openId === id
              return (
                <div key={id} className="faq__area-item bg-card border border-border rounded-lg overflow-hidden shadow-sm">
                  <button
                    type="button"
                    onClick={() => toggleAccordion(id)}
                    className="w-full p-4 text-left font-bold flex justify-between items-center hover:text-brand-crimson transition-colors"
                  >
                    <span>{item.question}</span>
                    <i className={`far fa-chevron-${isOpen ? 'up' : 'down'} text-xs text-brand-crimson`}></i>
                  </button>
                  {isOpen && (
                    <div className="p-4 pt-0 text-sm text-muted-foreground border-t border-border/50">
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
