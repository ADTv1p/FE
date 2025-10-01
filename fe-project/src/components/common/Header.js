import { useLocation, useNavigate } from "react-router-dom";
import { LoginButton, LogoutButton, RegisterButton } from './ActionButtons';
import './Header.css';

const Header = () => {
	const location = useLocation();
	const isLoginPage = location.pathname === '/dang-nhap';
	const isRegisterPage = location.pathname === '/dang-ky';

	const navigate = useNavigate();

	return (
		<nav className="navbar navbar-expand-lg sticky-top bg-white" style={{ color: "#02437D", borderBlockEnd: "1px solid #02437D" }}>
			<div className="container-fluid">
				<a className="navbar-brand fw-bold" href="/"><i className="fas fa-industry me-2"></i>Quản lý quy trình quấn dây điện</a>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav ms-auto">
						<li className="nav-item dropdown">
							<a className="nav-link dropdown-toggle" href="#" id="staffDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-users me-1"></i>Nhân sự</a>
							<ul className="dropdown-menu dropdown-menu-end" aria-labelledby="staffDropdown">
								<li><a className="dropdown-item" href="/quan-ly-nhan-su">Quản lý nhân sự</a></li>
								<li><a className="dropdown-item" href="/them-nhan-su">Thêm nhân sự</a></li>
								<li><hr className="dropdown-divider" style={{ borderTop: "1px solid #02437D" }} /></li>
								<li><a className="dropdown-item" href="/quan-ly-vi-tri">Quản lý vị trí</a></li>
								<li><a className="dropdown-item" href="/them-vi-tri">Thêm vị trí</a></li>
							</ul>
						</li>
						<li className="nav-item dropdown" style={{ position: "relative", zIndex: 1055 }}>
							<a className="nav-link dropdown-toggle" href="#" id="processDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-users me-1"></i>Thao tác</a>
							<ul className="dropdown-menu dropdown-menu-end" aria-labelledby="processDropdown">
								<li><a className="dropdown-item" href="/quan-ly-thao-tac">Quản lý thao tác</a></li>
								<li><a className="dropdown-item" href="/quan-ly-phu-kien">Quản lý phụ kiện</a></li>
								<li><hr className="dropdown-divider" style={{ borderTop: "1px solid #02437D" }} /></li>
								<li><a className="dropdown-item" href="/thong-ke-thao-tac">Thống kê thao tác</a></li>
							</ul>
						</li>

						<li className="nav-item dropdown">
							<a className="nav-link dropdown-toggle" href="#" id="errorDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Lỗi thao tác</a>
							<ul className="dropdown-menu dropdown-menu-end" aria-labelledby="errorDropdown">
								<li><a className="dropdown-item" href="/quan-ly-loi">Quản lý lỗi</a></li>
								<li><a className="dropdown-item" href="/bao-cao-loi">Báo cáo lỗi</a></li>
								<li><hr className="dropdown-divider" style={{ borderTop: "1px solid #02437D" }} /></li>
								<li><a className="dropdown-item" href="/thong-ke-loi">Thống kê lỗi</a></li>
							</ul>
						</li>
						{isLoginPage && <RegisterButton className='ms-5' onClick={() => navigate(`/dang-ky`)} />}
						{isRegisterPage && <LoginButton className='ms-5' onClick={() => navigate(`/dang-nhap`)} />}

						{/* Nếu đã đăng nhập thì hiện Logout */}
						{!isLoginPage && !isRegisterPage && <LogoutButton className='ms-5' />}
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Header;
