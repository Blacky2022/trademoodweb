import React from 'react'
import { AuthProvider } from '../store/AuthProvider'
import AppRoutes from './AppRoutes'
import { InstrumentProvider } from '../store/InstrumentProvider'
import FollowingContextProvider from '../store/FollowingProvider'
import FavoritesContextProvider from '../store/FavoritesProvider'
import { PostsContextProvider } from '../store/PostsProvider'

export default function Providers() {
	return (
		<AuthProvider>
			<FollowingContextProvider>
				<InstrumentProvider>
        <PostsContextProvider>
            <FavoritesContextProvider>
					<AppRoutes />
          </FavoritesContextProvider>
          </PostsContextProvider>
				</InstrumentProvider>
			</FollowingContextProvider>
		</AuthProvider>
	)
}
