import React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import SentimentChart from './SentimentChart' // Make sure the path is correct
import { InstrumentProps } from '../../../store/InstrumentProvider'
import { useTheme } from '../../../store/themeContext'
import ActivityComparison from './ActivityComparison'
import CustomChart from './CustomChart'
import { Box } from '@mui/material'

const InstrumentDetails = ({ selectedInstrument }: { selectedInstrument: InstrumentProps | null }) => {
	const theme = useTheme()

	if (!selectedInstrument) {
		return (
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh', // Adjust height as needed
					backgroundColor: theme.BACKGROUND,
				}}>
				<Typography variant='h6' sx={{ color: theme.TERTIARY }}>
					Loading or no instrument selected...
				</Typography>
			</Box>
		)
	}

	return (
		<Grid container sx={{ padding: 5, backgroundColor: theme.BACKGROUND }}>
			<Grid item xs={12} sx={{ textAlign: 'center', marginBottom: 5 }}>
				<Typography variant='h4' sx={{ color: theme.TERTIARY }}>
					{selectedInstrument.crypto}
				</Typography>
			</Grid>
			<Grid item container spacing={2}>
				<Grid
					item
					xs={6}
					md={5}
					sx={{
						border: `1px solid ${theme.HINT}`,
						borderRadius: '20px',
						padding: '8px',
					}}>
					<Typography variant='h6' sx={{ color: theme.TERTIARY }}>
						Sentiment Details
					</Typography>
					<SentimentChart selectedInstrument={selectedInstrument} />
				</Grid>
				<Grid item xs={12} md={6}>
					<ActivityComparison selectedInstrument={selectedInstrument} />
				</Grid>
			</Grid>

			<Grid item xs={12} sx={{ marginTop: 2 }}>
				<CustomChart selectedInstrument={selectedInstrument} />
			</Grid>
		</Grid>
	)
}

export default InstrumentDetails
