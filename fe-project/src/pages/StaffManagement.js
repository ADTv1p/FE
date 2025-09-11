import React from "react";

const StaffManagement = () => {
	const staffList = [
		{ id: 1, name: "Nguyễn Văn A", position: "Kỹ sư", phone: "0901234567", email: "a@example.com" },
		{ id: 2, name: "Trần Thị B", position: "Nhân viên", phone: "0912345678", email: "b@example.com" },
		{ id: 3, name: "Lê Văn C", position: "Quản lý", phone: "0923456789", email: "c@example.com" },
	];

	return (
		<div style={{ padding: "20px" }}>
			<h2>📋 Quản lý nhân sự</h2>
			<table border="1" cellPadding="10" cellSpacing="0" style={{ width: "100%", marginTop: "20px" }}>
				<thead>
					<tr>
						<th>ID</th>
						<th>Họ và tên</th>
						<th>Chức vụ</th>
						<th>Số điện thoại</th>
						<th>Email</th>
					</tr>
				</thead>
				<tbody>
					{staffList.map((staff) => (
						<tr key={staff.id}>
							<td>{staff.id}</td>
							<td>{staff.name}</td>
							<td>{staff.position}</td>
							<td>{staff.phone}</td>
							<td>{staff.email}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default StaffManagement;
