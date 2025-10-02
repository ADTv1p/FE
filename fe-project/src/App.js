import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ToastContainer } from "react-toastify";

import PrivateRoute from './components/common/PrivateRoute';

import YazakiIntroPage from './components/YazakiIntroPage';
import TestView from './components/TestView';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

import StaffManagement from "./components/pages/staff/StaffManagementPage";
import AddStaff from "./components/pages/staff/AddStaffPage";
import StaffDetail from "./components/pages/staff/StaffDetailPage";
import PositionManagement from './components/pages/positon/PositonManagemantPage';
import AddPosition from './components/pages/positon/AddPositionPage';
import AccessoryManagemant from './components/pages/accessory/AccessoryManagemantPage';
import ProcessManagement from './components/pages/process/ProcessManagementPage';
import ReportError from './components/pages/error/ReportErrorPage';
import ReportErrorDetail from './components/pages/error/ReportErrorDetailPage';
import ErrorStatistics from './components/pages/statistic/ErrorsStatistics/ErrorStatisticsPage';
import ProcessStatistics from './components/pages/statistic/ProcessesStatistic/ProcessStatisticsPage';
import ErrorManagerment from './components/pages/error/ErrorManagermentPage';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
function App() {
	return (
		<Router>
			<Header />
			<div style={{ padding: '2em', minHeight: '100vh' }}>
				<Routes>
					{/* --- Nhóm 0: Đăng nhập & Đăng ký --- */}
					<Route path="/" element={<YazakiIntroPage />} />
					<Route path="/dang-nhap" element={<LoginPage />} />
					<Route path="/dang-ky" element={<RegisterPage />} />
  					<Route element={<PrivateRoute />}>
						{/* --- Nhóm 1: Trang chung --- */}
						<Route path="/test" element={<TestView />} />
						<Route path="/" element={<ProcessStatistics/>} />
						
						{/* --- Nhóm 2: Quản lý Nhân sự & Vị trí (Phòng ban/Chức vụ) --- */}
						<Route path="/quan-ly-nhan-su" element={<StaffManagement />} />
						<Route path="/them-nhan-su" element={<AddStaff />} />
						<Route path="/quan-ly-nhan-su/chi-tiet-nhan-su/:staff_id" element={<StaffDetail />} />
						<Route path="/quan-ly-vi-tri" element={<PositionManagement />} />
						<Route path="/them-vi-tri" element={<AddPosition />} />

						{/* --- Nhóm 3: Quản lý Vật tư & Quy trình kỹ thuật (Cấu hình hệ thống) --- */}
						<Route path="/quan-ly-phu-kien" element={<AccessoryManagemant />} />
						<Route path="/quan-ly-thao-tac" element={<ProcessManagement />} />

						{/* --- Nhóm 4: Quản lý Lỗi & Báo cáo Lỗi --- */}
						<Route path="/quan-ly-loi" element={<ErrorManagerment />} />
						<Route path="/bao-cao-loi" element={<ReportError />} />
						<Route path="/chi-tiet-loi/:work_record_id" element={<ReportErrorDetail />} />

						{/* --- Nhóm 5: Thống kê & Báo cáo --- */}
						<Route path="/thong-ke-loi" element={<ErrorStatistics />} />
						<Route path="/thong-ke-thao-tac" element={<ProcessStatistics />} /> 
					</Route>
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
			<Footer />
		</Router>
	);
}

export default App;
