const ProcessTable = ({ processes, onView, onDelete }) => {
	return (
		<table className="table table-striped table-bordered">
			<thead>
				<tr>
					<th>Mã thao tác</th>
					<th>Tên thao tác</th>
					<th>Mô tả</th>
					<th>Hành động</th>
				</tr>
			</thead>
			<tbody>
				{processes?.length > 0 ? (
					processes.map((p) => (
						<tr key={p.process_id}>
							<td>{p.process_id}</td>
							<td>{p.name}</td>
							<td>{p.description}</td>
							<td>
								<button
									className="btn btn-sm btn-info me-2"
									onClick={() => onView?.(p)}
								>
									Xem
								</button>
								<button
									className="btn btn-sm btn-danger"
									onClick={() => onDelete?.(p.process_id)}
								>
									Xóa
								</button>
							</td>
						</tr>
					))
				) : (
					<tr>
						<td colSpan="4" className="text-muted text-center">
							Không có thao tác nào
						</td>
					</tr>
				)}
			</tbody>
		</table>
	);
};

export default ProcessTable;
