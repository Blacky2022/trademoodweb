import React, { useState, useEffect } from 'react'
import { Typography, Box, Divider, List } from '@mui/material'
import { usePosts } from '../../../store/PostsProvider'
import { useTheme } from '../../../store/themeContext'
import { auth } from '../../../config/firebase-config'
import PostComponent from '../../Community/components/PostComponent'
import { useIntl } from 'react-intl'
type PostType = {
	uid: string
}

const UserAboutAndPosts: React.FC = () => {
	const { posts } = usePosts()
	const [userPosts, setUserPosts] = useState<PostType[]>([])
	const theme = useTheme()
	const userUID = auth.currentUser?.uid

	useEffect(() => {
		if (userUID) {
			const filteredPosts = posts.filter(post => post.userUID === userUID)
			setUserPosts(filteredPosts)
		}
	}, [userUID, posts])

	return (
		<Box sx={{ p: 2 }}>
			<Typography variant='h5' sx={{ color: theme.TERTIARY, mb: 2 }}>
				Your posts
			</Typography>
			<Divider sx={{ mb: 3 }} />
			<List sx={{ maxHeight: '38vw', overflowY: 'auto' }}>
				{userPosts.map(post => (
					<PostComponent
						setSelectedPost={function (post: PostType): void {}}
						isSelected={false}
						createdAt={0}
						likes={[]}
						text={''}
						userUID={''}
						key={post.uid}
						{...post}
					/>
				))}
			</List>
		</Box>
	)
}

export default UserAboutAndPosts
