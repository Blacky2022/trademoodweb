import React, { useState } from 'react'
import { Button, Stack, Typography, Link, Box, Paper, CircularProgress } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from './validationSchema'
import { theme } from '../../styles/colors'
import TextFieldController from '../../components/TextFieldComponent'
//@typescript-ignore
import * as AuthProvider from '../../store/AuthProvider'

interface LoginForm {
	email: string
	password: string
}
export default function LoginPageView() {
	const [message, setMessage] = useState<string | null>(null)
	const [isSubmitting, setIsSubmitting] = useState(false) // Add isSubmitting state
	const navigate = useNavigate()
	const { login } = AuthProvider.useAuth()
	const {
		control,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<LoginForm>({ resolver: yupResolver(schema) })

	const onSubmit: SubmitHandler<LoginForm> = async ({ email, password }: LoginForm) => {
		setIsSubmitting(true) // Set isSubmitting to true during login request
		try {
			await login(email, password)
			setMessage('User logged in successfully!')
			navigate('/')
		} catch (error: any) {
			if (error.code === 'auth/user-not-found') {
				setError('email', { message: 'User not found' })
			} else if (error.code === 'auth/wrong-password') {
				setError('password', { message: 'Password is incorrect' })
			} else if (error.code === 'auth/user-disabled') {
				setError('email', { message: 'This account has been disabled' })
			} else if (error.code === 'auth/invalid-email') {
				setError('email', { message: 'Email is not valid' })
			} else {
				setMessage('Internal error, please try again later')
			}
		} finally {
			setIsSubmitting(false) // Set isSubmitting to false after login request
		}
	}
	const styles = {
		container: {
			display: 'flex',
			flexDirection: 'column' as 'column',
			alignItems: 'center',
			justifyContent: 'center',
			height: '100vh',
			padding: 16,
			backgroundColor: theme.dark.BACKGROUND,
			color: theme.dark.TERTIARY,
		},
		boxContainer: {
			display: 'flex',
			flexDirection: 'column' as 'column',
			alignItems: 'center',
			justifyContent: 'center',
			width: '100%',
			maxWidth: 400,
			marginBottom: 20,
		},
		logo: {
			marginBottom: 20,
			maxWidth: '100%', // Ensures the logo is responsive and doesn't overflow the container
			height: 'auto',
		},
		paper: {
			display: 'flex',
			flexDirection: 'column' as 'column',
			alignItems: 'center',
			padding: 16,
			width: '100%',
			backgroundColor: theme.dark.BACKGROUND,
		},
		form: {
			width: '100%',
		},
		submit: {
			margin: '16px 0px',
			backgroundColor: theme.dark.PRIMARY,
			color: theme.dark.TERTIARY,
			'&:hover': {
				backgroundColor: theme.dark.SECONDARY,
			},
		},
		progress: {
			color: theme.dark.TERTIARY,
		},
		message: {
			marginTop: 8,
			color: theme.dark.TERTIARY,
		},
		link: {
			marginTop: 16,
			textAlign: 'center' as 'center',
			color: theme.dark.TERTIARY,
		},
	}

	return (
		<div style={styles.container}>
			<Box style={styles.boxContainer}>
				<img src='/assets/logo/trademoodicon.png' alt='Logo' style={styles.logo} />
				<Paper style={styles.paper} elevation={3}>
					<Typography variant='h5' style={{ color: theme.dark.TERTIARY }}>
						Login
					</Typography>
					<form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
						<Stack spacing={2}>
							<TextFieldController name='email' label='Email' type='email' control={control} errors={errors} />
							<TextFieldController name='password' label='Password' type='password' control={control} errors={errors} />
							<Button
								type='submit'
								variant='contained'
								style={styles.submit}
								disabled={isSubmitting}
								startIcon={isSubmitting && <CircularProgress size={24} style={styles.progress} />}>
								{isSubmitting ? 'Logging in...' : 'Login'}
							</Button>
						</Stack>
						{message && (
							<Typography variant='body2' style={styles.message}>
								{message}
							</Typography>
						)}
					</form>
				</Paper>
			</Box>
			<Typography variant='body2' style={styles.link}>
				Don't have an account?{' '}
				<Link
					href='#'
					onClick={e => {
						e.preventDefault()
						navigate('/register') // navigate to register page
					}}
					variant='body2'>
					Sign Up
				</Link>
			</Typography>
		</div>
	)
}
