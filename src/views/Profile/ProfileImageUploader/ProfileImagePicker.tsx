import React, { useContext } from 'react'
import ProfileImageUploader from './ProfileImageUploader'
import { AuthContext } from '../../../store/AuthProvider';
type ProfileImagePickerProps = {
	imageUrl: string | null | undefined;
	setImageUrl: React.Dispatch<React.SetStateAction<string | null | undefined>>;
};


const ProfileImagePicker: React.FC<ProfileImagePickerProps> = ({ imageUrl, setImageUrl }) => {
	const { user } = useContext(AuthContext);
	imageUrl = user?.photoURL || 'avatar.jpg'
	return (
		<div style={{ width: '170px', height: '170px' }}>
			<ProfileImageUploader currentPhotoUrl={imageUrl} onUploadSuccess={setImageUrl} />
		</div>
	)
}

export default ProfileImagePicker
