import React from "react";

const RecordErrorList = ({ workRecordList = [] }) => {
    return (
        <div className="card shadow-sm border-0 mb-3">
            <div className="card-header bg-light py-2">
                <h5 className="mb-0">Danh sách báo cáo lỗi</h5>
            </div>
            <div className="card-body p-3">
                {workRecordList.length > 0 ? (
                    <ul className="list-group list-group-flush">
                        {workRecordList.map((record) => (
                            <li key={record.work_record_id} className="list-group-item d-flex flex-column py-3">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <strong className="text-primary">Báo cáo #{record.work_record_id}</strong>
                                    <small className="text-muted">
                                        {new Date(record.createdAt).toLocaleString()}
                                    </small>
                                </div>
                                <div className="row g-2">
                                    <div className="col-6">
                                        <small className="text-muted d-block">
                                            <strong>Đơn công việc:</strong> {record.work_order?.description || "N/A"} (ID: {record.work_order_id})
                                        </small>
                                        <small className="text-muted d-block">
                                            <strong>Trạng thái:</strong> {record.work_order?.status || "N/A"}
                                        </small>
                                    </div>
                                    <div className="col-6">
                                        <small className="text-muted d-block">
                                            <strong>Lỗi:</strong> {record.error?.name || "N/A"} (ID: {record.error_id})
                                        </small>
                                        <small className="text-muted d-block">
                                            <strong>Mô tả lỗi:</strong> {record.error?.description || "N/A"}
                                        </small>
                                    </div>
                                    <div className="col-6">
                                        <small className="text-muted d-block">
                                            <strong>Vị trí:</strong> {record.position?.code || "N/A"} (Vai trò: {record.position?.role || "N/A"})
                                        </small>
                                        <small className="text-muted d-block">
                                            <strong>Công cụ:</strong> {record.position?.tools || "N/A"}
                                        </small>
                                    </div>
                                    <div className="col-6">
                                        <small className="text-muted d-block">
                                            <strong>Ghi chú:</strong> {record.note || "Không có ghi chú"}
                                        </small>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-muted text-center">Không có báo cáo lỗi nào</p>
                )}
            </div>
        </div>
    );
};

export default RecordErrorList;