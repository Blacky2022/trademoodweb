import React, { useState } from 'react'
import { TextField, Button, CircularProgress } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { useAuth } from '../../../store/AuthProvider'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from './validationSchema'

const EditEmail = () => {
	const { updateEmail } = useAuth()
  const [isLoading, setIsLoading] = useState(false);
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
      setIsLoading(true);
			await updateEmail(data.newEmail)
			alert('Email updated successfully!')
			setTimeout(() => {
				window.location.reload()
			}, 1000)
		} catch (error: any) {
			console.error(error)
			if (error.code === 'auth/invalid-email') {
				setError('newEmail', { type: 'manual', message: 'Email is not valid' })
			} else if (error.code === 'auth/email-already-in-use') {
				setError('newEmail', { type: 'manual', message: 'That email address is already in use' })
			} else if (error.code === 'auth/requires-recent-login') {
				setError('newEmail', {
					type: 'manual',
					message: "This operation requires re-authentication to ensure it's you",
				})
			} else {
				setError('newEmail', { type: 'manual', message: 'Internal error, please try again later' })
			}
		} finally {
      setIsLoading(false);
   }
	}

	return (
		<div className='form-section'>
			<h2>Update Email</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Controller
					name='newEmail'
					control={control}
					defaultValue=''
					render={({ field }) => (
						<TextField
							{...field}
							label='New Email'
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
        disabled={isLoading}
      >
        {isLoading ? 'Updating...' : 'Update Email'}
      </Button>
			</form>
			{errors.newEmail && <span>{errors.newEmail.message}</span>}
		</div>
	)
}

export default EditEmail
