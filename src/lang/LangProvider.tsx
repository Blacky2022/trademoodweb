import React, { useState, useEffect, PropsWithChildren, createContext, ReactNode } from 'react'
import { IntlProvider } from 'react-intl'

interface LanguageProviderProps {
	defaultLocale?: string
}
interface LanguageContextType {
	language: string
	setLanguage: (language: string) => void
}

export const LanguageContext = createContext<LanguageContextType>({
	language: 'en', 
	setLanguage: () => {}, 
})

interface LanguageProviderProps {
	children: ReactNode
}

 const LanguageProvider: React.FC<PropsWithChildren<LanguageProviderProps>> = ({ children, defaultLocale = 'en' }) => {
	const [locale, setLocale] = useState(defaultLocale);
	const [messages, setMessages] = useState({});
  
	useEffect(() => {
	  import(`./dictonaries/${locale}.json`)
		.then((messages) => {
		  setMessages(messages.default);
		})
		.catch((error) => {
		  console.error(`Could not load ${locale} messages`, error);
		  setLocale(defaultLocale);
		});
	}, [locale, defaultLocale]);

	const value = {
	  language: locale,
	  setLanguage: setLocale
	};
  
	return (
	  <LanguageContext.Provider value={value}>
		<IntlProvider locale={locale} messages={messages}>
		  {children}
		</IntlProvider>
	  </LanguageContext.Provider>
	);
  };
  export default LanguageProvider