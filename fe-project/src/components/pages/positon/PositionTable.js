import { DeleteButton, DetailButton, EditButton } from "../../common/ActionButtons";

const PositionTable = ({ positions, onView }) => {
	return (
		<table className="table table-hover">
			<thead className="text-center">
				<tr>
					<th>#</th>
					<th>Mã hiệu</th>
					<th>Vai trò</th>
					<th>Tên thao tác</th>
					<th>Mô tả thao tác</th>
					<th>Hành động</th>
				</tr>
			</thead>
			<tbody>
				{positions?.length > 0 ? (
					positions.map((p, index) => (
						<tr key={p.position_id} style={{ cursor: "pointer" }} onClick={() => onView(p)}>
							<td className="text-center">{index + 1}</td>
							<td className={!p.code ? "text-danger" : ""}>{p.code || "—"}</td>
							<td className={!p.role ? "text-danger" : ""}>{p.role || "—"}</td>
							<td className={!p.process?.name ? "text-danger" : ""}>
								{p.process?.name || "Không có"}
							</td>
							<td className={!p.process?.description ? "text-danger" : ""}>
								{p.process?.description || "Không có"}
							</td>
							<td className="text-center text-nowrap"> 
								<EditButton 
									className="me-2" 
									size="small" 
									onClick={(e) => {
										e.stopPropagation(); 
									}}
								>
									Sửa
								</EditButton>
								<DeleteButton 
									size="small" 
									onClick={(e) => {
										e.stopPropagation(); 
									}}
								>
									Xóa
								</DeleteButton>
							</td>
						</tr>
					))
				) : (
					<tr>
						<td colSpan="6" className="text-center text-muted">
							Chưa có vị trí nào
						</td>
					</tr>
				)}
			</tbody>
		</table>
	);
};

export default PositionTable;