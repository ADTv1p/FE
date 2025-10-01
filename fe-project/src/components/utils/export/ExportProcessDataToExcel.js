import * as XLSX from "xlsx-js-style";
import { saveAs } from "file-saver";

/**
 * Export process data to an Excel file with styling and optional pie chart.
 * 
 * @param {Array} processes - Array of process objects to export.
 * @param {string} [fileName="DanhSachThaoTac.xlsx"] - Name of the exported file.
 * @param {string} [chartDivId="processPieChart"] - ID of the div containing the canvas for the pie chart.
 * @throws {Error} If processes is not a valid array or if export fails.
 */
function ExportProcessDataToExcel(processes, fileName = "DanhSachThaoTac.xlsx", chartDivId = "processPieChart") {
    if (!Array.isArray(processes) || processes.length === 0) {
        throw new Error("Processes must be a non-empty array.");
    }

    // Define header (can be customized if needed)
    const header = [
        "ID Thao tác", "Tên quy trình", "Mô tả", "Đã tạo", "Đã cập nhật",
        "ID vị trí", "Mã vị trí", "Vai trò", "Dụng cụ",
        "ID nhân viên", "Họ tên", "Email", "Điện thoại", "Phòng ban"
    ];

    /**
     * Format date to Vietnamese locale or return "không có" if invalid.
     * @param {string|Date} date - Date to format.
     * @returns {string} Formatted date string.
     */
    const formatDate = (date) => {
        if (!date) return "không có";
        try {
            return new Date(date).toLocaleDateString("vi-VN");
        } catch {
            return "không có";
        }
    };

    // --- Generate data rows ---
    const rows = processes.flatMap(process => {
        const created = formatDate(process.createdAt);
        const updated = formatDate(process.updatedAt);

        if (!Array.isArray(process.positions) || process.positions.length === 0) {
            return [[process.process_id || "", process.name || "", process.description || "", created, updated,
                "-", "-", "-", "-", "-", "-", "-", "-", "-"
            ]];
        }

        return process.positions.flatMap((pos, idxPos) => {
            if (!Array.isArray(pos.staffs) || pos.staffs.length === 0) {
                return [[
                    idxPos === 0 ? process.process_id : "",
                    idxPos === 0 ? process.name : "",
                    idxPos === 0 ? process.description : "",
                    idxPos === 0 ? created : "",
                    idxPos === 0 ? updated : "",
                    pos.position_id || "",
                    pos.code || "",
                    pos.role || "",
                    pos.tools || "",
                    "không có", "-", "-", "-", "-"
                ]];
            }

            return pos.staffs.map((staff, idxStaff) => [
                idxPos === 0 && idxStaff === 0 ? process.process_id : "",
                idxPos === 0 && idxStaff === 0 ? process.name : "",
                idxPos === 0 && idxStaff === 0 ? process.description : "",
                idxPos === 0 && idxStaff === 0 ? created : "",
                idxPos === 0 && idxStaff === 0 ? updated : "",
                pos.position_id || "",
                pos.code || "",
                pos.role || "",
                pos.tools || "",
                staff.staff_id || "",
                staff.full_name || "",
                staff.email || "",
                staff.phone || "",
                staff.department || ""
            ]);
        });
    });

    // --- Create worksheet ---
    const title = [["DANH SÁCH THAO TÁC"], header, ...rows];
    const worksheet = XLSX.utils.aoa_to_sheet(title);

    // Merge title cells
    worksheet["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: header.length - 1 } }];

    // --- Apply styles ---
    applyTitleStyle(worksheet, header.length);
    applyHeaderStyle(worksheet, header);
    applyDataStyles(worksheet, rows, header.length);

    // --- Add PieChart if available ---
    addChartToWorksheet(worksheet, chartDivId, header.length);

    // --- Export file ---
    try {
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "WorkRecords");
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        saveAs(new Blob([excelBuffer], { type: "application/octet-stream" }), fileName);
    } catch (error) {
        console.error("Error exporting Excel file:", error);
        throw new Error("Failed to export Excel file.");
    }
}

/**
 * Apply style to the title cell.
 * @param {Object} worksheet - The worksheet object.
 * @param {number} headerLength - Length of the header row.
 */
function applyTitleStyle(worksheet, headerLength) {
    const titleCell = worksheet["A1"];
    if (titleCell) {
        titleCell.s = {
            font: { bold: true, sz: 16, color: { rgb: "02437D" } },
            alignment: { horizontal: "center", vertical: "center" },
        };
    }
}

/**
 * Apply styles to the header row.
 * @param {Object} worksheet - The worksheet object.
 * @param {Array} header - The header array.
 */
function applyHeaderStyle(worksheet, header) {
    const headerStyle = {
        fill: { fgColor: { rgb: "02437D" } },
        font: { bold: true, color: { rgb: "FFFFFF" } },
        alignment: { horizontal: "center", vertical: "center" },
        border: {
            top: { style: "thin", color: { rgb: "000000" } },
            bottom: { style: "thin", color: { rgb: "000000" } },
            left: { style: "thin", color: { rgb: "000000" } },
            right: { style: "thin", color: { rgb: "000000" } },
        },
    };

    header.forEach((_, colIdx) => {
        const cell = worksheet[XLSX.utils.encode_cell({ r: 1, c: colIdx })];
        if (cell) cell.s = headerStyle;
    });
}

/**
 * Apply styles to data rows.
 * @param {Object} worksheet - The worksheet object.
 * @param {Array} rows - The data rows.
 * @param {number} headerLength - Length of the header row (unused here but kept for consistency).
 */
function applyDataStyles(worksheet, rows) {
    const totalRows = rows.length;
    for (let r = 2; r <= totalRows + 1; r++) {
        // Highlight specific columns
        [0, 5, 6, 7].forEach(c => {
            const cell = worksheet[XLSX.utils.encode_cell({ r, c })];
            if (cell) cell.s = { ...(cell.s || {}), fill: { fgColor: { rgb: "F1C143" } } };
        });

        // Highlight updated date if different from created
        const createdCell = worksheet[XLSX.utils.encode_cell({ r, c: 3 })];
        const updatedCell = worksheet[XLSX.utils.encode_cell({ r, c: 4 })];
        if (createdCell && updatedCell && createdCell.v !== updatedCell.v && updatedCell.v !== "không có") {
            updatedCell.s = {
                ...(updatedCell.s || {}),
                fill: { fgColor: { rgb: "02437D" } },
                font: { bold: true, color: { rgb: "FFFFFF" } },
                alignment: { horizontal: "center", vertical: "center" },
            };
        }
    }
}

/**
 * Add a chart image to the worksheet if the canvas exists.
 * @param {Object} worksheet - The worksheet object.
 * @param {string} chartDivId - ID of the div containing the canvas.
 * @param {number} headerLength - Length of the header row.
 * @param {number} [startRow=2] - Starting row for the image.
 */
function addChartToWorksheet(worksheet, chartDivId, headerLength, startRow = 2) {
    const chartDiv = document.getElementById(chartDivId);
    if (!chartDiv) {
        console.warn(`Chart div with ID "${chartDivId}" not found. Skipping chart insertion.`);
        return;
    }

    const canvas = chartDiv.querySelector("canvas");
    if (!canvas) {
        console.warn(`No canvas found in div "${chartDivId}". Skipping chart insertion.`);
        return;
    }

    try {
        const imgData = canvas.toDataURL("image/png");
        worksheet["!images"] = worksheet["!images"] || [];
        worksheet["!images"].push({
            image: imgData,
            t: startRow, // Start at row 3 (0-based index 2)
            l: headerLength + 1, // Column after data
        });
    } catch (error) {
        console.error("Error adding chart to worksheet:", error);
    }
}

export default ExportProcessDataToExcel;