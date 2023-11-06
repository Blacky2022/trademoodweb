import React, { useState } from 'react'
import './ProfileView.css'
import { Paper, Typography } from '@mui/material'
import UserInfo from './UserInfo/UserInfo'
import { auth } from '../../config/firebase-config'
import EditEmail from './edit-email/EditEmail'
import EditPersonalInfo from './edit-personal-info/EditPersonalInfo'
import EditPassword from './edit-password/EditPassword'
import ProfileImagePicker from './ProfileImageUploader/ProfileImagePicker'
import { FormattedMessage } from 'react-intl'
const ProfileView: React.FC = () => {
	const [imageUrl, setImageUrl] = useState<string | null>(null)
	const userUID = auth.currentUser?.uid

	return (
		<div className='profile-container'>
			<div className='profile-image-section'>
				<ProfileImagePicker
					imageUrl={imageUrl}
					// @ts-ignore
					setImageUrl={setImageUrl}
				/>

				<Typography variant='body2' className='update-instruction'>
					<FormattedMessage id='profile.updatePictureInstruction' defaultMessage='Click to update profile picture' />
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
			</div>
		</div>
	)
}

export default ProfileView
