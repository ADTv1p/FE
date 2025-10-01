// src/components/accessories/UpdateAccessory.jsx
import React, { useState, useEffect } from "react";
import "./UpdateAccessory.css";
import { TextField } from "@mui/material"; // Sửa lỗi ở đây
import { ConfirmButton, CloseButton } from '../../common/ActionButtons';

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
        <div className="card shadow-sm h-100 update-accessory-card" style={{ borderColor: "transparent" }}>
            <div className="card-header fw-bold d-flex justify-content-between  align-items-center" style={{ backgroundColor: "#02437D", color: "#fff" }}>
                <h5 className="mb-0">Cập nhật phụ kiện</h5>
				<CloseButton size="small" className="btn-close" onClick={onClose} />
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit} className="row g-3">
                    <div className="col-12">
                        <TextField
                            fullWidth label="Tên phụ kiện"
                            name="name" value={formData.name}
                            onChange={handleChange} required margin="normal"
                        />
                    </div>

                    <div className="col-12">
                        <TextField
                            fullWidth
                            label="Chất liệu"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            margin="normal"
                        />
                    </div>

                    <div className="col-12 d-grid">
                        <ConfirmButton
                            type="submit"
                            disabled={
                                formData.name === accessory.name &&
                                formData.type === (accessory.type || "")
                            }
                        >
                            Lưu thay đổi
                        </ConfirmButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateAccessory;