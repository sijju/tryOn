import React from 'react'
import { UploadArea } from '../UploadArea'
import { Button } from '../../common/Button'
import { Message } from '../../common/Message'
import { useImageUpload } from '../../../hooks/useImageUpload'
import { useTryOnMutation } from '../../../hooks/useTryOnMutation'
import styles from './UploadSection.module.css'

interface UploadSectionProps {
  onResult: (result: any) => void
}

export const UploadSection: React.FC<UploadSectionProps> = ({ onResult }) => {
  const personUpload = useImageUpload()
  const clothingUpload = useImageUpload()
  const { mutate: tryOn, isLoading, error, data, reset } = useTryOnMutation()

  const handleTryOn = () => {
    if (!personUpload.selectedFile || !clothingUpload.selectedFile) {
      return
    }

    tryOn({
      personImage: personUpload.selectedFile,
      clothingImage: clothingUpload.selectedFile,
    })
  }

  // Pass result to parent when data changes
  React.useEffect(() => {
    if (data) {
      onResult(data)
    }
  }, [data, onResult])

  const canTryOn = personUpload.selectedFile && clothingUpload.selectedFile && !isLoading
  const hasErrors = personUpload.error || clothingUpload.error || error

  return (
    <section className={styles.uploadSection}>
      <div className={styles.uploadGrid}>
        <UploadArea
          id="person-image"
          label="Your Photo"
          onFileSelect={personUpload.handleFileSelect}
          selectedFile={personUpload.selectedFile}
          placeholder={{
            icon: "👤",
            text: "Click or drag to upload your photo"
          }}
          disabled={isLoading}
        />
        
        <UploadArea
          id="clothing-image"
          label="Clothing Item"
          onFileSelect={clothingUpload.handleFileSelect}
          selectedFile={clothingUpload.selectedFile}
          placeholder={{
            icon: "👗",
            text: "Click or drag to upload clothing"
          }}
          disabled={isLoading}
        />
      </div>

      {hasErrors && (
        <div className={styles.errorContainer}>
          {personUpload.error && (
            <Message
              type="error"
              message={`Person image: ${personUpload.error}`}
              onDismiss={() => personUpload.handleRemove()}
            />
          )}
          {clothingUpload.error && (
            <Message
              type="error"
              message={`Clothing image: ${clothingUpload.error}`}
              onDismiss={() => clothingUpload.handleRemove()}
            />
          )}
          {error && (
            <Message
              type="error"
              message={error}
              onDismiss={reset}
            />
          )}
        </div>
      )}

      <div className={styles.actionContainer}>
        <Button
          variant="primary"
          size="large"
          onClick={handleTryOn}
          disabled={!canTryOn}
          loading={isLoading}
          className={styles.tryOnButton}
        >
          {isLoading ? 'Generating...' : 'Try On'}
        </Button>
        
        {(personUpload.selectedFile || clothingUpload.selectedFile) && (
          <Button
            variant="outline"
            size="medium"
            onClick={() => {
              personUpload.handleRemove()
              clothingUpload.handleRemove()
              reset()
            }}
            disabled={isLoading}
          >
            Clear All
          </Button>
        )}
      </div>
    </section>
  )
}
