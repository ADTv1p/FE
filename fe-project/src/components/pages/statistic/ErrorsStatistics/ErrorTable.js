const ErrorTable = ({ errors }) => {
	const validErrors = Array.isArray(errors)
		? errors.filter(err => err.staff)
		: [];

	return (
		<div className="table-responsive">
			<table className="table table-bordered table-striped mb-0">
				<thead className="table-dark">
					<tr>
						<th>#</th>
						<th>Nhân viên</th>
						<th>Email</th>
						<th>Điện thoại</th>
						<th>Vị trí</th>
						<th>Quy trình</th>
						<th>Ghi chú</th>
						<th>Thời gian</th>
					</tr>
				</thead>
				<tbody>
					{validErrors.length === 0 ? (
						<tr>
							<td colSpan="8" className="text-center">
								Không có dữ liệu
							</td>
						</tr>
					) : (
						validErrors.map((err, idx) => {
							const staff = err.staff;
							return (
								<tr key={err.work_record_id || idx}>
									<td>{idx + 1}</td>
									<td>{staff.full_name}</td>
									<td>{staff.email || "-"}</td>
									<td>{staff.phone || "-"}</td>
									<td>{staff.position?.code || "-"}</td>
									<td>{staff.position?.process?.name || "-"}</td>
									<td>{err.note || "-"}</td>
									<td>{new Date(err.createdAt).toLocaleString()}</td>
								</tr>
							);
						})
					)}
				</tbody>
			</table>
		</div>
	);
};

export default ErrorTable;
