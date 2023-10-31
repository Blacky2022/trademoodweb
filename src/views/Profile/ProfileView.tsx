import React, { useEffect, useState } from 'react'
import './ProfileView.css'
import { TextField, Button, Paper, Switch, FormControlLabel, Avatar } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { theme } from '../../styles/colors'
import { useAuth } from '../../store/AuthProvider'
import UserInfo from './UserInfo'
import { auth } from '../../config/firebase-config'

const ProfileView: React.FC = () => {
	const [email, setEmail] = useState<string>('')
	const [newPassword, setNewPassword] = useState<string>('')
	const [confirmPassword, setConfirmPassword] = useState<string>('')
	const [firstName, setFirstName] = useState<string>('')
	const [lastName, setLastName] = useState<string>('')
	const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true)
	const [isPolish, setIsPolish] = useState<boolean>(true)
	const [currentProfilePicture, setCurrentProfilePicture] = 
	useState<string | null>(null)
	const [displayName, setDisplayName] = useState();
	const { user} = useAuth();
	const userUID = auth.currentUser?.uid;
	// Mock data fetching process
	const [userData, setUserData] = useState({
		email: 'user@example.com',
		firstName: 'John',
		lastName: 'Doe',
	})

	useEffect(() => {
		const fetchedData = {
			email: 'user@example.com',
			firstName: 'John',
			lastName: 'Doe',
		}
		setUserData(fetchedData)
	}, [])

	return (
		<div className='profile-container' style={{ background: theme.dark.BACKGROUND }}>
			<Avatar className='profile-avatar' src={currentProfilePicture || undefined} alt='Profile Picture' />
			<div className="paper-container">
			<Paper className='profile-section' elevation={3}>
				<UserInfo userUID={userUID} />
			</Paper>

			<Paper className='profile-section' elevation={3}>
    <div className="form-section">
        <h2>Update Email</h2>
        <TextField label='Email' value={email} onChange={e => setEmail(e.target.value)} fullWidth />
        <Button variant='contained' color='primary' startIcon={<EditIcon />} fullWidth>
            Update Email
        </Button>
    </div>

    <div className="form-divider"></div>

    <div className="form-section">
        <h2>Update Password</h2>
        <TextField
            label='New Password'
            type='password'
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            fullWidth
        />
        <TextField
            label='Confirm Password'
            type='password'
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            fullWidth
        />
        <Button variant='contained' color='primary' startIcon={<EditIcon />} fullWidth>
            Update Password
        </Button>
    </div>

    <div className="form-divider"></div>

    <div className="form-section">
        <h2>Update Personal Data</h2>
        <TextField label='First Name' value={firstName} onChange={e => setFirstName(e.target.value)} fullWidth />
        <TextField label='Last Name' value={lastName} onChange={e => setLastName(e.target.value)} fullWidth />
        <Button variant='contained' color='primary' startIcon={<EditIcon />} fullWidth>
            Update Personal Data
        </Button>
    </div>
</Paper>

			<Paper className='profile-section' elevation={3}>
				<h2>App Settings</h2>
				<FormControlLabel
					control={<Switch checked={isDarkTheme} onChange={() => setIsDarkTheme(!isDarkTheme)} />}
					label='Dark Theme'
				/>
				<FormControlLabel
					control={<Switch checked={isPolish} onChange={() => setIsPolish(!isPolish)} />}
					label='POLISH'
				/>
			</Paper>
			</div>
		</div>
	)
}

export default ProfileView
