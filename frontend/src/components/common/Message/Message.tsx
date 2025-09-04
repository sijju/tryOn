import React, { useEffect } from 'react'
import type { MessageProps } from '../../../services/types'
import styles from './Message.module.css'

export const Message: React.FC<MessageProps> = ({
  type,
  message,
  onDismiss,
  autoDismiss = false,
  duration = 5000,
  className = '',
}) => {
  useEffect(() => {
    if (autoDismiss && onDismiss) {
      const timer = setTimeout(() => {
        onDismiss()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [autoDismiss, onDismiss, duration])

  const messageClasses = [
    styles.message,
    styles[type],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅'
      case 'error':
        return '❌'
      case 'warning':
        return '⚠️'
      case 'info':
        return 'ℹ️'
      default:
        return ''
    }
  }

  return (
    <div className={messageClasses}>
      <div className={styles.content}>
        <span className={styles.icon}>{getIcon()}</span>
        <span className={styles.text}>{message}</span>
      </div>
      {onDismiss && (
        <button
          className={styles.dismissButton}
          onClick={onDismiss}
          aria-label="Dismiss message"
        >
          ×
        </button>
      )}
    </div>
  )
}
