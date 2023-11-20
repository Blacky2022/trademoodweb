import React, { useState } from 'react'
import { Grid, List, Divider, Box, CircularProgress, Container, Typography } from '@mui/material'
import NewPostComponent from './components/NewPostComponent'
import PostComponent from './components/PostComponent'
import UserProfileComponent from './components/UserProfileComponent'
import { useTheme } from '../../store/themeContext'
import { useAuth } from '../../store/AuthProvider'
import { PostType, usePosts } from '../../store/PostsProvider'

function CommunityView() {
	const { user } = useAuth()
	const theme = useTheme()
	const { posts, isLoading } = usePosts()
	const [selectedPost, setSelectedPost] = useState<PostType | null>(null)

	return (
		<Container maxWidth='lg' sx={{ backgroundColor: theme.BACKGROUND, pt: 2, pb: 2 }}>
			<Grid container spacing={2}>
				<Grid item xs={12} md={7} sx={{ backgroundColor: theme.PRIMARY_LIGHT, borderRadius: '8px', padding: 4 }}>
					<NewPostComponent />
					{isLoading ? (
						<Box sx={{ display: 'flex', justifyContent: 'center', paddingY: 2 }}>
							<CircularProgress />
						</Box>
					) : (
						<Box sx={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'scroll' }}>
							<List sx={{ width: '100%' }}>
								{posts.map((post, index) => (
									<React.Fragment key={post.uid}>
										<PostComponent
											{...post}
											setSelectedPost={() => setSelectedPost(post)}
											isSelected={selectedPost?.uid === post.uid}
										/>
										{index < posts.length - 1 && <Divider />}
									</React.Fragment>
								))}
							</List>
						</Box>
					)}
				</Grid>
				<Box sx={{ width: '7%', bgcolor: theme.TERTIARY, height: '100%', alignSelf: 'stretch' }} />

				<Grid
					item
					xs={12}
					md={4}
					sx={{
						backgroundColor: theme.SECONDARY_LIGHT,
						borderRadius: '8px',
						border: `2px solid ${theme.TERTIARY}`,
						mt: 5,
					}}>
					{selectedPost ? (
						<UserProfileComponent userUID={selectedPost.userUID} isEditable={user?.uid === selectedPost.userUID} />
					) : (
						<Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
							<Typography variant='caption' sx={{ color: theme.TERTIARY }}>
								No user highlighted, highlight to see person details
							</Typography>
						</Box>
					)}
				</Grid>
			</Grid>
		</Container>
	)
}

export default CommunityView
