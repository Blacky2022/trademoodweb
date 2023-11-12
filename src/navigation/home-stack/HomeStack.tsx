import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ProfileView from '../../views/Profile/ProfileView'
import DashboardView from '../../views/Dashboard/DashboardView'
import CommunityView from '../../views/Community/CommunityView'
import TrendsView from '../../views/Trends/TrendsView'
import MainLayout from '../../components/Mainlayout/MainLayout'
import { NotFoundView } from '../../views/NotFound/NotFoundView'
import About from '../../views/About/About'
import { Navigate } from 'react-router-dom'

const HomeStack = () => {
	return (
		<MainLayout>
			<Routes>
				<Route path='/profile' element={<ProfileView />} />
				<Route path='/dashboard' element={<DashboardView />} />
				<Route path='/community' element={<CommunityView />} />
				<Route path='/' element={<Navigate to='/dashboard' replace />} />
				<Route path='/trends' element={<TrendsView />} />
				<Route path='/about' element={<About />} />
				<Route path='*' element={<NotFoundView />} />
			</Routes>
		</MainLayout>
	)
}

export default HomeStack
