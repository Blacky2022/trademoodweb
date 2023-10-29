import React, { useState } from 'react'
import { mixed, object, string, ref, ObjectSchema } from 'yup'
import { ValidationError } from 'yup'
import { TextField, Button, CircularProgress, Typography, Input, Stack, Link, Paper } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../store/AuthProvider'

interface SignupForm {
	firstName: string
	lastName: string
	email: string
	password: string
	confirmPassword: string
	photo: any
}

const schema: ObjectSchema<SignupForm> = object().shape({
	firstName: string()
		.max(25, 'Your first name is too long')
		.matches(/^[a-zA-Z-]+$/, 'Please enter a valid first name')
		.required('Please provide your first name'),
	lastName: string()
		.max(25, 'Your last name is too long')
		.matches(/^[a-zA-Z-]+$/, 'Please enter a valid last name')
		.required('Please provide your last name'),
	email: string().email('Email is not valid').required('Please provide your email'),
	password: string().min(6, 'Password must be at least 6 characters').required('Please provide your password'),
	confirmPassword: string()
		.min(6, 'Password must be at least 6 characters')
		.oneOf([ref('password')], 'Password must match')
		.required('Password must match'),
	photo: mixed<File>()
		.test('file', 'Must be a File', value => !value || value instanceof File)
		.notRequired(),
})

const RegisterPageView: React.FC = () => {
	const [form, setForm] = useState<SignupForm>({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		confirmPassword: '',
		photo: null,
	})
	const {
		register,  // This function is now available from our AuthProvider
		updateProfilePicture,  // If you want to update the profile picture
	  } = useAuth();  // Get our auth functions
	const navigate = useNavigate()
	const [errors, setErrors] = useState<Partial<SignupForm>>({})
	const [isLoading, setIsLoading] = useState(false)
	const [message, setMessage] = useState<string | null>(null)
	const handleNavigateToLogin = () => {
		navigate('/login')
	}
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		try {
		  await schema.validate(form, { abortEarly: false });
		  await register(
			form.email,
			form.password,
			form.firstName,
			form.lastName,
			form.photo ? form.photo.name : null  // Assuming you handle image URLs differently
		  );
		  if (form.photo) {
			await updateProfilePicture(form.photo);
		  }
	
		  setMessage('User signed up successfully!');
		  navigate('/dashboard');
	
		  // Reset form
		  setForm({
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			confirmPassword: '',
			photo: null,
		  });
	
		  navigate('/main');
		} catch (error: any) {
		  if (error instanceof ValidationError) {
			const validationErrors: Partial<SignupForm> = {};
			error.inner.forEach(err => {
			  validationErrors[err.path as keyof SignupForm] = err.message;
			});
			setErrors(validationErrors);
		  } else {
			// Handle other types of errors (possibly from Firebase)
			setMessage(error.message);
		  }
		} finally {
		  setIsLoading(false);
		}
	  };
	const styles = {
		container: {
			display: 'flex',
			flexDirection: 'column' as 'column',
			alignItems: 'center',
			justifyContent: 'center',
			height: '100vh',
			padding: 2,
		},
		paper: {
			display: 'flex',
			flexDirection: 'column' as 'column',
			alignItems: 'center',
			padding: 2,
			width: '100%',
			maxWidth: '400px',
			marginTop: 2,
		},
		form: {
			width: '100%',
		},
		submit: {
			margin: '16px 0px',
		},
		progress: {
			color: '#fff',
		},
		message: {
			marginTop: 2,
		},
		link: {
			marginTop: 2,
			textAlign: 'center' as 'center',
		},
	}

	return (
		<>
			{' '}
			<div style={styles.container}>
				<Paper style={styles.paper} elevation={3}>
					<form onSubmit={handleSubmit}>
						<Stack spacing={2}>
							<TextField
								label='First Name'
								variant='outlined'
								value={form.firstName}
								onChange={e => setForm({ ...form, firstName: e.target.value })}
								error={Boolean(errors.firstName)}
								helperText={errors.firstName}
							/>

							<TextField
								label='Last Name'
								variant='outlined'
								value={form.lastName}
								onChange={e => setForm({ ...form, lastName: e.target.value })}
								error={Boolean(errors.lastName)}
								helperText={errors.lastName}
							/>

							<TextField
								label='Email'
								variant='outlined'
								type='email'
								value={form.email}
								onChange={e => setForm({ ...form, email: e.target.value })}
								error={Boolean(errors.email)}
								helperText={errors.email}
							/>

							<TextField
								label='Password'
								variant='outlined'
								type='password'
								value={form.password}
								onChange={e => setForm({ ...form, password: e.target.value })}
								error={Boolean(errors.password)}
								helperText={errors.password}
							/>

							<TextField
								label='Confirm Password'
								variant='outlined'
								type='password'
								value={form.confirmPassword}
								onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
								error={Boolean(errors.confirmPassword)}
								helperText={errors.confirmPassword}
							/>

							<Input
								type='file'
								inputProps={{
									accept: 'image/*',
								}}
								onChange={e => {
									const target = e.target as HTMLInputElement
									const file = target.files ? target.files[0] : null
									setForm({ ...form, photo: file })
								}}
								sx={{
									display: 'block',
									marginTop: '1rem',
								}}
							/>

							<Button
								type='submit'
								variant='contained'
								disabled={isLoading}
								sx={{
									height: '3rem',
								}}
								startIcon={isLoading && <CircularProgress size={24} />}>
								{isLoading ? 'Signing Up...' : 'Sign Up'}
							</Button>
						</Stack>

						<Typography variant='body2' sx={{ marginTop: '1rem' }}>
							{message}
						</Typography>
					</form>
				</Paper>
				<Typography variant='body2' color='textSecondary' style={styles.link}>
					Already have an account?{' '}
					<Link href='#' onClick={handleNavigateToLogin} variant='body2'>
						Sign In
					</Link>
				</Typography>
			</div>
		</>
	)
}

export default RegisterPageView
