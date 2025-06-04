import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/base.css'
import './styles/global.css'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			enabled: false,
			staleTime: 5000,
			refetchOnWindowFocus: false,
			retry: false,
			gcTime: 10 * 60 * 1000, // 10 minutos
		},
	},
})

// biome-ignore lint/style/noNonNullAssertion: <explanation>
ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<App />
		</QueryClientProvider>
	</React.StrictMode>
)
