// src/pages/AddStaff.js
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import positionService from "../../../services/positionService";

const AddStaff = () => {
	const [formData, setFormData] = useState({
		full_name: "",
		email: "",
		phone: "",
		position: "",
		department: "",
		date_of_birth: "",
		start_date: "",
		is_active: true,
		avatar: null, // thêm ảnh
	});
	const [preview, setPreview] = useState(null);
	const [positions, setPositions] = useState([]);

	useEffect(() => {
		const fetchPositions = async () => {
			try {
				const response = await positionService.getSupportPositions();
				if (!response.DT || response.DT.length === 0) {
					toast.warn("Chưa có dữ liệu vị trí để chọn!");
				} else {
					setPositions(response.DT);
				}
			} catch (error) {
				console.error("Lỗi khi lấy danh sách vị trí:", error);
				toast.error("Lỗi khi lấy danh sách vị trí!");
			}
		};

		fetchPositions();
	}, []);

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setFormData({ ...formData, avatar: file });
			setPreview(URL.createObjectURL(file));
		}
	};

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData({
			...formData,
			[name]: type === "checkbox" ? checked : value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Dữ liệu nhân sự:", formData);
		// TODO: Gọi API backend: POST /api/staff
	};

	return (
		<div className="card shadow-lg border-0 rounded-3">
			<div className="card-header text-center py-2">
				<p className="lead fs-2">
					<i className="fas fa-user-plus me-2"></i>Thêm nhân sự mới
				</p>
			</div>
			<div className="card-body p-4">
				<form className="row g-4" onSubmit={handleSubmit}>
					{/* Cụm ảnh */}
					<div className="col-12">
						<div className="card shadow-sm border-0 p-3 h-100">
							<div className="text-center">
								{preview && (
									<img
										src={preview}
										alt="Xem trước"
										className="rounded-circle border border-2 mb-3"
										style={{ width: "150px", height: "150px", objectFit: "cover" }}
									/>
								)}
								<label className="form-label fw-bold">Ảnh nhân sự</label>
								<input
									type="file"
									accept="image/*"
									className="form-control border-dark"
									onChange={handleFileChange}
								/>
							</div>
						</div>
					</div>

					{/* Cụm thông tin cá nhân */}
					<div className="col-md-6">
						<div className="card shadow-sm border-0 p-3 h-100">
							<p className="fw-bold mb-3">Thông tin cá nhân</p>
							<label className="form-label fw-bold">Họ và tên</label>
							<input
								type="text"
								className="form-control border-dark mb-3"
								name="full_name"
								value={formData.full_name}
								onChange={handleChange}
								required
							/>

							<label className="form-label fw-bold">Email</label>
							<input
								type="email"
								className="form-control border-dark mb-3"
								name="email"
								value={formData.email}
								onChange={handleChange}
								required
							/>

							<label className="form-label fw-bold">Số điện thoại</label>
							<input
								type="text"
								className="form-control border-dark mb-3"
								name="phone"
								value={formData.phone}
								onChange={handleChange}
								required
							/>

							<label className="form-label fw-bold">Ngày sinh</label>
							<input
								type="date"
								className="form-control border-dark"
								name="date_of_birth"
								value={formData.date_of_birth}
								onChange={handleChange}
							/>
						</div>
					</div>

					{/* Cụm thông tin công việc */}
					<div className="col-md-6">
						<div className="card shadow-sm border-0 p-3 h-100">
							<p className="fw-bold mb-3">Thông tin công việc</p>
							<label className="form-label fw-bold">Chức vụ</label>
							<select
								className="form-select border-dark mb-3"
								name="position"
								value={formData.position}
								onChange={handleChange}
								required
							>
								<option value="">Chọn chức vụ</option>
								{positions.map((pos) => (
									<option key={pos.id} value={pos.name}>
										{pos.name}
									</option>
								))}
							</select>

							<label className="form-label fw-bold">Phòng ban</label>
							<input
								type="text"
								className="form-control border-dark mb-3"
								name="department"
								value={formData.department}
								onChange={handleChange}
							/>

							<label className="form-label fw-bold">Ngày bắt đầu làm việc</label>
							<input
								type="date"
								className="form-control border-dark mb-3"
								name="start_date"
								value={formData.start_date}
								onChange={handleChange}
								required
							/>

							<div className="form-check mt-2">
								<input
									className="form-check-input"
									type="checkbox"
									name="is_active"
									checked={formData.is_active}
									onChange={handleChange}
								/>
								<label className="form-check-label fw-bold">Đang làm việc</label>
							</div>
						</div>
					</div>

					{/* Nút submit */}
					<div className="col-12 text-center">
						<button type="submit" className="btn btn-success px-4">
							<i className="fas fa-save me-2"></i> Thêm nhân sự
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddStaff;
