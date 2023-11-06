import React, { useContext, useEffect, useState } from 'react'
import { Avatar, Typography, AppBar, Toolbar, Box, Select, MenuItem } from '@mui/material'
import { theme } from '../../styles/colors'
import { AuthContext } from '../../store/AuthProvider'
import { LanguageContext } from '../../lang/LangProvider'
import { SelectChangeEvent } from '@mui/material/Select'
import { FormattedMessage } from 'react-intl'
const styles = {
	languageSelect: {
		color: theme.dark.HINT,
		borderBottom: 'none',
	},
	navbar: {
		backgroundColor: theme.dark.BACKGROUND,
		color: theme.dark.TERTIARY,
		position: 'relative',
	},
	userSection: {
		display: 'flex',
		alignItems: 'center',
	},
	userName: {
		marginLeft: '10px',
		color: theme.dark.HINT,
	},
	userAvatar: {
		width: '50px',
		height: '50px',
	},
	viewName: {
		marginLeft: '20px',
	},
}

interface NavbarProps {
	userName: string
	currentView: string
}

const Navbar: React.FC<NavbarProps> = ({ currentView }) => {
	const { user } = useContext(AuthContext)
	const { language, setLanguage } = useContext(LanguageContext)
	const [lang, setLang] = useState(localStorage.getItem('appLanguage') || language)

	useEffect(() => {
		localStorage.setItem('appLanguage', language)
		setLang(language)
	}, [language])

	const handleLanguageChange = (event: SelectChangeEvent) => {
		const selectedLang = event.target.value as string
		setLanguage(selectedLang)
		localStorage.setItem('appLanguage', selectedLang)
		setLang(selectedLang)
	}
	return (
		<AppBar position='static' style={styles.navbar as React.CSSProperties}>
			<Toolbar>
				<Typography variant='h4' style={styles.viewName as React.CSSProperties}>
					{currentView}
				</Typography>

				<Box flexGrow={1}></Box>

				<Select
					value={lang}
					onChange={handleLanguageChange}
					style={styles.languageSelect as React.CSSProperties}
					displayEmpty>
					<MenuItem value='en'>
						<FormattedMessage id='menuItems.english' defaultMessage='English' />
					</MenuItem>
					<MenuItem value='pl'>
						<FormattedMessage id='menuItems.polish' defaultMessage='Polish' />
					</MenuItem>
					<MenuItem value='cn'>
						<FormattedMessage id='menuItems.Chinese' defaultMessage='Chinese' />
					</MenuItem>
				</Select>

				<Box style={styles.userSection as React.CSSProperties}>
					<Avatar src={user?.photoURL || 'avatar.jpg'} style={styles.userAvatar as React.CSSProperties} />
					<Typography variant='h6' style={styles.userName as React.CSSProperties}>
						<FormattedMessage id='navbar.hello' values={{ name: user?.displayName || 'Guest' }} />
					</Typography>
				</Box>
			</Toolbar>
		</AppBar>
	)
}

export default Navbar
