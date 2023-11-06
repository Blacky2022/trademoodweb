import React, { useLayoutEffect, useState } from 'react'
import { firestore } from '../../../config/firebase-config'
import { doc, getDoc } from 'firebase/firestore'
import { useIntl } from 'react-intl'

type UserInfoProps = {
	userUID?: string
}

export default function UserInfo({ userUID }: UserInfoProps) {
	const [displayName, setDisplayName] = useState<string | undefined>()
	const [email, setEmail] = useState<string | undefined>()
	const [firstName, setFirstName] = useState<string | undefined>()
	const [lastName, setLastName] = useState<string | undefined>()
	const { formatMessage } = useIntl()

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
						console.error(formatMessage({ id: 'userInfo.error.userNotFound' }))
					}
				} catch (error) {
					console.error(formatMessage({ id: 'userInfo.error.fetchError' }), error)
				}
			}
		}

		getUserDetails()
	}, [userUID, formatMessage])

	useLayoutEffect(() => {
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
			<h2>{formatMessage({ id: 'userInfo.title' })}</h2>
			<p>
				{formatMessage({ id: 'userInfo.email' })}: {email}
			</p>
			<p>
				{formatMessage({ id: 'userInfo.firstName' })}: {firstName}
			</p>
			<p>
				{formatMessage({ id: 'userInfo.lastName' })}: {lastName}
			</p>
		</div>
	)
}
