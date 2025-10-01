// src/pages/AddStaff.js
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import positionService from "../../../services/positionService";
import staffService from "../../../services/staffService";
import { ConfirmButton, FileButton } from "../../common/ActionButtons";
import { Typography, TextField, MenuItem, Avatar, Stack , Button } from "@mui/material";

import { PersonAdd  } from '@mui/icons-material';

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
		position_id: "",
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

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await staffService.createStaff(formData);
			if (res?.EC === 0) {
				toast.success("Thêm nhân sự thành công!");
				// reset form nếu cần
				setFormData({
					full_name: "",
					email: "",
					phone: "",
					position_id: "",
					department: "Nhân viên thao tác",
					date_of_birth: "",
					start_date: new Date().toISOString().split("T")[0],
					status: "active",
					avatar: null,
				});
				setPreview(null);
			} else {
				toast.error(res?.EM || "Thêm nhân sự thất bại!");
			}
		} catch (err) {
			console.error("Lỗi khi thêm nhân sự:", err);
			toast.error("Đã xảy ra lỗi khi thêm nhân sự!");
		}
	};

	return (
		<>
		<div className="container">
			<div className="card shadow-sm p-3 mb-3 d-flex flex-row justify-content-between align-items-center" style={{ border: "1px solid #02437D"}}>
                <Typography variant="h4" display="flex" alignItems="center" gap={2} sx={{ color: "#02437D" }}>
					<PersonAdd  fontSize="large" />
					THÊM NHÂN SỰ MỚI
				</Typography>
			</div>

			<div className="card shadow-sm p-3 mb-3">
				<form className="row g-3" onSubmit={handleSubmit}>
					{/* Ảnh nhân sự */}
					<div className="col-4">
						<div className="card shadow-sm h-100" style={{ backgroundColor: "#fff", color: "#02437D", borderColor: "#02437D" }}>
							<div className="card-body d-flex flex-column align-items-center justify-content-center">
								{preview && (
									<Avatar
										src={preview}
										alt="Xem trước"
										sx={{ width: 150, height: 150, mb: 2, border: "2px solid #ccc" }}
									/>
								)}

								<Stack direction="row" spacing={2} justifyContent="center">
									<FileButton
										onChange={handleChange}
										accept="image/*"
										name="avatar"
										required
									>
										Ảnh nhân sự
									</FileButton>
								</Stack>
							</div>

						</div>
					</div>

					{/* Thông tin cá nhân */}
					<div className="col-4">
						<div className="card shadow-sm h-100" style={{ borderColor: "transparent" }}>
							<div className="card-header fw-bold" style={{ backgroundColor: "#02437D", color: "#fff" }}>
								Thông tin cá nhân
							</div>
							<div className="card-body" style={{ color: "#02437D" }}>
								{/* Họ và tên */}
								<div className="mb-3">
									<TextField label="Họ và tên" type="text" name="full_name"
										value={formData.full_name} onChange={handleChange}
										fullWidth required />
								</div>

								<div className="mb-3">
									<TextField label="Email" type="email" name="email"
										value={formData.email} onChange={handleChange}
										fullWidth required />
								</div>

								<div className="mb-3">
									<TextField label="Số điện thoại" type="text" name="phone"
										value={formData.phone} onChange={handleChange}
										fullWidth required />
								</div>

								<div className="mb-3">
									<TextField label="Ngày sinh" type="date" name="date_of_birth"
										value={formData.date_of_birth} onChange={handleChange}
										fullWidth InputLabelProps={{ shrink: true }} required />
								</div>
							</div>
						</div>
					</div>

					{/* Thông tin công việc */}
					<div className="col-4">
						<div className="card shadow-sm h-100" style={{ borderColor: "transparent" }}>
							<div className="card-header fw-bold" style={{ backgroundColor: "#F1C143", color: "#02437D" }}>
								Thông tin công việc
							</div>
							<div className="card-body" style={{ color: "#02437D" }}>
								{/* Vị trí */}
								<div className="mb-3">
									<TextField
										select label="Vị trí" name="position_id"
										value={formData.position_id} onChange={handleChange}
										fullWidth required
									>
										<option value="">Chọn vị trí</option>
										{positions.map((pos) => (
											<MenuItem key={pos.position_id} value={pos.position_id}>
												{pos.code} - {pos.role}
											</MenuItem>
										))}
									</TextField>
								</div>

								{/* Phòng ban */}
								<div className="mb-3">
									<TextField
										label="Phòng ban (không điều chỉnh)" name="department"
										value={formData.department} fullWidth required
										InputProps={{ readOnly: true }} variant="filled"
									/>
								</div>

								{/* Ngày bắt đầu */}
								<div className="mb-3">
									<TextField
										label="Ngày bắt đầu làm việc" type="date" name="start_date"
										value={formData.start_date} onChange={handleChange}
										fullWidth required
										InputLabelProps={{ shrink: true }} inputProps={{ min: new Date().toISOString().split("T")[0] }}
									/>
								</div>
							</div>
						</div>
					</div>

					{/* Nút submit */}
					<div className="col-12 text-center">
						<ConfirmButton type="submit">
							Thêm nhân sự
						</ConfirmButton>
					</div>
				</form>
			</div>
		</div>

		</>
	);
};

export default AddStaff;
