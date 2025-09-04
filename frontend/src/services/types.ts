// API Response Types
export interface TryOnResponse {
  success: boolean
  result_image?: string
  message: string
}

export interface ApiError {
  message: string
  status?: number
  code?: string
}

// Component Props Types
export interface UploadAreaProps {
  id: string
  label: string
  accept?: string
  onFileSelect: (file: File | null) => void
  selectedFile: File | null
  placeholder: {
    icon: string
    text: string
  }
  disabled?: boolean
}

export interface ImagePreviewProps {
  file: File
  onRemove: () => void
  className?: string
}

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
  children: React.ReactNode
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

export interface LoaderProps {
  size?: 'small' | 'medium' | 'large'
  color?: 'primary' | 'secondary' | 'white'
  className?: string
}

export interface MessageProps {
  type: 'success' | 'error' | 'info' | 'warning'
  message: string
  onDismiss?: () => void
  autoDismiss?: boolean
  duration?: number
  className?: string
}

export interface ResultDisplayProps {
  result: TryOnResponse | null
  isLoading: boolean
  error: string | null
  onReset: () => void
}

// Hook Types
export interface UseTryOnMutationResult {
  mutate: (data: { personImage: File; clothingImage: File }) => void
  isLoading: boolean
  error: string | null
  data: TryOnResponse | null
  reset: () => void
}

export interface UseImageUploadResult {
  selectedFile: File | null
  previewUrl: string | null
  handleFileSelect: (file: File | null) => void
  handleRemove: () => void
  isValidFile: (file: File) => boolean
  error: string | null
}

// Utility Types
export interface ImageValidationOptions {
  maxSize?: number // in bytes
  allowedTypes?: string[]
  maxWidth?: number
  maxHeight?: number
}

export interface CacheOptions {
  key: string
  ttl?: number // time to live in milliseconds
}
