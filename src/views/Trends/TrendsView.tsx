import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import { InstrumentProps, useInstrument } from '../../store/InstrumentProvider'
import InstrumentRecord from '../../components/instrument-record/InstrumentRecord'
import { useTheme } from '../../store/themeContext' // Importing useTheme
import InstrumentDetails from './InstrumentDetails/InstrumentDetails'

const TrendsView = () => {
	const { TERTIARY, BACKGROUND, HINT, LIGHT_HINT} =
		useTheme() 

	const instruments = useInstrument()
	const [search, setSearch] = useState('')
	const [filteredInstruments, setFilteredInstruments] = useState(instruments)
	const [selectedInstrument, setSelectedInstrument] = useState<InstrumentProps | null>(null)

	useEffect(() => {
		if (search) {
			const filtered = instruments?.filter(
				instrument =>
					instrument.crypto.toLowerCase().includes(search.toLowerCase()) ||
					instrument.cryptoSymbol.toLowerCase().includes(search.toLowerCase()) ||
					instrument.overallSentiment.toLowerCase().includes(search.toLowerCase())
			)
			setFilteredInstruments(filtered)
		} else {
			setFilteredInstruments(instruments)
		}
	}, [search, instruments])

	return (
		<Grid container sx={{ height: '100vh', backgroundColor: BACKGROUND, color: LIGHT_HINT }}>
			<Grid
				item
				xs={12}
				md={4}
				sx={{
					overflowY: 'auto',
					scrollbarWidth: 'none',
					'&::-webkit-scrollbar': { display: 'none' },
					borderRight: `1px solid ${HINT}`,
					height: '100vh',
				}}>
				<TextField
					label='Search'
					variant='outlined'
					value={search}
					onChange={e => setSearch(e.target.value)}
					placeholder='ex. Bitcoin'
					sx={{
						width: '100%',
						mb: 2,
						backgroundColor: TERTIARY,
						color: LIGHT_HINT,
						input: { color: LIGHT_HINT },
						'.MuiOutlinedInput-notchedOutline': { borderColor: LIGHT_HINT },
					}}
				/>
	
				{filteredInstruments?.map(instrument => (
					<InstrumentRecord
						key={instrument.id}
						crypto={instrument.crypto}
						overallSentiment={instrument.overallSentiment}
						sentimentDirection={instrument.sentimentDirection}
						photoUrl={instrument.photoUrl}
						isSelected={selectedInstrument?.id === instrument.id}
						onPress={() => setSelectedInstrument(instrument)}
					/>
				))}
			</Grid>
			<Grid item xs={12} md={8} sx={{ p: 2 }}>
			
					<div>
						<InstrumentDetails selectedInstrument={selectedInstrument} />
					</div>
			
			</Grid>
		</Grid>
	)
}

export default TrendsView
