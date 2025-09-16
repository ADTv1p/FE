import React, { useState } from "react";
import { toast } from "react-toastify";
import { AddButton, ConfirmButton, CloseButton, DeleteButton, EditButton } from '../../common/ActionButtons';

const ReportErrorForm = ({ onSubmit, onShowAddError, errors = [], workOrders = [], positions = [] }) => {
	const [formData, setFormData] = useState({
        work_order_id: "",
        error_id: "",
        staff_id: "",
        note: "",
    });

    const [positionSelected, setPositionSelected] = useState(null)
    const [showPositionModal, setShowPositionModal] = useState(false);
    const [showStaffModal, setShowStaffModal] = useState(false);

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

    const handleSelectStaff = (staff_id) => {
        console.log(staff_id)
        setFormData({ ...formData, staff_id: staff_id });
        setShowStaffModal(false);
        console.log(formData)
    };

    const handleSelectPosition = (position) => {
        setPositionSelected(position);
        setShowPositionModal(false);
    };

    const validateFormData = (data) => [
        !data.work_order_id && "Vui lòng chọn đơn công việc",
        !data.error_id && "Vui lòng chọn lỗi",
        !data.staff_id && "Vui lòng chọn người thao tác",
        !data.note?.trim() && "Vui lòng nhập mô tả",
    ].filter(Boolean);

    const handleSubmit = (e) => {
        e.preventDefault();const validationErrors = validateFormData(formData);
        if (validationErrors.length > 0) { validationErrors.forEach((error) => toast.error(error)); return; }
        if (onSubmit) onSubmit(formData);
        setPositionSelected(null)
        setFormData({
            work_order_id: "",
            error_id: "",
            staff_id: "",
            note: "",
        });
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
                                <label className="form-label fw-semibold">ID Đơn sản xuất</label>
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
                                <label className="form-label fw-semibold">ID Lỗi</label>
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

                            <div className="col-12">
                                <label className="form-label fw-semibold">ID Vị trí</label>
                                <div className="input-group">
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="position_id"
                                        value={positionSelected?positionSelected.position_id:""}
                                        onChange={handleChange}
                                        min={1}
                                        disabled
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary btn-sm"
                                        onClick={() => setShowPositionModal(true)}
                                        style={{ width: "11.5em" }}
                                    >
                                        Chọn vị trí
                                    </button>
                                </div>
                            </div>

                            <div className="col">
                                <label className="form-label fw-semibold">ID Nhân viên</label>
                                <div className="input-group">
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="staff_id"
                                        value={formData.staff_id}
                                        onChange={handleChange}
                                        min={1}
                                        disabled
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary btn-sm"
                                        onClick={() => setShowStaffModal(true)}
                                        style={{ width: "11.5em" }}
                                    >
                                        Chọn người tao tác lỗi
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
                                <ConfirmButton type="submit">
                                    Báo cáo lỗi
                                </ConfirmButton>
                            </div>
                        </div>
                    </div>
                    {/* Cột danh sách lỗi */}
                    <div className="col">
                        <div className="p-4 border rounded bg-light h-100">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <p className="m-0 fw-bold text-primary">Chọn lỗi có sẵn:</p>
                                <AddButton
                                    onClick={onShowAddError}
                                >
                                    Thêm lỗi mới
                                </AddButton>
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
                    {showPositionModal === true && (
                        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Chọn vị trí</h5>
                                        <button
                                            type="button"
                                            className="btn-close border"
                                            onClick={() => setShowPositionModal(false)}
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
                                                                    positionSelected && positionSelected.position_id === pos.position_id
                                                                        ? "btn-success"
                                                                        : "btn-outline-success"
                                                                } rounded-pill px-4 w-100`}
                                                                onClick={() => handleSelectPosition(pos)}
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
                                            className="btn btn-sm btn-outline-secondary rounded-pill"
                                            onClick={() => setShowPositionModal(false)}
                                        >
                                            Đóng
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* Modal chọn người thao tác lỗi */}
                    {showStaffModal && (
                        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Chọn người thao tác lỗi</h5>
                                        <button
                                            type="button"
                                            className="btn-close border"
                                            onClick={() => setShowStaffModal(false)}
                                        ></button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="d-flex flex-column gap-3">
                                            {positionSelected && positionSelected.staffs && positionSelected.staffs.length > 0 ? (
                                                positionSelected.staffs.map((s) => (
                                                    <div key={s.staff_id} className="d-flex align-items-center p-2 border rounded bg-white shadow-sm">
                                                        <div>
                                                            <button
                                                                type="button"
                                                                className={`btn btn-sm ${
                                                                    formData.staff_id === s.staff_id
                                                                        ? "btn-success"
                                                                        : "btn-outline-success"
                                                                } rounded-pill px-4 w-100`}
                                                                onClick={() => handleSelectStaff(s.staff_id)}
                                                            >
                                                                Chọn
                                                            </button>
                                                        </div>
                                                        <div className="ms-3 flex-grow-1">
                                                            <small className="text-muted d-block">Tên: {s.full_name}</small>
                                                            <small className="text-muted d-block fw-semibold">Phòng ban: {s.department}</small>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="text-center text-muted p-3 border rounded bg-light">
                                                    Không có nhân viên nào được tìm thấy.
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-outline-secondary rounded-pill"
                                            onClick={() => setShowStaffModal(false)}
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
