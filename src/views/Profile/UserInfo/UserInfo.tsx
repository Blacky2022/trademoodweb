import React, { useLayoutEffect, useState } from 'react'
import { firestore } from '../../../config/firebase-config'
import { doc, getDoc } from 'firebase/firestore'
import { FormattedMessage, useIntl } from 'react-intl'
import { useTheme } from '../../../store/themeContext'
import { Box, Typography } from '@mui/material'
import ProfileImagePicker from '../ProfileImageUploader/ProfileImagePicker'
import { TextField } from '@mui/material'
import { useAuth } from '../../../store/AuthProvider'
import { useFollowing } from '../../../store/FollowingProvider'

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
	const { updateAboutMe, user } = useAuth()
	const { getFollowersCount, getFollowingCount } = useFollowing()
	const [followers, setFollowers] = useState(0)
	const [following, setFollowing] = useState(0)
	const uid = userUID || user?.uid
	useLayoutEffect(() => {
		async function getUserDetails() {
			if (userUID) {
				try {
					const userDocRef = doc(firestore, 'users', userUID)
					const userDocSnap = await getDoc(userDocRef)
					if (uid) {
						getFollowersCount(uid)
							.then((followersCount: React.SetStateAction<number>) => {
								setFollowers(followersCount)
							})
							.catch(console.error)

						getFollowingCount(uid)
							.then((followingCount: React.SetStateAction<number>) => {
								setFollowing(followingCount)
							})
							.catch(console.error)
					}
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
	}, [uid, userUID, formatMessage, getFollowersCount, getFollowingCount])

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
			<Box sx={{ color: theme.TERTIARY, textAlign: 'center', padding: '1rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
				<Box
					sx={{
						marginBottom: '1.5rem',
						'&:hover img': {
							transform: 'scale(1.08)',
							boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
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

				<Typography variant='body1' sx={{ marginBottom: '1rem' }}>
					{formatMessage({ id: 'userInfo.email' })}: {email}
				</Typography>
				<Typography variant='body1' sx={{ marginBottom: '1rem' }}>
					{formatMessage({ id: 'userInfo.firstName' })}: {firstName}
				</Typography>
				<Typography variant='body1' sx={{ marginBottom: '1rem' }}>
					{formatMessage({ id: 'userInfo.lastName' })}: {lastName}
				</Typography>
				<Typography variant='body1' sx={{ marginBottom: '1rem' }}>
					{formatMessage({ id: 'userInfo.followers' })}: {followers}
				</Typography>
				<Typography variant='body1' sx={{ marginBottom: '1rem' }}>
					{formatMessage({ id: 'userInfo.following' })}: {following}
				</Typography>
				<TextField
					placeholder={formatMessage({ id: 'userInfo.aboutMePlaceholder' })}
					multiline
					variant='outlined'
					value={aboutMe || ''}
					onChange={handleAboutMeChange}
					onBlur={handleAboutMeUpdate}
					sx={{
						width: '100%',
						mb: 2,
						'& .MuiOutlinedInput-root': {
							fontSize: '1.1rem',
							color: theme.TERTIARY,
							boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
							textAlign: 'center',
							'& .MuiOutlinedInput-notchedOutline': {
								borderColor: theme.TERTIARY,
							},
							'&:hover .MuiOutlinedInput-notchedOutline': {
								borderColor: theme.LIGHT_HINT,
							},
							'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
								borderColor: theme.POSITIVE,
							},
						},
						'& .MuiInputLabel-outlined': {
							color: theme.TERTIARY,
						},
						'&.Mui-focused .MuiInputLabel-outlined': {
							color: theme.POSITIVE,
							textAlign: 'center',
						},
						'& .MuiInputBase-input::placeholder': {
							color: theme.HINT,
							textAlign: 'center',
						},
					}}
				/>
			</Box>
		</>
	)
}
