import React, { useLayoutEffect, useState, useEffect } from 'react'
import { firestore } from '../../../config/firebase-config'
import { doc, getDoc } from 'firebase/firestore'

type UserInfoProps = {
	userUID?: string
}

export default function UserInfo({ userUID }: UserInfoProps) {
	const [displayName, setDisplayName] = useState<string | undefined>()
	const [email, setEmail] = useState<string | undefined>()
	const [firstName, setFirstName] = useState<string | undefined>()
	const [lastName, setLastName] = useState<string | undefined>()

	useLayoutEffect(() => {
		async function getUserDetails() {
			if (userUID) {
				try {
					const userDocRef = doc(firestore, 'users', userUID)
					const userDocSnap = await getDoc(userDocRef)
					if (userDocSnap.exists()) {
						const userData = userDocSnap.data()
						setDisplayName(userData?.displayName)
						setEmail(userData?.email)
					} else {
						console.error('User not found')
					}
				} catch (error) {
					console.error('Error fetching user details:', error)
				}
			}
		}

		getUserDetails()
	}, [userUID])

	useEffect(() => {
		if (displayName) {
			const nameParts = displayName.split(' ')
			if (nameParts.length === 2) {
				setFirstName(nameParts[0])
				setLastName(nameParts[1])
			}
		}
	}, [displayName])

	return (
		<div>
			<h2>Current profile info</h2>
			<p>Email: {email}</p>
			<p>First Name: {firstName}</p>
			<p>Last Name: {lastName}</p>
		</div>
	)
}
