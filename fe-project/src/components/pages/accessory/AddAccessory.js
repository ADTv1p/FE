// src/components/accessories/AddAccessory.jsx
import { useState } from 'react';
import { TextField } from '@mui/material';
import { ConfirmButton, CloseButton } from '../../common/ActionButtons';

const AddAccessory = ({ onSubmit, onClose }) => {
    const [formData, setFormData] = useState({
        name: "",
        type: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) onSubmit(formData);
        setFormData({ name: "", type: "" }); // reset form sau khi submit
    };

    return (
		<div className="card shadow-sm h-100 update-accessory-card" style={{ borderColor: "transparent" }}>
			<div className="card-header fw-bold d-flex justify-content-between align-items-center" style={{ backgroundColor: "#02437D", color: "#fff" }}>
				<h5 className="mb-0">Thêm phụ kiện mới</h5>
				<CloseButton size="small" className="btn-close" onClick={onClose} />
			</div>

			<div className="card-body">
				<form onSubmit={handleSubmit} className="row g-3">
					<div className="col-12">
						<TextField
							fullWidth
							label="Tên phụ kiện"
							name="name"
							value={formData.name}
							onChange={handleChange}
							required
							margin="normal"
						/>
					</div>

					<div className="col-12">
						<TextField
							fullWidth
							label="Chất liệu"
							name="type"
							value={formData.type}
							onChange={handleChange}
							required
							margin="normal"
						/>
					</div>

					<div className="col-12 d-grid">
						<ConfirmButton type="submit" disabled={!formData?.name || !formData?.type}>
							Thêm phụ kiện
						</ConfirmButton>
					</div>
				</form>
			</div>
		</div>
    );
};

export default AddAccessory;