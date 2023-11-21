import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import { useTheme } from '../../../store/themeContext'
import { useAuth } from '../../../store/AuthProvider'

import { usePosts } from '../../../store/PostsProvider'
import SendIcon from '@mui/icons-material/Send'
import { IconButton, TextField, Box } from '@mui/material'
type DiscussionTextAreaProps = {
	isProfileImage?: boolean
}

export default function DiscussionTextArea({ isProfileImage = true }: DiscussionTextAreaProps) {
	const { TERTIARY, BACKGROUND } = useTheme()
	const intl = useIntl()
	const { user } = useAuth()
	const { addPost } = usePosts()
	const [text, setText] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)
	const maxInputLength = 280
	const handlePost = () => {
		if (text.trim() && !isSubmitting) {
			setIsSubmitting(true)
			try {
				addPost(text.trim())
				setText('')
			} catch (error) {
				console.error('An error occurred:', error)
			}
			setIsSubmitting(false)
		}
	}

	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				gap: 2,
				marginBottom: 2,
				backgroundColor: BACKGROUND,
				borderRadius: '20px',
				padding: '10px 16px',
				boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
				border: `2px solid ${TERTIARY}`,
			}}>
			{isProfileImage && user?.photoURL && (
				<Box
					sx={{
						width: 70,
						height: 55,
						overflow: 'hidden',
						borderRadius: '50%',
						boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.15)',
					}}>
					<img
						src={user.photoURL}
						alt='Profile'
						style={{
							width: '100%',
							height: '100%',
							objectFit: 'cover',
						}}
					/>
				</Box>
			)}
			<TextField
				fullWidth
				placeholder='shareSomething'
				inputProps={{ maxLength: maxInputLength }}
				multiline
				rows={1}
				value={text}
				onChange={e => setText(e.target.value)}
				sx={{
					'& .MuiOutlinedInput-root': {
						border: 'none',
						'& fieldset': { display: 'none' },
					},
					'& .MuiInputBase-input': {
						color: TERTIARY,
					},
				}}
			/>
			<IconButton
				onClick={handlePost}
				disabled={!text.trim() || isSubmitting}
				sx={{
					color: TERTIARY,
					'&:hover': {
						backgroundColor: 'rgba(255, 255, 255, 0.1)',
					},
				}}>
				<SendIcon />
			</IconButton>
		</Box>
	)
}
