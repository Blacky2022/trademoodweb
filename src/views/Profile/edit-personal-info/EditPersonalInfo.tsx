import React, { useState } from 'react'
import { TextField, Button, CircularProgress } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { useAuth } from '../../../store/AuthProvider'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from './validationSchema'
import { useIntl } from 'react-intl' 

interface IFormInput {
	firstName: string
	lastName: string
}

const EditPersonalInfo: React.FC = () => {
	const { updatePersonalData } = useAuth()
	const [loading, setLoading] = useState(false)
	const { formatMessage } = useIntl() 
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
			alert(formatMessage({ id: 'editPersonalInfo.success' }))
			setLoading(false)
			setTimeout(() => {
				window.location.reload()
			}, 1000)
		} catch (error: any) {
			console.error(error)
			setError('firstName', { message: formatMessage({ id: 'editPersonalInfo.errors.internalError' }) })
			setError('lastName', { message: formatMessage({ id: 'editPersonalInfo.errors.internalError' }) })
			setLoading(false)
		}
	}

	return (
		<div className='form-section'>
			<h2>{formatMessage({ id: 'editPersonalInfo.title' })}</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<TextField
					{...register('firstName')}
					label={formatMessage({ id: 'editPersonalInfo.firstNameLabel' })}
					error={!!errors.firstName}
					helperText={errors.firstName?.message}
					fullWidth
				/>
				<TextField
					{...register('lastName')}
					label={formatMessage({ id: 'editPersonalInfo.lastNameLabel' })}
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
					{formatMessage({ id: 'editPersonalInfo.updateButton' })}
				</Button>
			</form>
		</div>
	)
}

export default EditPersonalInfo
