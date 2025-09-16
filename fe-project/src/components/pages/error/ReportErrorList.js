import { useNavigate } from "react-router-dom";

const RecordErrorList = ({ workRecordList = []}) => {
    const navigate = useNavigate();

    return (
        <>
			<style>
				{`
					.record-item {
						cursor: pointer;
						transition: background-color 0.3s ease, transform 0.1s ease;
					}
					
					.record-item:hover {
						background-color: #2cbba14e;
                        transform: translateY(-.6em);
					}
				`}
			</style>
            <div className="card shadow-sm border-0 mb-2">
                <div className="card-body p-3">
                    <ul className="list-group list-group-flush">
                        {workRecordList.map((record) => (
                            <li 
                                key={record.work_record_id} 
                                className="list-group-item py-3 px-4 mb-2 record-item"
                                style={{ cursor: 'pointer', borderBottom: "2px solid #2cbba1ff" }}
                                onClick={() => navigate(`/chi-tiet-loi/${record.work_record_id}`)}
                            >
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h6 className="text-primary mb-0">Báo cáo #{record.work_record_id}</h6>
                                    <small className="text-muted font-italic">
                                        {new Date(record.createdAt).toLocaleString()}
                                    </small>
                                </div>
                                <div className="row g-3">
                                    <div className="col-6">
                                        <div className="d-flex flex-column gap-2">
                                             <div className="border-bottom">
                                                <span className="fw-bold text-dark">Người thao tác (GAY LOI): </span>
                                                <small className="text-muted">{record.staff?.full_name || "N/A"}</small>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-column gap-2">
                                            <div className="border-bottom">
                                                <span className="fw-bold text-dark">Đơn công việc: </span>
                                                <small className="text-muted">{record.work_order?.description || "N/A"}</small>
                                            </div>
                                            <div className="border-bottom pb-2">
                                                <span className="fw-bold text-dark">Trạng thái: </span>
                                                <small className="badge bg-info text-white">{record.work_order?.status || "N/A"}</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="d-flex flex-column gap-2">
                                            <div className="border-bottom">
                                                <span className="fw-bold text-dark">Lỗi: </span>
                                                <small className="text-muted">{record.error?.name || "N/A"}</small>
                                            </div>
                                            <div className="border-bottom">
                                                <span className="fw-bold text-dark">Mô tả lỗi: </span>
                                                <small className="text-muted">{record.error?.description || "N/A"}</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="d-flex flex-column gap-2">
                                            <div className="border-bottom">
                                                <span className="fw-bold text-dark">Vị trí: </span>
                                                <small className="text-muted">{record.staff?.position.code || "N/A"} (Vai trò: {record.staff?.position.role || "N/A"})</small>
                                            </div>
                                            <div className="border-bottom">
                                                <span className="fw-bold text-dark">Công cụ: </span>
                                                <small className="text-muted">{record.staff?.position?.tools || "N/A"}</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="d-flex flex-column gap-2">
                                            <div className="border-bottom">
                                                <span className="fw-bold text-dark">Ghi chú: </span>
                                                <small className="text-muted">{record.note || "Không có ghi chú"}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                        {workRecordList.length === 0 && (
                            <p className="text-muted text-center my-4">Không có báo cáo lỗi nào</p>
                        )}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default RecordErrorList;