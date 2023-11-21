import React, { useState } from 'react'
import { TextField, Button, CircularProgress, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { useAuth } from '../../../store/AuthProvider'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from './validationSchema'
import { useIntl } from 'react-intl'
import { useTheme } from '../../../store/themeContext'

const EditEmail = () => {
	const { updateEmail } = useAuth()
	const { toggleTheme, PRIMARY, SECONDARY, TERTIARY, QUATERNARY, BACKGROUND, HINT, LIGHT_HINT, NEGATIVE, POSITIVE } =
		useTheme()
	const [isLoading, setIsLoading] = useState(false)
	const { formatMessage } = useIntl()
	const {
		control,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	})
	const onSubmit = async (data: { newEmail: string }) => {
		try {
			setIsLoading(true)
			await updateEmail(data.newEmail)
			alert(formatMessage({ id: 'editEmail.success' }))
			setTimeout(() => {
				window.location.reload()
			}, 1000)
		} catch (error: any) {
			console.error(error)
			let messageId = ''
			switch (error.code) {
				case 'auth/invalid-email':
					messageId = 'editEmail.errors.invalidEmail'
					break
				case 'auth/email-already-in-use':
					messageId = 'editEmail.errors.emailInUse'
					break
				case 'auth/requires-recent-login':
					messageId = 'editEmail.errors.recentLoginRequired'
					break
				default:
					messageId = 'editEmail.errors.internalError'
					break
			}
			setError('newEmail', { type: 'manual', message: formatMessage({ id: messageId }) })
		} finally {
			setIsLoading(false)
		}
	}
	return (
		<div className='form-section'>
			<Typography
				variant='h5'
				sx={{
					color: TERTIARY,
					marginBottom: 2,
				}}>
				{formatMessage({ id: 'editEmail.title' })}
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Controller
					name='newEmail'
					control={control}
					defaultValue=''
					render={({ field }) => (
						<TextField
							{...field}
							label={formatMessage({ id: 'editEmail.newEmailLabel' })}
							fullWidth
							error={!!errors.newEmail}
							helperText={errors.newEmail?.message}
							sx={{
								'& .MuiOutlinedInput-root': {
									fontSize: '1rem',
									color: TERTIARY,
									'& fieldset': {
										borderColor: TERTIARY,
									},
									'&:hover fieldset': {
										borderColor: TERTIARY,
									},
									'&.Mui-focused fieldset': {
										borderColor: TERTIARY,
									},
								},
								'& .MuiInputLabel-outlined': {
									color: TERTIARY,
								},
								'& .Mui-focused .MuiInputLabel-outlined': {
									color: TERTIARY,
								},
								'& .MuiFormHelperText-root': {
									color: NEGATIVE, // Assuming error messages are to be styled with a "negative" color
								},
							}}
						/>
					)}
				/>
				<Button
					variant='contained'
					sx={{
						bgcolor: PRIMARY,
						color: TERTIARY,
						'&:hover': {
							bgcolor: QUATERNARY,
						},
						marginTop: 2,
						marginBottom: 1,
					}}
					startIcon={isLoading ? <CircularProgress size={20} color='inherit' /> : <EditIcon />}
					onClick={handleSubmit(onSubmit)}
					fullWidth
					disabled={isLoading}>
					{isLoading ? formatMessage({ id: 'editEmail.updating' }) : formatMessage({ id: 'editEmail.updateButton' })}
				</Button>
			</form>
		</div>
	)
}

export default EditEmail
