import { useState, useCallback } from 'react'
import type { UseImageUploadResult, ImageValidationOptions } from '../services/types'

const DEFAULT_VALIDATION_OPTIONS: ImageValidationOptions = {
  maxSize: 10 * 1024 * 1024, // 10MB
  allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  maxWidth: 4096,
  maxHeight: 4096,
}

export const useImageUpload = (
  validationOptions: ImageValidationOptions = DEFAULT_VALIDATION_OPTIONS
): UseImageUploadResult => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const isValidFile = useCallback((file: File): boolean => {
    const options = { ...DEFAULT_VALIDATION_OPTIONS, ...validationOptions }
    
    // Check file type
    if (options.allowedTypes && !options.allowedTypes.includes(file.type)) {
      setError(`Invalid file type. Allowed types: ${options.allowedTypes.join(', ')}`)
      return false
    }

    // Check file size
    if (options.maxSize && file.size > options.maxSize) {
      const maxSizeMB = options.maxSize / (1024 * 1024)
      setError(`File size too large. Maximum size: ${maxSizeMB}MB`)
      return false
    }

    return true
  }, [validationOptions])

  const handleFileSelect = useCallback((file: File | null) => {
    setError(null)
    
    if (!file) {
      setSelectedFile(null)
      setPreviewUrl(null)
      return
    }

    if (!isValidFile(file)) {
      return
    }

    setSelectedFile(file)
    
    // Create preview URL
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
  }, [isValidFile])

  const handleRemove = useCallback(() => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }
    setSelectedFile(null)
    setPreviewUrl(null)
    setError(null)
  }, [previewUrl])

  return {
    selectedFile,
    previewUrl,
    handleFileSelect,
    handleRemove,
    isValidFile,
    error,
  }
}
