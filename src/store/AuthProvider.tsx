import React, { ReactNode, createContext, useContext, useState } from 'react'
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	sendPasswordResetEmail,
	signOut,
	signInAnonymously,
	User,
	updateProfile,
	updateEmail,
	updatePassword,
	sendEmailVerification,
} from 'firebase/auth'
import { collection, doc, setDoc, updateDoc } from 'firebase/firestore'
import { auth, firestore } from '../config/firebase-config'

export type AuthContextType = {
	user: User | null
	setUser: React.Dispatch<React.SetStateAction<User | null>>
	login: (email: string, password: string) => Promise<void>
	register: (
		email: string,
		password: string,
		firstName: string,
		lastName: string,
		imageUrl: string | null | undefined
	) => Promise<void>
	logout: () => Promise<void>
	resetPassword: (email: string) => Promise<void>
	signInAnonymously: () => Promise<void>
	updateEmail: (newEmail: string) => Promise<void>
	updatePersonalData: (firstName: string, lastName: string) => Promise<void>
	updateProfilePicture: (imageUrl: string | null | undefined) => Promise<void>
	updatePassword: (newPassword: string) => Promise<void>
	updateAboutMe: (newAboutMe: string) => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({
	user: null,
	setUser: () => {},
	login: async () => {},
	register: async () => {},
	logout: async () => {},
	resetPassword: async () => {},
	signInAnonymously: async () => {},
	updateEmail: async () => {},
	updatePersonalData: async () => {},
	updateProfilePicture: async () => {},
	updatePassword: async () => {},
	updateAboutMe: async () => {},
})

export type AuthProviderProps = {
	children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
	const [user, setUser] = useState<User | null>(null)

	return (
		<AuthContext.Provider
			value={{
				user,
				setUser,
				login: async (email: string, password: string) => {
					await signInWithEmailAndPassword(auth, email, password)
					console.log('user logged')
				},
				register: async (
					email: string,
					password: string,
					firstName: string,
					lastName: string,
					imageUrl: string | null | undefined,
					aboutMe?: string
				) => {
					try {
						const userCredential = await createUserWithEmailAndPassword(auth, email, password)
						const user = userCredential.user
						if (user) {
							let displayName = `${firstName.trim()} ${lastName.trim()}`
							let photoURL = imageUrl || null
							if (photoURL) {
								updateProfile(user, {
									displayName: displayName,
									photoURL: photoURL,
								})
							} else {
								updateProfile(user, {
									displayName: displayName,
								})
							}
							await sendEmailVerification(user)
							const usersCollection = collection(firestore, 'users')
							await setDoc(doc(usersCollection, user.uid), {
								email: email,
								displayName: displayName,
								photoURL: photoURL,
								aboutMe: '',
								followers: [],
								following: [],
							})
						}
					} catch (error) {
						console.error('Registration error:', error)
						throw error
					}
				},

				logout: async () => {
					try {
						await signOut(auth)
					} catch (error) {
						console.log(error)
					}
				},
				resetPassword: async (email: string) => {
					await sendPasswordResetEmail(auth, email)
				},
				signInAnonymously: async () => {
					try {
						await signInAnonymously(auth)
					} catch (error) {
						console.log(error)
					}
				},
				updateEmail: async (newEmail: string) => {
					const user = auth.currentUser
					if (user) {
						await updateEmail(user, newEmail)
						await sendEmailVerification(user)

						const userDocRef = doc(firestore, 'users', user.uid)
						await updateDoc(userDocRef, {
							email: newEmail,
						})
					}
				},
				updatePersonalData: async (firstName: string, lastName: string) => {
					const user = auth.currentUser
					if (user) {
						let displayName = `${firstName.trim()} ${lastName.trim()}`
						await updateProfile(user, {
							displayName: displayName,
						})
						const userDocRef = doc(firestore, 'users', user.uid)
						await updateDoc(userDocRef, {
							displayName: displayName,
						})
					}
				},
				updateProfilePicture: async (imageUrl: string | null | undefined) => {
					const user = auth.currentUser
					if (user) {
						await updateProfile(user, {
							photoURL: imageUrl,
						})
						const userDocRef = doc(firestore, 'users', user.uid)
						await updateDoc(userDocRef, {
							photoURL: imageUrl,
						})
					}
				},
				updatePassword: async (newPassword: string) => {
					const user = auth.currentUser
					if (user) {
						await updatePassword(user, newPassword)
					}
				},
				updateAboutMe: async (aboutMe: string | null) => {
					const user = auth.currentUser
					if (user) {
						const userDocRef = doc(firestore, 'users', user.uid)
						await updateDoc(userDocRef, {
							aboutMe: aboutMe,
						})
					}
				},
			}}>
			{children}
		</AuthContext.Provider>
	)
}

export function useAuth() {
	const authContext = useContext(AuthContext)
	if (!authContext) {
		throw new Error('useAuth must be used within an AuthProvider')
	}
	return authContext
}
