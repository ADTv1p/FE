import { AddButton, CloseButton, DeleteButton, DetailButton } from "../../common/ActionButtons";

const ViewProcess = ({ process, onClose, onAddStep, onViewStep }) => {
	if (!process) return null;

	return (
		<div className="card shadow-sm border-0 mb-4">
			<div className="card-header d-flex justify-content-between align-items-center py-2 bg-light">
				<p className="lead fs-5 mb-0">Chi tiết thao tác</p>
				<CloseButton size="small" onClick={onClose}/>
			</div>

			<div className="card-body p-3">
				<div className="mb-2">
					<div className="mb-1"><span className="text-white d-inline-block fw-semibold me-2 px-2 rounded" style={{width:"7em",backgroundColor:"#3d89f4ff"}}>Tên thao tác:</span>{process.name}</div>
					<div className="mb-1"><span className="text-white d-inline-block fw-semibold me-2 px-2 rounded" style={{width:"7em",backgroundColor:"#3d89f4ff"}}>Mô tả:</span>{process.description}</div>
				</div>
				<hr />
				<h6 className="fw-bold mb-2">Danh sách bước</h6>
					<table className="table table-sm table-bordered">
						<thead className="table-light">
							<tr>
								<th>Thứ tự</th>
								<th>Tên bước</th>
								<th>Hành động</th>
							</tr>
						</thead>
						<tbody>
							{process.steps?.length > 0 ? (
								process.steps.map((step) => (
									<tr key={step.process_step_id}>
										<td>{step.step_order}</td>
										<td>{step.step_name}</td>
										<td>
											<DetailButton size="small" className="me-2" onClick={() => onViewStep?.(step)} />
											<DeleteButton size="small" />
										</td>
									</tr>
								))
							) : (
								<tr>
									<td colSpan="4" className="text-center text-muted">
										Chưa có bước nào
									</td>
								</tr>
							)}
						</tbody>
					</table>

				<div className="d-grid mt-3">
					<AddButton
						onClick={() => onAddStep?.(process)}
					>
						Thêm bước cho thao tác
					</AddButton>
				</div>
			</div>
		</div>
	);
};

export default ViewProcess;
