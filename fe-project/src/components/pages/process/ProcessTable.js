import { DeleteButton, DetailButton } from "../../common/ActionButtons";

const ProcessTable = ({ processes, onView, onDelete }) => {
	return (
		<table className="table table-striped table-bordered">
			<thead>
				<tr>
					<th scope="col">Mã thao tác</th>
					<th scope="col">Tên thao tác</th>
					<th scope="col">Mô tả</th>
					<th scope="col" style={{ minWidth: "120px" }}>Hành động</th>
				</tr>
			</thead>
			<tbody>
				{processes?.length > 0 ? (
					processes.map((p) => (
						<tr key={p.process_id}>
							<td>{p.process_id}</td>
							<td>{p.name}</td>
							<td>{p.description}</td>
							<td style={{ whiteSpace: "nowrap" }}>
								<DetailButton
									size="sm"
									className="me-1"
									onClick={() => onView?.(p)}
								/>
								<DeleteButton
									size="sm"
									onClick={() => onDelete?.(p.process_id)}
								/>
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
