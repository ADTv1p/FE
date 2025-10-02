import { motion } from "framer-motion";

const YazakiIntroPage = () => {
	return (
		<div className="container my-4">
			<div className="row g-5">
				{/* Hero Section */}
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="col-9"
				>
					<div
						className="card border-0 p-5 text-center text-md-start"
						style={{ backgroundColor: "#2F5794", color: "white" }}
					>
						<img
							src="/yazaki-seeklogo.png"
							alt="Giới thiệu Hệ thống"
							className="img-fluid mb-4 bg-white p-2 rounded"
							style={{ maxWidth: "150px", height: "auto" }}
						/>
						<h1 className="display-6 fw-bold mb-3">
							Giới thiệu Hệ thống Quản lý Thao tác &amp; Lỗi Thao tác
						</h1>
						<p className="lead mb-4">
							Quản lý thao tác công nghiệp và ghi nhận lỗi thao tác. <br />
							Tối ưu quy trình sản xuất, giám sát chất lượng, đảm bảo an toàn lao động. <br />
							Áp dụng từ thực tiễn dây chuyền sản xuất của <strong>Yazaki</strong>. <br />
							Chức năng: theo dõi tiến độ, ghi nhận lỗi, thống kê real-time, xuất báo cáo. <br />
							Đối tượng: Quản lý nhân sự, kỹ sư vận hành, QA/QC.
						</p>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.3 }}
					viewport={{ once: true }}
					className="col-3"
				>
					<div className="card h-100 overflow-hidden border-0 text-center">
						<img
							src="/yazaki.jpg"
							alt="Xe nổi bật"
							className="img-fluid"
							style={{ height: "100%", width: "auto", objectFit: "cover" }}
						/>
					</div>
				</motion.div>


				<motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8}} viewport={{ once: true }} className="col-12">
					<div
						className="card border-0 py-3 text-center"
						style={{ backgroundColor: "#0E0E0C", color: "white" }}
					>
						<blockquote className="blockquote">
							<p className="display-6 ">
								HỆ THỐNG QUẢN LÝ THAO TÁC
							</p>
						</blockquote>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, x: 50 }}
					whileInView={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="col-12"
					>
					<div className="card border-0 h-100 overflow-hidden d-flex flex-row">
						<div className="p-4 flex-grow-1">
							<ul className="list-group list-group-flush fst-italic" style={{ fontSize: '1rem', lineHeight: '1' }}>
								<li className="list-group-item py-2" style={{ color: '#02437D' }}>
								<strong>Tạo thao tác:</strong> Admin hoặc phân công viên tạo thao tác, mô tả chi tiết và thời gian chuẩn.
								</li>
								<li className="list-group-item py-2" style={{ color: '#02437D' }}>
								<strong>Phân công nhân sự:</strong> Gán thao tác cho công nhân theo ca hoặc dây chuyền sản xuất.
								</li>
								<li className="list-group-item py-2" style={{ color: '#02437D' }}>
								<strong>Theo dõi tiến trình:</strong> Cập nhật trạng thái: Chưa thực hiện – Đang thực hiện – Hoàn thành.
								</li>
								<li className="list-group-item py-2" style={{ color: '#02437D' }}>
								<strong>Chi tiết bước thao tác:</strong> Liệt kê từng bước, đánh dấu khi hoàn thành.
								</li>
								<li className="list-group-item py-2" style={{ color: '#02437D' }}>
								<strong>Kiểm soát chất lượng:</strong> Ghi chú, đánh giá, phát hiện sai sót và đề xuất cải tiến.
								</li>
								<li className="list-group-item py-2" style={{ color: '#02437D' }}>
								<strong>Báo cáo & thống kê:</strong> Thống kê số thao tác hoàn thành, chậm tiến độ, hiệu suất nhân sự.
								</li>
								<li className="list-group-item py-2" style={{ color: '#02437D' }}>
								<strong>Tích hợp hình ảnh minh họa:</strong> Đính kèm ảnh hướng dẫn cho từng thao tác.
								</li>
							</ul>
						</div>
						<div className="card overflow-hidden border-0 text-center">
							<img
								src="/workers_operating.jpg"
								className="img-fluid"
								alt="Hệ thống Quản lý Thao tác"
								style={{ width: '100%', height: 'auto' }}
							/>
						</div>
					</div>
				</motion.div>
				
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="col-12"
				>
					<div className="card overflow-hidden border-0 text-center">
						<img
							src="/hero_car.jpg"
							alt="Xe nổi bật"
							className="img-fluid"
						/>
					</div>
				</motion.div>

				<motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8}} viewport={{ once: true }} className="col-12">
					<div
						className="card border-0 py-3 text-center"
						style={{ backgroundColor: "#0E0E0C", color: "white" }}
					>
						<blockquote className="blockquote">
							<p className="display-6 ">
								CÔNG TY VÀ QUẢN LÝ LỖI
							</p>
						</blockquote>
					</div>
				</motion.div>

				<motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8}} viewport={{ once: true }} className="col-4">
					<div className="card h-100 p-4 d-flex flex-column" style={{ borderColor: "#02437D", color: "#02437D" }}>
						<h2 className="h4 fw-bold mb-4" style={{ fontSize: '1.5rem' }}>Khu vực Công ty Yazaki</h2>
						<p className="fst-italic" style={{ fontSize: '1rem', lineHeight: '1.6' }}>
							Công ty Yazaki, với trụ sở chính tại Nhật Bản, sở hữu hệ thống cơ sở toàn cầu bao gồm dây chuyền sản xuất tự động, phòng lab, văn phòng và khu đào tạo. Khu vực chức năng của Yazaki bao gồm nhà máy sản xuất với dây chuyền hiện đại, ứng dụng công nghệ cao; văn phòng và trung tâm R&D tập trung nghiên cứu, phát triển sản phẩm mới cùng các linh kiện ô tô tiên tiến; khu đào tạo chuyên nâng cao kỹ năng nhân viên và đồng bộ hóa quy trình. Đặc biệt, Yazaki cam kết xây dựng môi trường xanh, bền vững thông qua các giải pháp tiết kiệm năng lượng và thân thiện với môi trường.
						</p>
						<div className="card-footer bg-transparent border-0 p-0 mt-auto">
							<img className="rounded w-100" src="/company_building.jpg" alt="Trụ sở công ty" />
						</div>
					</div>
				</motion.div>

				<motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8}} viewport={{ once: true }} className="col-4">
					<div className="card h-100 p-4 d-flex flex-column" style={{ borderColor: "#F1C143" }}>
						<h2 className="h4 fw-bold mb-4" style={{ fontSize: '1.5rem', color: "#F1C143" }}>Hệ thống Quản lý Lỗi Thao tác</h2>
						<p className="fst-italic" style={{ fontSize: '1rem', color: "#02437D", lineHeight: '1.6', marginBottom: '1.5rem' }}>
							Hệ thống Quản lý Lỗi Thao tác cho phép công nhân hoặc quản lý ghi nhận lỗi một cách chi tiết, kèm theo mô tả và ảnh minh họa. Lỗi được phân loại dựa trên mức độ nghiêm trọng, loại lỗi và vị trí phát sinh, giúp dễ dàng quản lý và ưu tiên xử lý. Hệ thống cũng hỗ trợ theo dõi tiến độ xử lý lỗi với các trạng thái: Chưa xử lý, Đang xử lý và Hoàn thành, đảm bảo quy trình khắc phục được thực hiện hiệu quả.
						</p>
						<div className="card-footer bg-transparent border-0 p-0 mt-auto">
							<img className="rounded w-100" src="/design_board.jpg" alt="Hệ thống quản lý lỗi" />
						</div>
					</div>
				</motion.div>

				<motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="col-4">
					<div className="card h-100 p-4 d-flex flex-column" style={{ borderColor: "#B22222" }}>
						<h2 className="h4 fw-bold mb-4" style={{ fontSize: '1.5rem', color: "#B22222" }}>Báo cáo & Cải tiến Chất lượng</h2>
						<p className="fst-italic" style={{ fontSize: '1rem', color: "#02437D", lineHeight: '1.6', marginBottom: '1.5rem' }}>
							Hệ thống Báo cáo & Cải tiến Chất lượng cung cấp các báo cáo và thống kê chi tiết về lỗi theo ca, dây chuyền, cùng hiệu suất khắc phục, được trình bày trực quan qua biểu đồ. Hệ thống hỗ trợ phân tích nguyên nhân lỗi, đề xuất các giải pháp cải tiến nhằm giảm thiểu lỗi lặp lại, nâng cao chất lượng sản xuất. Ngoài ra, tích hợp hình ảnh minh họa cho phép đính kèm ảnh lỗi, giúp quá trình xử lý trở nên trực quan và hiệu quả hơn.
						</p>
						<div className="card-footer bg-transparent border-0 p-0 mt-auto">
							<img className="rounded w-100" src="/product_wires.png" alt="Báo cáo chất lượng" />
						</div>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="col-12"
				>
					<div
						className="card border-0 shadow p-5 text-center"
						style={{ backgroundColor: "#0E0E0C", color: "white" }}
					>
						<blockquote className="blockquote">
							<p className="display-6 ">
								Lãnh đạo & Đội ngũ Yazaki tại Hải Phòng
							</p>
							<footer className="fs-6 fst-italic" style={{ color: "#F1C143" }}>
								Ban Giám đốc Yazaki Việt Nam – Hải Phòng chịu trách nhiệm quản lý hoạt động sản xuất, điều hành nhân sự và triển khai chiến lược toàn cầu của Tập đoàn Yazaki tại miền Bắc. Đội ngũ quản lý, với nhiều kinh nghiệm trong lĩnh vực sản xuất công nghiệp, đảm bảo chất lượng sản phẩm, tối ưu hóa quy trình và tuân thủ các tiêu chuẩn an toàn. Cán bộ, kỹ sư và công nhân viên tại Hải Phòng đóng vai trò nòng cốt trong việc duy trì hoạt động dây chuyền, nâng cao năng suất và phát triển nguồn nhân lực địa phương. Mục tiêu của đội ngũ là đảm bảo sản xuất ổn định, đáp ứng yêu cầu khách hàng toàn cầu và đóng góp tích cực vào sự phát triển kinh tế xã hội tại Hải Phòng.
							</footer>
						</blockquote>
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default YazakiIntroPage;