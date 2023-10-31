import React from 'react'
import './AboutUs.css'
import AssessmentIcon from '@mui/icons-material/Assessment' // An example icon
import FeaturesIcon from '@mui/icons-material/Extension' // An example icon
import DecisionIcon from '@mui/icons-material/ThumbUp' // An example icon

const About = () => {
	return (
		<div className='container'>
			<div className='content'>
				<div className='column'>
					<AssessmentIcon style={{ fontSize: 40, color: 'white' }} />
					<h2 className='subtitle'>Key Objectives of the Application:</h2>
					<p className='contentText'>
						Our application allows for the collection and analysis of vast amounts of data from various sources such as
						social media, websites, and discussion forums. The application can also be used for research purposes. It
						helps identify market sentiment trends and patterns, analyze the impact of events on investor sentiments.
					</p>
				</div>
				<div className='column'>
					<FeaturesIcon style={{ fontSize: 40, color: 'white' }} />
					<h2 className='subtitle'>Application Features:</h2>
					<p className='contentText'>
						The application allows for real-time data collection and processing from various sources, enabling real-time
						market analysis. Our application tracks stock price changes, providing up-to-date information.
					</p>
				</div>
				<div className='column'>
					<DecisionIcon style={{ fontSize: 40, color: 'white' }} />
					<h2 className='subtitle'>Stay Informed and Make Smart Decisions:</h2>
					<p className='contentText'>
						Our goal is to empower investors with the knowledge and insights they need to make informed decisions. Stay
						ahead of market trends, understand investor sentiments, and navigate the world of investment with confidence
						using our comprehensive market sentiment analysis tool.
					</p>
				</div>
			</div>
		</div>
	)
}

export default About
