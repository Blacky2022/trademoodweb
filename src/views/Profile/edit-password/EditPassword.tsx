import React, { useState } from 'react'
import { TextField, Button, CircularProgress } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { useAuth } from '../../../store/AuthProvider'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from './validationSchema'
import { useIntl, FormattedMessage } from 'react-intl'
const EditPassword = () => {
	const [loading, setLoading] = useState(false)
	const { updatePassword } = useAuth()
	const { formatMessage } = useIntl()
	const intl = useIntl()
	const {
		control,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	})

	const onSubmit: SubmitHandler<{ newPassword: string; confirmNewPassword: string }> = async data => {
		setLoading(true);
		try {
		  await updatePassword(data.newPassword).then(() => {
			alert(intl.formatMessage({ id: 'editPassword.success' })); // Use formatMessage here
			window.location.reload();
		  });
		} catch (error: any) {
		  console.log(error);
		  const errorMessageId = error.code === 'auth/weak-password'
			? 'editPassword.errors.weakPassword'
			: error.code === 'auth/requires-recent-login'
			? 'editPassword.errors.recentLoginRequired'
			: 'editPassword.errors.internalError';
	
		  setError('newPassword', { 
			message: intl.formatMessage({ id: errorMessageId }) 
		  });
		} finally {
		  setLoading(false);
		}
	  };

	return (
		<div className='form-section'>
			<h2>{formatMessage({ id: 'editPassword.title' })}</h2>
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
					{formatMessage({ id: 'editPassword.updateButton' })}
				</Button>
			</form>
		</div>
	)
}

export default EditPassword
