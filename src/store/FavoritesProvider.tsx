import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	onSnapshot,
	runTransaction,
	serverTimestamp,
	setDoc,
	updateDoc,
} from 'firebase/firestore'
import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { number } from 'yup'
import { auth, firestore } from '../config/firebase-config'

export const FavoritesContext = createContext<{
	ids: string[]
	addFavorite: (id: string) => void
	removeFavorite: (id: string) => void
}>({
	ids: [],
	addFavorite: (id: string) => {},
	removeFavorite: (id: string) => {},
})

type FavoritesContextProviderProps = {
	children: ReactNode
}

function FavoritesContextProvider({ children }: FavoritesContextProviderProps) {
	const [favoriteCryptoIds, setFavoriteCryptoIds] = useState<string[]>([])

	useEffect(() => {
		const fetchData = async () => {
			console.log('Fetching favorite crypto')
			const user = auth.currentUser
			if (user) {
				const userRef = doc(firestore, 'users', user.uid)
				const document = await getDoc(userRef)
				if (document.exists()) {
					const data = document.data()
					if (data && data.favoriteCryptoIds) {
						setFavoriteCryptoIds(data.favoriteCryptoIds)
					}
				} else {
					const newData = {
						favoriteCryptoIds: [],
					}
					await setDoc(userRef, newData)
				}
			}
		}

		fetchData()
	}, [])

	async function addFavorite(id: string) {
		const user = auth.currentUser
		if (user) {
			const userRef = doc(firestore, 'users', user.uid)
			await runTransaction(firestore, async transaction => {
				const document = await getDoc(userRef)
				if (document.exists()) {
					const data = document.data()
					if (data && data.favoriteCryptoIds) {
						const updatedIds = [...data.favoriteCryptoIds, id]
						transaction.update(userRef, { favoriteCryptoIds: updatedIds })
						setFavoriteCryptoIds(updatedIds)
					} else {
						transaction.set(userRef, { favoriteCryptoIds: [id] }, { merge: true })
						setFavoriteCryptoIds([id])
					}
				}
			})
		}
	}

	async function removeFavorite(id: string) {
		const user = auth.currentUser
		if (user) {
			const userRef = doc(firestore, 'users', user.uid)
			await runTransaction(firestore, async transaction => {
				const document = await transaction.get(userRef)
				if (document.exists()) {
					const data = document.data()
					if (data && data.favoriteCryptoIds) {
						const updatedIds = data.favoriteCryptoIds.filter((cryptoId: string) => cryptoId !== id)
						transaction.update(userRef, { favoriteCryptoIds: updatedIds })
						setFavoriteCryptoIds(updatedIds)
					}
				}
			})
		}
	}

	const value = {
		ids: favoriteCryptoIds,
		addFavorite: addFavorite,
		removeFavorite: removeFavorite,
	}

	return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export default FavoritesContextProvider

export function useFavoriteInstrument() {
	const favoriteInstrument = useContext(FavoritesContext)

	if (favoriteInstrument === undefined) {
		throw new Error('useFavoriteInstrument must be used within an FavoritesContext')
	}

	return favoriteInstrument
}
