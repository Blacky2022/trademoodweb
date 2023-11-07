import React from 'react'
import './AboutUs.css'
import { FormattedMessage } from 'react-intl'
import AssessmentIcon from '@mui/icons-material/Assessment'
import FeaturesIcon from '@mui/icons-material/Extension'
import DecisionIcon from '@mui/icons-material/ThumbUp'
import { useTheme } from '../../store/themeContext'

const About = () => {
	const { TERTIARY, BACKGROUND} = useTheme()
	const style = {
		'--background-color': BACKGROUND,
		'--text-color': TERTIARY,
		'--icon-color': TERTIARY,
	} as React.CSSProperties
	return (
		<div className='container' style={style}>
			<div className='content'>
				<div className='column'>
					<AssessmentIcon style={{ fontSize: 40, color: TERTIARY }} />
					<h2 className='subtitle'>
						<FormattedMessage id='about.keyObjectivesTitle' defaultMessage='Key Objectives of the Application:' />
					</h2>
					<p className='contentText'>
						<FormattedMessage
							id='about.keyObjectivesDescription'
							defaultMessage='Our application allows for the collection and analysis of vast amounts of data from various sources such as social media, websites, and discussion forums. The application can also be used for research purposes. It helps identify market sentiment trends and patterns, analyze the impact of events on investor sentiments.'
						/>
					</p>
				</div>
				<div className='column'>
					<FeaturesIcon style={{ fontSize: 40, color: TERTIARY }} />
					<h2 className='subtitle'>
						<FormattedMessage id='about.featuresTitle' defaultMessage='Application Features:' />
					</h2>
					<p className='contentText'>
						<FormattedMessage
							id='about.featuresDescription'
							defaultMessage='The application allows for real-time data collection and processing from various sources, enabling real-time market analysis. Our application tracks stock price changes, providing up-to-date information.'
						/>
					</p>
				</div>
				<div className='column'>
					<DecisionIcon style={{ fontSize: 40, color: TERTIARY }} />
					<h2 className='subtitle'>
						<FormattedMessage id='about.smartDecisionsTitle' defaultMessage='Stay Informed and Make Smart Decisions:' />
					</h2>
					<p className='contentText'>
						<FormattedMessage
							id='about.smartDecisionsDescription'
							defaultMessage='Our goal is to empower investors with the knowledge and insights they need to make informed decisions. Stay ahead of market trends, understand investor sentiments, and navigate the world of investment with confidence using our comprehensive market sentiment analysis tool.'
						/>
					</p>
				</div>
			</div>
		</div>
	)
}

export default About
