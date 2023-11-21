// src/index.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import LanguageProvider from './lang/LangProvider'
import ThemeProvider from './store/ThemeProvider'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	
	<React.StrictMode>
		<ThemeProvider>
			<LanguageProvider>
				<App />
			</LanguageProvider>
		</ThemeProvider>
	</React.StrictMode>
)

reportWebVitals()
