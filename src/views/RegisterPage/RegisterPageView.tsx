import React, { useEffect, useState } from 'react'
import { Paper, Stack, Button, Typography, Link, CircularProgress } from '@mui/material'
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
//@typescript-ignore
import * as AuthProvider from '../../store/AuthProvider'
import { schema } from './validationSchema'
import TextFieldController from '../../components/TextFieldComponent'
import { theme } from '../../styles/colors'
import { Box } from '@mui/material'

const RegisterPageView: React.FC = () => {
	const { register } = AuthProvider.useAuth()
	const [isSubmitting, setIsSubmitting] = useState(false)
	const navigate = useNavigate()
	const [message, setMessage] = React.useState<string | null>(null)
	const {
		control,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	})
	const onSubmit: SubmitHandler<FieldValues> = async ({ firstName, lastName, email, password, confirmPassword }) => {
		setIsSubmitting(true)
		try {
			await register(email, password, firstName, lastName).then()
			navigate('/')
		} catch (error: any) {
			console.log(error)
			if (error.code === 'auth/email-already-in-use') {
				setError('email', { message: 'That email address is already in use' })
			} else if (error.code === 'auth/weak-password') {
				setError('password', { message: 'Password is too weak' })
			} else if (error.code === 'auth/invalid-email') {
				setError('email', { message: 'Email is not valid' })
			} else if (error.code === 'auth/operation-not-allowed') {
				setError('email', { message: 'Internal error, please try again later' })
			} else {
				setError('email', { message: 'Internal error, please try again later' })
				setError('password', { message: 'Internal error, please try again later' })
				setError('confirmPassword', { message: 'Internal error, please try again later' })
			}
		} finally {
			setIsSubmitting(false)
		}
	}
	useEffect(() => {
		if (Object.keys(errors).length > 0) {
			setMessage('Please fix the errors before submitting.')
		}
	}, [errors])

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
					<Typography
						variant='h5'
						style={{
							color: theme.dark.TERTIARY,
						}}>
						Sign Up
					</Typography>
					<form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
						<Stack spacing={2}>
							<TextFieldController name='firstName' label='First Name' control={control} errors={errors} />
							<TextFieldController name='lastName' label='Last Name' control={control} errors={errors} />
							<TextFieldController name='email' label='Email' type='email' control={control} errors={errors} />
							<TextFieldController name='password' label='Password' type='password' control={control} errors={errors} />
							<TextFieldController
								name='confirmPassword'
								label='Confirm Password'
								type='password'
								control={control}
								errors={errors}
							/>
							<Button
								type='submit'
								variant='contained'
								style={styles.submit}
								disabled={isSubmitting}
								startIcon={isSubmitting && <CircularProgress size={24} style={styles.progress} />}>
								{isSubmitting ? 'Submitting...' : 'Sign Up'}
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
				Already have an account?{' '}
				<Link
					href='#'
					onClick={e => {
						e.preventDefault()
						navigate('/')
					}}
					variant='body2'>
					Sign in
				</Link>
			</Typography>
		</div>
	)
}

export default RegisterPageView
