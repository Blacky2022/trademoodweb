import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTheme } from '../../store/themeContext'
export const NotFoundView = () => {
	const theme = useTheme()

	return (
		<Box display='flex' justifyContent='center' alignItems='center' minHeight='100vh'>
			<Typography variant='h4' component='h1' gutterBottom>
				This view does not exist
			</Typography>
		</Box>
	)
}
