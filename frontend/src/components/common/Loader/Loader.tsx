import React from 'react'
import type { LoaderProps } from '../../../services/types'
import styles from './Loader.module.css'

export const Loader: React.FC<LoaderProps> = ({
  size = 'medium',
  color = 'primary',
  className = '',
}) => {
  const loaderClasses = [
    styles.loader,
    styles[size],
    styles[color],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={loaderClasses}>
      <div className={styles.spinner}></div>
    </div>
  )
}
