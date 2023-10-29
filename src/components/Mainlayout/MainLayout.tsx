import { useLocation } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';

interface MainLayoutProps {
	children?: React.ReactNode;
	// other props if needed
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
	const location = useLocation();

	// Convert path to view name for display. e.g. '/dashboard' becomes 'Dashboard'
	const currentView = location.pathname.slice(1).charAt(0).toUpperCase() + location.pathname.slice(2);

	return (
		<div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
			<div style={{ flex: '0 0 250px', height: '100vh' }}>
				<Sidebar currentView={currentView} />
			</div>
			<div style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
				<Navbar
					currentView={currentView} // Pass currentView to Navbar
					userName='johndoe'
					onMenuClick={function (): void {
						throw new Error('Function not implemented.');
					}}
				/>
				<div>{children}</div>
			</div>
		</div>
	);
};

export default MainLayout;
