import { useState } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Layout, UploadSection, ResultDisplay } from './components'
import { queryClient } from './services/queryClient'
import type { TryOnResponse } from './services/types'

function App() {
  const [result, setResult] = useState<TryOnResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleResult = (newResult: TryOnResponse) => {
    setResult(newResult)
    setError(null)
  }

  const handleReset = () => {
    setResult(null)
    setError(null)
    setIsLoading(false)
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        {!result ? (
          <UploadSection onResult={handleResult} />
        ) : (
          <ResultDisplay
            result={result}
            isLoading={isLoading}
            error={error}
            onReset={handleReset}
          />
        )}
      </Layout>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
