// ActivityComparison.tsx
import React from 'react'
import { InstrumentProps } from '../../../store/InstrumentProvider'
import ActivityIndicator from './ActivityIndicator' 

interface ActivityComparisonProps {
	selectedInstrument: InstrumentProps
}

const ActivityComparison: React.FC<ActivityComparisonProps> = ({ selectedInstrument }) => {
	const todayVsWeek = selectedInstrument.activityDaily
	const todayVsYesterday = selectedInstrument.activityWeekly 


	return (
		<>
			<ActivityIndicator label="Today's Activity vs Week's" value={todayVsWeek} />
			<ActivityIndicator label="Today's Activity vs Yesterday's" value={todayVsYesterday} />
		</>
	)
}

export default ActivityComparison
