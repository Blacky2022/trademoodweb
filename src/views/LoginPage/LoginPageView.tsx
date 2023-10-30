import React, { useState } from 'react'
import { Button, TextField, Typography, Link, Box, Paper, CircularProgress } from '@mui/material'

import { useAuth } from '../../store/AuthProvider'
import { useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from './validationSchema'
import { theme } from '../../styles/colors'
interface LoginForm {
	email: string
	password: string
}
export default function LoginPageView() {
	const [message, setMessage] = useState<string | null>(null)
	const [isSubmitting, setIsSubmitting] = useState(false) // Add isSubmitting state
	const navigate = useNavigate()
	const { login } = useAuth()
	const {
		register,
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

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh', // Vertically center the content
        backgroundColor: theme.dark.BACKGROUND, // Background color from your theme
        color: theme.dark.QUATERNARY, // Text color from your theme
      }}
    >
      <Paper
        style={{
          padding: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: theme.dark.PRIMARY,
        }}
      >
        <img src='/assets/logo/trademoodicon.png' alt='Logo' style={{ maxWidth: '100%', height: 'auto' }} />
        <Typography
          variant='h5'
          style={{
            color: theme.dark.QUATERNARY, 
          }}
        >
          Sign In
        </Typography>
        <Box component='form' noValidate sx={{ mt: 2 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            label='Email Address'
            autoComplete='email'
            autoFocus
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={{
              backgroundColor: theme.dark.BACKGROUND, 
              color: theme.dark.QUATERNARY, 
              borderRadius: '4px',
              marginBottom: '16px',
            }}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            label='Password'
            type='password'
            autoComplete='current-password'
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
            sx={{
              backgroundColor: theme.dark.BACKGROUND, 
              color: theme.dark.QUATERNARY, 
              borderRadius: '4px',
              marginBottom: '16px',
            }}
          />
          <Button
            onClick={handleSubmit(onSubmit)}
            type='submit'
            fullWidth
            variant='contained'
            style={{
              backgroundColor: theme.dark.BACKGROUND, 
              color: theme.dark.TERTIARY, 
            }}
            disabled={isSubmitting}
          >
            {isSubmitting && <CircularProgress size={24} sx={{ color: theme.dark.TERTIARY, position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />}
            Sign In
          </Button>
          {message && (
            <Typography variant='body2' color='textSecondary' style={{ marginTop: '16px' }}>
              {message}
            </Typography>
          )}
          <Link href='#' variant='body2' onClick={() => navigate('/register')} sx={{ marginTop: '16px', color: theme.dark.TERTIARY }}>
            {"Don't have an account? Register"}
          </Link>
        </Box>
      </Paper>
    </Box>
  );
}