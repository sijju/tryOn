import React, { useRef, useState } from 'react'
import type { UploadAreaProps } from '../../../services/types'
import { ImagePreview } from '../ImagePreview'
import styles from './UploadArea.module.css'

export const UploadArea: React.FC<UploadAreaProps> = ({
  id,
  label,
  accept = 'image/*',
  onFileSelect,
  selectedFile,
  placeholder,
  disabled = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragOver, setIsDragOver] = useState(false)

  const handleClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    onFileSelect(file)
  }

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault()
    if (!disabled) {
      setIsDragOver(true)
    }
  }

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragOver(false)
    
    if (disabled) return

    const files = event.dataTransfer.files
    if (files.length > 0) {
      onFileSelect(files[0])
    }
  }

  const handleRemove = () => {
    onFileSelect(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const uploadAreaClasses = [
    styles.uploadArea,
    isDragOver && styles.dragOver,
    disabled && styles.disabled,
    selectedFile && styles.hasFile,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={styles.uploadGroup}>
      <h3 className={styles.label}>{label}</h3>
      <div
        className={uploadAreaClasses}
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label={`Upload ${label.toLowerCase()}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className={styles.fileInput}
          id={id}
          disabled={disabled}
        />
        
        {selectedFile ? (
          <ImagePreview file={selectedFile} onRemove={handleRemove} />
        ) : (
          <div className={styles.placeholder}>
            <span className={styles.placeholderIcon}>{placeholder.icon}</span>
            <span className={styles.placeholderText}>{placeholder.text}</span>
          </div>
        )}
      </div>
    </div>
  )
}
