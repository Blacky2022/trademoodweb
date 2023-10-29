
const LoginPageView = () => (
	<div>
		<div></div>
	</div>
)

export default LoginPageView
/*import React, { useState } from 'react';
import * as yup from 'yup';
import { Button, TextField, Typography, Link, Box, CircularProgress, Paper } from '@mui/material';
import { useAuth } from '../../store/AuthProvider'; 
import { useNavigate } from 'react-router-dom';
//import { useForm, SubmitHandler } from 'react-hook-form';
//import { yupResolver } from '@hookform/resolvers/yup';

interface LoginForm {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().email('Email is not valid').required('Please provide your email'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Please provide your password'),
}).required();

export default function LoginPageView() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth(); // Assuming you have a login function in your auth context
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<LoginForm>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<LoginForm> = async ({ email, password }: LoginForm) => {
    setIsLoading(true);
    try {
      await login(email, password);
      setMessage('User logged in successfully!');
      navigate('/dashboard');
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        setError('email', { message: 'User not found' });
      } else if (error.code === 'auth/wrong-password') {
        setError('password', { message: 'Password is incorrect' });
      } else if (error.code === 'auth/user-disabled') {
        setError('email', { message: 'This account has been disabled' });
      } else if (error.code === 'auth/invalid-email') {
        setError('email', { message: 'Email is not valid' });
      } else {
        setMessage('Internal error, please try again later');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Paper style={{ padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant='h5'>Sign in</Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Email Address"
          autoComplete="email"
          autoFocus
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          autoComplete="current-password"
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : 'Sign In'}
        </Button>
        {message && <Typography variant='body2' color='textSecondary'>{message}</Typography>}
        <Link href="#" variant="body2" onClick={() => navigate('/register')} sx={{ mt: 1 }}>
          {"Don't have an account? Register"}
        </Link>
      </Box>
    </Paper>
  );
}
*/