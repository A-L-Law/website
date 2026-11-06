'use client'

import type { UploadField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form'

import { Label } from '@/components/ui/label'
import React, { useRef, useState, useCallback } from 'react'

import { Error } from '../Error'
import { Width } from '../Width'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx']
const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

export const Upload: React.FC<
  UploadField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
    setValue?: UseFormSetValue<FieldValues>
    required?: boolean
  }
> = ({ name, errors, label, register, setValue, required, width }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  React.useEffect(() => {
    if (register) {
      register(name, { required: required ? true : false })
    }
  }, [register, name, required])

  const validateAndSetFile = useCallback(
    (file: File | null) => {
      setFileError(null)

      if (!file) {
        setSelectedFile(null)
        if (setValue) setValue(name, null, { shouldValidate: true })
        return
      }

      // Check size
      if (file.size > MAX_FILE_SIZE) {
        setFileError('File exceeds 10MB limit. Please upload a smaller document in PDF, DOC, or DOCX format.')
        setSelectedFile(null)
        if (setValue) setValue(name, null, { shouldValidate: true })
        return
      }

      // Check extension
      const fileNameLower = file.name.toLowerCase()
      const hasValidExt = ALLOWED_EXTENSIONS.some((ext) => fileNameLower.endsWith(ext))
      const hasValidMime = ALLOWED_MIME_TYPES.includes(file.type) || file.type === ''

      if (!hasValidExt && !hasValidMime) {
        setFileError('Unsupported file format. Please upload a .pdf, .doc, or .docx document.')
        setSelectedFile(null)
        if (setValue) setValue(name, null, { shouldValidate: true })
        return
      }

      setSelectedFile(file)
      if (setValue) {
        setValue(name, file, { shouldValidate: true })
      }
    },
    [name, setValue],
  )

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    validateAndSetFile(file)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0] || null
    validateAndSetFile(file)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation()
    validateAndSetFile(null)
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`
    }
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
  }

  const getFileIcon = (fileName: string): string => {
    const lower = fileName.toLowerCase()
    if (lower.endsWith('.pdf')) return 'fal fa-file-pdf'
    if (lower.endsWith('.doc') || lower.endsWith('.docx')) return 'fal fa-file-word'
    return 'fal fa-file-alt'
  }

  return (
    <Width width={width} className="w-full">
      <Label htmlFor={name} className="block mb-2 font-medium text-brand-charcoal dark:text-white">
        {label || 'Upload Supporting Document'}
        {required && (
          <span className="text-brand-crimson ml-1">
            * <span className="sr-only">(required)</span>
          </span>
        )}
      </Label>

      {/* Hidden file input */}
      <input
        ref={inputRef}
        id={name}
        type="file"
        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Dropzone Container */}
      {!selectedFile ? (
        <div
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors bg-gray-50/50 dark:bg-background ${
            isDragging
              ? 'border-brand-crimson bg-brand-crimson/5 dark:bg-brand-crimson/10'
              : 'border-gray-300 dark:border-gray-700 hover:border-brand-crimson dark:hover:border-brand-crimson'
          }`}
        >
          <div className="flex flex-col items-center justify-center gap-2">
            <span className="fal fa-cloud-upload text-brand-crimson text-3xl mb-1" aria-hidden="true"></span>
            <span className="text-sm font-semibold text-brand-charcoal dark:text-white">
              Upload Supporting Document
            </span>
            <span className="text-xs text-brand-slate dark:text-gray-400">
              Drag and drop your file here, or click to browse
            </span>
            <span className="text-xs text-brand-slate/80 dark:text-gray-500 mt-1">
              Allowed formats: PDF, DOC, DOCX up to 10MB
            </span>
          </div>
        </div>
      ) : (
        /* Selected File Chip */
        <div className="flex items-center justify-between p-3.5 bg-white dark:bg-background border border-gray-200 dark:border-gray-800 rounded-lg shadow-2xs">
          <div className="flex items-center gap-3 min-w-0 pr-3">
            <span className={`${getFileIcon(selectedFile.name)} text-brand-crimson text-2xl shrink-0`} aria-hidden="true"></span>
            <div className="min-w-0">
              <p className="text-sm font-medium text-brand-charcoal dark:text-white truncate">
                {selectedFile.name}
              </p>
              <p className="text-xs text-brand-slate dark:text-gray-400">
                {formatFileSize(selectedFile.size)}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={removeFile}
            aria-label="Remove uploaded file"
            className="text-gray-400 hover:text-red-500 p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shrink-0 cursor-pointer"
          >
            <i className="fal fa-times text-base" aria-hidden="true"></i>
          </button>
        </div>
      )}

      {/* Validation Errors */}
      {fileError && (
        <p className="text-xs text-red-600 dark:text-red-400 mt-2 flex items-center gap-1.5">
          <i className="fal fa-exclamation-circle" aria-hidden="true"></i>
          {fileError}
        </p>
      )}

      {errors[name] && !fileError && (
        <p className="text-xs text-red-600 dark:text-red-400 mt-2 flex items-center gap-1.5">
          <i className="fal fa-exclamation-circle" aria-hidden="true"></i>
          {label || 'This field'} is required.
        </p>
      )}
    </Width>
  )
}
export default Upload
