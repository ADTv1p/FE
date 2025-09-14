// src/components/processes/AddProcessStep.jsx
import { useState } from "react";

const AddProcessStep = ({ process, accessories, onSubmit, onClose }) => {
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
		<div className="card shadow-sm border-0">
			<div className="card-header d-flex justify-content-between align-items-center py-2 bg-light">
				<p className="lead fs-5 mb-0">Thêm bước mới</p>
				<button className="btn btn-sm btn-outline-secondary" onClick={onClose}>Đóng</button>
			</div>
			<div className="card-body p-3">
                <div className="mb-3">
                    <p className="mb-1 text-center">
                        Quy trình: <strong>{process?.name}</strong>
                    </p>
                </div>
				<form onSubmit={handleSubmit} className="row g-3">
                    <div className="col-4">
                        <label className="form-label fw-semibold">Thứ tự bước</label>
                        <input
                            type="number"
                            name="step_order"
                            className="form-control"
                            placeholder="Nhập số thứ tự"
                            value={formData.step_order}
                            onChange={handleChange}
                            min="1"
                            required
                        />
                    </div>

                    <div className="col-8">
                        <label className="form-label fw-semibold">Tên bước</label>
                        <input
                            type="text"
                            name="step_name"
                            className="form-control"
                            placeholder="Nhập tên bước"
                            value={formData.step_name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col-12">
                        <label className="form-label fw-semibold">Hướng dẫn</label>
                        <textarea
                            name="instruction"
                            className="form-control"
                            rows="3"
                            placeholder="Mô tả chi tiết cách thực hiện"
                            value={formData.instruction}
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    <div className="col-6">
                        <label className="form-label fw-semibold">Dụng cụ cần</label>
                        <select
                            name="tool_required"
                            className="form-select"
                            value={formData.tool_required}
                            onChange={handleChange}
                        >
                            <option value="">-- Không chọn --</option>
                            <option value="dao">Dao cắt băng keo</option>
                            <option value="keo">Kéo</option>
                            <option value="sung_gio">Súng bắn dây rút</option>
                            <option value="mo_vit">Mỏ vịt</option>
                        </select>
                    </div>


                    <div className="col-6">
                        <label className="form-label fw-semibold">Chọn phụ kiện</label>
                        <select
                            name="accessory_id"
                            className="form-select"
                            value={formData.accessory_id}
                            onChange={handleChange}
                        >
                            <option value="">-- Không chọn --</option>
                            {accessories?.map((a) => (
                                <option key={a.accessory_id} value={a.accessory_id}>
                                    {a.name} - {a.type}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-12 d-grid">
                        <button type="submit" className="btn btn-outline-success">
                            <i className="fas fa-plus me-2"></i>Thêm bước
                        </button>
                    </div>
                </form>
			</div>
		</div>
	);
};

export default AddProcessStep;
