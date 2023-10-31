import React, { useState, useEffect, CSSProperties } from 'react'
import { Button, Typography, Link, CircularProgress } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../store/AuthProvider'
import TextFieldController from '../../components/TextFieldComponent'
import { theme } from '../../styles/colors'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { schema } from './validationSchema'
import { yupResolver } from '@hookform/resolvers/yup'

const ForgotPasswordView: React.FC = () => {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [message, setMessage] = useState<string | null>(null)
	const { resetPassword } = useAuth()
	const navigate = useNavigate()
	const {
		control,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	})

	const onSubmit: SubmitHandler<FieldValues> = async ({ email }) => {
		setIsSubmitting(true)
		try {
			await resetPassword(email)
			setMessage('Password reset email sent! Please check your inbox.')
		} catch (error: any) {
			console.log(error)
			if (error.code === 'auth/invalid-email') {
				setError('email', { message: 'Email is not valid' })
			} else if (error.code === 'auth/user-not-found') {
				setError('email', { message: 'User not found' })
			} else {
				setError('email', { message: 'Internal error, please try again later' })
			}
			setIsSubmitting(false)
		}
	}

	const styles: { [key: string]: CSSProperties } = {
		container: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			height: '100vh',
			backgroundColor: theme.dark.BACKGROUND,
		},
		form: {
			display: 'flex',
			flexDirection: 'column',
			gap: '1rem',
			width: '300px',
		},
		submit: {
			backgroundColor: theme.dark.PRIMARY,
			color: theme.dark.TERTIARY,
		},
		message: {
			color: theme.dark.NEGATIVE,
			marginTop: '1rem',
		},

		link: {
			marginTop: '1rem',
			color: theme.dark.SECONDARY,
			// @ts-ignore
			'&:hover': {
				textDecoration: 'underline',
			},
		},
		logo: {
			marginBottom: 20,
			maxWidth: '100%', // Ensures the logo is responsive and doesn't overflow the container
			height: 'auto',
		},
	}

	return (
		<div style={styles.container}>
			<img src='/assets/logo/trademoodicon.png' alt='Logo' style={styles.logo} />
			<Typography variant='h5' style={{ color: theme.dark.TERTIARY }}>
						Forgot password
					</Typography>
			<form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
				<TextFieldController name='email' label='Email' type='email' control={control} errors={errors} />
				<Button
					type='submit'
					variant='contained'
					style={styles.submit}
					disabled={isSubmitting}
					startIcon={isSubmitting && <CircularProgress size={24} color='secondary' />}>
					{isSubmitting ? 'Sending...' : 'Send Reset Email'}
				</Button>
				{message && (
					<Typography variant='body2' style={styles.message}>
						{message}
					</Typography>
				)}
			</form>
			<Typography variant='body2' style={styles.link}>
				Remembered your password?{' '}
				<Link
					href='#'
					onClick={e => {
						e.preventDefault()
						navigate('/') // Adjust this to your login page route
					}}>
					Login
				</Link>
			</Typography>
		</div>
	)
}

export default ForgotPasswordView
