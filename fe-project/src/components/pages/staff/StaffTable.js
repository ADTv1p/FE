// src/components/StaffTable.js
import React from "react";
import { DeleteButton, EditButton } from "../../common/ActionButtons";

const StaffTable = ({ staffs }) => {
	console.log("Staff List:", staffs); // Debugging line to check the data
	return (
		<table className="table table-striped table-bordered">
			<thead>
				<tr>
					<th>Họ và tên</th>
					<th>Chức vụ</th>
					<th>Phòng ban</th>
					<th>Số điện thoại</th>
					<th>Email</th>
					<th>Trạng thái</th>
					<th>Hành động</th>
				</tr>
			</thead>
			<tbody>
				{staffs && staffs.length > 0 ? (
					staffs.map((staff) => (
						<tr key={staff.staff_id}>
							<td>{staff.full_name}</td>
							<td>{staff.position_id}</td>
							<td>{staff.department}</td>
							<td>{staff.phone}</td>
							<td>{staff.email}</td>
							<td>
								<span
									className={`badge ${
										staff.status === "active"
											? "bg-success"
											: staff.status === "inactive"
											? "bg-warning"
											: "bg-danger"
									}`}
								>
									{staff.status === "active"
										? "Đang làm"
										: staff.status === "inactive"
										? "Ngừng làm"
										: "Đã nghỉ"}
								</span>
							</td>
							<td>
								<EditButton className="me-2" size="small">Sửa</EditButton>
								<DeleteButton size="small">Xóa</DeleteButton>
							</td>
						</tr>
					))
				) : (
					<tr>
						<td colSpan="7" className="text-center text-muted">
							Chưa có nhân sự nào
						</td>
					</tr>
				)}
			</tbody>
		</table>
	);
};

export default StaffTable;
