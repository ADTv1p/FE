import { useState } from "react";
import { CloseButton, ConfirmButton } from "../../common/ActionButtons";
import { TextField, MenuItem } from "@mui/material";

const AddProcessStep = ({ show, process, accessories, onSubmit, onClose }) => {
	const [formData, setFormData] = useState({
		step_order: "",
		step_name: "",
		instruction: "",
		tool_required: "",
		accessories_used: "",
		accessory_id: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!formData.step_order || !formData.step_name) return;
		onSubmit?.({ ...formData, process_id: process.process_id });
	};

	return (
        <>
            {show && <div className="modal-backdrop fade show"></div>}
            <div className={`modal fade ${show ? "show d-block" : ""}`} tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content" style={{ borderColor: "transparent" }}>
                        <div className="modal-header py-2" style={{ backgroundColor: "#02437D", color: "#fff" }}>
                            <h5 className="modal-title fw-bold" id="addProcessStepModalLabel">Thêm bước mới</h5>
                            <CloseButton size="small" className="btn-close" onClick={onClose} />
                        </div>
						<div className="modal-body p-3" style={{ color: "#02437D" }}>
                            <div className="mb-3 text-center">
                                <p className="mb-1">
                                    Thao tác: <strong>{process?.name}</strong>
                                </p>
                            </div>
                            <form onSubmit={handleSubmit} className="row g-3">
                                <div className="col-4">
                                    <TextField
                                        label="Thứ tự bước"
                                        type="number"
                                        name="step_order"
                                        placeholder="Nhập số thứ tự"
                                        value={formData.step_order}
                                        onChange={handleChange}
                                        fullWidth
                                        required
                                        InputProps={{ inputProps: { min: 1 } }}
                                    />
                                </div>
                                <div className="col-8">
                                    <TextField
                                        label="Tên bước"
                                        type="text"
                                        name="step_name"
                                        placeholder="Nhập tên bước"
                                        value={formData.step_name}
                                        onChange={handleChange}
                                        fullWidth
                                        required
                                    />
                                </div>
                                <div className="col-12">
                                    <TextField
                                        label="Hướng dẫn"
                                        name="instruction"
                                        placeholder="Mô tả chi tiết cách thực hiện"
                                        value={formData.instruction}
                                        onChange={handleChange}
                                        fullWidth
                                        multiline
                                        rows={3}
                                    />
                                </div>
                                <div className="col-6">
                                    <TextField
                                        label="Dụng cụ cần"
                                        name="tool_required"
                                        value={formData.tool_required}
                                        onChange={handleChange}
                                        fullWidth
                                        select
                                    >
                                        <MenuItem value="">-- Không chọn --</MenuItem>
                                        <MenuItem value="dao">Dao cắt băng keo</MenuItem>
                                        <MenuItem value="keo">Kéo</MenuItem>
                                        <MenuItem value="sung_gio">Súng bắn dây rút</MenuItem>
                                        <MenuItem value="mo_vit">Mỏ vịt</MenuItem>
                                    </TextField>
                                </div>
                                <div className="col-6">
                                    <TextField
                                        label="Chọn phụ kiện"
                                        name="accessory_id"
                                        value={formData.accessory_id}
                                        onChange={handleChange}
                                        fullWidth
                                        select
                                    >
                                        <MenuItem value="">-- Không chọn --</MenuItem>
                                        {accessories?.map((a) => (
                                            <MenuItem key={a.accessory_id} value={a.accessory_id}>
                                                {a.name} - {a.type}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                                <div className="col-12 d-grid">
                                    <ConfirmButton
                                        type="submit"
                                        disabled={Object.entries(formData)
                                            .filter(([k]) => k !== "tool_required" && k !== "accessories_used")
                                            .some(([, v]) => !v)}
                                    >
                                        Thêm bước
                                    </ConfirmButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
	);
};

export default AddProcessStep;
