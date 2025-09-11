// src/pages/Home.js
function Home() {
	return (
		<div className="container my-5">
			<div className="text-center mb-4">
				<h2 className="display-5 fw-bold">Trang chủ</h2>
				<p className="text-muted">
					Chào mừng bạn đến với website React demo.
				</p>
			</div>

			<div className="row">
				<div className="col-md-4">
					<div className="card shadow-sm border-0 h-100">
						<div className="card-body text-center">
							<h5 className="card-title">Giới thiệu</h5>
							<p className="card-text">
								Tìm hiểu về mục tiêu và định hướng phát triển của chúng tôi.
							</p>
							<a href="#about" className="btn btn-primary">
								Xem thêm
							</a>
						</div>
					</div>
				</div>

				<div className="col-md-4">
					<div className="card shadow-sm border-0 h-100">
						<div className="card-body text-center">
							<h5 className="card-title">Dịch vụ</h5>
							<p className="card-text">
								Các dịch vụ nổi bật mang đến trải nghiệm tốt nhất cho bạn.
							</p>
							<a href="#services" className="btn btn-success">
								Xem thêm
							</a>
						</div>
					</div>
				</div>

				<div className="col-md-4">
					<div className="card shadow-sm border-0 h-100">
						<div className="card-body text-center">
							<h5 className="card-title">Liên hệ</h5>
							<p className="card-text">
								Đừng ngần ngại liên hệ để nhận được sự hỗ trợ từ chúng tôi.
							</p>
							<a href="#contact" className="btn btn-warning text-white">
								Xem thêm
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;
