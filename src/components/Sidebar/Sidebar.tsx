import React from 'react'
import { List, ListItemIcon, ListItemText, Divider, Paper, Button, ListItemButton } from '@mui/material'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import * as AuthProvider from '../../store/AuthProvider'
import { useNavigate } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import ProfileIcon from '@mui/icons-material/AccountCircle'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import CommunityIcon from '@mui/icons-material/Group'
import TrendIcon from '@mui/icons-material/TrendingUp'
import LogOutIcon from '@mui/icons-material/ExitToApp'
import InfoIcon from '@mui/icons-material/Info'
import { useTheme } from '../../store/themeContext'

const menuItems = [
	{ id: 'sidebar.dashboard', text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
	{ id: 'sidebar.trends', text: 'Trends', icon: <TrendIcon />, path: '/trends' },
	{ id: 'sidebar.community', text: 'Community', icon: <CommunityIcon />, path: '/community' },
	{ id: 'sidebar.profile', text: 'Profile', icon: <ProfileIcon />, path: '/profile' },
	{ id: 'sidebar.about', text: 'About Us', icon: <InfoIcon />, path: '/about' },
]

type SidebarProps = {
	currentView: string
	onMenuClick?: (view: string) => void
}
const Sidebar: React.FC<SidebarProps> = ({ currentView, onMenuClick }) => {
	const { TERTIARY, BACKGROUND, LIGHT_HINT } = useTheme()
	const { logout } = AuthProvider.useAuth()
	const location = useLocation()
	const navigate = useNavigate()
	const handleLogout = async () => {
		try {
			await logout()
			navigate('/')
		} catch (error) {
			console.error('Logout failed', error)
		}
	}
	const handleClick = (view: string) => {
		if (onMenuClick) {
			onMenuClick(view)
		}
	}
	const styles = {
		activeListItem: {
			backgroundColor: LIGHT_HINT,
			color: TERTIARY,
		},
		listItemButton: {
			width: '100%',
			justifyContent: 'flex-start',
			'&:hover': {
				backgroundColor: LIGHT_HINT,
			},
		} as React.CSSProperties,
		sidebar: {
			position: 'fixed' as 'fixed', // Type assertion here
			top: 0,
			left: 0,
			height: '100%',
			width: '250px',
			backgroundColor: BACKGROUND,
			color: TERTIARY,
			display: 'flex' as 'flex', // Type assertion here
			flexDirection: 'column' as 'column', // Type assertion here
			justifyContent: 'space-between' as 'space-between', // Type assertion here
			zIndex: 1000, // zIndex is fine as a number
		},

		listItem: {
			'&:hover': {
				backgroundColor: LIGHT_HINT,
				color: TERTIARY,
			},
		},
		ListItemText: { color: TERTIARY },
		logoutButton: {
			alignSelf: 'center',
			marginBottom: 10,
			color: TERTIARY,
			borderColor: TERTIARY,
		},
		logoContainer: {
			display: 'flex',
			alignItems: 'center',
			marginBottom: '20px',
		},
		logo: {
			width: '80px',
			height: '80px',
			marginRight: '15px',
		},
		appName: {
			fontSize: '20px',
			color: TERTIARY,
		},
	}

	return (
		<Paper style={styles.sidebar} elevation={3}>
			<div style={styles.logoContainer}>
				<img src='/assets/logo/trademoodicon.png' alt='Trade Mood Logo' style={styles.logo} />
				<span style={styles.appName}>Trade Mood</span>
			</div>
			<List>
				{menuItems.map((item, index) => (
					<React.Fragment key={item.text}>
						<Link to={item.path} style={{ textDecoration: 'none' }}>
							<ListItemButton
								onClick={() => handleClick(item.text)}
								sx={
									location.pathname === item.path
										? {
												...styles.listItem,
												...styles.activeListItem,
												'& .MuiListItemText-primary': { color: styles.activeListItem.color },
										  }
										: {
												...styles.listItem,
												'& .MuiListItemText-primary': { color: TERTIARY },
										  }
								}>
								<ListItemIcon>{React.cloneElement(item.icon, { style: { color: TERTIARY } })}</ListItemIcon>
								<ListItemText primary={<FormattedMessage id={item.id} defaultMessage={item.text} />} />
								{location.pathname === item.path && <ArrowForwardIosIcon />}
							</ListItemButton>
						</Link>
						{index !== menuItems.length - 1 && <Divider />}
					</React.Fragment>
				))}
			</List>
			<Button
				variant='outlined'
				color='inherit'
				startIcon={<LogOutIcon />}
				style={styles.logoutButton}
				onClick={handleLogout}>
				<FormattedMessage id='sidebar.logout' defaultMessage='Log Out' />
			</Button>
		</Paper>
	)
}

export default Sidebar
