import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useAuth } from '../../../store/AuthProvider'
import { useFollowing } from '../../../store/FollowingProvider'
import { Typography, Box, TextField, List, Avatar, Divider } from '@mui/material'
import { useTheme } from '../../../store/themeContext'
import { PostType } from '../../../store/PostsProvider'
import { usePosts } from '../../../store/PostsProvider'
import PostComponent from './PostComponent'
import { doc, getDoc } from 'firebase/firestore'
import { firestore } from '../../../config/firebase-config'
type UserInfoProps = {
	userUID?: string
	photoURL?: string
	newAboutMe?: string
	setNewAboutMe?: React.Dispatch<React.SetStateAction<string>>
	displayName?: string
	isEditable: boolean
}

export default function UserProfileComponent({
	userUID,
	photoURL,
	newAboutMe,
	setNewAboutMe = () => {},
	displayName,
	isEditable,
}: UserInfoProps) {
	const { user } = useAuth()
	const intl = useIntl()
	const { TERTIARY} =
		useTheme()
	const { getFollowersCount, getFollowingCount } = useFollowing()
	const [followers, setFollowers] = useState(0)
	const [following, setFollowing] = useState(0)
	const [focus, setFocus] = useState(false)
	const { posts } = usePosts()
	const [userPosts, setUserPosts] = useState<PostType[]>([])
	const [profile, setProfile] = useState({ displayName: '', photoURL: '', aboutMe: '' })
	useEffect(() => {
		if (userUID) {
			fetchUserPosts(userUID)
			fetchUserProfile(userUID)
		}
	}, [userUID, posts])

	useEffect(() => {
		let isActive = true
		const uid = userUID || user?.uid

		if (uid) {
			getFollowersCount(uid)
				.then(followersCount => {
					if (isActive) setFollowers(followersCount)
				})
				.catch(console.error)

			getFollowingCount(uid)
				.then(followingCount => {
					if (isActive) setFollowing(followingCount)
				})
				.catch(console.error)
		}

		return () => {
			isActive = false
		}
	}, [user, userUID, getFollowersCount, getFollowingCount])

	if (!user) {
		return (
			<Box sx={{ color: TERTIARY }}>
				<Typography variant='body1' component='p'>
					Error occurred try again later
				</Typography>
			</Box>
		)
	}
	const fetchUserProfile = async (uid: string) => {
		try {
			const docRef = doc(firestore, 'users', uid)
			const docSnap = await getDoc(docRef)

			if (docSnap.exists()) {
				setProfile({
					displayName: docSnap.data().displayName,
					photoURL: docSnap.data().photoURL,
					aboutMe: docSnap.data().aboutMe,
				})
			}
		} catch (error) {
			console.error('Error fetching user profile:', error)
		}
	}

	const fetchUserPosts = async (uid: string) => {
		const filteredPosts = posts.filter(post => post.userUID === uid)
		setUserPosts(filteredPosts)
	}

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				gap: 1,
			}}>
			<Avatar
				src={profile.photoURL}
				alt={profile.displayName}
				sx={{ width: 100, height: 100, borderRadius: '50%', mb: 2 }}
			/>
			<Typography variant='h6' sx={{ color: TERTIARY }}>
				{profile.displayName}
			</Typography>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					gap: 2,
					mb: 2,
				}}>
				<Typography variant='body1' sx={{ color: TERTIARY }}>
					Followers: {followers}
				</Typography>
				<Typography variant='body1' sx={{ color: TERTIARY }}>
					Following: {following}
				</Typography>
			</Box>
			<Box
				sx={{
					p: 2,
					width: '100%',
				}}>
				{isEditable ? (
					<TextField
						placeholder='Tell something about yourself'
						multiline
						variant='outlined'
						value={newAboutMe}
						onChange={event => setNewAboutMe(event.target.value)}
						onFocus={() => setFocus(true)}
						onBlur={() => setFocus(false)}
						inputProps={{
							maxLength: 120,
						}}
						sx={{
							width: '90%',
							'& .MuiOutlinedInput-root': {
								fontSize: '1rem', // Adjust font size
								color: TERTIARY, // Text color for input text and label
								'& .MuiOutlinedInput-notchedOutline': {
									borderColor: TERTIARY, // Border color
								},
								'&:hover .MuiOutlinedInput-notchedOutline': {
									borderColor: TERTIARY, // Border color on hover
								},
								'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
									borderColor: TERTIARY, // Border color when focused
								},
								'& .MuiOutlinedInput-input::placeholder': {
									color: TERTIARY, // Placeholder color
								},
								'& .MuiInputLabel-outlined': {
									color: TERTIARY, // Label color
								},
								'&.Mui-focused .MuiInputLabel-outlined': {
									color: TERTIARY, // Label color when focused
								},
							},
						}}
					/>
				) : (
					<>
						<Typography variant='body1' sx={{ color: TERTIARY }}>
							{profile.aboutMe}
						</Typography>
						<Divider sx={{ width: '100%', my: 3, color: TERTIARY }} />
					</>
				)}
				<List sx={{ width: '100%', maxHeight: '27vw', overflowY: 'auto' }}>
					{userPosts.map(post => (
						<PostComponent isSelected={false} key={post.uid} {...post} setSelectedPost={() => {}} />
					))}
				</List>
			</Box>
		</Box>
	)
}
