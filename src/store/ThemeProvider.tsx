import React, { useState, useMemo, useCallback } from 'react'
import { ThemeContext, ThemeContextType } from './themeContext'
import { ThemeName, theme as availableThemes } from '../styles/colors'

interface ThemeProviderProps {
	children: React.ReactNode
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
	const initialTheme = (localStorage.getItem('appTheme') as ThemeName) || 'dark'

	const [currentTheme, setCurrentTheme] = useState<ThemeName>(initialTheme)

	// Wrapping toggleTheme in useCallback to memoize it
	const toggleTheme = useCallback(() => {
		const newTheme = currentTheme === 'light' ? 'dark' : 'light'
		setCurrentTheme(newTheme)
		localStorage.setItem('appTheme', newTheme)
	}, [currentTheme]) 

	const contextValue = useMemo<ThemeContextType>(() => {
		return {
			...availableThemes[currentTheme],
			toggleTheme, 
		}
	}, [currentTheme, toggleTheme]) 

	return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>
}

export default ThemeProvider
