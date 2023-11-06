import React, { useState } from 'react'
import { TextField, Button, CircularProgress } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { useAuth } from '../../../store/AuthProvider'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from './validationSchema'
import { useIntl, FormattedMessage } from 'react-intl'

const EditEmail = () => {
	const { updateEmail } = useAuth()
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
			<h2>
				<h2>{formatMessage({ id: 'editEmail.title' })}</h2>
			</h2>
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
						/>
					)}
				/>
				<Button
					variant='contained'
					color='primary'
					startIcon={isLoading ? <CircularProgress size={20} /> : <EditIcon />}
					onClick={handleSubmit(onSubmit)}
					fullWidth
					disabled={isLoading}>
					{isLoading ? formatMessage({ id: 'editEmail.updating' }) : formatMessage({ id: 'editEmail.updateButton' })}
				</Button>
			</form>
			{errors.newEmail && <span>{errors.newEmail.message}</span>}
		</div>
	)
}

export default EditEmail
