import React, { useLayoutEffect, useState } from 'react'
import { firestore } from '../../../config/firebase-config'
import { doc, getDoc } from 'firebase/firestore'
import { FormattedMessage, useIntl } from 'react-intl'
import { useTheme } from '../../../store/themeContext'
import { Box, Typography } from '@mui/material'
import ProfileImagePicker from '../ProfileImageUploader/ProfileImagePicker'
import { TextField } from '@mui/material'
import { useAuth } from '../../../store/AuthProvider'

type UserInfoProps = {
	userUID?: string
}

export default function UserInfo({ userUID }: UserInfoProps) {
	const [displayName, setDisplayName] = useState<string | undefined>()
	const [email, setEmail] = useState<string | undefined>()
	const [firstName, setFirstName] = useState<string | undefined>()
	const [lastName, setLastName] = useState<string | undefined>()
	const { formatMessage } = useIntl()
	const [imageUrl, setImageUrl] = useState<string | null>(null)
	const theme = useTheme()
	const [aboutMe, setAboutMe] = useState<string | null>(null)
	const { updateAboutMe } = useAuth()
	useLayoutEffect(() => {
		async function getUserDetails() {
			if (userUID) {
				try {
					const userDocRef = doc(firestore, 'users', userUID)
					const userDocSnap = await getDoc(userDocRef)
					if (userDocSnap.exists()) {
						const userData = userDocSnap.data()
						setDisplayName(userData?.displayName)
						setEmail(userData?.email)
						setAboutMe(userData?.aboutMe)
					} else {
						console.error(formatMessage({ id: 'userInfo.error.userNotFound' }))
					}
				} catch (error) {
					console.error(formatMessage({ id: 'userInfo.error.fetchError' }), error)
				}
			}
		}

		getUserDetails()
	}, [userUID, formatMessage])

	useLayoutEffect(() => {
		if (displayName) {
			const nameParts = displayName.split(' ')
			if (nameParts.length === 2) {
				setFirstName(nameParts[0])
				setLastName(nameParts[1])
			}
		}
	}, [displayName])
	const handleAboutMeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setAboutMe(event.target.value)
	}
	const handleAboutMeUpdate = async () => {
		if (aboutMe !== null) {
			await updateAboutMe(aboutMe)
		}
	}
	return (
		<>
			<Typography variant='h5' sx={{ color: theme.TERTIARY, marginBottom: 5 }}>
				{formatMessage({ id: 'userInfo.title' })}
			</Typography>
			<Box sx={{ color: theme.TERTIARY, textAlign: 'center' }}>
				<Box
					sx={{
						'&:hover img': {
							transform: 'scale(1.05)',
						},
						'&:hover .hover-text': {
							visibility: 'visible',
							opacity: 1,
						},
						position: 'relative',
						display: 'inline-block',
					}}>
					<ProfileImagePicker
						imageUrl={imageUrl}
						// @ts-ignore
						setImageUrl={setImageUrl}
					/>
					<Typography
						variant='body2'
						className='hover-text'
						sx={{
							visibility: 'hidden',
							opacity: 0,
							position: 'absolute',
							top: '50%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
							transition: 'visibility 0s, opacity 0.3s ease',
							backgroundColor: 'rgba(0, 0, 0, 0.7)',
							color: 'white',
							padding: '5px',
							borderRadius: '5px',
						}}>
						<FormattedMessage id='profile.updatePictureInstruction' defaultMessage='Click to update profile picture' />
					</Typography>
				</Box>

				<Typography variant='body1'>
					{formatMessage({ id: 'userInfo.email' })}: {email}
				</Typography>
				<Typography variant='body1'>
					{formatMessage({ id: 'userInfo.firstName' })}: {firstName}
				</Typography>
				<Typography variant='body1'>
					{formatMessage({ id: 'userInfo.lastName' })}: {lastName}
				</Typography>
				<TextField
					placeholder={formatMessage({ id: 'userInfo.aboutMePlaceholder' })}
					multiline
					variant='outlined'
					value={aboutMe || ''}
					onChange={handleAboutMeChange}
					onBlur={handleAboutMeUpdate}
					sx={{
						width: '100%', // Full width
						mb: 2, // Margin bottom
						'& .MuiOutlinedInput-root': {
							fontSize: '1rem', // Font size
							color: theme.TERTIARY, // Text color
							'& .MuiOutlinedInput-notchedOutline': {
								borderColor: theme.TERTIARY, // Border color
							},
							'&:hover .MuiOutlinedInput-notchedOutline': {
								borderColor: theme.LIGHT_HINT, // Border color on hover
							},
							'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
								borderColor: theme.POSITIVE, // Border color when focused
							},
						},
						'& .MuiInputLabel-outlined': {
							color: theme.TERTIARY, // Label color
						},
						'&.Mui-focused .MuiInputLabel-outlined': {
							color: theme.POSITIVE, // Label color when focused
						},
						'& .MuiInputBase-input::placeholder': {
							color: theme.HINT, // Placeholder color
						},
					}}
				/>
			</Box>
		</>
	)
}
