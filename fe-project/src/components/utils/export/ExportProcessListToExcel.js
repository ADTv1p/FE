import * as XLSX from "xlsx-js-style";
import { saveAs } from "file-saver";

function exportProcessListToExcel(processes, fileName = "DanhSachThaoTac.xlsx") {
	if (!Array.isArray(processes) || processes.length === 0) return;

	const header = [
		"ID Thao tác",
		"Tên quy trình",
		"Mô tả",
		"Đã tạo",
		"Đã cập nhật",
		"ID bước",
		"Thứ tự bước",
		"Tên bước",
		"Hướng dẫn",
		"Dụng cụ",
		"Phụ kiện sử dụng"
	];

	// format ngày
	const formatDate = date => {
		try {
			return new Date(date).toLocaleDateString("vi-VN");
		} catch {
			return "không có";
		}
	};

	// Tạo rows
	const rows = processes.flatMap(process => {
		const created = process.createdAt ? formatDate(process.createdAt) : "không có";
		const updated = process.updatedAt ? formatDate(process.updatedAt) : "không có";

		if (process.steps?.length) {
			return process.steps.map((step, idx) => [
				idx === 0 ? (process.process_id || "không có") : "",
				idx === 0 ? (process.name || "không có") : "",
				idx === 0 ? (process.description || "không có") : "",
				idx === 0 ? created : "",
				idx === 0 ? updated : "",
				step.process_step_id || "không có",
				step.step_order || "không có",
				step.step_name || "không có",
				step.instruction || "không có",
				step.tool_required || "không có",
				step.accessories_used || "không có"
			]);
		}
		// Không có step
		return [[
			process.process_id || "không có",
			process.name || "không có",
			process.description || "không có",
			created,
			updated,
			"không có", "không có", "không có", "không có", "không có", "không có"
		]];
	});

	// Thêm tiêu đề + header
	const title = [["DANH SÁCH THAO TÁC"], header, ...rows];
	const worksheet = XLSX.utils.aoa_to_sheet(title);

	// Merge title
	worksheet["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: header.length - 1 } }];
    
	// Style title
	const titleCell = worksheet["A1"];
	if (titleCell) {
		titleCell.s = {
			font: { bold: true, sz: 16, color: { rgb: "02437D" } },
			alignment: { horizontal: "center", vertical: "center" }
		};
	}

	// Style header (row 2)
	header.forEach((_, colIdx) => {
		const cell = worksheet[XLSX.utils.encode_cell({ r: 1, c: colIdx })];
		if (cell) {
			cell.s = {
				fill: { fgColor: { rgb: "02437D" } },
				font: { bold: true, color: { rgb: "FFFFFF" } },
				alignment: { horizontal: "center", vertical: "center" },
				border: {
					top: { style: "thin", color: { rgb: "000000" } },
					bottom: { style: "thin", color: { rgb: "000000" } },
					left: { style: "thin", color: { rgb: "000000" } },
					right: { style: "thin", color: { rgb: "000000" } }
				}
			};
		}
	});

	// Style dữ liệu
	const totalRows = rows.length;
	for (let r = 2; r <= totalRows + 1; r++) {
		[0, 5].forEach(c => {
			const cell = worksheet[XLSX.utils.encode_cell({ r, c })];
			if (cell) {
				cell.s = {
					...(cell.s || {}),
					fill: { fgColor: { rgb: "F1C143" } }
				};
			}
		});

		// nếu updatedAt khác createdAt thì tô màu xanh đen #02437D cho cột updatedAt (col 4)
		const createdCell = worksheet[XLSX.utils.encode_cell({ r, c: 3 })];
		const updatedCell = worksheet[XLSX.utils.encode_cell({ r, c: 4 })];
		if (createdCell && updatedCell && createdCell.v !== updatedCell.v && updatedCell.v !== "không có") {
			updatedCell.s = {
				...(updatedCell.s || {}),
				fill: { fgColor: { rgb: "02437D" } },
				font: { bold: true, color: { rgb: "FFFFFF" } },
				alignment: { horizontal: "center", vertical: "center" }
			};
		}
	}

	// Xuất file
	const workbook = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(workbook, worksheet, "WorkRecords");
	const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
	saveAs(new Blob([excelBuffer], { type: "application/octet-stream" }), fileName);
}

export default exportProcessListToExcel;
