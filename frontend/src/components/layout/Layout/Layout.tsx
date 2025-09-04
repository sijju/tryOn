import React from 'react'
import { Header } from '../Header'
import styles from './Layout.module.css'

interface LayoutProps {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          {children}
        </div>
      </main>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p className={styles.footerText}>
            Powered by Google Gemini 2.5 Flash • Built with React & Rust
          </p>
        </div>
      </footer>
    </div>
  )
}
