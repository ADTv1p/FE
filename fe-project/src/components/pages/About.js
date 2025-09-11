function About() {
	return (
		<div className="p-5 bg-white rounded">
			<h1 className="mb-4 text-center" style={{ color: "#dc3545" }}>Giới thiệu hệ thống</h1>
			
			<p className="lead text-center mb-5">
				Hệ thống được phát triển nhằm nâng cao hiệu suất sản xuất, tập trung vào quản lý thao tác quấn <strong style={{ color: "#dc3545" }}>tape</strong> (băng keo) và kiểm soát các <strong style={{ color: "#dc3545" }}>lỗi</strong> phát sinh trong quá trình.
			</p>

			<div className="row g-4">
				<div className="col-md-6">
					<div className="card h-100 shadow-sm">
						<div className="card-body">
							<h3 className="card-title mb-3" style={{ color: "#000000" }}>Quản lý thao tác quấn tape</h3>
							<p>Theo dõi chi tiết từng bước thực hiện:</p>
							<ul>
								<li>Hướng dẫn thao tác từng bước</li>
								<li>Danh sách công cụ và phụ kiện cần thiết</li>
								<li>Ghi nhận trạng thái hoàn thành từng bước</li>
								<li>Chuẩn hóa quy trình cho tất cả nhân sự</li>
								<li>Hỗ trợ đào tạo và giảm sai sót</li>
							</ul>
						</div>
					</div>
				</div>

				<div className="col-md-6">
					<div className="card h-100 shadow-sm">
						<div className="card-body">
							<h3 className="card-title mb-3" style={{ color: "#000000" }}>Quản lý lỗi khi quấn tape</h3>
							<p>Ghi nhận và xử lý lỗi phát sinh:</p>
							<ul>
								<li>Ghi nhận lỗi trực tiếp từ quá trình quấn tape</li>
								<li>Phân loại theo loại và mức độ nghiêm trọng</li>
								<li>Thống kê và báo cáo để cải thiện chất lượng</li>
								<li>Hỗ trợ đào tạo nhân viên giảm sai sót</li>
								<li>Giám sát tiến độ sửa lỗi và cập nhật trạng thái</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			<div className="row g-4 mt-1">
				<div className="col-md-6">
					<div className="card h-100 shadow-sm" style={{ borderColor: "#dee2e6" }}>
						<div className="card-body">
							<h3 className="card-title mb-3" style={{ color: "#000000" }}>Báo cáo & Thống kê</h3>
							<p>Hệ thống cung cấp các báo cáo trực quan:</p>
							<ul>
								<li>Thống kê số lỗi theo loại và thời gian</li>
								<li>Báo cáo tiến độ quấn tape từng ca, từng nhân sự</li>
								<li>Biểu đồ hiệu suất sản xuất</li>
								<li>Xu hướng cải tiến chất lượng theo thời gian</li>
							</ul>
						</div>
					</div>
				</div>

				<div className="col-md-6">
					<div className="card h-100 shadow-sm" style={{ borderColor: "#dee2e6" }}>
						<div className="card-body">
							<h3 className="card-title mb-3" style={{ color: "#000000" }}>Quản lý tiến độ & Nhân sự</h3>
							<p>Hỗ trợ theo dõi nhân sự và tiến độ công việc:</p>
							<ul>
								<li>Phân công công việc theo nhân viên và ca làm</li>
								<li>Giám sát tiến độ thực hiện từng bước quấn tape</li>
								<li>Nhắc nhở các bước chưa hoàn thành</li>
								<li>Đánh giá hiệu suất làm việc của nhân viên</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			<p className="text-muted mt-5 text-center">
				Hệ thống cung cấp giải pháp toàn diện, trực quan và dễ sử dụng, giúp nâng cao chất lượng sản xuất, tối ưu hóa quy trình và giảm thiểu lỗi phát sinh.
			</p>
		</div>
	);
}

export default About;
