import { DataGrid } from "@mui/x-data-grid";

const ProcessTable = ({ data = [] }) => {
	const rows = data.flatMap((process) =>
		(process.positions || []).flatMap((pos) =>
			(pos.staffs || []).map((staff) => ({
				id: staff.staff_id,
				full_name: staff.full_name,
				email: staff.email || "-",
				phone: staff.phone || "-",
				position: pos.code || "-",
				process: process.name || "-",
				department: staff.department || "-",
				createdAt: process.createdAt ? new Date(process.createdAt).toLocaleString() : "-"
			}))
		)
	);

	const columns = [
		{ field: "id", headerName: "#", width: 50 },
		{ field: "full_name", headerName: "Nhân sự", width: 150 },
		{ field: "email", headerName: "Email", width: 180 },
		{ field: "phone", headerName: "Điện thoại", width: 120 },
		{ field: "position", headerName: "Vị trí", width: 100 },
		{ field: "process", headerName: "Quy trình", width: 150 },
		{ field: "department", headerName: "Phòng ban", width: 120 },
		{ field: "createdAt", headerName: "Thời gian", width: 150 }
	];

	return (
		<div style={{ height: 500 }}>
			<DataGrid
				rows={rows}
				columns={columns}
				pageSize={10}
				rowsPerPageOptions={[10, 20, 50]}
				disableSelectionOnClick
				getRowId={(row) => row.id}
				localeText={{ noRowsLabel: "Không có dữ liệu" }}
			/>
		</div>
	);
};

export default ProcessTable;
