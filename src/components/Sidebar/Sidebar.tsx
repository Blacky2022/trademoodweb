import React from 'react'
import { List, ListItemIcon, ListItemText, Divider, Paper, Button, ListItemButton } from '@mui/material'
import { theme } from '../../styles/colors'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import * as AuthProvider from '../../store/AuthProvider'
import { useNavigate } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import ProfileIcon from '@mui/icons-material/AccountCircle'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import CommunityIcon from '@mui/icons-material/Group'
import MarketIcon from '@mui/icons-material/Storefront'
import TrendIcon from '@mui/icons-material/TrendingUp'
import NotificationIcon from '@mui/icons-material/Notifications'
import LogOutIcon from '@mui/icons-material/ExitToApp'
import InfoIcon from '@mui/icons-material/Info'

const styles = {
	activeListItem: {
		backgroundColor: theme.dark.LIGHT_HINT, 
	},
	listItemButton: {
		width: '100%',
		justifyContent: 'flex-start',
		'&:hover': {
			backgroundColor: theme.dark.LIGHT_HINT,
		},
	} as React.CSSProperties,
	sidebar: {
		height: '100vh',
		width: '250px',
		backgroundColor: theme.dark.BACKGROUND,
		color: theme.dark.TERTIARY,
		display: 'flex',
		flexDirection: 'column' as 'column',
		justifyContent: 'space-between',
	},
	listItem: {
		'&:hover': {
			backgroundColor: theme.dark.LIGHT_HINT, 
		},
	},
	logoutButton: {
		alignSelf: 'center',
		marginBottom: 10,
		color: theme.dark.TERTIARY, 
		borderColor: theme.dark.TERTIARY, 
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
	},
}

const menuItems = [
	{ id: 'sidebar.profile', text: 'Profile', icon: <ProfileIcon />, path: '/profile' },
	{ id: 'sidebar.dashboard', text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard', hasArrow: true },
	{ id: 'sidebar.community', text: 'Community', icon: <CommunityIcon />, path: '/community' },
	{ id: 'sidebar.market', text: 'Market', icon: <MarketIcon />, path: '/market' },
	{ id: 'sidebar.trends', text: 'Trends', icon: <TrendIcon />, path: '/trends' },
	{ id: 'sidebar.about', text: 'About Us', icon: <InfoIcon />, path: '/about' },
]

type SidebarProps = {
	currentView: string
	onMenuClick?: (view: string) => void
}
const Sidebar: React.FC<SidebarProps> = ({ currentView, onMenuClick }) => {
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
									location.pathname === item.path ? { ...styles.listItem, ...styles.activeListItem } : styles.listItem
								}>
								<ListItemIcon>{React.cloneElement(item.icon, { style: { color: theme.dark.TERTIARY } })}</ListItemIcon>
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
