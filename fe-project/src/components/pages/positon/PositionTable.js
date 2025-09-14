// PositionTable.js
import React from "react";

const PositionTable = ({ positions, onView }) => {
	return (
		<table className="table table-striped table-bordered">
			<thead>
				<tr>
					<th>Mã hiệu</th>
					<th>Vai trò</th>
					<th>Tên thao tác</th>
					<th>Mô tả thao tác</th>
					<th>Hành động</th>
				</tr>
			</thead>
			<tbody>
				{positions.length > 0 ? (
					positions.map((p) => (
						<tr key={p.position_id}>
							<td>{p.code}</td>
							<td>{p.role}</td>
							<td>{p.process.name}</td>
							<td>{p.process.description}</td>
							<td>
								<button
									className="btn btn-sm btn-info me-2"
									onClick={() => onView(p)}
								>
									Xem
								</button>
								<button className="btn btn-sm btn-primary me-2">Sửa</button>
								<button className="btn btn-sm btn-danger">Xóa</button>
							</td>
						</tr>
					))
				) : (
					<tr>
						<td colSpan="5" className="text-center text-muted">
							Chưa có vị trí nào
						</td>
					</tr>
				)}
			</tbody>
		</table>
	);
};

export default PositionTable;
