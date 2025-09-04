import React from 'react'
import type { ButtonProps } from '../../../services/types'
import styles from './Button.module.css'

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  onClick,
  children,
  className = '',
  type = 'button',
}) => {
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
    disabled && styles.disabled,
    loading && styles.loading,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading && <span className={styles.spinner} />}
      <span className={loading ? styles.loadingText : ''}>{children}</span>
    </button>
  )
}
