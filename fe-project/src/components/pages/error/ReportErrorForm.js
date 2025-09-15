import React, { useState } from "react";
import { toast } from "react-toastify";

const ReportErrorForm = ({ onSubmit, onShowAddError, errors = [], workOrders = [], positions = [] }) => {
	const [formData, setFormData] = useState({
		work_order_id: "",
		error_id: "",
        position_id: "",
		note: "",
	});

    const [showPositionModal, setShowPositionModal] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSelectError = (id) => {
		setFormData({ ...formData, error_id: id });
	};

    const handleSelectWorkOrder = (id) => {
        setFormData({ ...formData, work_order_id: id });
    };

    const handleSelectPosition = (id) => {
        setFormData({ ...formData, position_id: id });
        setShowPositionModal(false);
    };

	const validateFormData = (data) => {
        const errors = [];
        if (!data.work_order_id) {
            errors.push("Vui lòng chọn đơn công việc");
        }
        if (!data.error_id) {
            errors.push("Vui lòng chọn lỗi");
        }
        if (!data.position_id) {
            errors.push("Vui lòng chọn vị trí");
        }
        if (!data.note?.trim()) {
            errors.push("Vui lòng nhập mô tả");
        }
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateFormData(formData);
        if (validationErrors.length > 0) {
            validationErrors.forEach((error) => toast.error(error));
            return;
        }
        if (onSubmit) onSubmit(formData);
        setFormData({
            work_order_id: "",
            error_id: "",
            position_id: "",
            note: "",
        });
    };

    const togglePositionModal = () => {
        setShowPositionModal(!showPositionModal);
    };

	return (
		<div className="card shadow-sm border-0">
			<div className="card-body">
				<form onSubmit={handleSubmit} className="row g-3">
                    <div className="col">
                        <div className="p-4 border rounded bg-light h-100">
                            <p className="fw-bold mb-3 text-primary">Chọn đơn công việc có sẵn:</p>
                            <div className="d-flex flex-wrap gap-2">
                                {workOrders.length > 0 ? (
                                    workOrders.map((wo) => (
                                        <div key={wo.work_order_id} className="d-flex flex-column align-items-start mb-3">
                                            <button
                                                type="button"
                                                className={`btn btn-sm ${
                                                    formData.work_order_id === wo.work_order_id
                                                        ? "btn-primary"
                                                        : "btn-outline-primary"
                                                } rounded-pill px-3 mb-2`}
                                                onClick={() => handleSelectWorkOrder(wo.work_order_id)}
                                            >
                                                {wo.description}
                                            </button>
                                            <div className="ms-2">
                                                <small className="text-muted d-block">Trạng thái: {wo.status}</small>
                                                <small className="text-muted d-block">Mô tả: {wo.description}</small>
                                                <small className="text-muted d-block">Trạng thái: {wo.status}</small>
                                                <small className="text-muted d-block">
                                                    Thời gian bắt đầu: {wo.start_time ? new Date(wo.start_time).toLocaleString() : 'Chưa xác định'}
                                                </small>
                                                <small className="text-muted d-block">
                                                    Thời gian kết thúc: {wo.end_time ? new Date(wo.end_time).toLocaleString() : 'Chưa xác định'}
                                                </small>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <small className="text-muted">Không có đơn công việc nào</small>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* Cột nhập dữ liệu */}
                    <div className="col">
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Work Order ID</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="work_order_id"
                                    value={formData.work_order_id}
                                    onChange={handleChange}
                                    min={1}
                                    disabled
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Error ID</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="error_id"
                                    value={formData.error_id}
                                    min={1}
                                    onChange={handleChange}
                                    disabled
                                    required
                                />
                            </div>

                            <div className="col">
                                <label className="form-label fw-semibold">Position ID</label>
                                <div className="input-group">
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="position_id"
                                        value={formData.position_id}
                                        onChange={handleChange}
                                        min={1}
                                        disabled
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary btn-sm"
                                        onClick={togglePositionModal}
                                    >
                                        Chọn vị trí
                                    </button>
                                </div>
                            </div>

                            <div className="col-12">
                                <label className="form-label fw-semibold">Note</label>
                                <textarea
                                    className="form-control"
                                    name="note"
                                    rows="3"
                                    value={formData.note}
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            <div className="col-12 d-grid">
                                <button type="submit" className="btn btn-lg btn-danger rounded-pill px-3">
                                    Báo cáo lỗi
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Cột danh sách lỗi */}
                    <div className="col">
                        <div className="p-4 border rounded bg-light h-100">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <p className="m-0 fw-bold text-primary">Chọn lỗi có sẵn:</p>
                                <button
                                    className="btn btn-sm rounded-pill btn-danger"
                                    onClick={onShowAddError}
                                >
                                    Thêm lỗi mới
                                </button>
                            </div>
                            <div className="d-flex flex-wrap gap-2">
                                {errors.length > 0 ? (
                                    errors.map((err) => (
                                        <div key={err.error_id} className="d-flex flex-column align-items-start">
                                            <button
                                                type="button"
                                                className={`btn btn-sm ${
                                                    formData.error_id === err.error_id
                                                        ? "btn-danger"
                                                        : "btn-outline-danger"
                                                } rounded-pill px-3 mb-1`}
                                                onClick={() => handleSelectError(err.error_id)}
                                            >
                                                {err.name}
                                            </button>
                                            <small className="text-muted ms-2">{err.description}</small>
                                        </div>
                                    ))
                                ) : (
                                    <small className="text-muted">Không có lỗi nào</small>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* Modal chọn vị trí */}
                    {showPositionModal && (
                        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Chọn vị trí</h5>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            onClick={togglePositionModal}
                                        ></button>
                                    </div>
                                    <div className="modal-body">
                                        {positions.length > 0 ? (
                                            <div className="d-flex flex-column gap-3">
                                                {positions.map((pos) => (
                                                    <div key={pos.position_id} className="d-flex align-items-center p-2 border rounded bg-white shadow-sm">
                                                        <div style={{ width: '120px' }}>
                                                            <button
                                                                type="button"
                                                                className={`btn btn-sm ${
                                                                    formData.position_id === pos.position_id
                                                                        ? "btn-success"
                                                                        : "btn-outline-success"
                                                                } rounded-pill px-4 w-100`}
                                                                onClick={() => handleSelectPosition(pos.position_id)}
                                                            >
                                                                {pos.code}
                                                            </button>
                                                        </div>
                                                        <div className="ms-3 flex-grow-1">
                                                            <small className="text-muted d-block fw-semibold">Mã: {pos.code}</small>
                                                            <small className="text-muted d-block">Vai trò: {pos.role}</small>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <small className="text-muted">Không có vị trí nào</small>
                                        )}
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-secondary rounded-pill"
                                            onClick={togglePositionModal}
                                        >
                                            Đóng
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </form>
			</div>
		</div>
	);
};

export default ReportErrorForm;
