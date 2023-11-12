import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import 'chart.js/auto'
import { ChartData, ChartOptions } from 'chart.js'
import { InstrumentProps } from '../../../store/InstrumentProvider'
import { useTheme } from '../../../store/themeContext'

const SentimentChart = ({ selectedInstrument }: { selectedInstrument: InstrumentProps | null }) => {
	const { NEGATIVE, POSITIVE, HINT, TERTIARY, BACKGROUND } = useTheme()

	if (!selectedInstrument) {
		return <div style={{ textAlign: 'center', color: TERTIARY }}>No instrument selected.</div>
	}

	const positiveValue = selectedInstrument.sentimentPositive
	const neutralValue = selectedInstrument.sentimentNeutral
	const negativeValue = selectedInstrument.sentimentNegative
	const totalValue = positiveValue + neutralValue + negativeValue

	const data: ChartData<'doughnut'> = {
		labels: ['Positive', 'Neutral', 'Negative'],
		datasets: [
			{
				label: 'Sentiment Details',
				data: [positiveValue, neutralValue, negativeValue],
				backgroundColor: [POSITIVE, HINT, NEGATIVE],
				hoverOffset: 4,
				borderWidth: 0,
				s,
			},
		],
	}
	const options: ChartOptions<'doughnut'> = {
		responsive: true,
		cutout: '65%',
		plugins: {
			legend: {
				display: false,
			},
		},
	}

	// Custom Legend
	const CustomLegend = () => (
		<>
			{(data.labels || []).map((label, index) => {
				const key = String(label)

				const value = data.datasets[0].data[index] as number
				const percentage = ((value / totalValue) * 100).toFixed(1) + '%'

				const color = (data.datasets[0].backgroundColor as string[])[index]

				return (
					<div key={key} style={{ display: 'flex', alignItems: 'center', margin: '0.5rem 0' }}>
						<div
							style={{
								width: '12px',
								height: '12px',
								borderRadius: '50%',
								marginRight: '0.5rem',
								backgroundColor: color,
							}}
						/>
						<span style={{ color: TERTIARY }}>{`${label}: ${percentage}`}</span>
					</div>
				)
			})}
		</>
	)

	return (
		<div
			style={{
				backgroundColor: BACKGROUND,
				borderRadius: '8px',
				padding: '0.5rem',
				marginTop: '2rem',
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
			}}>
			<div style={{ width: '200px' }}>
				<Doughnut data={data} options={options} />
			</div>
			<div style={{ width: '300px', marginLeft: '2rem' }}>
				<CustomLegend />
			</div>
		</div>
	)
}

export default SentimentChart
