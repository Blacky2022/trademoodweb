import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useAuth } from '../store/AuthProvider'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../config/firebase-config'
import HomeStack from './home-stack/HomeStack'
import AuthStack from './auth-stack/AuthStack'

function AppRoutes() {
	const { user, setUser } = useAuth()
	const [initializing, setInitializing] = useState(true)
  useEffect(() => {
    console.log('User State Changed:', user);
  }, [user]);
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, currentUser => {
			console.log('Auth State Changed:', currentUser)
			setUser(currentUser)
			if (initializing) {
				setInitializing(false)
			}
		})
		return () => unsubscribe()
	}, [initializing, setUser])

	if (initializing) {
		return <div>Loading...</div>
	}

	return (
		<Routes>
			<Route path='/*' element={user ? <HomeStack /> : <AuthStack />} />
		</Routes>
	)
}

export default AppRoutes
