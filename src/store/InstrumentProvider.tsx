import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { firestore } from '../config/firebase-config'

export const InstrumentContext = createContext<InstrumentProps[] | undefined>(undefined)

type InstrumentProviderProps = {
	children: ReactNode
}

export type InstrumentProps = {
	id: string
	cryptoSymbol: string
	crypto: string
	activityDaily: number
	activityWeekly: number
	sentimentPositive: number
	sentimentNeutral: number
	sentimentNegative: number
	overallSentiment: string
	sentimentDirection: string
	datetime: number
	photoUrl: string
}

export function InstrumentProvider({ children }: InstrumentProviderProps) {
	const [instruments, setInstruments] = useState<InstrumentProps[]>()

	useEffect(() => {
		const fetchInstruments = () => {
			try {
				const data = localStorage.getItem('instruments')
				if (data) {
					const parsedData = JSON.parse(data) as InstrumentProps[]
					setInstruments(parsedData)
				}
			} catch (error) {
				console.error('Error while fetching instruments from localStorage', error)
			}
		}

		fetchInstruments()
	}, [])

	useEffect(() => {
		const unsubscribe = onSnapshot(collection(firestore, 'instruments'), querySnapshot => {
			const list: InstrumentProps[] = []
			querySnapshot.forEach(doc => {
				const {
					cryptoSymbol,
					crypto,
					activityDaily,
					activityWeekly,
					sentimentPositive,
					sentimentNeutral,
					sentimentNegative,
					overallSentiment,
					sentimentDirection,
					datetime,
					photoUrl,
				} = doc.data()

				const instrument: InstrumentProps = {
					id: doc.id,
					cryptoSymbol,
					crypto,
					activityDaily,
					activityWeekly,
					sentimentPositive,
					sentimentNeutral,
					sentimentNegative,
					overallSentiment,
					sentimentDirection,
					datetime,
					photoUrl,
				}

				list.push(instrument)
			})

			setInstruments(list)
			localStorage.setItem('instruments', JSON.stringify(list))
		})

		return () => unsubscribe()
	}, [])

	return <InstrumentContext.Provider value={instruments}>{children}</InstrumentContext.Provider>
}

export function useInstrument() {
	const instruments = useContext(InstrumentContext)

	if (instruments === undefined) {
		throw new Error('useInstrument must be used within an InstrumentProvider')
	}

	return instruments
}
