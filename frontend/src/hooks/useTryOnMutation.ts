import { useMutation } from '@tanstack/react-query'
import { tryOnApi } from '../services/api'
import type { TryOnResponse, UseTryOnMutationResult } from '../services/types'

interface TryOnMutationData {
  personImage: File
  clothingImage: File
}

export const useTryOnMutation = (): UseTryOnMutationResult => {
  const mutation = useMutation<TryOnResponse, Error, TryOnMutationData>({
    mutationFn: async ({ personImage, clothingImage }) => {
      return await tryOnApi.tryOn(personImage, clothingImage)
    },
    onSuccess: (data) => {
      console.log('Try-on successful:', data)
    },
    onError: (error) => {
      console.error('Try-on failed:', error)
    },
  })

  return {
    mutate: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error?.message || null,
    data: mutation.data || null,
    reset: mutation.reset,
  }
}
