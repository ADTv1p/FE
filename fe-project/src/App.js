import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import StaffManagement from "./components/StaffManagement";
import AddStaff from "./components/AddStaff";
import Header from './components/Header';
function App() {
	return (
		<Router>
			<nav>
				<Header />
			</nav>
			<div style={{ backgroundColor: '#78909c', padding: '2em' }}>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/staff" element={<StaffManagement />} />
					<Route path="/add-staff" element={<AddStaff />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
