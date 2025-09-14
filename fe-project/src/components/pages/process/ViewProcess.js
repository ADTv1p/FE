const ViewProcess = ({ process, onClose, onAddStep }) => {
	if (!process) return null;

	return (
		<div className="card shadow-sm border-0 mb-4">
			<div className="card-header d-flex justify-content-between align-items-center py-2 bg-light">
				<p className="lead fs-5 mb-0">Chi tiết thao tác</p>
				<button
					type="button"
					className="btn btn-sm btn-outline-secondary"
					onClick={onClose}
				>
					Đóng
				</button>
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
										<button className="btn btn-sm btn-primary me-2">Sửa</button>
										<button className="btn btn-sm btn-danger">Xóa</button>
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
					<button
						className="btn btn-outline-primary"
						onClick={() => onAddStep?.(process)}
					>
						<i className="fas fa-plus me-2"></i>Thêm bước cho thao tác
					</button>
				</div>
			</div>
		</div>
	);
};

export default ViewProcess;
