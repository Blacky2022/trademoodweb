import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import { useTheme } from '../../../store/themeContext'

interface ActivityIndicatorProps {
	label: string
	value: number
}

const ActivityIndicator: React.FC<ActivityIndicatorProps> = ({ label, value }) => {
	const theme = useTheme()

	return (
		<Box
			sx={{
				borderRadius: '12px',
				padding: '26px',
				backgroundColor: theme.BACKGROUND,
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				marginTop: '60px',
				marginBottom: '50px',
				border: `1px solid ${theme.HINT}`,
			}}>
			<Typography variant='subtitle1' sx={{ color: theme.TERTIARY }}>
				{label}
			</Typography>
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
				{value >= 0 ? (
					<ArrowUpwardIcon sx={{ color: theme.POSITIVE }} />
				) : (
					<ArrowDownwardIcon sx={{ color: theme.NEGATIVE }} />
				)}
				<Typography variant='subtitle1' sx={{ color: value >= 0 ? theme.POSITIVE : theme.NEGATIVE }}>
					{value.toFixed(2)}%
				</Typography>
			</Box>
		</Box>
	)
}

export default ActivityIndicator
