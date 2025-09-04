import React from 'react'
import styles from './Header.module.css'

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>
            <span className={styles.titleIcon}>✨</span>
            Virtual Try-On
          </h1>
          <p className={styles.subtitle}>
            Experience fashion with AI-powered virtual try-on technology
          </p>
        </div>
        
        <div className={styles.features}>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>🤖</span>
            <span className={styles.featureText}>AI-Powered</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>⚡</span>
            <span className={styles.featureText}>Instant Results</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>📱</span>
            <span className={styles.featureText}>Mobile Friendly</span>
          </div>
        </div>
      </div>
    </header>
  )
}
