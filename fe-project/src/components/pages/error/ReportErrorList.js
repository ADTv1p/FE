import { useNavigate } from "react-router-dom";

const RecordErrorList = ({ workRecordList = []}) => {
    const navigate = useNavigate();
    return (
        <>
			<style>
				{`
					.record-item {
						cursor: pointer;
						transition: background-color 0.3s ease, transform 0.3s ease-in-out;
					}
					
					.record-item:hover {
						background-color: #02437D;
						color: #F1C143;
                        transform: translateY(-.3em);
					}
				`}
			</style>
            <div className="card shadow-sm" style={{ backgroundColor: "#fff", color: "#02437D", borderColor: "#02437D" }}>
                <div className="card-body">
                    <h5 className="card-title fw-bold mb-3">Danh sách lỗi</h5>
                    <ul className="list-group list-group-flush">
                        {workRecordList.map((record) => (
                            <li 
                                key={record.work_record_id} 
                                className="list-group-item py-3 px-4 mb-2 record-item rounded shadow-sm"
                                onClick={() => navigate(`/chi-tiet-loi/${record.work_record_id}`)}
                            >
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h5 className="fw-bold">Báo cáo #{record.work_record_id}</h5>
                                    <small className="font-italic">
                                        {new Date(record.createdAt).toLocaleString()}
                                    </small>
                                </div>
                                <div className="row g-3">
                                    <div className="col-6">
                                        <div className="d-flex flex-column gap-2">
                                             <div className="border-bottom">
                                                <span className="fw-bold">Người thao tác: </span>
                                                <small>{record.staff?.full_name || "N/A"}</small>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-column gap-2">
                                            <div className="border-bottom">
                                                <span className="fw-bold">Đơn công việc: </span>
                                                <small>{record.work_order?.description || "N/A"}</small>
                                            </div>
                                            <div className="border-bottom pb-2">
                                                <span className="fw-bold">Trạng thái: </span>
                                                <small className="badge bg-info text-white">{record.work_order?.status || "N/A"}</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="d-flex flex-column gap-2">
                                            <div className="border-bottom">
                                                <span className="fw-bold">Lỗi: </span>
                                                <small>{record.error?.name || "N/A"}</small>
                                            </div>
                                            <div className="border-bottom">
                                                <span className="fw-bold">Mô tả lỗi: </span>
                                                <small>{record.error?.description || "N/A"}</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="d-flex flex-column gap-2">
                                            <div className="border-bottom">
                                                <span className="fw-bold">Vị trí: </span>
                                                <small>{record.staff?.position.code || "N/A"} (Vai trò: {record.staff?.position.role || "N/A"})</small>
                                            </div>
                                            <div className="border-bottom">
                                                <span className="fw-bold">Công cụ: </span>
                                                <small>{record.staff?.position?.tools || "N/A"}</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="d-flex flex-column gap-2">
                                            <div className="border-bottom">
                                                <span className="fw-bold">Ghi chú: </span>
                                                <small>{record.note || "Không có ghi chú"}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                        {workRecordList.length === 0 && (
                            <p className="text-center my-3">Không có báo cáo lỗi nào</p>
                        )}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default RecordErrorList;