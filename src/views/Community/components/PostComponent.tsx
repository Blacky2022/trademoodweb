import React, { useLayoutEffect, useState } from 'react'
import { Box, Tooltip } from '@mui/material'
import { useAuth } from '../../../store/AuthProvider'
import { useTheme } from '../../../store/themeContext'
import { PostType, usePosts } from '../../../store/PostsProvider'
import { useFollowing } from '../../../store/FollowingProvider'
import { ListItem, ListItemAvatar, Avatar, ListItemText, Button, IconButton, Typography } from '@mui/material'
import { doc, getDoc } from 'firebase/firestore'
import { firestore } from '../../../config/firebase-config'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import DeleteIcon from '@mui/icons-material/Delete'
interface PostProps extends PostType {
	setSelectedPost: (post: PostType) => void
	isSelected: boolean
}

const PostComponent: React.FC<PostProps> = ({ createdAt, likes, text, uid, userUID, setSelectedPost, isSelected }) => {
	const imageSize = 40
	const { TERTIARY, BACKGROUND, LIGHT_HINT, NEGATIVE } = useTheme()
	const { user } = useAuth()
	const { toggleLikePost, deletePost } = usePosts()

	const date = new Date(createdAt)
	const [photoURL, setPhotoURL] = useState()
	const [displayName, setDisplayName] = useState()
	const { follow, unFollow, isFollowing } = useFollowing()
	const [isFollowingState, setIsFollowingState] = useState<boolean>()
	const isPostByCurrentUser = user && user.uid === userUID
	useLayoutEffect(() => {
		setIsFollowingState(isFollowing(userUID))
	}, [isFollowing, userUID])

	useLayoutEffect(() => {
		async function getUserDetails() {
			const docRef = doc(firestore, 'users', userUID)
			const userDoc = await getDoc(docRef)
			const userData = userDoc.data()
			setDisplayName(userData?.displayName)
			setPhotoURL(userData?.photoURL)
		}
		getUserDetails()
	}, [userUID])

	async function toggleFollowUser(userUID: string) {
		if (user) {
			if (user.uid === userUID) {
				console.log('Cannot follow yourself.')
				return
			}
			if (isFollowing(userUID)) {
				unFollow(userUID)
			} else {
				follow(userUID)
			}
		}
	}
	const handleDeletePost = async () => {
		await deletePost(uid)
	}

	return (
		<ListItem
			alignItems='flex-start'
			sx={{
				width: '95%',
				bgcolor: isSelected ? LIGHT_HINT : BACKGROUND,
				borderRadius: '16px',
				overflow: 'hidden',
				mb: 2,
				boxShadow: isSelected ? '0 4px 8px rgba(0, 0, 0, 0.2)' : '0 2px 4px rgba(0, 0, 0, 0.1)',
				padding: 2,
				display: 'flex',
				flexDirection: 'column',
				'&:hover': {
					boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
				},
				border: `2px solid ${TERTIARY}`,
			}}
			onClick={() => setSelectedPost({ createdAt, likes, text, uid, userUID })}>
			<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
				<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
					<ListItemAvatar>
						<Avatar alt={displayName} src={photoURL} sx={{ width: imageSize, height: imageSize }} />
					</ListItemAvatar>
					<Typography component='span' variant='body2' sx={{ color: TERTIARY }}>
						{displayName}
					</Typography>
				</Box>
				{!isPostByCurrentUser ? (
					<Button
						startIcon={isFollowingState ? <PersonRemoveIcon /> : <PersonAddIcon />}
						variant='outlined'
						size='small'
						onClick={() => toggleFollowUser(userUID)}>
						{isFollowingState ? 'Unfollow' : 'Follow'}
					</Button>
				) : (
					<Tooltip title='Delete post' placement='top'>
						<IconButton
							onClick={handleDeletePost}
							sx={{
								color: 'red',
								'&:hover': {
									backgroundColor: LIGHT_HINT,
								},
							}}>
							<DeleteIcon fontSize='medium' />
						</IconButton>
					</Tooltip>
				)}
			</Box>

			<Typography variant='body2' sx={{ my: 1, color: TERTIARY }}>
				{text}
			</Typography>

			<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
				{!isPostByCurrentUser && user && (
					<IconButton onClick={() => user && toggleLikePost(uid, user.uid, likes)}>
						{likes.includes(user.uid) ? <FavoriteIcon color='error' /> : <FavoriteBorderIcon />}
					</IconButton>
				)}
				<Typography variant='caption' sx={{ color: TERTIARY }}>
					{date.toLocaleDateString()}
				</Typography>
			</Box>
		</ListItem>
	)
}

export default PostComponent
