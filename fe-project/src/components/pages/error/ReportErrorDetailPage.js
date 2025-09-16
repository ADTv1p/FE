import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import workRecordService from "../../../services/workRecordService";
import exportWorkRecordToWord from "./exportWorkRecordToWord ";
import ExportButton from "../../common/ExportButton";
import IfLoading from "../../common/IfLoading";
import IfError from "../../common/IfError";

const ReportErrorDetail = () => {
    const { work_record_id } = useParams();
	const [workRecord, setWorkRecords] = useState({});
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchWorkRecord = async () => {
			try {
				setLoading(true);
				const res = await workRecordService.getWorkRecordByIdApiService(work_record_id);
				setWorkRecords(res.DT);
			} catch (err) {
				console.error(err);
				setError(true);
			} finally {
				setLoading(false)
			}
		};
		fetchWorkRecord();
	}, [work_record_id]);

	if (loading) return <IfLoading />
	if (error) return <IfError />

    return (
		 <div className="container">
            <div className="card shadow-sm border-0 mb-2">
                <div className="card-body d-flex justify-content-between align-items-center">
                    <h2 className="fs-2 lead mb-0">Quản lý lỗi</h2>
                    <div>
						<ExportButton onClick={() => exportWorkRecordToWord(workRecord)}>
							Xuất ra Word
						</ExportButton>
					</div>
            	</div>
            </div>
            {workRecord ? (
                <div className="card shadow-sm border-0 mb-2 p-4">
					{/* Thông tin nhân viên */}
					<div className="mb-4">
						<p className="lead fs-4 fst-italic text-center">------------------------------------------------ Thông tin nhân viên ------------------------------------------------</p>
						<div className="d-flex align-items-center bg-light mb-3 border rounded p-2">
							<img
								src={`http://localhost:3001/${workRecord.staff?.avatar}`}
								alt="Ảnh đại diện"
								className="rounded-circle me-3"
								style={{ width: '8em', height: '8em', objectFit: 'cover' }}
							/>
							<div>
								<div className="mb-1"><span className="text-white d-inline-block fw-semibold me-2 px-2 rounded" style={{ width: "10em", backgroundColor: "#3c81a1ff" }}>
									ID Nhân viên:</span> {workRecord.staff?.staff_id}
								</div>
								<div className="mb-1"><span className="text-white d-inline-block fw-semibold me-2 px-2 rounded" style={{ width: "10em", backgroundColor: "#3c81a1ff" }}>
									Họ tên:</span> {workRecord.staff?.full_name}
								</div>
							</div>
						</div>
						<div className="d-flex gap-2 flex-wrap">
							<div className="bg-light border rounded p-2" style={{ flex: "1 1 0" }}>
								<div className="mb-1"><span className="text-white d-inline-block fw-semibold me-2 px-2 rounded" style={{ width: "10em", backgroundColor: "#3ca152ff" }}>Email:</span> {workRecord.staff?.email}</div>
								<div className="mb-1"><span className="text-white d-inline-block fw-semibold me-2 px-2 rounded" style={{ width: "10em", backgroundColor: "#3ca152ff" }}>Phone:</span> {workRecord.staff?.phone}</div>
								<div className="mb-1"><span className="text-white d-inline-block fw-semibold me-2 px-2 rounded" style={{ width: "10em", backgroundColor: "#3ca152ff" }}>Ngày sinh:</span> {new Date(workRecord.staff?.date_of_birth).toLocaleDateString()}</div>
								<div className="mb-1"><span className="text-white d-inline-block fw-semibold me-2 px-2 rounded" style={{ width: "10em", backgroundColor: "#3ca152ff" }}>Trạng thái:</span> {workRecord.staff?.status}</div>
								<div className="mb-1"><span className="text-white d-inline-block fw-semibold me-2 px-2 rounded" style={{ width: "10em", backgroundColor: "#3ca152ff" }}>Thời gian tạo:</span> {new Date(workRecord.staff?.createdAt).toLocaleString()}</div>
								<div className="mb-1"><span className="text-white d-inline-block fw-semibold me-2 px-2 rounded" style={{ width: "10em", backgroundColor: "#3ca152ff" }}>Thời gian cập nhật:</span> {new Date(workRecord.staff?.updatedAt).toLocaleString()}</div>
							</div>

							<div className="bg-light border rounded p-2" style={{ flex: "1 1 0" }}>
								<div className="mb-1"><span className="text-white d-inline-block fw-semibold me-2 px-2 rounded" style={{ width: "10em", backgroundColor: "#1daca0ff" }}>Phòng ban:</span> {workRecord.staff?.department}</div>
								<div className="mb-1"><span className="text-white d-inline-block fw-semibold me-2 px-2 rounded" style={{ width: "10em", backgroundColor: "#1daca0ff" }}>Dụng cụ:</span> {workRecord.staff?.position?.tools}</div>
								<div className="mb-1"><span className="text-white d-inline-block fw-semibold me-2 px-2 rounded" style={{ width: "10em", backgroundColor: "#1daca0ff" }}>Chức vụ:</span> {workRecord.staff?.position?.code} - {workRecord.staff?.position?.role}</div>
								<div className="mb-1"><span className="text-white d-inline-block fw-semibold me-2 px-2 rounded" style={{ width: "10em", backgroundColor: "#1daca0ff" }}>Quy trình:</span> {workRecord.staff?.position?.process?.name}</div>
								<div className="mb-1"><span className="text-white d-inline-block fw-semibold me-2 px-2 rounded" style={{ width: "10em", backgroundColor: "#1daca0ff" }}>Ngày bắt đầu:</span> {new Date(workRecord.staff?.start_date).toLocaleDateString()}</div>
							</div>
						</div>
					</div>
					<hr />

					{/* Thông tin lỗi & Báo cáo lỗi */}
					<div className="mb-4">
						<p className="lead fs-4 fst-italic text-center">------------------------------------------------ Thông tin lỗi & Báo cáo lỗi ------------------------------------------------</p>
						<div className="d-flex gap-2 flex-wrap align-items-stretch">
							<div className="bg-light border rounded p-2" style={{ flex: "1 1 0" }}>
								<div className="mb-1"><span className="text-white d-inline-block fw-semibold me-2 px-2 rounded" style={{width:"10em",backgroundColor:"#bf1414ff"}}>ID lỗi:</span>{workRecord.error?.error_id}</div>
								<div className="mb-1"><span className="text-white d-inline-block fw-semibold me-2 px-2 rounded" style={{width:"10em",backgroundColor:"#bf1414ff"}}>Tên lỗi:</span>{workRecord.error?.name}</div>
								<div className="mb-1"><span className="text-white d-inline-block fw-semibold me-2 px-2 rounded" style={{width:"10em",backgroundColor:"#bf1414ff"}}>Mô tả:</span>{workRecord.error?.description}</div>
								<div className="mb-1"><span className="text-white d-inline-block fw-semibold me-2 px-2 rounded" style={{width:"10em",backgroundColor:"#bf1414ff"}}>Thời gian tạo:</span>{new Date(workRecord.error?.createdAt).toLocaleString()}</div>
								<div className="mb-1"><span className="text-white d-inline-block fw-semibold me-2 px-2 rounded" style={{width:"10em",backgroundColor:"#bf1414ff"}}>Thời gian cập nhật:</span>{new Date(workRecord.error?.updatedAt).toLocaleString()}</div>
							</div>

							<div className="bg-light border rounded p-2" style={{ flex: "1 1 0" }}>
								<div className="mb-1"><span className="text-white d-inline-block fw-semibold me-2 px-2 rounded" style={{width:"12em",backgroundColor:"#2d62acff"}}>ID Báo cáo lỗi:</span>{workRecord.work_record_id}</div>
								<div className="mb-1"><span className="text-white d-inline-block fw-semibold me-2 px-2 rounded" style={{width:"12em",backgroundColor:"#2d62acff"}}>Ghi chú:</span>{workRecord.note}</div>
								<div className="mb-1"><span className="text-white d-inline-block fw-semibold me-2 px-2 rounded" style={{width:"12em",backgroundColor:"#2d62acff"}}>Thời gian tạo:</span>{workRecord.createdAt && new Date(workRecord.createdAt).toLocaleString() || "haha"}</div>
							</div>
						</div>
					</div>
					<hr />

					{/* Thông tin Ca làm việc */}
					<div className="mb-4">
						<p className="lead fs-4 fst-italic text-center">------------------------------------------------ Thông tin Ca làm việc ------------------------------------------------</p>
						<div className="d-flex gap-2 flex-wrap">
							<div className="bg-light border rounded p-2" style={{ flex: "1 1 0" }}>
								<div className="mb-1"><span className="text-white d-inline-block fw-semibold me-2 px-2 rounded" style={{width:"10em",backgroundColor:"#8c34a4ff"}}>ID Ca làm:</span>{workRecord.work_order?.work_order_id}</div>
								<div className="mb-1"><span className="text-white d-inline-block fw-semibold me-2 px-2 rounded" style={{width:"10em",backgroundColor:"#8c34a4ff"}}>Mô tả:</span>{workRecord.work_order?.description}</div>
								<div className="mb-1"><span className="text-white d-inline-block fw-semibold me-2 px-2 rounded" style={{width:"10em",backgroundColor:"#8c34a4ff"}}>Trạng thái:</span>{workRecord.work_order?.status}</div>
							</div>

							<div className="bg-light border rounded p-2" style={{ flex: "1 1 0" }}>
								<div className="mb-1"><span className="text-white d-inline-block fw-semibold me-2 px-2 rounded" style={{width:"10em",backgroundColor:"#bb6e30ff"}}>Thời gian bắt đầu:</span>{new Date(workRecord.work_order?.start_time).toLocaleString()}</div>
								<div className="mb-1"><span className="text-white d-inline-block fw-semibold me-2 px-2 rounded" style={{width:"10em",backgroundColor:"#bb6e30ff"}}>Thời gian kết thúc:</span>{workRecord.work_order?.end_time ? new Date(workRecord.work_order.end_time).toLocaleString() : "Không có dữ liệu"}</div>
								<div className="mb-1"><span className="text-white d-inline-block fw-semibold me-2 px-2 rounded" style={{width:"10em",backgroundColor:"#bb6e30ff"}}>Thời gian tạo:</span>{new Date(workRecord.work_order?.createdAt).toLocaleString()}</div>
								<div className="mb-1"><span className="text-white d-inline-block fw-semibold me-2 px-2 rounded" style={{width:"10em",backgroundColor:"#bb6e30ff"}}>Thời gian cập nhật:</span>{new Date(workRecord.work_order?.updatedAt).toLocaleString()}</div>
							</div>
						</div>
					</div>
				</div>
            ) : (
                <div className="text-center py-5">
                    <p className="fs-5">Đang tải dữ liệu hoặc không có dữ liệu...</p>
                </div>
            )}
        </div>
    );
};

export default ReportErrorDetail;
