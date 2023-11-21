import React, { useContext } from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import SentimentChart from './SentimentChart'
import ActivityComparison from './ActivityComparison'
import CustomChart from './CustomChart'
import { Box, IconButton } from '@mui/material'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import { InstrumentProps } from '../../../store/InstrumentProvider'
import { useTheme } from '../../../store/themeContext'
import { FavoritesContext } from '../../../store/FavoritesProvider'

const InstrumentDetails = ({ selectedInstrument }: { selectedInstrument: InstrumentProps | null }) => {
	const theme = useTheme()
	const { ids, addFavorite, removeFavorite } = useContext(FavoritesContext)

	const isFavorite = ids.includes(selectedInstrument?.id || '')

	const handleFavoriteClick = () => {
		if (selectedInstrument && selectedInstrument.id) {
			if (isFavorite) {
				removeFavorite(selectedInstrument.id)
			} else {
				addFavorite(selectedInstrument.id)
			}
		}
	}

	if (!selectedInstrument) {
		return (
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh',
					backgroundColor: theme.BACKGROUND,
				}}>
				<Typography variant='h6' sx={{ color: theme.TERTIARY }}>
					Loading or no instrument selected...
				</Typography>
			</Box>
		)
	}

	return (
		<Grid container sx={{ padding: 2, backgroundColor: theme.BACKGROUND }}>
			<Grid item xs={12} sx={{ textAlign: 'center', marginBottom: 5 }}>
				<Typography variant='h4' sx={{ color: theme.TERTIARY }}>
					{selectedInstrument.crypto}	
				</Typography>
				<IconButton
					onClick={handleFavoriteClick}
					sx={{
						position: 'relative',
						bottom: '2.5vw', // adjust as needed
						left: '20vw', // adjust as needed
						fontSize: '3rem', // adjust icon size as needed
					}}>
					{isFavorite ? (
						<BookmarkIcon sx={{ fontSize: 'inherit', color: theme.TERTIARY  }} />
					) : (
						<BookmarkBorderIcon sx={{ fontSize: 'inherit', color:theme.TERTIARY }} />
					)}
				</IconButton>
			</Grid>
			<Grid item container spacing={2}>
				<Grid
					item
					xs={6}
					md={5}
					sx={{
						border: `1px solid ${theme.HINT}`,
						borderRadius: '20px',
						padding: '2px',
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

			<Grid item xs={12} sx={{ marginTop: 1 }}>
				<CustomChart selectedInstrument={selectedInstrument} />
			</Grid>
		</Grid>
	)
}

export default InstrumentDetails
