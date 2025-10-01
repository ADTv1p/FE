// src/components/errors/ErrorForm.jsx
import React, { useState } from "react";
import { CloseButton, ConfirmButton } from "../../common/ActionButtons";
import TextField from "@mui/material/TextField";

const AddErrorModal = ({ onSubmit, onClose }) => {
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
		<div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
			<div className="modal-dialog modal-lg modal-dialog-centered" role="document">
				<div className="modal-content" style={{ borderColor: "transparent" }}>
					<div className="modal-header py-2" style={{ backgroundColor: "#F1C143", color: "#02437D" }}>
						<h5 className="modal-title">Thêm lỗi mới</h5>
						<CloseButton size="small" className="btn-close" onClick={onClose} />
					</div>
					<div className="modal-body">
						<form onSubmit={handleSubmit} className="row g-3">
							<div className="col-12">
								<TextField
									fullWidth placeholder="Nhập tên lỗi" label="Tên lỗi" variant="outlined" name="name"
									value={formData.name} onChange={handleChange}
									required
								/>
							</div>

							<div className="col-12">
								<TextField
									fullWidth placeholder="Nhập mô tả" label="Mô tả lỗi" variant="outlined" name="description" 
									value={formData.description} onChange={handleChange} multiline rows={3}
									required
								/>
							</div>
						</form>
					</div>
					<div className="modal-footer">
						<ConfirmButton type="submit" onClick={handleSubmit}>Thêm lỗi</ConfirmButton>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddErrorModal;
