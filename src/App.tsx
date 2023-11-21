import React, { useEffect } from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import Providers from './navigation/Providers'
import './index.css'
import { useTheme } from './store/themeContext';
function App() {
	const theme = useTheme();

  useEffect(() => {
 
    document.documentElement.style.setProperty('--background-color', theme.BACKGROUND);
  }, [theme.BACKGROUND]);
	return (
		<Router>
			<Providers/>
		</Router>
	)
}

export default App
