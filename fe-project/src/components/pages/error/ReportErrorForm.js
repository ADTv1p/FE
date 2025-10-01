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
        <div className="card shadow-sm h-100" style={{ backgroundColor: "#fff", color: "#02437D", borderColor: "#02437D" }}>
			<div className="card-body">
				<form onSubmit={handleSubmit} className="row g-3">
                    <div className="col">
                        <div className="card shadow-sm h-100" style={{ backgroundColor: "#02437D", color: "#fff", borderColor: "transparent" }}>
                            <div className="card-body">
                                <h5 className="card-title fw-bold mb-3">Chọn đơn công việc có sẵn:</h5>
                                <div className="d-flex flex-wrap gap-2">
                                    {workOrders.length > 0 ? (
                                        workOrders.map((wo) => (
                                            <div key={wo.work_order_id} className="d-flex flex-column align-items-start mb-3">
                                                <AddButton 
                                                    style={{ backgroundColor: formData.work_order_id === wo.work_order_id ? "#F1C143" : "" }}
                                                    onClick={() => handleSelectWorkOrder(wo.work_order_id)} >{wo.description}
                                                </AddButton>

                                                <div className="mt-2">
                                                    <small className="d-block">Trạng thái: {wo.status}</small>
                                                    <small className="d-block">Mô tả: {wo.description}</small>
                                                    <small className="d-block">Trạng thái: {wo.status}</small>
                                                    <small className="d-block">
                                                        Thời gian bắt đầu: {wo.start_time ? new Date(wo.start_time).toLocaleString() : 'Chưa xác định'}
                                                    </small>
                                                    <small className="d-block">
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
                        <div className="card shadow-sm h-100" style={{ backgroundColor: "#F1C143", color: "#02437D", borderColor: "transparent" }}>
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h5 className="card-title fw-bold">Chọn lỗi có sẵn:</h5>
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
                                                    } rounded px-3 mb-1`}
                                                    onClick={() => handleSelectError(err.error_id)}
                                                >
                                                    {err.name}
                                                </button>
                                                <small className="ms-2">{err.description}</small>
                                            </div>
                                        ))
                                    ) : (
                                        <small className="">Không có lỗi nào</small>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Modal chọn vị trí */}
                    {showPositionModal === true && (
                        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header py-2" style={{ backgroundColor: "#02437D", color: "#fff" }}>
                                        <h5 className="modal-title">Chọn vị trí</h5>
                                        <CloseButton size="small" className="btn-close" onClick={() => setShowPositionModal(false)} />
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
                                                                        ? "btn-primary"
                                                                        : "btn-outline-primary"
                                                                } rounded px-4 w-100`}
                                                                onClick={() => handleSelectPosition(pos)}
                                                            >
                                                                {pos.code}
                                                            </button>
                                                        </div>
                                                        <div className="ms-3 flex-grow-1">
                                                            <small className="d-block fw-semibold">Mã: {pos.code}</small>
                                                            <small className="d-block">Vai trò: {pos.role}</small>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <small className="text-muted">Không có vị trí nào</small>
                                        )}
                                    </div>
                                    <div className="modal-footer">
                                        <CloseButton type="button" onClick={() => setShowPositionModal(false)} />       
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
                                    <div className="modal-header py-2" style={{ backgroundColor: "#02437D", color: "#fff" }}>
                                        <h5 className="modal-title">Chọn người thao tác lỗi</h5>
                                        <CloseButton size="small" className="btn-close" onClick={() => setShowStaffModal(false)}/>
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
                                                                        ? "btn-primary"
                                                                        : "btn-outline-primary"
                                                                } rounded px-4 w-100`}
                                                                onClick={() => handleSelectStaff(s.staff_id)}
                                                            >
                                                                Chọn
                                                            </button>
                                                        </div>
                                                        <div className="ms-3 flex-grow-1">
                                                            <small className=" d-block">Tên: {s.full_name}</small>
                                                            <small className=" d-block fw-semibold">Phòng ban: {s.department}</small>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="text-center  p-3 border rounded bg-light">
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
