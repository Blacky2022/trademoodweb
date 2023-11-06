import { createContext, useContext } from 'react'

export interface ThemeContextType {
	PRIMARY: string
	SECONDARY: string
	TERTIARY: string
	QUATERNARY: string
	BACKGROUND: string
	HINT: string
	LIGHT_HINT: string
	NEGATIVE: string
	POSITIVE: string
    toggleTheme?: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType)

export const useTheme = (): any => {
	const context = useContext(ThemeContext)
	if (!context) {
		throw new Error('useTheme must be used within a ThemeProvider')
	}
	return context
}
