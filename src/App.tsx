import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import AppRoutes from './navigation/AppRoutes'
import Providers from './navigation/Providers'
function App() {
	return (
		<Router>
			<Providers/>
		</Router>
	)
}

export default App
