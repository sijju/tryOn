import React from 'react'
import type { ResultDisplayProps } from '../../../services/types'
import { ResultImage } from '../ResultImage'
import { Message } from '../../common/Message'
import { Button } from '../../common/Button'
import { Loader } from '../../common/Loader'
import styles from './ResultDisplay.module.css'

export const ResultDisplay: React.FC<ResultDisplayProps> = ({
  result,
  isLoading,
  error,
  onReset,
}) => {
  if (isLoading) {
    return (
      <section className={styles.resultDisplay}>
        <div className={styles.loadingContainer}>
          <Loader size="large" color="primary" />
          <h3 className={styles.loadingTitle}>Creating Your Virtual Try-On</h3>
          <p className={styles.loadingText}>
            Our AI is working its magic to generate your personalized result...
          </p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className={styles.resultDisplay}>
        <div className={styles.errorContainer}>
          <Message
            type="error"
            message={error}
            onDismiss={onReset}
          />
          <Button
            variant="outline"
            size="medium"
            onClick={onReset}
            className={styles.retryButton}
          >
            Try Again
          </Button>
        </div>
      </section>
    )
  }

  if (!result) {
    return null
  }

  return (
    <section className={styles.resultDisplay}>
      <div className={styles.resultContainer}>
        <div className={styles.resultHeader}>
          <h2 className={styles.resultTitle}>Your Virtual Try-On Result</h2>
          {result.success && (
            <Message
              type="success"
              message={result.message}
              autoDismiss
              duration={3000}
            />
          )}
        </div>

        {result.success && result.result_image ? (
          <div className={styles.resultContent}>
            <ResultImage
              imageData={result.result_image}
              alt="Virtual try-on result"
            />
            <div className={styles.resultActions}>
              <Button
                variant="outline"
                size="medium"
                onClick={onReset}
                className={styles.newTryOnButton}
              >
                Try Another Look
              </Button>
            </div>
          </div>
        ) : (
          <div className={styles.failureContainer}>
            <Message
              type="error"
              message={result.message || 'Failed to generate try-on result'}
              onDismiss={onReset}
            />
            <Button
              variant="primary"
              size="medium"
              onClick={onReset}
              className={styles.retryButton}
            >
              Try Again
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
