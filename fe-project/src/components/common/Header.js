import './Header.css';
const Header = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#2cbba1ff" }}>
			<div className="container-fluid">
				<a className="navbar-brand fw-bold" href="/"><i className="fas fa-industry me-2"></i>Quản lý quy trình quấn dây điện</a>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav ms-auto">
						<li className="nav-item"><a className="nav-link" href="/"><i className="fas fa-home me-1"></i>Trang chủ</a></li>
						<li className="nav-item"><a className="nav-link" href="/about"><i className="fas fa-info-circle me-1"></i>Giới thiệu</a></li>
						<li className="nav-item dropdown">
							<a className="nav-link dropdown-toggle" href="#" id="staffDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-users me-1"></i>Nhân sự</a>
							<ul className="dropdown-menu dropdown-menu-end" aria-labelledby="staffDropdown">
								<li><a className="dropdown-item" href="/quan-ly-nhan-su">Quản lý nhân sự</a></li>
								<li><a className="dropdown-item" href="/them-nhan-su">Thêm nhân sự</a></li>
								<li><hr className="dropdown-divider" style={{ borderTop: "1px solid #fff" }} /></li>
								<li><a className="dropdown-item" href="/quan-ly-vi-tri">Quản lý vị trí</a></li>
								<li><a className="dropdown-item" href="/them-vi-tri">Thêm vị trí</a></li>
							</ul>
						</li>
						<li className="nav-item dropdown">
							<a className="nav-link dropdown-toggle" href="#" id="processDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-users me-1"></i>Thao tác</a>
							<ul className="dropdown-menu dropdown-menu-end" aria-labelledby="processDropdown">
								<li><a className="dropdown-item" href="/quan-ly-thao-tac">Quản lý thao tác</a></li>
								<li><a className="dropdown-item" href="/quan-ly-phu-kien">Quản lý phụ kiện</a></li>
								<li><hr className="dropdown-divider" style={{ borderTop: "1px solid #fff" }} /></li>
								<li><a className="dropdown-item" href="/staff-department">Phòng ban</a></li>
							</ul>
						</li>

						<li className="nav-item dropdown">
							<a className="nav-link dropdown-toggle" href="#" id="errorDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Lỗi thao tác</a>
							<ul className="dropdown-menu dropdown-menu-end" aria-labelledby="errorDropdown">
								<li><a className="dropdown-item" href="/quan-ly-loi">Quản lý lỗi</a></li>
								<li><a className="dropdown-item text-danger" href="/bao-cao-loi">Báo cáo lỗi</a></li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Header;
