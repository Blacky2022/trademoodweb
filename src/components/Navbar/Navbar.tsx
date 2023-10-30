import React, { useContext } from 'react'
import { Avatar, Typography, AppBar, Toolbar, Box } from '@mui/material'
import { theme } from '../../styles/colors'
import { AuthContext } from '../../store/AuthProvider'
const styles = {
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
	onMenuClick: () => void
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onMenuClick }) => {
	
	const { user } = useContext(AuthContext); // Destructuring to get the user object

	return (
		<AppBar position='static' style={styles.navbar as React.CSSProperties}>
			<Toolbar>
				{/* View Name */}
				<Typography variant='h4' style={styles.viewName as React.CSSProperties}>
					{currentView}
				</Typography>

				{/* Spacer to push content to the edges */}
				<Box flexGrow={1}></Box>

				{/* User Section */}
				<Box style={styles.userSection as React.CSSProperties}>
					<Avatar src={'avatar.jpg'} style={styles.userAvatar as React.CSSProperties} />
					<Typography variant='h6' style={styles.userName as React.CSSProperties}>
						Hello, {user?.displayName}!
					</Typography>
				</Box>
			</Toolbar>
		</AppBar>
	)
}

export default Navbar
