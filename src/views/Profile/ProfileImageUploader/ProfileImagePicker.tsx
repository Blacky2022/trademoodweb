import React, { Dispatch, SetStateAction } from 'react'
import ProfileImageUploader from './ProfileImageUploader'

type ProfileImagePickerProps = {
	imageUrl: string | null | undefined;
	setImageUrl: React.Dispatch<React.SetStateAction<string | null | undefined>>;
};


const ProfileImagePicker: React.FC<ProfileImagePickerProps> = ({ imageUrl, setImageUrl }) => {
	return (
		<div style={{ width: '170px', height: '170px' }}>
			<ProfileImageUploader currentPhotoUrl={imageUrl} onUploadSuccess={setImageUrl} />
		</div>
	)
}

export default ProfileImagePicker
