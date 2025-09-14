// src/pages/AddStaff.js
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import positionService from "../../../services/positionService";

const STATUS_OPTIONS = [
	{ value: "active", label: "Đang làm việc" },
	{ value: "inactive", label: "Ngừng làm việc" },
	{ value: "resigned", label: "Từ chức" },
	{ value: "suspended", label: "Đình chỉ" },
];

const today = new Date().toISOString().split("T")[0]

const AddStaff = () => {
	const [formData, setFormData] = useState({
		full_name: "",
		email: "",
		phone: "",
		position: "",
		department: "Nhân viên thao tác",
		date_of_birth: "",
		start_date: today,
		status: "active",
		avatar: null,
	});
	const [preview, setPreview] = useState(null);
	const [positions, setPositions] = useState([]);

	useEffect(() => {
		const fetchPositions = async () => {
			try {
				const res = await positionService.getSupportPositions();
				if (!res.DT || res.DT.length === 0) {
					toast.warn("Chưa có dữ liệu vị trí để chọn!");
				} else {
					setPositions(res.DT);
				}
			} catch (err) {
				console.error(err);
				toast.error("Lỗi khi lấy danh sách vị trí!");
			}
		};
		fetchPositions();
	}, []);

	const handleChange = (e) => {
		const { name, value, type } = e.target;

		if (type === "checkbox" && name === "status") {
			setFormData((prev) => {
				const newStatus = prev.status.includes(value)
					? prev.status.filter((s) => s !== value)
					: [...prev.status, value];
				return { ...prev, status: newStatus };
			});
		} else if (type === "file") {
			const file = e.target.files[0];
			if (file) {
				setFormData((prev) => ({ ...prev, avatar: file }));
				setPreview(URL.createObjectURL(file));
			}
		} else {
			setFormData((prev) => ({ ...prev, [name]: value }));
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Dữ liệu nhân sự:", formData);
		// TODO: Gọi API backend
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
					{/* Ảnh nhân sự */}
					<div className="col-12">
						<div className="card shadow-sm border-0 p-3 text-center">
							{preview && (
								<img
									src={preview}
									alt="Xem trước"
									className="rounded-circle border mb-3"
									style={{ width: "150px", height: "150px", objectFit: "cover" }}
								/>
							)}
							<label className="form-label fw-bold">Ảnh nhân sự</label>
							<input
								type="file"
								accept="image/*"
								className="form-control border-dark"
								onChange={handleChange}
								name="avatar"
							/>
						</div>
					</div>

					{/* Thông tin cá nhân */}
					<div className="col-md-6">
						<div className="card shadow-sm border-0 p-3 h-100">
							<p className="fw-bold mb-3">Thông tin cá nhân</p>
							{["full_name", "email", "phone", "date_of_birth"].map((field) => (
								<div className="mb-3" key={field}>
									<label className="form-label fw-bold">
										{{
											full_name: "Họ và tên",
											email: "Email",
											phone: "Số điện thoại",
											date_of_birth: "Ngày sinh",
										}[field]}
									</label>
									<input
										type={field === "email" ? "email" : field === "date_of_birth" ? "date" : "text"}
										className="form-control border-dark"
										name={field}
										value={formData[field]}
										onChange={handleChange}
										required={field !== "date_of_birth"}
									/>
								</div>
							))}
						</div>
					</div>

					{/* Thông tin công việc */}
					<div className="col-md-6">
						<div className="card shadow-sm border-0 p-3 h-100">
							<p className="fw-bold mb-3">Thông tin công việc</p>

							{/* Vị trí */}
							<div className="mb-3">
								<label className="form-label fw-bold">Vị trí</label>
								<select
									className="form-select border-dark"
									name="position"
									value={formData.position}
									onChange={handleChange}
									required
								>
									<option value="">Chọn vị trí</option>
									{positions.map((pos) => (
										<option key={pos.position_id} value={pos.position_id}>
											{pos.code} - {pos.role}
										</option>
									))}
								</select>
							</div>

							{/* Phòng ban */}
							<div className="mb-3">
								<label className="form-label fw-bold">Phòng ban (không điều chỉnh)</label>
								<input
									type="text"
									className="form-control border border-secondary bg-light text-muted"
									name="department"
									value={formData.department}
									readOnly
								/>
							</div>

							<div className="mb-3">
								<label className="form-label fw-bold">Ngày bắt đầu làm việc</label>
								<input
									type="date"
									className="form-control border-dark"
									name="start_date"
									value={formData.start_date}
									onChange={handleChange}
									required
									min={new Date().toISOString().split("T")[0]} // chỉ chọn từ hôm nay
								/>
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
