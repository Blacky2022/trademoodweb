import React, { useState } from 'react'
import { Avatar, CircularProgress } from '@mui/material'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '../../../config/firebase-config'


interface ProfileImageUploaderProps {
	currentPhotoUrl: string | null | undefined
	onUploadSuccess: (url: string) => void
}

const ProfileImageUploader: React.FC<ProfileImageUploaderProps> = ({ currentPhotoUrl, onUploadSuccess }) => {
	const [uploading, setUploading] = useState<boolean>(false)

	const handleAvatarClick = () => {
		document.getElementById('photo-upload-input')?.click()
	}

	const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (file) {
			setUploading(true)
			const fileRef = ref(storage, `usersProfilePictures/${Date.now()}-${file.name}`)
			try {
				await uploadBytes(fileRef, file)
				const photoURL = await getDownloadURL(fileRef)
				onUploadSuccess(photoURL)
			} catch (error) {
				console.error('Error uploading file:', error)
			}
			setUploading(false)
		}
	}

	return (
		<div style={{ position: 'relative', width: '100%', height: '100%' }}>
			<Avatar
				src={currentPhotoUrl || undefined}
				alt='Profile Picture'
				onClick={handleAvatarClick}
				style={{ width: '100%', height: '100%' }}
			/>
			{uploading && (
				<CircularProgress
					style={{ position: 'absolute', top: '50%', left: '50%', marginTop: '-20px', marginLeft: '-20px' }}
				/>
			)}
			<input
				type='file'
				id='photo-upload-input'
				style={{ display: 'none' }}
				onChange={handleFileChange}
				accept='image/*'
			/>
		</div>
	)
}

export default ProfileImageUploader
