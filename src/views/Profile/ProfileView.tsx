import React from 'react'
import { Paper, Box, Grid, Divider } from '@mui/material'
import UserInfo from './UserInfo/UserInfo'
import { auth } from '../../config/firebase-config'
import EditEmail from './edit-email/EditEmail'
import EditPersonalInfo from './edit-personal-info/EditPersonalInfo'
import EditPassword from './edit-password/EditPassword'
import { useTheme } from '../../store/themeContext'
import UserAboutAndPosts from './UserAboutUsAndPosts/UserAboutAndPosts'

const ProfileView: React.FC = () => {
	const userUID = auth.currentUser?.uid
	const theme = useTheme()

	return (
		<Box sx={{ maxWidth: '1400px', margin: 'auto', backgroundColor: theme.BACKGROUND, p: 3 }}>
			<Grid container spacing={3}>
				<Grid item xs={12} md={4}>
					<Paper
						elevation={3}
						sx={{
							padding: 2,
							minHeight: '300px',
							backgroundColor: theme.BACKGROUND,
							border: `2px solid ${theme.TERTIARY}`,
						}}>
						<UserInfo userUID={userUID} />
					</Paper>
				</Grid>

				<Grid item xs={12} md={4}>
					<Paper
						elevation={3}
						sx={{
							padding: 2,
							minHeight: '300px',
							backgroundColor: theme.BACKGROUND,
							border: `2px solid ${theme.TERTIARY}`,
						}}>
						<UserAboutAndPosts />
					</Paper>
				</Grid>

				<Grid item xs={12} md={4}>
					<Paper
						elevation={3}
						sx={{
							padding: 2,
							minHeight: '300px',
							backgroundColor: theme.BACKGROUND,
							border: `2px solid ${theme.TERTIARY}`,
						}}>
						<EditEmail />
						<Divider sx={{ my: 2 }} />
						<EditPassword />
						<Divider sx={{ my: 2 }} />
						<EditPersonalInfo />
					</Paper>
				</Grid>
			</Grid>
		</Box>
	)
}

export default ProfileView
