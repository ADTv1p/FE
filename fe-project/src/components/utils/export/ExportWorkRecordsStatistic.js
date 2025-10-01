import * as XLSX from "xlsx-js-style";
import { saveAs } from "file-saver";

const ExportWorkRecordsStatistic = ({
	staffStatistics = [],
	top5Errors = [],
	errorsByDay = [],
	errorsByWeek = [],
	errorsByMonth = []
}, fileName = "ThongKeBaoCaoLoi.xlsx") => {
	const workbook = XLSX.utils.book_new();

	const exportSheet = (data, sheetName, mapFn) => {
		if (!Array.isArray(data) || data.length === 0) return;
		const mappedData = data.map(mapFn);
		const worksheet = XLSX.utils.json_to_sheet(mappedData);

		// Style header
		const headerKeys = Object.keys(mappedData[0]);
		headerKeys.forEach((col, colIdx) => {
			const cellAddress = XLSX.utils.encode_cell({ r: 0, c: colIdx });
			if (worksheet[cellAddress]) {
				worksheet[cellAddress].s = {
					font: { bold: true, color: { rgb: "000000" } },
					fill: { patternType: "solid", fgColor: { rgb: "DDDDDD" } },
					alignment: { horizontal: "center", vertical: "center" },
				};
			}
		});

		XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
	};

	exportSheet(staffStatistics, "NhanSu", record => ({
		"ID NV": record.staff_id,
		"Họ tên": record.full_name,
		"Email": record.email,
		"SĐT": record.phone,
		"Vị trí": record.position?.code,
		"Thao tác": record.position?.process?.name,
		"Số lỗi": record.error_count,
		"Tỷ lệ gây lỗi (%)": record.error_percent
	}));

	exportSheet(top5Errors, "Top5Loi", record => ({
		"ID lỗi": record.error_id,
		"Tên lỗi": record.error?.name,
		"Mô tả": record.error?.description,
		"Số lần xảy ra": record.error_count
	}));

	exportSheet(errorsByDay, "LoiTheoNgay", record => ({
		"Ngày": record.day,
		"Số lỗi": record.error_count,
		"ID lỗi": record.error?.error_id,
		"Tên lỗi": record.error?.name,
		"Mô tả lỗi": record.error?.description
	}));

	exportSheet(errorsByWeek, "LoiTheoTuan", record => ({
		"Năm": record.year,
		"Tuần": record.week,
		"Số lỗi": record.error_count,
		"ID lỗi": record.error?.error_id,
		"Tên lỗi": record.error?.name,
		"Mô tả lỗi": record.error?.description
	}));

	exportSheet(errorsByMonth, "LoiTheoThang", record => ({
		"Năm": record.year,
		"Tháng": record.month,
		"Số lỗi": record.error_count,
		"ID lỗi": record.error?.error_id,
		"Tên lỗi": record.error?.name,
		"Mô tả lỗi": record.error?.description
	}));

	const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
	saveAs(new Blob([excelBuffer], { type: "application/octet-stream" }), fileName);
};

export default ExportWorkRecordsStatistic;
