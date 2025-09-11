const PositionManagement = () => {
	return (
		<div className="shadow-lg border-0 rounded-3 bg-white p-3">
			<p className="lead fs-2 text-center">Quản lý phụ kiện</p>
			<hr />
			<table className="table table-striped table-bordered">
				<thead>
					<tr>
						<th>Mã hiệu</th>
						<th>Vai trò</th>
						<th>Công cụ làm việc</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Công nhân</td>
						<td>Thực hiện sản xuất</td>
						<td>
							<button className="btn btn-sm btn-primary me-2">Sửa</button>
							<button className="btn btn-sm btn-danger">Xóa</button>
						</td>
					</tr>
					<tr>
						<td>Quản lý</td>
						<td>Giám sát nhân sự</td>
						<td>
							<button className="btn btn-sm btn-primary me-2">Sửa</button>
							<button className="btn btn-sm btn-danger">Xóa</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default PositionManagement;
