import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import StaffManagement from "./pages/StaffManagement";
function App() {
	return (
		<Router>
			<nav>
				<Link to="/">Home</Link> | <Link to="/about">About</Link> | <Link to="/staff">Staff</Link>
			</nav>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
        <Route path="/staff" element={<StaffManagement />} />

			</Routes>
		</Router>
	);
}

export default App;
