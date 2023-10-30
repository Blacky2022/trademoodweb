import React from 'react'
import { List, ListItemIcon, ListItemText, Divider, Paper, Button, ListItemButton } from '@mui/material'
import { theme } from '../../styles/colors'
import ProfileIcon from '@mui/icons-material/AccountCircle'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import CommunityIcon from '@mui/icons-material/Group'
import MarketIcon from '@mui/icons-material/Storefront'
import TrendIcon from '@mui/icons-material/TrendingUp'
import NotificationIcon from '@mui/icons-material/Notifications'
import LogOutIcon from '@mui/icons-material/ExitToApp'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import * as AuthProvider from '../../store/AuthProvider'
import { useNavigate } from 'react-router-dom'
const styles = {
	activeListItem: {
		backgroundColor: theme.dark.LIGHT_HINT, // You can adjust this to your theme
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
		flexDirection: 'column' as 'column', // Explicitly set the type to 'column'
		justifyContent: 'space-between',
	},
	listItem: {
		'&:hover': {
			backgroundColor: theme.dark.LIGHT_HINT, // Use provided hover color
		},
	},
	logoutButton: {
		alignSelf: 'center',
		marginBottom: 10,
		color: theme.dark.TERTIARY, // Use the provided text color for the button
		borderColor: theme.dark.TERTIARY, // Use the provided text color for the button border
	},
	logoContainer: {
		display: 'flex',
		alignItems: 'center',
		marginBottom: '20px',
	},
	logo: {
		width: '80px', // adjust according to your logo size
		height: '80px',
		marginRight: '15px',
	},
	appName: {
		fontSize: '20px', // adjust according to your preference
	},
}

const menuItems = [
	{ text: 'Profile', icon: <ProfileIcon />, path: '/profile' },
	{ text: 'Dashboard', icon: <DashboardIcon />, path: '/', hasArrow: true },
	{ text: 'Community', icon: <CommunityIcon />, path: '/community' },
	{ text: 'Market', icon: <MarketIcon />, path: '/market' },
	{ text: 'Trends', icon: <TrendIcon />, path: '/trends' },
	{ text: 'Notifications', icon: <NotificationIcon />, path: '/notifications' },
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
		await logout();
		navigate('/')
	} catch (error) {
		console.error('Logout failed', error);
		// Optionally, show an error message to the user
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
								<ListItemText primary={item.text} />
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
				onClick={handleLogout}
			>
				LogOut
			</Button>
		</Paper>
	)
}

export default Sidebar
