import { AddButton, CloseButton, DeleteButton, EditButton } from "../../common/ActionButtons";

const ViewPosition = ({ position, onClose, onAddStep }) => {
	if (!position?.process) return null;

	const { process } = position;

	return (
		<div className="card shadow-sm border">
			<div className="card-header d-flex justify-content-between align-items-center py-2 bg-light">
				<p className="lead fs-5 mb-0">Chi tiết thao tác</p>
				<CloseButton
				size="small"
					onClick={onClose}
				/>
			</div>

			<div className="card-body p-3">
				<div className="mb-3">
					<label className="form-label fw-semibold">Tên thao tác</label>
					<p className="form-control-plaintext">{process.name}</p>
				</div>

				<div className="mb-3">
					<label className="form-label fw-semibold">Mô tả</label>
					<p className="form-control-plaintext">{process.description}</p>
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
							process.steps.map((step, index) => (
								<tr key={step.process_step_id}>
									<td>{step.step_order}</td>
									<td>{step.step_name}</td>
									<td>
										<EditButton size="small" className="me-2">Sửa</EditButton>
										<DeleteButton size="small">Xóa</DeleteButton>
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

export default ViewPosition;
