import { onRequest } from 'firebase-functions/v2/https'
import * as logger from 'firebase-functions/logger'
import * as functions from 'firebase-functions'
import axios from 'axios'
import cors from 'cors'

// CORS configuration with dynamic origin
const corsHandler = cors({ origin: true, credentials: true })

export const proxyFinanceData = functions.https.onRequest((request, response) => {
	corsHandler(request, response, async () => {
		if (request.method === 'OPTIONS') {
			// Send response for preflight requests
			response.status(204).send('')
		} else {
			// Parse request parameters
			const cryptoSymbol: string = request.query.cryptoSymbol as string
			const period1: string = request.query.period1 as string
			const period2: string = request.query.period2 as string
			const interval: string = request.query.interval as string

			// Construct the API endpoint
			const baseURL: string = 'https://query1.finance.yahoo.com/v7/finance/download'
			const url: string = `${baseURL}/${cryptoSymbol}-USD?period1=${period1}&period2=${period2}&interval=${interval}&events=history`

			try {
				// Make the request to the external API
				const res = await axios.get(url)
				// Respond with the data from the external API
				response.status(200).send(res.data)
			} catch (error) {
				// Log and respond with the error
				console.error('Error fetching finance data:', error)
				response.status(500).send('Error fetching finance data')
			}
		}
	})
})
