import axios, { AxiosError } from 'axios'

// API Configuration
const API_BASE_URL = 'http://localhost:3001'

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000, // 60 seconds for image processing
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add any auth headers here if needed in the future
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Handle common errors
    if (error.response?.status === 500) {
      console.error('Server error:', error.response.data)
    }
    return Promise.reject(error)
  }
)

// API Functions
export const tryOnApi = {
  // Health check
  healthCheck: async (): Promise<string> => {
    const response = await apiClient.get('/')
    return response.data
  },

  // Virtual try-on
  tryOn: async (personImage: File, clothingImage: File): Promise<TryOnResponse> => {
    const formData = new FormData()
    formData.append('person_image', personImage)
    formData.append('clothing_image', clothingImage)

    const response = await apiClient.post<TryOnResponse>('/api/try-on', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return response.data
  },
}

// Types
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
