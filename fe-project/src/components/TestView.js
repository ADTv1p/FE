// src/views/TestView.js
import React from "react";
import { CloseButton } from "./common/ActionButtons";

const TestView = () => {
	const colors = ["#0E0E0C", "#F1C143", "#02437D", "#B22222"];
	return (
		<div className="container py-5">
			<div className="row row-cols-3 g-4">
				{/* Card-body */}
				<div className="col">
					<div className="card shadow-sm h-100" style={{ backgroundColor: "#02437D", color: "#fff", borderColor: "transparent" }}>
						<div className="card-body">
							<h5 className="card-title fw-bold">Card Chính 1</h5>
							<p className="card-text">Nội dung quan trọng hiển thị mặc định.</p>
						</div>
					</div>
				</div>

				<div className="col">
					<div className="card shadow-sm h-100" style={{ backgroundColor: "#fff", color: "#02437D", borderColor: "#02437D" }}>
						<div className="card-body">
							<h5 className="card-title fw-bold">Card Tối giản 1</h5>
							<p className="card-text">Gọn gàng, chỉ hiển thị những gì cần thiết.</p>
						</div>
					</div>
				</div>

				<div className="col">
					<div className="card shadow-sm h-100" style={{ backgroundColor: "#F1C143", color: "#02437D", borderColor: "transparent" }}>
						<div className="card-body">
							<h5 className="card-title fw-bold">Card Quan trọng 1</h5>
							<p className="card-text">Làm nổi bật thông tin ưu tiên cao.</p>
						</div>
					</div>
				</div>

				{/* Card có header */}
				<div className="col">
					<div className="card shadow-sm h-100" style={{ borderColor: "transparent" }}>
						<div className="card-header fw-bold" style={{ backgroundColor: "#02437D", color: "#fff" }}>
							Card Chính 2
						</div>
						<div className="card-body" style={{ color: "#02437D" }}>
							<p className="card-text">Nội dung quan trọng hiển thị mặc định.</p>
						</div>
					</div>
				</div>

				<div className="col">
					<div className="card shadow-sm h-100" style={{ borderColor: "#02437D" }}>
						<div className="card-header fw-bold" style={{ backgroundColor: "#fff", color: "#02437D" }}>
							Card Tối giản 2
						</div>
						<div className="card-body" style={{ color: "#02437D" }}>
							<p className="card-text">Gọn gàng, chỉ hiển thị những gì cần thiết.</p>
						</div>
					</div>
				</div>

				<div className="col">
					<div className="card shadow-sm h-100" style={{ borderColor: "transparent" }}>
						<div className="card-header fw-bold" style={{ backgroundColor: "#F1C143", color: "#02437D" }}>
							Card Quan trọng 2
						</div>
						<div className="card-body" style={{ color: "#02437D" }}>
							<p className="card-text">Làm nổi bật thông tin ưu tiên cao.</p>
						</div>
					</div>
				</div>

				{/* Card border-left */}
				<div className="col">
					<div className="card shadow-sm h-100" style={{ borderLeft: "5px solid #0d6efd" }}>
						<div className="card-body">
							<h5 className="card-title fw-bold">Card Thông tin</h5>
							<p className="card-text">Dùng để hiển thị các thông báo nhỏ.</p>
						</div>
					</div>
				</div>

				<div className="col">
					<div className="card shadow-sm h-100" style={{ borderLeft: "5px solid #198754" }}>
						<div className="card-body">
							<h5 className="card-title fw-bold">Card Thành công</h5>
							<p className="card-text">Thông báo các thao tác thành công.</p>
						</div>
					</div>
				</div>

				<div className="col">
					<div className="card shadow-sm h-100" style={{ borderLeft: "5px solid #dc3545" }}>
						<div className="card-body">
							<h5 className="card-title fw-bold">Card Cảnh báo</h5>
							<p className="card-text">Thông tin quan trọng cần chú ý.</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TestView;
