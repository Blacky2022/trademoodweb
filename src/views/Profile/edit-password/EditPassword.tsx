import React, { useState } from 'react'
import { TextField, Button, CircularProgress } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { useAuth } from '../../../store/AuthProvider'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from './validationSchema'

const EditPassword = () => {
	const [loading, setLoading] = useState(false)
	const { updatePassword } = useAuth()
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
				alert('Password updated successfully!')
				window.location.reload()
			})
		} catch (error: any) {
			console.log(error)
			if (error.code === 'auth/weak-password') {
				setError('newPassword', { message: 'Password is too weak' })
			} else if (error.code === 'auth/requires-recent-login') {
				setError('newPassword', { message: "This operation requires re-authentication to ensure it's you" })
			} else {
				setError('newPassword', { message: 'Internal error, please try again later' })
			}
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='form-section'>
			<h2>Update Password</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Controller
					name='newPassword'
					control={control}
					defaultValue=''
					render={({ field }) => (
						<TextField
							{...field}
							label='New Password'
							type='password'
							fullWidth
							error={!!errors.newPassword}
							helperText={errors.newPassword?.message}
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
							label='Confirm New Password'
							type='password'
							fullWidth
							error={!!errors.confirmNewPassword}
							helperText={errors.confirmNewPassword?.message}
						/>
					)}
				/>
				<Button
					variant='contained'
					color='primary'
					startIcon={loading ? <CircularProgress size={20} /> : <EditIcon />}
					type='submit'
					fullWidth
					disabled={loading}>
					Update Password
				</Button>
			</form>
		</div>
	)
}

export default EditPassword
