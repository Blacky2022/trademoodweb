import React, { useState } from 'react'
import { TextField, Button, CircularProgress } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { useAuth } from '../../../store/AuthProvider'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from './validationSchema'

interface IFormInput {
	firstName: string
	lastName: string
}

const EditPersonalInfo: React.FC = () => {
	const { updatePersonalData } = useAuth()
	const [loading, setLoading] = useState(false)
	const {
		handleSubmit,
		register,
		setError,
		formState: { errors },
	} = useForm<IFormInput>({
		resolver: yupResolver(schema),
	})

	const onSubmit: SubmitHandler<IFormInput> = async data => {
		setLoading(true)
		try {
			await updatePersonalData(data.firstName, data.lastName)
			alert('Personal data updated successfully!')
			setLoading(false)
			setTimeout(() => {
				window.location.reload()
			}, 1000)
		} catch (error: any) {
			console.error(error)
			setError('firstName', { message: 'Internal error, please try again later' })
			setError('lastName', { message: 'Internal error, please try again later' })
			setLoading(false)
		}
	}

	return (
		<div className='form-section'>
			<h2>Update Personal Data</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<TextField
					{...register('firstName')}
					label='First Name'
					error={!!errors.firstName}
					helperText={errors.firstName?.message}
					fullWidth
				/>
				<TextField
					{...register('lastName')}
					label='Last Name'
					error={!!errors.lastName}
					helperText={errors.lastName?.message}
					fullWidth
				/>
				<Button
					type='submit'
					variant='contained'
					color='primary'
					startIcon={loading ? <CircularProgress size={20} /> : <EditIcon />}
					fullWidth
					disabled={loading}>
					Update Personal Data
				</Button>
			</form>
		</div>
	)
}

export default EditPersonalInfo
