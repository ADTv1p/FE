// PositionTable.js
import React from "react";
import { DeleteButton, DetailButton, EditButton } from "../../common/ActionButtons";

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
				{positions?.length > 0 ? (
					positions.map((p) => (
						<tr key={p.position_id}>
							<td className={!p.code ? "text-danger" : ""}>{p.code || "—"}</td>
							<td className={!p.role ? "text-danger" : ""}>{p.role || "—"}</td>
							<td className={!p.process?.name ? "text-danger" : ""}>
								{p.process?.name || "—"}
							</td>
							<td className={!p.process?.description ? "text-danger" : ""}>
								{p.process?.description || "—"}
							</td>
							<td>
								<DetailButton
									size="small"
									className="me-2"
									onClick={() => onView(p)}
								>
									Xem
								</DetailButton>
								<EditButton className="me-2" size="small">Sửa</EditButton>
								<DeleteButton size="small">Xóa</DeleteButton>
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
