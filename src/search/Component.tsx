'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState, useEffect, useRef } from 'react'
import { useDebounce } from '@/utilities/useDebounce'
import { useRouter } from 'next/navigation'
import { Search as SearchIcon, X } from 'lucide-react'

export const Search: React.FC<{ initialQuery?: string }> = ({ initialQuery = '' }) => {
  const [value, setValue] = useState(initialQuery)
  const router = useRouter()
  const debouncedValue = useDebounce(value)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    router.push(`/search${debouncedValue ? `?q=${encodeURIComponent(debouncedValue)}` : ''}`)
  }, [debouncedValue, router])

  return (
    <div className="w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          router.push(`/search${value ? `?q=${encodeURIComponent(value)}` : ''}`)
        }}
        className="relative flex items-center"
      >
        <Label htmlFor="search" className="sr-only">
          Search
        </Label>
        <div className="absolute left-4 text-brand-slate dark:text-gray-400 pointer-events-none">
          <SearchIcon className="w-5 h-5" />
        </div>
        <Input
          id="search"
          value={value}
          onChange={(event) => {
            setValue(event.target.value)
          }}
          placeholder="Search for cases, guides, news, practice areas, events..."
          className="w-full pl-12 pr-12 py-6 text-base rounded-full bg-white dark:bg-background border border-gray-200 dark:border-gray-800 shadow-sm focus-visible:ring-brand-crimson focus-visible:border-brand-crimson transition-all text-brand-charcoal dark:text-white"
        />
        {value && (
          <button
            type="button"
            onClick={() => {
              setValue('')
              router.push('/search')
            }}
            className="absolute right-4 p-1 text-gray-400 hover:text-brand-crimson transition-colors"
            title="Clear search"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </form>
    </div>
  )
}
