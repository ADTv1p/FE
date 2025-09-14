// src/components/processes/AddProcess.jsx
import React, { useState } from "react";

const AddProcess = ({ onSubmit, onClose }) => {
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
		<div className="card shadow-sm border-0 mb-4">
			<div className="card-header d-flex justify-content-between align-items-center py-2 bg-light">
				<p className="lead fs-5 mb-0">Thêm thao tác mới</p>
				<button
					type="button"
					className="btn btn-sm btn-outline-secondary"
					onClick={onClose}
				>
					Đóng
				</button>
			</div>
			<div className="card-body p-3">
				<form onSubmit={handleSubmit} className="row g-3">
					<div className="col-12">
						<label className="form-label fw-semibold">Tên thao tác</label>
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
						<label className="form-label fw-semibold">Mô tả</label>
						<textarea
							className="form-control"
							name="description"
							value={formData.description}
							onChange={handleChange}
							rows="3"
							required
						/>
					</div>

					<div className="col-12 d-grid mt-3">
						<button type="submit" className="btn btn-outline-success">
							<i className="fas fa-plus me-2"></i>Thêm thao tác
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddProcess;
