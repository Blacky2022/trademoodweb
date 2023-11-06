import { useLocation } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';

interface MainLayoutProps {
	children?: React.ReactNode;

}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
	const location = useLocation();

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
				/>
				<div>{children}</div>
			</div>
		</div>
	);
};

export default MainLayout;
