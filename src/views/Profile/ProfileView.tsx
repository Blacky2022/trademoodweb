import React from 'react'
import { Paper, Box, Grid, Divider, Typography } from '@mui/material'
import UserInfo from './UserInfo/UserInfo'
import { auth } from '../../config/firebase-config'
import EditEmail from './edit-email/EditEmail'
import EditPersonalInfo from './edit-personal-info/EditPersonalInfo'
import EditPassword from './edit-password/EditPassword'
import { useTheme } from '../../store/themeContext'
import UserAboutAndPosts from './UserAboutUsAndPosts/UserAboutAndPosts'
import { useIntl } from 'react-intl'

const ProfileView: React.FC = () => {
	const userUID = auth.currentUser?.uid
	const theme = useTheme()
	const { formatMessage } = useIntl()
	return (
		<Box sx={{ maxWidth: '1600px', marginTop: '1vh', backgroundColor: theme.BACKGROUND, p: 3 }}>
			<Grid container spacing={4}>
				<Grid item xs={12} md={4}>
					<Paper
						elevation={3}
						sx={{
							padding: 5,
							minHeight: '350px',
							backgroundColor: theme.BACKGROUND,
							border: `2px solid ${theme.TERTIARY}`,
							borderRadius: '16px',
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
							borderRadius: '16px',
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
							borderRadius: '16px',
						}}>
						<Typography variant='h5' sx={{ color: theme.TERTIARY, marginBottom: 5 }}>
							{formatMessage({ id: 'editProfile.title' })}
						</Typography>
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
