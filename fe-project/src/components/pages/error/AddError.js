// src/components/errors/ErrorForm.jsx
import React, { useState } from "react";

const ErrorForm = ({ onSubmit, onClose }) => {
	const [formData, setFormData] = useState({
		name: "",
		description: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (onSubmit) onSubmit(formData);
		setFormData({ name: "", description: "" });
	};

	return (
		<div className="card shadow-sm border-0 mb-2">
			<div className="card-header d-flex justify-content-between align-items-center py-2 bg-light">
				<p className="lead fs-5 mb-0">Thêm lỗi mới</p>
				<button
					type="button"
					className="btn btn-sm btn-outline-secondary"
					onClick={onClose}
				>
					<i className="fas fa-times me-1"></i>Đóng
				</button>
			</div>
			<div className="card-body p-3">
				<form onSubmit={handleSubmit} className="row g-3">
					<div className="col-12">
						<label className="form-label fw-semibold">Tên lỗi</label>
						<input
							type="text"
							className="form-control"
							name="name"
							value={formData.name}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="col-12">
						<label className="form-label fw-semibold">Mô tả lỗi</label>
						<textarea
							className="form-control"
							name="description"
							value={formData.description}
							onChange={handleChange}
							rows="3"
						></textarea>
					</div>

					<div className="col-12 d-grid mt-3">
						<button type="submit" className="btn btn-outline-danger">
							<i clas sName="fas fa-plus me-2"></i>Thêm lỗi
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ErrorForm;
