const Footer = () => {

	return (
		<div className="footer bg-dark text-white py-4">
			<div className="container">
				<div className="row">
					<div className="col-md-4 mb-3">
						<h5 className="fw-bold mb-3">Công ty Yazaki Hải Phòng</h5>
						<p style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
						Trụ sở: Khu Công nghiệp Nomura, An Dương, Hải Phòng, Việt Nam<br />
						Email: contact@yazakihaiphong.com<br />
						Hotline: +84 225 1234 567<br />
						Website: www.yazakihaiphong.com
						</p>
					</div>
					<div className="col-md-4 mb-3">
						<h5 className="fw-bold mb-3">Về Chúng Tôi</h5>
						<p style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
						Yazaki Hải Phòng, thuộc Tập đoàn Yazaki Nhật Bản, chuyên sản xuất linh kiện ô tô chất lượng cao, cam kết mang đến sản phẩm đạt tiêu chuẩn toàn cầu và đóng góp vào sự phát triển bền vững của địa phương.
						</p>
					</div>
					<div className="col-md-4 mb-3">
						<h5 className="fw-bold mb-3">Liên Kết Nhanh</h5>
						<ul className="list-unstyled" style={{ fontSize: '0.9rem' }}>
						<li><a href="/about" className="text-white text-decoration-none">Giới thiệu</a></li>
						<li><a href="/products" className="text-white text-decoration-none">Sản phẩm</a></li>
						<li><a href="/careers" className="text-white text-decoration-none">Tuyển dụng</a></li>
						<li><a href="/contact" className="text-white text-decoration-none">Liên hệ</a></li>
						</ul>
					</div>
					</div>
					<div className="text-center mt-4 pt-3 border-top border-secondary">
					<p style={{ fontSize: '0.85rem' }}>
						&copy; 2025 Yazaki Hải Phòng. All Rights Reserved.
					</p>
				</div>
			</div>
		</div>
	);
};

export default Footer;
