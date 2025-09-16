import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const exportWorkRecordsToExcel = (workRecords, fileName = "BaoCaoLoi.xlsx") => {
	if (!workRecords || workRecords.length === 0) return;

	// Chuyển dữ liệu sang định dạng Excel
	const data = workRecords.map(record => ({
		"ID báo cáo lỗi": record.work_record_id,
		"Ghi chú": record.note,
		"ID Lỗi": record.error?.error_id,
		"Tên lỗi": record.error?.name,
		"Mô tả lỗi": record.error?.description,
		"ID Nhân viên": record.staff?.staff_id,
		"Họ tên NV": record.staff?.full_name,
		"Email": record.staff?.email,
		"Số điện thoại": record.staff?.phone,
		"Phòng ban": record.staff?.department,
		"Chức vụ": record.staff?.position?.code,
		"Vai trò": record.staff?.position?.role,
		"Dụng cụ": record.staff?.position?.tools,
		"Quy trình": record.staff?.position?.process?.name,
		"ID đơn làm việc": record.work_order?.work_order_id,
		"Mô tả đơn làm việc": record.work_order?.description,
		"Thời gian tạo báo cáo": record.work_order?.createdAt ? new Date(record.work_order.createdAt).toLocaleDateString("vi-VN") : "",
		"Thời gian bắt đầu": record.work_order?.start_time ? new Date(record.work_order.start_time).toLocaleDateString("vi-VN") : "",
		"Thời gian kết thúc": record.work_order?.end_time ? new Date(record.work_order.end_time).toLocaleDateString("vi-VN") : "",
		"Trạng thái": record.work_order?.status,
	}));

	const worksheet = XLSX.utils.json_to_sheet(data);
	const workbook = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(workbook, worksheet, "BaoCaoLoi");

	const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
	const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
	saveAs(blob, fileName);
};

export default exportWorkRecordsToExcel