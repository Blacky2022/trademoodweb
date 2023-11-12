import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ButtonBase from '@mui/material/ButtonBase'
import { useTheme } from '../../store/themeContext'

type InstrumentRecordProps = {
	crypto: string
	overallSentiment: string
	sentimentDirection: string
	photoUrl: string
	isSelected: boolean
	onPress: () => void
}
function InstrumentRecord({
	crypto,
	overallSentiment,
	sentimentDirection,
	photoUrl,
	isSelected,
	onPress,
}: InstrumentRecordProps) {
	const { PRIMARY, TERTIARY, BACKGROUND, LIGHT_HINT, NEGATIVE, POSITIVE,HINT} = useTheme()

	const cardStyles = {
		boxShadow: isSelected
			? '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)'
			: 'none',
		backgroundColor: isSelected ? PRIMARY : BACKGROUND,
		borderRadius: '20px',
		transition: 'background-color 0.3s',
		'&:hover': {
			backgroundColor: isSelected ? PRIMARY : LIGHT_HINT,
		},
		cursor: 'pointer',
		display: 'flex',
		alignItems: 'center',
		padding: '12px 50px',
		width: '100%',
	}

	const getColorBasedOnSentiment = (overallSentiment: string) => {
        const sentimentLower = overallSentiment.toLowerCase()
        switch (sentimentLower) {
            case 'positive':
                return POSITIVE
            case 'neutral':
                return HINT
            case 'negative':
                return NEGATIVE
            default:
                return HINT
        }
    }
	const sentimentColor = getColorBasedOnSentiment(overallSentiment)
	const imgStyle: React.CSSProperties = {
		width: '48px',
		height: '48px',
		borderRadius: '50%',
		objectFit: 'cover',
		marginRight: '5vw',
	}

	return (
		<ButtonBase onClick={onPress} sx={cardStyles}>
			<Card variant='outlined' sx={cardStyles}>
				<CardContent
					sx={{
						display: 'flex',
						alignItems: 'center',
						padding: 0,
						'&:last-child': { paddingBottom: 0 },
						justifyContent: 'space-between',
					}}>
					<img src={photoUrl || '/assets/icons/crypto-placeholder.svg'} alt={crypto} style={imgStyle} />

					<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
						<Typography variant='subtitle1' sx={{ color: TERTIARY }}>
							{crypto}
						</Typography>
						<Typography variant='body2' sx={{ color: sentimentColor }}>
							{overallSentiment}
						</Typography>
					</div>
					{isSelected && <ArrowForwardIosIcon sx={{ color: TERTIARY, marginLeft: '6vw' }} />}
				</CardContent>
			</Card>
		</ButtonBase>
	)
}

export default InstrumentRecord
