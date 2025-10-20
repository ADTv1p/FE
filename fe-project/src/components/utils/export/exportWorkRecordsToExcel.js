import * as XLSX from "xlsx-js-style";
import { saveAs } from "file-saver";

const exportWorkRecordsToExcel = (workRecords, fileName = "BaoCaoLoi.xlsx") => {
	if (!Array.isArray(workRecords) || workRecords.length === 0) return;

	const data = workRecords.map(record => ({
		"ID báo cáo sự cố": record.work_record_id,
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

	// Style header: in đậm, nền xám nhạt
	const headerKeys = Object.keys(data[0]);
	headerKeys.forEach((col, colIdx) => {
		const cellAddress = XLSX.utils.encode_cell({ r: 0, c: colIdx }); // dòng 0 = header
		if (worksheet[cellAddress]) {
			worksheet[cellAddress].s = {
				font: { bold: true, color: { rgb: "000000" } },
				fill: { patternType: "solid", fgColor: { rgb: "DDDDDD" } },
				alignment: { horizontal: "center", vertical: "center" },
			};
		}
	});

	// Highlight đỏ nhạt nếu ghi chú chữ "nghiêm trọng"
	workRecords.forEach((record, rowIdx) => {
		if (record.note && record.note.toLowerCase().includes("lỗi")) {
			const excelRow = rowIdx + 2; // +2 vì header chiếm dòng 1
			headerKeys.forEach((_, colIdx) => {
				const cellAddress = XLSX.utils.encode_cell({ r: excelRow - 1, c: colIdx });
				if (!worksheet[cellAddress]) return;
				worksheet[cellAddress].s = {
					fill: {
						patternType: "solid",
						fgColor: { rgb: "FFEBEB" }, // đỏ nhạt
					},
				};
			});
		}
	});

	const workbook = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(workbook, worksheet, "BaoCaoLoi");

	const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
	const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
	saveAs(blob, fileName);
};

export default exportWorkRecordsToExcel;
