import React from 'react'
import Link from 'next/link'
import * as LucideIcons from 'lucide-react'
import type { AboutBlock as AboutBlockProps, User } from '@/payload-types'

export const AboutBlock: React.FC<AboutBlockProps> = ({
  subtitle,
  title,
  description,
  image1,
  image2,
  experienceNumber,
  experienceTitle,
  buttonText,
  buttonLink,
  teamMember,
  founderName,
  founderTitle,
  founderAvatar,
  features,
  secondaryExperienceNumber,
  secondaryExperienceTitle,
}) => {
  const img1Url =
    image1 && typeof image1 === 'object' && 'url' in image1 && image1.url
      ? image1.url
      : '/assets/img/about/about-1.jpg'

  const img2Url =
    image2 && typeof image2 === 'object' && 'url' in image2 && image2.url
      ? image2.url
      : '/assets/img/about/about-2.jpg'

  // Resolve founder name, title, and avatar with fallback
  const resolvedUser = teamMember && typeof teamMember === 'object' ? (teamMember as User) : null
  const name = founderName || resolvedUser?.name || 'Nguyen, Shane'
  const authorRoleTitle = founderTitle || 'Founder CEO'

  let avatarUrl = '/assets/img/avatar/avatar-1.jpg'
  if (
    founderAvatar &&
    typeof founderAvatar === 'object' &&
    'url' in founderAvatar &&
    founderAvatar.url
  ) {
    avatarUrl = founderAvatar.url
  }

  return (
    <div className="about__one dark__image section-padding py-16 lg:py-24 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column - Images & Primary Experience Counter */}
          <div className="lg:col-span-6">
            <div className="about__one-left relative pb-8 sm:pb-0">
              <div className="about__one-left-image flex items-start gap-5">
                <img
                  className="one rounded-xl shadow-lg w-1/2 h-[420px] md:h-[480px] object-cover shrink-0"
                  src={img1Url}
                  alt="about-image-1"
                />
                <img
                  className="two rounded-xl shadow-lg w-1/2 h-[480px] md:h-[570px] object-cover shrink-0"
                  src={img2Url}
                  alt="about-image-2"
                />
              </div>
              {experienceNumber !== undefined && experienceNumber !== null && (
                <div className="about__one-left-experience absolute bottom-0 left-4 sm:left-10 bg-brand-crimson text-white p-7 rounded-xl shadow-2xl w-[200px] sm:w-[244px] h-[190px] sm:h-[225px] flex flex-col justify-center z-10">
                  <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2 leading-none">
                    {experienceNumber}+
                  </h1>
                  <h6 className="text-sm sm:text-base font-semibold text-white/90 leading-tight">
                    {experienceTitle || 'Years Experience Our Company'}
                  </h6>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Subtitle, Title, Description, CTA + Founder, Checkmark List & Second Experience Box */}
          <div className="lg:col-span-6">
            <div className="about__one-right">
              <div className="about__one-right-title mb-8">
                {subtitle && <span className="subtitle-one block mb-3">{subtitle}</span>}
                <h2 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">{title}</h2>
                {description && (
                  <p className="text-muted-foreground text-base leading-relaxed">{description}</p>
                )}
              </div>

              {/* Button & Author/Founder Avatar Container */}
              <div className="about__one-right-btn flex flex-wrap items-center gap-6 mb-8">
                {buttonText && (
                  <div>
                    <Link
                      className="btn-one bg-brand-crimson hover:bg-black text-white px-8 py-4 rounded-md font-extrabold uppercase text-xs tracking-wider inline-flex items-center gap-2 transition-all shadow-md shrink-0 cursor-pointer"
                      href={buttonLink || '/about'}
                    >
                      {buttonText}
                      <LucideIcons.ChevronsRight className="w-4 h-4" />
                    </Link>
                  </div>
                )}
                <div className="about__one-right-btn-author flex items-center gap-4">
                  <div className="about__one-right-btn-author-avatar w-14 h-14 rounded-full overflow-hidden shrink-0 border-2 border-brand-crimson/20">
                    <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
                  </div>
                  <div className="about__one-right-btn-author-name">
                    <span className="text-one block font-bold text-foreground text-base leading-tight">
                      {name}
                    </span>
                    <h6 className="text-xs font-medium text-muted-foreground mt-0.5">
                      {authorRoleTitle}
                    </h6>
                  </div>
                </div>
              </div>

              {/* Bottom Section: Features List & Second Experience Box (Without separator line) */}
              <div className="about__one-right-bottom flex flex-wrap items-center justify-between gap-6 mt-8">
                {features && features.length > 0 && (
                  <div className="about__one-right-bottom-list space-y-3">
                    {features.map((item, idx) => (
                      <span
                        key={idx}
                        className="flex items-center text-sm font-semibold text-foreground"
                      >
                        <LucideIcons.Check className="w-4 h-4 text-brand-crimson border border-brand-crimson/40 rounded-full p-0.5 mr-2.5 shrink-0" />
                        {item.featureText}
                      </span>
                    ))}
                  </div>
                )}
                {secondaryExperienceNumber !== undefined &&
                  secondaryExperienceNumber !== null && (
                    <div className="about__one-right-bottom-experience bg-brand-charcoal text-white w-[140px] h-[130px] rounded-xl flex flex-col justify-center items-center text-center p-4 shadow-lg shrink-0">
                      <h3 className="text-3xl font-bold text-white mb-1">
                        {secondaryExperienceNumber}+
                      </h3>
                      <h6 className="text-xs text-slate-300 font-medium leading-tight">
                        {secondaryExperienceTitle || 'Expert Team members'}
                      </h6>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
