import { HashRouter } from 'react-router-dom'
import { Bounce, ToastContainer } from 'react-toastify'
import MouseTracker from './components/MouseTracking'
import { TooltipProvider } from './components/ui/tooltip'
import { Router } from './routes/router'
import { ThemeProvider } from './theme/theme-provider'

function App() {
	return (
		<ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
			<MouseTracker />
			<ToastContainer />
			<TooltipProvider>
				<HashRouter>
					<Router />
				</HashRouter>
			</TooltipProvider>

			<ToastContainer
				position='bottom-right'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick={false}
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='colored'
				transition={Bounce}
				className={'text-sm'}
			/>
		</ThemeProvider>
	)
}

export default App
