import React, { useState } from 'react'
import { TextField, Button, CircularProgress, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { useAuth } from '../../../store/AuthProvider'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from './validationSchema'
import { useIntl, FormattedMessage } from 'react-intl'
import { useTheme } from '../../../store/themeContext'

const EditPassword = () => {
	const [loading, setLoading] = useState(false)
	const { updatePassword } = useAuth()
	const { formatMessage } = useIntl()
	const intl = useIntl()
	const { toggleTheme, PRIMARY, SECONDARY, TERTIARY, QUATERNARY, BACKGROUND, HINT, LIGHT_HINT, NEGATIVE, POSITIVE } =
		useTheme()
	const {
		control,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	})

	const onSubmit: SubmitHandler<{ newPassword: string; confirmNewPassword: string }> = async data => {
		setLoading(true)
		try {
			await updatePassword(data.newPassword).then(() => {
				alert(intl.formatMessage({ id: 'editPassword.success' })) // Use formatMessage here
				window.location.reload()
			})
		} catch (error: any) {
			console.log(error)
			const errorMessageId =
				error.code === 'auth/weak-password'
					? 'editPassword.errors.weakPassword'
					: error.code === 'auth/requires-recent-login'
					? 'editPassword.errors.recentLoginRequired'
					: 'editPassword.errors.internalError'

			setError('newPassword', {
				message: intl.formatMessage({ id: errorMessageId }),
			})
		} finally {
			setLoading(false)
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
				{formatMessage({ id: 'editPassword.title' })}
			</Typography>

			<form onSubmit={handleSubmit(onSubmit)}>
				<Controller
					name='newPassword'
					control={control}
					defaultValue=''
					render={({ field }) => (
						<TextField
							{...field}
							label={formatMessage({ id: 'editPassword.newPasswordLabel' })}
							type='password'
							fullWidth
							error={!!errors.newPassword}
							helperText={errors.newPassword?.message}
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
									color: NEGATIVE,
								},
								mb: 2, // margin-bottom
							}}
						/>
					)}
				/>
				<Controller
					name='confirmNewPassword'
					control={control}
					defaultValue=''
					render={({ field }) => (
						<TextField
							{...field}
							label={formatMessage({ id: 'editPassword.confirmNewPasswordLabel' })}
							type='password'
							fullWidth
							error={!!errors.confirmNewPassword}
							helperText={errors.confirmNewPassword?.message}
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
									color: NEGATIVE,
								},
								mb: 2, // margin-bottom
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
						mt: 1, // margin-top
						mb: 2, // margin-bottom
					}}
					startIcon={loading ? <CircularProgress size={20} color='inherit' /> : <EditIcon />}
					type='submit'
					fullWidth
					disabled={loading}>
					{formatMessage({ id: 'editPassword.updateButton' })}
				</Button>
			</form>
		</div>
	)
}

export default EditPassword
