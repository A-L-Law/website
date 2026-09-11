'use client'

import React, { useState } from 'react'

export const TeamContactForm: React.FC<{ memberName: string }> = ({ memberName }) => {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="team__single-right-form">
      {submitted ? (
        <div className="p-8 text-center bg-white dark:bg-neutral-900 rounded-lg border border-brand-crimson/30">
          <div className="w-16 h-16 bg-brand-crimson/10 text-brand-crimson rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
            <i className="far fa-check"></i>
          </div>
          <h4 className="text-xl font-bold text-foreground dark:text-white mb-2 font-heading">
            Message Sent Successfully
          </h4>
          <p className="text-muted-foreground text-sm font-body">
            Thank you for reaching out. A message has been directed to {memberName} and our legal team will contact you shortly.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="contact__two-right-form-item">
              <span className="fal fa-user"></span>
              <input type="text" name="name" placeholder="Full Name" required />
            </div>

            <div className="contact__two-right-form-item">
              <span className="far fa-envelope-open"></span>
              <input type="email" name="email" placeholder="Email Address" required />
            </div>

            <div className="contact__two-right-form-item">
              <span className="fal fa-phone-alt"></span>
              <input type="text" name="number" placeholder="Phone Number" />
            </div>

            <div className="team__single-right-form-select">
              <select name="service" defaultValue="General Legal Advice">
                <option value="General Legal Advice">Select Practice Area</option>
                <option value="Corporate & Commercial">Corporate & Commercial Law</option>
                <option value="Commercial Litigation">Commercial Litigation & Dispute Resolution</option>
                <option value="Employment Law">Employment Law</option>
                <option value="Real Estate & Property">Real Estate & Property Law</option>
                <option value="Private Client & Family">Private Client & Family</option>
                <option value="Banking & Finance">Banking & Finance</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <div className="contact__two-right-form-item">
              <span className="far fa-comments textarea-icon"></span>
              <textarea name="message" placeholder="Message / Details of your legal enquiry" rows={4} required></textarea>
            </div>
          </div>

          <div>
            <button className="btn-one" type="submit">
              Submit Message
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
