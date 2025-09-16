import { useState } from "react";
import { CloseButton, ConfirmButton } from "../../common/ActionButtons";

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
                    <div className="modal-content">
                        <div className="modal-header bg-light py-2">
                            <h5 className="modal-title" id="addProcessStepModalLabel">Thêm bước mới</h5>
                            <button
                                type="button"
                                className="btn-close border"
                                onClick={onClose}
                            ></button>
                        </div>
                        <div className="modal-body p-3">
                            <div className="mb-3 text-center">
                                <p className="mb-1">
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