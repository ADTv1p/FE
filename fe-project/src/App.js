import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import Home from './components/pages/Home';
import About from './components/pages/About';
import StaffManagement from "./components/pages/staff/StaffManagementPage";
import AddStaff from "./components/pages/staff/AddStaffPage";
import PositionManagement from './components/pages/positon/PositonManagemantPage';
import AddPosition from './components/pages/positon/AddPositionPage';
import AccessoryManagemant from './components/pages/accessory/AccessoryManagemantPage';
import ProcessManagement from './components/pages/process/ProcessManagementPage';
import ReportError from './components/pages/error/ReportErrorPage';
import ReportErrorDetail from './components/pages/error/ReportErrorDetailPage';
import ErrorStatistics from './components/pages/statistic/ErrorStatisticsPage';
import ErrorManagerment from './components/pages/error/ErrorManagermentPage';
import Header from './components/common/Header';
function App() {
	return (
		<Router>
			<Header />
			<div style={{ padding: '2em', minHeight: '100vh', backgroundColor: '#e9e9e9ff' }}>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/gioi-thieu" element={<About />} />
					<Route path="/quan-ly-nhan-su" element={<StaffManagement />} />
					<Route path="/them-nhan-su" element={<AddStaff />} />
					<Route path="/quan-ly-vi-tri" element={<PositionManagement />} />
					<Route path="/them-vi-tri" element={<AddPosition />} />
					<Route path="/quan-ly-phu-kien" element={<AccessoryManagemant />} />
					<Route path="/quan-ly-thao-tac" element={<ProcessManagement />} />
					<Route path="/quan-ly-loi" element={<ErrorManagerment />} />
					<Route path="/chi-tiet-loi/:work_record_id" element={<ReportErrorDetail />} />
					<Route path="/bao-cao-loi" element={<ReportError />} />
					<Route path="/thong-ke-loi" element={<ErrorStatistics />} />
				</Routes>

				<ToastContainer
					position="top-right"   // ví dụ: top-right, top-center, bottom-left,...
					autoClose={3000}       // tự tắt sau 3s
					hideProgressBar={false}
					newestOnTop={true}
					closeOnClick
					pauseOnHover
					draggable
					theme="colored"        // hoặc "light"/"dark"
				/>
			</div>
		</Router>
	);
}

export default App;
