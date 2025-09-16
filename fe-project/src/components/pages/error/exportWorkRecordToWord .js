import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";
import { saveAs } from "file-saver";

const exportWorkRecordToWord = (workRecord) => {
  if (!workRecord) return;

  const doc = new Document({
    styles: {
      default: {
        document: {
          run: {
            font: "Times New Roman",
            size: 24, // 12pt
          },
          paragraph: {
            spacing: { line: 360 }, // 1.5 line spacing
          },
        },
        heading1: {
          run: { size: 32, bold: true },
          paragraph: { spacing: { before: 200, after: 200 } },
        },
        heading2: {
          run: { size: 28, bold: true },
          paragraph: { spacing: { before: 150, after: 100 } },
        },
      },
    },
    sections: [
      {
        children: [
          new Paragraph({
            text: "Báo cáo chi tiết lỗi",
            heading: HeadingLevel.HEADING_1,
            alignment: "center",
          }),
          // Work Record Section
          new Paragraph({
            text: "Thông tin Work Record",
            heading: HeadingLevel.HEADING_2,
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "ID Work Record: ", bold: true }),
              new TextRun(workRecord.work_record_id?.toString() || "Không có dữ liệu"),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Ghi chú: ", bold: true }),
              new TextRun(workRecord.note || "Chưa có"),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Thời gian tạo: ", bold: true }),
              new TextRun(
                workRecord.createdAt
                  ? new Date(workRecord.createdAt).toLocaleString("vi-VN")
                  : "Không có dữ liệu"
              ),
            ],
          }),
          // Error Section
          new Paragraph({
            text: "Thông tin lỗi",
            heading: HeadingLevel.HEADING_2,
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "ID: ", bold: true }),
              new TextRun(workRecord.error?.error_id?.toString() || "Không có dữ liệu"),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Tên lỗi: ", bold: true }),
              new TextRun(workRecord.error?.name || "Không có dữ liệu"),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Mô tả: ", bold: true }),
              new TextRun(workRecord.error?.description || "Không có dữ liệu"),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Thời gian tạo: ", bold: true }),
              new TextRun(
                workRecord.error?.createdAt
                  ? new Date(workRecord.error.createdAt).toLocaleString("vi-VN")
                  : "Không có dữ liệu"
              ),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Thời gian cập nhật: ", bold: true }),
              new TextRun(
                workRecord.error?.updatedAt
                  ? new Date(workRecord.error.updatedAt).toLocaleString("vi-VN")
                  : "Không có dữ liệu"
              ),
            ],
          }),
          // Staff Section
          new Paragraph({
            text: "Thông tin nhân viên",
            heading: HeadingLevel.HEADING_2,
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "ID: ", bold: true }),
              new TextRun(workRecord.staff?.staff_id?.toString() || "Không có dữ liệu"),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Họ tên: ", bold: true }),
              new TextRun(workRecord.staff?.full_name || "Không có dữ liệu"),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Email: ", bold: true }),
              new TextRun(workRecord.staff?.email || "Không có dữ liệu"),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Số điện thoại: ", bold: true }),
              new TextRun(workRecord.staff?.phone || "Không có dữ liệu"),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Phòng ban: ", bold: true }),
              new TextRun(workRecord.staff?.department || "Không có dữ liệu"),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Chức vụ: ", bold: true }),
              new TextRun(
                `${workRecord.staff?.position?.code || "Không có dữ liệu"} - ${
                  workRecord.staff?.position?.role || "Không có dữ liệu"
                }`
              ),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Dụng cụ: ", bold: true }),
              new TextRun(workRecord.staff?.position?.tools || "Không có dữ liệu"),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Quy trình: ", bold: true }),
              new TextRun(workRecord.staff?.position?.process?.name || "Không có dữ liệu"),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Ngày sinh: ", bold: true }),
              new TextRun(
                workRecord.staff?.date_of_birth
                  ? new Date(workRecord.staff.date_of_birth).toLocaleDateString("vi-VN")
                  : "Không có dữ liệu"
              ),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Ngày bắt đầu: ", bold: true }),
              new TextRun(
                workRecord.staff?.start_date
                  ? new Date(workRecord.staff.start_date).toLocaleDateString("vi-VN")
                  : "Không có dữ liệu"
              ),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Trạng thái: ", bold: true }),
              new TextRun(workRecord.staff?.status || "Không có dữ liệu"),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Thời gian tạo: ", bold: true }),
              new TextRun(
                workRecord.staff?.createdAt
                  ? new Date(workRecord.staff.createdAt).toLocaleString("vi-VN")
                  : "Không có dữ liệu"
              ),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Thời gian cập nhật: ", bold: true }),
              new TextRun(
                workRecord.staff?.updatedAt
                  ? new Date(workRecord.staff.updatedAt).toLocaleString("vi-VN")
                  : "Không có dữ liệu"
              ),
            ],
          }),
          // Work Order Section
          new Paragraph({
            text: "Thông tin Work Order",
            heading: HeadingLevel.HEADING_2,
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "ID: ", bold: true }),
              new TextRun(workRecord.work_order?.work_order_id?.toString() || "Không có dữ liệu"),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Mô tả: ", bold: true }),
              new TextRun(workRecord.work_order?.description || "Không có dữ liệu"),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Thời gian bắt đầu: ", bold: true }),
              new TextRun(
                workRecord.work_order?.start_time
                  ? new Date(workRecord.work_order.start_time).toLocaleString("vi-VN")
                  : "Không có dữ liệu"
              ),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Thời gian kết thúc: ", bold: true }),
              new TextRun(
                workRecord.work_order?.end_time
                  ? new Date(workRecord.work_order.end_time).toLocaleString("vi-VN")
                  : "Không có dữ liệu"
              ),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Trạng thái: ", bold: true }),
              new TextRun(workRecord.work_order?.status || "Không có dữ liệu"),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Thời gian tạo: ", bold: true }),
              new TextRun(
                workRecord.work_order?.createdAt
                  ? new Date(workRecord.work_order.createdAt).toLocaleString("vi-VN")
                  : "Không có dữ liệu"
              ),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Thời gian cập nhật: ", bold: true }),
              new TextRun(
                workRecord.work_order?.updatedAt
                  ? new Date(workRecord.work_order.updatedAt).toLocaleString("vi-VN")
                  : "Không có dữ liệu"
              ),
            ],
          }),
        ],
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, `WorkRecord_${workRecord.work_record_id}.docx`);
  });
};

export default exportWorkRecordToWord;