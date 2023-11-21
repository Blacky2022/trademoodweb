import React, { useState } from 'react'
import { TextField, Button, CircularProgress, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { useAuth } from '../../../store/AuthProvider'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from './validationSchema'
import { useIntl } from 'react-intl'
import { useTheme } from '../../../store/themeContext'

interface IFormInput {
	firstName: string
	lastName: string
}

const EditPersonalInfo: React.FC = () => {
	const [imageUrl, setImageUrl] = useState<string | null>(null)
	const { toggleTheme, PRIMARY, SECONDARY, TERTIARY, QUATERNARY, BACKGROUND, HINT, LIGHT_HINT, NEGATIVE, POSITIVE } =
		useTheme()
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
			<Typography
				variant='h5'
				sx={{
					color: TERTIARY,
					marginBottom: 2,
				}}>
				{formatMessage({ id: 'editPersonalInfo.title' })}
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<TextField
					{...register('firstName')}
					label={formatMessage({ id: 'editPersonalInfo.firstNameLabel' })}
					error={!!errors.firstName}
					helperText={errors.firstName?.message}
					fullWidth
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
				<TextField
					{...register('lastName')}
					label={formatMessage({ id: 'editPersonalInfo.lastNameLabel' })}
					error={!!errors.lastName}
					helperText={errors.lastName?.message}
					fullWidth
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
				<Button
					type='submit'
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
					fullWidth
					disabled={loading}>
					{formatMessage({ id: 'editPersonalInfo.updateButton' })}
				</Button>
			</form>
		</div>
	)
}

export default EditPersonalInfo
