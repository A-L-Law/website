import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  variant?: 'light' | 'dark' | 'auto'
}

export const Logo: React.FC<Props> = (props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className, variant = 'auto' } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  if (variant === 'light') {
    return (
      /* eslint-disable @next/next/no-img-element */
      <img
        alt="A L Law Logo"
        width={193}
        height={57}
        loading={loading}
        fetchPriority={priority}
        decoding="async"
        className={clsx('h-[34px] sm:h-[38px] w-auto max-w-[193px]', className)}
        src="/logo.svg"
      />
    )
  }

  if (variant === 'dark') {
    return (
      /* eslint-disable @next/next/no-img-element */
      <img
        alt="A L Law Logo"
        width={193}
        height={57}
        loading={loading}
        fetchPriority={priority}
        decoding="async"
        className={clsx('h-[34px] sm:h-[38px] w-auto max-w-[193px]', className)}
        src="/logo-dark.svg"
      />
    )
  }

  return (
    /* eslint-disable @next/next/no-img-element */
    <>
      <img
        alt="A L Law Logo"
        width={193}
        height={57}
        loading={loading}
        fetchPriority={priority}
        decoding="async"
        className={clsx('h-[34px] sm:h-[38px] w-auto max-w-[193px] dark:hidden block logo-light', className)}
        src="/logo.svg"
      />
      <img
        alt="A L Law Logo"
        width={193}
        height={57}
        loading={loading}
        fetchPriority={priority}
        decoding="async"
        className={clsx('h-[34px] sm:h-[38px] w-auto max-w-[193px] dark:block hidden logo-dark', className)}
        src="/logo-dark.svg"
      />
    </>
  )
}

export default Logo

