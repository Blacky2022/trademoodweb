import React, { useState } from 'react'
import './ProfileView.css'
import { Paper, Switch, FormControlLabel, Typography } from '@mui/material'
import { theme } from '../../styles/colors'
import UserInfo from './UserInfo/UserInfo'
import { auth } from '../../config/firebase-config'
import EditEmail from './edit-email/EditEmail'
import EditPersonalInfo from './edit-personal-info/EditPersonalInfo'
import EditPassword from './edit-password/EditPassword'
import ProfileImagePicker from './ProfileImageUploader/ProfileImagePicker'

const ProfileView: React.FC = () => {
	const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true)
	const [isPolish, setIsPolish] = useState<boolean>(true)
	const [imageUrl, setImageUrl] = useState<string | null>(null)
	const userUID = auth.currentUser?.uid

	return (
		<div className='profile-container'>
			
			{/* Profile Image Picker Section */}
			<div className='profile-image-section'>
				<ProfileImagePicker
					imageUrl={imageUrl}
					// @ts-ignore
					setImageUrl={setImageUrl}
				/>
				{/* Instruction Text that appears on hover */}
				<Typography variant="body2" className="update-instruction">
					Click to update profile picture
				</Typography>
			</div>
			<div className='paper-container'>
				<Paper className='profile-section' elevation={3}>
					<UserInfo userUID={userUID} />
				</Paper>

				<Paper className='profile-section' elevation={3}>
					<EditEmail />
					<div className='form-divider'></div>
					<EditPassword />
					<div className='form-divider'></div>
					<EditPersonalInfo />
				</Paper>

				<Paper className='profile-section' elevation={3}>
					<h2>App Settings</h2>
					<FormControlLabel
						control={<Switch checked={isDarkTheme} onChange={() => setIsDarkTheme(!isDarkTheme)} />}
						label='Dark Theme'
					/>
					<FormControlLabel
						control={<Switch checked={isPolish} onChange={() => setIsPolish(!isPolish)} />}
						label='POLISH'
					/>
				</Paper>
			</div>
		</div>
	)
}

export default ProfileView
