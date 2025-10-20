import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Report } from "@mui/icons-material";
import { Avatar, Typography } from "@mui/material";
import { BackButton } from "../../common/ActionButtons";

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
				setTimeout(() => {
					setLoading(false);
				}, 1000);
			}
		};
		fetchWorkRecord();
	}, [work_record_id]);

	const InfoRow = ({ label, value }) => (
		<div className="mb-1">
			<span className="d-inline-block px-2" style={{ width: "10em" }}>
				{label}:
			</span>
			<span className="fw-semibold">{value}</span>
		</div>
	);

	const ErrorRow = ({ label, value }) => (
		<div className="mb-1 d-flex flex-row">
			<span style={{ width: "10em" }}>
				{label}:
			</span>
			<span className="fw-semibold">{value}</span>
		</div>
	);

	const OrderRow = ({ label, value }) => (
		<div className="mb-1 d-flex flex-row">
			<span className="d-inline-block px-2" style={{ width: "10em" }}>
				{label}:
			</span>
			<span className="fw-semibold">{value}</span>
		</div>
	);

	if (loading) return <IfLoading />
	if (error) return <IfError />

    return (
		 <div className="container">
			<div className="card shadow-sm p-3 mb-3 d-flex flex-row justify-content-between align-items-center" style={{ border: "1px solid #02437D"}}>
                <Typography variant="h4" display="flex" alignItems="center" gap={2} sx={{ color: "#02437D" }}>
                    <Report fontSize="large" />
                    THÔNG TIN SỰ CỐ
                </Typography>
                 <div>
                   <ExportButton className="me-2" onClick={() => exportWorkRecordToWord(workRecord)}>
							Xuất ra Word
						</ExportButton>
                    <BackButton onClick={() => window.history.back()}>
                        Quay lại
                    </BackButton>
                </div>
            </div>
            {workRecord ? (
				<>
					{/* Thông tin nhân viên */}
					<div className="mb-4">
						<div className="card shadow-sm" style={{ borderColor: "#02437D" }}>
							<div className="card-header fw-bold fs-4 text-center" style={{ backgroundColor: "#02437D", color: "#fff" }}>
								Thông tin nhân viên & Vị trí
							</div>
							<div className="card-body" style={{ color: "#02437D" }}>
								<div className="d-flex gap-3 flex-wrap">
									<div className="rounded p-2" style={{ border: "1px solid #02437D", flex: "1 1 0"}}>
										<InfoRow label="Email" value={workRecord.staff?.email} />
										<InfoRow label="Phone" value={workRecord.staff?.phone} />
										<InfoRow label="Ngày sinh" value={workRecord.staff?.date_of_birth} />
										<InfoRow label="Trạng thái" value={workRecord.staff?.status} />
										<InfoRow label="Tạo" value={new Date(workRecord.staff?.createdAt).toLocaleString()} />
										<InfoRow label="Cập nhật" value={new Date(workRecord.staff?.updatedAt).toLocaleString()} />
									</div>

									<div className="rounded p-2" style={{ border: "1px solid #02437D", flex: "1 1 0"}}>
										<div className="d-flex align-items-center mb-3 rounded p-2" style={{ border: "1px solid #02437D"}}>
											<Avatar
												src={workRecord.staff.avatar ? `http://localhost:3001/${workRecord.staff.avatar}` : ""}
												alt="Ảnh đại diện"
												className="rounded-circle me-2"
												style={{ width: '3em', height: '3em', objectFit: 'cover' }}
											/>
											<div>
												<InfoRow label="ID Nhân viên" value={workRecord.staff?.staff_id} />
												<InfoRow label="Họ tên" value={workRecord.staff?.full_name} />
											</div>
										</div>
										<InfoRow label="Phòng ban" value={workRecord.staff?.department} />
										<InfoRow label="Dụng cụ" value={workRecord.staff?.position?.tools} />
										<InfoRow label="Vị trí" value={`${workRecord.staff?.position?.code} - ${workRecord.staff?.position?.role}`} />
										<InfoRow label="Quy trình" value={workRecord.staff?.position?.process?.name} />
										<InfoRow label="Ngày bắt đầu" value={new Date(workRecord.staff?.start_date).toLocaleDateString()} />
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* Thông tin lỗi & Báo cáo lỗi */}
					<div className="mb-4">
						<div className="card shadow-sm" style={{ borderColor: "transparent", borderColor: "#B22222"  }}>
							<div className="card-header fw-bold fs-4 text-center" style={{ backgroundColor: "#B22222", color: "#fff" }}>
								Thông tin sự cố & Báo cáo sự cố
							</div>
							<div className="card-body" style={{ color: "#B22222" }}>
								<div className="d-flex gap-3 flex-wrap align-items-stretch">
									<div className="rounded p-2" style={{ flex: "1 1 0", border: "1px solid #B22222" }}>
										<ErrorRow label="ID sự cố" value={workRecord.error?.error_id} />
										<ErrorRow label="Tên sự cố" value={workRecord.error?.name} />
										<ErrorRow label="Mô tả" value={workRecord.error?.description} />
										<ErrorRow label="Tạo" value={new Date(workRecord.error?.createdAt).toLocaleString()} />
										<ErrorRow label="Cập nhật" value={new Date(workRecord.error?.updatedAt).toLocaleString()} />
									</div>

									<div className="rounded p-2" style={{ flex: "1 1 0", border: "1px solid #B22222" }}>
										<ErrorRow label="ID Báo cáo lỗi" value={workRecord.work_record_id} />
										<ErrorRow label="Ghi chú" value={workRecord.note} />
										<ErrorRow label="Tạo" value={workRecord.createdAt && new Date(workRecord.createdAt).toLocaleString() || "15/9/2025"} />
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* Thông tin Ca làm việc */}
					<div className="mb-4">
						<div className="card shadow-sm h-100" style={{ borderColor: "#F1C143" }}>
							<div className="card-header fw-bold fs-4 text-center" style={{ backgroundColor: "#F1C143", color: "#fff" }}>
								Thông tin Ca làm việc
							</div>
							<div className="card-body" style={{ color: "#02437D" }}>
								<div className="d-flex gap-3 flex-wrap">
									<div className="rounded p-2" style={{ flex: "1 1 0", border: "1px solid #F1C143" }}>
										<OrderRow label="ID Ca làm" value={workRecord.work_order?.work_order_id} />
										<OrderRow label="Mô tả" value={workRecord.work_order?.description} />
										<OrderRow label="Trạng thái" value={workRecord.work_order?.status} />
									</div>

									<div className="rounded p-2" style={{ flex: "1 1 0", border: "1px solid #F1C143" }}>
										<OrderRow label="Thời gian bắt đầu" value={new Date(workRecord.work_order?.start_time).toLocaleString()} />
										<OrderRow label="Thời gian kết thúc" value={workRecord.work_order?.end_time ? new Date(workRecord.work_order.end_time).toLocaleString() : "Không có dữ liệu"} />
										<OrderRow label="Tạo" value={new Date(workRecord.work_order?.createdAt).toLocaleString()} />
										<OrderRow label="Cập nhật" value={new Date(workRecord.work_order?.updatedAt).toLocaleString()} />
									</div>
								</div>
							</div>
						</div>
					</div>
				</>
            ) : (
                <div className="text-center py-5">
                    <p className="fs-5">Đang tải dữ liệu hoặc không có dữ liệu...</p>
                </div>
            )}
        </div>
    );
};

export default ReportErrorDetail;
