import React, { useEffect, useRef, useState } from 'react'
import { useIntl } from 'react-intl'
import { useTheme } from '../../../store/themeContext'
import { InstrumentProps } from '../../../store/InstrumentProvider'
import { Select, MenuItem, FormControl, CircularProgress, Box, Typography, Button } from '@mui/material'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area } from 'recharts'

type CustomChartProps = {
	selectedInstrument: InstrumentProps
}

type StockData = {
	'Adj Close': string
	Close: string
	Date: string
	High: string
	Low: string
	Open: string
	Volume: string
}
type ChartDataPoint = {
	date: string
	close: number
}

type DataSets = ChartDataPoint[]

const CustomChart: React.FC<CustomChartProps> = ({ selectedInstrument }) => {
	const [chartData, setChartData] = useState<DataSets>()
	const [chartDataError, setChartDataError] = useState(false)
	const [data, setData] = useState<StockData[]>()
	const theme = useTheme()
	const intl = useIntl()

	const chartWidth = 1000
	const chartHeight = 350

	//translations:
	const chartLoadingErrorTranslation = intl.formatMessage({
		defaultMessage: "We couldn't load chart data",
		id: 'views.home.instrument-details.error.loading-chart-data',
	})
	const tryAgainTranslation = intl.formatMessage({
		defaultMessage: 'Try again',
		id: 'views.home.instrument-details.error.try-again',
	})
	const lastWeekTranslation = intl.formatMessage({
		defaultMessage: 'Last week',
		id: 'views.home.instrument-details.chart.last-week',
	})
	const lastMonthTranslation = intl.formatMessage({
		defaultMessage: 'Last month',
		id: 'views.home.instrument-details.chart.last-month',
	})
	const lastYearTranslation = intl.formatMessage({
		defaultMessage: 'Last year',
		id: 'views.home.instrument-details.chart.last-year',
	})

	const [selected, setSelected] = useState(lastWeekTranslation)

	const pickListData: { key: string; value: string }[] = [
		{ key: '1', value: lastWeekTranslation },
		{ key: '2', value: lastMonthTranslation },
		{ key: '3', value: lastYearTranslation },
	]

	useEffect(() => {
		if (data) {
			setChartData(convertData(data))
		}
	}, [data])
	useEffect(() => {
		if (selectedInstrument?.cryptoSymbol) {
			fetchData()
		}
	}, [selected, selectedInstrument])
	function selectDateForChart(timeRange: string) {
		let currentTimestamp = Math.floor(Date.now() / 1000)
		let date = new Date()
		let interval
		if (timeRange === lastWeekTranslation) {
			date.setDate(date.getDate() - 7)
			interval = '1d'
		} else if (timeRange === lastMonthTranslation) {
			date.setMonth(date.getMonth() - 1)
			interval = '1wk'
		} else if (timeRange === lastYearTranslation) {
			date.setFullYear(date.getFullYear() - 1)
			interval = '3mo'
		} else {
			console.error('Unrecognized time range:', timeRange)
		}
		const timestamp = Math.floor(date.getTime() / 1000)
		console.log(interval)
		return {
			currentTimestamp,
			timestamp,
			interval: interval || '1d',
		}
	}

	async function fetchData() {
		setChartDataError(false)
		const { currentTimestamp, timestamp, interval } = selectDateForChart(selected)

		const functionUrl = `https://us-central1-trademood-935a3.cloudfunctions.net/proxyFinanceData`

		try {
			const queryParams = new URLSearchParams({
				cryptoSymbol: selectedInstrument?.cryptoSymbol || '',
				period1: timestamp.toString(),
				period2: currentTimestamp.toString(),
				interval,
			})

			// Fetch data from  Firebase Function
			const response = await fetch(`${functionUrl}?${queryParams}`, {
				method: 'GET',
				credentials: 'include',
			})

			if (!response.ok) {
				console.log('not ok')
				setChartDataError(true)
				console.warn(`Network response was not ok: ${response.status} - ${response.statusText}`)
			} else {
				const data = await response.text()
				const lines: string[] = data.split('\n')
				const headers: string[] = lines[0].split(',')
				const json: any[] = lines.slice(1).map((line: string) => {
					const values: string[] = line.split(',')
					return headers.reduce((object: { [key: string]: string }, header: string, index: number) => {
						object[header] = values[index]
						return object
					}, {})
				})
				setData(json)
				console.log({ json })
			}
		} catch (error) {
			console.log('not ok')
			setChartDataError(true)
			console.warn('Error occurred while fetching data: ', error)
		}
	}

	useEffect(() => {
		if (selectedInstrument?.cryptoSymbol) {
			fetchData()
		}
	}, [selected])

	function convertData(data: StockData[]): ChartDataPoint[] {
		return data.map(stockData => ({
			date: stockData.Date,
			close: parseFloat(parseFloat(stockData.Close).toFixed(2)),
		}))
	}

	return (
		<div>
			<div
				style={{
					marginBottom: '10px',
					borderRadius: '10px', // Optional, for rounded corners
					padding: '4px', // Optional, for spacing inside the div
				}}>
				<FormControl
					fullWidth
					variant='outlined'
					sx={{
						marginBottom: '20px',
						borderColor: theme.HINT,
						borderRadius: '4px',
						'& .MuiOutlinedInput-root': {
							'& fieldset': {
								borderColor: theme.HINT,
							},
							'&:hover fieldset': {
								borderColor: theme.HINT,
							},
							'&.Mui-focused fieldset': {
								borderColor: theme.HINT,
							},
							color: theme.TERTIARY,
						},
						'& .MuiSelect-select': {
							color: theme.TERTIARY, // Text color for the select
						},
					}}>
					<Select
						value={selected}
						onChange={e => setSelected(e.target.value)}
						displayEmpty
						inputProps={{ 'aria-label': 'Without label' }}>
						{pickListData.map(item => (
							<MenuItem key={item.key} value={item.value}>
								{item.value}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</div>
			{data ? (
				<AreaChart
					width={chartWidth}
					height={chartHeight}
					data={convertData(data)}
					margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
					<defs>
						<linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
							<stop offset='5%' stopColor='#8884d8' stopOpacity={0.8} />
							<stop offset='95%' stopColor='#8884d8' stopOpacity={0} />
						</linearGradient>
					</defs>
					<CartesianGrid strokeDasharray='3 3' />
					<XAxis dataKey='date' />
					<YAxis domain={['dataMin', 'dataMax']} tickFormatter={value => `$${value}`} />
					<Tooltip />
					<Area
						type='monotone'
						dataKey='close'
						stroke='#8884d8'
						fillOpacity={0.3}
						fill='url(#colorUv)'
						isAnimationActive={true}
						animationDuration={1500}
						animationEasing='ease-in-out'
					/>
				</AreaChart>
			) : (
				<div
					style={{
						width: `${chartWidth}px`,
						height: `${chartHeight}px`,
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						border: '2px solid #ccc',
						borderRadius: '8px',
						padding: '20px',
					}}>
					{chartDataError ? (
						<div style={{ textAlign: 'center' }}>
							<Typography variant='body1' style={{ marginBottom: '12px' }}>
								{chartLoadingErrorTranslation}
							</Typography>
							<Button variant='contained' onClick={fetchData}>
								{tryAgainTranslation}
							</Button>
						</div>
					) : (
						<CircularProgress />
					)}
				</div>
			)}
		</div>
	)
}

export default CustomChart
