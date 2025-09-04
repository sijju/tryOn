import React, { useState } from 'react'
import type { ImagePreviewProps } from '../../../services/types'
import styles from './ImagePreview.module.css'

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  file,
  onRemove,
  className = '',
}) => {
  const [imageUrl] = useState<string>(() => URL.createObjectURL(file))
  const [isLoading, setIsLoading] = useState(true)

  const handleImageLoad = () => {
    setIsLoading(false)
  }

  const handleImageError = () => {
    setIsLoading(false)
  }

  const handleRemove = (event: React.MouseEvent) => {
    event.stopPropagation()
    URL.revokeObjectURL(imageUrl)
    onRemove()
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const previewClasses = [
    styles.imagePreview,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={previewClasses}>
      <div className={styles.imageContainer}>
        {isLoading && (
          <div className={styles.loadingPlaceholder}>
            <div className={styles.spinner}></div>
          </div>
        )}
        <img
          src={imageUrl}
          alt="Preview"
          className={styles.image}
          onLoad={handleImageLoad}
          onError={handleImageError}
          style={{ display: isLoading ? 'none' : 'block' }}
        />
        <button
          className={styles.removeButton}
          onClick={handleRemove}
          aria-label="Remove image"
          type="button"
        >
          ×
        </button>
      </div>
      <div className={styles.fileInfo}>
        <span className={styles.fileName}>{file.name}</span>
        <span className={styles.fileSize}>{formatFileSize(file.size)}</span>
      </div>
    </div>
  )
}
