import React, { useContext, useEffect, useState } from 'react';
import { Avatar, Typography, AppBar, Toolbar, Box, Select, MenuItem } from '@mui/material';
import { AuthContext } from '../../store/AuthProvider';
import { LanguageContext } from '../../lang/LangProvider';
import { SelectChangeEvent } from '@mui/material/Select';
import { FormattedMessage } from 'react-intl';
import { useTheme } from '../../store/themeContext';
import IconButton from '@mui/material/IconButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { theme } from '../../styles/colors'

interface NavbarProps {
	userName: string
	currentView: string
}

const Navbar: React.FC<NavbarProps> = ({ currentView }) => {
	const { toggleTheme, PRIMARY, SECONDARY, TERTIARY, QUATERNARY, BACKGROUND, HINT, LIGHT_HINT, NEGATIVE, POSITIVE } =
		useTheme()
	const { user } = useContext(AuthContext)
	const { language, setLanguage } = useContext(LanguageContext)
	const [lang, setLang] = useState(localStorage.getItem('appLanguage') || language)

	useEffect(() => {
		localStorage.setItem('appLanguage', language)
		setLang(language)
	}, [language])

	const dynamicStyles = {
		languageSelect: {
			color: TERTIARY,
			borderBottom: 'none',
		},
		navbar: {
			backgroundColor: BACKGROUND,
			color: TERTIARY,
			position: 'relative',
		},
		userSection: {
			display: 'flex',
			alignItems: 'center',
		},
		userName: {
			marginLeft: '10px',
			color: TERTIARY,
		},
		userAvatar: {
			width: '50px',
			height: '50px',
		},
		viewName: {
			marginLeft: '20px',
			color: TERTIARY,
		},
	}

	const handleLanguageChange = (event: SelectChangeEvent) => {
		const selectedLang = event.target.value as string
		setLanguage(selectedLang)
		localStorage.setItem('appLanguage', selectedLang)
		setLang(selectedLang)
	}
	return (
		<AppBar position='fixed' style={dynamicStyles.navbar as React.CSSProperties}>
			<Toolbar>
				<Typography variant='h4' style={dynamicStyles.viewName as React.CSSProperties}>
					{currentView}
				</Typography>

				<Box flexGrow={1}></Box>
				<IconButton onClick={toggleTheme} style={{ color: PRIMARY === theme.light.PRIMARY ? 'black' : 'inherit' }}>
					{PRIMARY === theme.light.PRIMARY ? <DarkModeIcon /> : <LightModeIcon />}
				</IconButton>

				<Select
					value={lang}
					onChange={handleLanguageChange}
					style={dynamicStyles.languageSelect as React.CSSProperties}
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

				<Box style={dynamicStyles.userSection as React.CSSProperties}>
					<Avatar src={user?.photoURL || 'avatar.jpg'} style={dynamicStyles.userAvatar as React.CSSProperties} />
					<Typography variant='h6' style={dynamicStyles.userName as React.CSSProperties}>
						<FormattedMessage id='navbar.hello' values={{ name: user?.displayName || 'Guest' }} />
					</Typography>
				</Box>
			</Toolbar>
		</AppBar>
	)
}

export default Navbar
