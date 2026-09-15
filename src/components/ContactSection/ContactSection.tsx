'use client'

import React from 'react'

type ContactSectionProps = {
  description?: string | null
  mapEmbedUrl?: string | null
  // We can render form via payload forms, but for this design we will mimic the contact.jsx
  // Or if form is provided, render the FormComponent. To keep it simple, we use the markup from contact.jsx.
  // The instructions said "The form can be assigned from our forms. This section should follow the exact design from contact.jsx".
  formId?: string | number | null
}

export default function ContactSection({ description, mapEmbedUrl, formId }: ContactSectionProps) {
  return (
    <>
      <div className="contact__page section-padding pb-0 font-body">
        <div className="container mx-auto px-4">
          <div className="row flex flex-wrap -mx-4">
            <div className="col-xl-5 col-lg-5 w-full lg:w-5/12 px-4 order-last lg:order-first">
              <div className="contact__page-form bg-white dark:bg-[#181C22] p-8 md:p-10 rounded-lg shadow-sm border border-gray-100 dark:border-[#2D333B]">
                <h3 className="mb-8 font-heading font-bold text-2xl md:text-3xl text-brand-charcoal dark:text-white">Contact Us</h3>
                <form action="#">	
                  <div className="row flex flex-wrap -mx-2">
                    <div className="col-sm-12 w-full px-2 mb-5"> 
                      <div className="contact__page-form-item contact-item relative">
                        <span className="fal fa-user absolute left-4 top-1/2 -translate-y-1/2 text-brand-crimson"></span>
                        <input type="text" name="name" placeholder="Full Name" required className="w-full bg-gray-50 dark:bg-[#1C2128] border border-gray-200 dark:border-[#2D333B] rounded py-3 pl-10 pr-4 text-brand-charcoal dark:text-white focus:outline-none focus:border-brand-crimson transition-colors" />
                      </div>										
                    </div>
                    <div className="col-sm-12 w-full px-2 mb-5">
                      <div className="contact__page-form-item contact-item relative">
                        <span className="far fa-envelope-open absolute left-4 top-1/2 -translate-y-1/2 text-brand-crimson"></span>
                        <input type="email" name="email" placeholder="Email Address" required className="w-full bg-gray-50 dark:bg-[#1C2128] border border-gray-200 dark:border-[#2D333B] rounded py-3 pl-10 pr-4 text-brand-charcoal dark:text-white focus:outline-none focus:border-brand-crimson transition-colors" />											
                      </div>									
                    </div>
                    <div className="col-sm-12 w-full px-2 mb-8"> 
                      <div className="contact__page-form-item contact-item relative">
                        <span className="far fa-comments absolute left-4 top-4 text-brand-crimson"></span>
                        <textarea name="message" placeholder="Type your comments...." className="w-full bg-gray-50 dark:bg-[#1C2128] border border-gray-200 dark:border-[#2D333B] rounded py-3 pl-10 pr-4 h-32 resize-none text-brand-charcoal dark:text-white focus:outline-none focus:border-brand-crimson transition-colors"></textarea>
                      </div>										
                    </div>
                    <div className="col-lg-12 w-full px-2">										
                      <div className="contact__page-form-item">
                        <button className="btn-one bg-brand-crimson hover:bg-brand-crimson/90 text-white font-semibold py-3 px-8 rounded flex items-center gap-2 transition-colors w-full justify-center md:justify-start md:w-auto" type="submit">
                          Submit Now<i className="far fa-chevron-double-right"></i>
                        </button>
                      </div>										
                    </div>
                  </div>							
                </form>                        
              </div>
            </div>
            <div className="col-xl-7 col-lg-7 w-full lg:w-7/12 px-4 mb-12 lg:mb-0">
              <div className="contact__page-info lg:pl-12">
                <h2 className="mb-12 font-heading font-bold text-4xl text-brand-charcoal dark:text-white">Get In Touch</h2>
                <div className="prose dark:prose-invert max-w-none prose-p:text-brand-slate prose-p:dark:text-gray-400 prose-p:text-lg">
                  <p>{description || 'Reach out to our team to discover how we can help you with this event or opportunity.'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {mapEmbedUrl && (
        <div className="contact__page-map mt-24">
          <iframe 
            src={mapEmbedUrl} 
            loading="lazy"
            className="w-full h-[450px] border-0"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </>
  )
}
