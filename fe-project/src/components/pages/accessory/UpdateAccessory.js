// src/components/accessories/UpdateAccessory.jsx
import React, { useState, useEffect } from "react";

const UpdateAccessory = ({ accessory, onSubmit, onClose }) => {
	const [formData, setFormData] = useState({ name: "", type: "" });

	useEffect(() => {
		if (accessory) setFormData({ name: accessory.name, type: accessory.type || "" });
	}, [accessory]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
        if (
            formData.name === accessory.name &&
            formData.type === (accessory.type || "")
        ) {
            return; // không submit nếu không thay đổi gì
        }
        if (onSubmit) onSubmit({ ...accessory, ...formData });
	};

	return (
		<div className="card shadow-sm border-0 mb-4">
			<div className="card-header d-flex justify-content-between align-items-center py-2 bg-light">
				<h5 className="mb-0">Cập nhật phụ kiện</h5>
				<button type="button" className="btn btn-sm btn-outline-secondary" onClick={onClose}>
					<i className="fas fa-times me-1"></i>Đóng
				</button>
			</div>

			<div className="card-body">
				<form onSubmit={handleSubmit} className="row g-3">
					<div className="col-12">
						<label className="form-label fw-semibold">Tên phụ kiện</label>
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
						<label className="form-label fw-semibold">Chất liệu</label>
						<input
							type="text"
							className="form-control"
							name="type"
							value={formData.type}
							onChange={handleChange}
						/>
					</div>

					<div className="col-12 d-grid">
						<button
                            type="submit"
                            className="btn btn-outline-primary"
                            disabled={
                                formData.name === accessory.name &&
                                formData.type === (accessory.type || "")
                            }
                        >
                            Lưu thay đổi
                        </button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default UpdateAccessory;
