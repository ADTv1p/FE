// src/components/StaffTable.js
import React from "react";

const StaffTable = ({ staffList }) => {
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
				{staffList && staffList.length > 0 ? (
					staffList.map((staff) => (
						<tr key={staff.id}>
							<td>{staff.full_name}</td>
							<td>{staff.position}</td>
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
								<button className="btn btn-sm btn-primary me-2">Sửa</button>
								<button className="btn btn-sm btn-danger">Xóa</button>
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
