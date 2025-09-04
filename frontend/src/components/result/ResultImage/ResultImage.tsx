import React, { useState } from 'react'
import { Button } from '../../common/Button'
import styles from './ResultImage.module.css'

interface ResultImageProps {
  imageData: string
  alt?: string
  className?: string
}

export const ResultImage: React.FC<ResultImageProps> = ({
  imageData,
  alt = 'Try-on result',
  className = '',
}) => {
  const [isZoomed, setIsZoomed] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleImageLoad = () => {
    setIsLoading(false)
  }

  const handleImageError = () => {
    setIsLoading(false)
  }

  const handleDownload = () => {
    try {
      const link = document.createElement('a')
      link.href = `data:image/png;base64,${imageData}`
      link.download = `virtual-tryon-result-${Date.now()}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Download failed:', error)
    }
  }

  const toggleZoom = () => {
    setIsZoomed(!isZoomed)
  }

  const resultImageClasses = [
    styles.resultImage,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const imageClasses = [
    styles.image,
    isZoomed && styles.zoomed,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={resultImageClasses}>
      <div className={styles.imageContainer}>
        {isLoading && (
          <div className={styles.loadingPlaceholder}>
            <div className={styles.spinner}></div>
            <span className={styles.loadingText}>Loading result...</span>
          </div>
        )}
        
        <img
          src={`data:image/png;base64,${imageData}`}
          alt={alt}
          className={imageClasses}
          onLoad={handleImageLoad}
          onError={handleImageError}
          onClick={toggleZoom}
          style={{ display: isLoading ? 'none' : 'block' }}
        />
        
        {!isLoading && (
          <div className={styles.imageOverlay}>
            <Button
              variant="secondary"
              size="small"
              onClick={toggleZoom}
              className={styles.zoomButton}
            >
              {isZoomed ? '🔍-' : '🔍+'}
            </Button>
          </div>
        )}
      </div>
      
      {!isLoading && (
        <div className={styles.actions}>
          <Button
            variant="primary"
            size="medium"
            onClick={handleDownload}
            className={styles.downloadButton}
          >
            📥 Download
          </Button>
        </div>
      )}
      
      {isZoomed && (
        <div className={styles.zoomOverlay} onClick={toggleZoom}>
          <div className={styles.zoomContainer}>
            <img
              src={`data:image/png;base64,${imageData}`}
              alt={alt}
              className={styles.zoomedImage}
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className={styles.closeZoom}
              onClick={toggleZoom}
              aria-label="Close zoom"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
