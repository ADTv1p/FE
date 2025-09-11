const StaffManagement = () => {
	return (
		<div className="shadow-lg border-0 rounded-3 bg-white p-3">
			<p className="lead fs-2 text-center">Quản lý nhân sự</p>
			<hr/>
			<ul className="nav nav-tabs" id="staffTabs" role="tablist">
				<li className="nav-item" role="presentation">
					<button
						className="nav-link active"
						id="list-tab"
						data-bs-toggle="tab"
						data-bs-target="#list"
						type="button"
						role="tab"
					>
						Danh sách nhân sự
					</button>
				</li>
				<li className="nav-item" role="presentation">
					<button
						className="nav-link"
						id="stats-tab"
						data-bs-toggle="tab"
						data-bs-target="#stats"
						type="button"
						role="tab"
					>
						Thống kê
					</button>
				</li>
				<li className="nav-item" role="presentation">
					<button
						className="nav-link"
						id="search-tab"
						data-bs-toggle="tab"
						data-bs-target="#search"
						type="button"
						role="tab"
					>
						Tìm kiếm nâng cao
					</button>
				</li>
			</ul>

			<div className="tab-content mt-3" id="staffTabsContent">
				{/* Tab 1 - Danh sách nhân sự */}
				<div className="tab-pane fade show active" id="list" role="tabpanel">
					<table className="table table-striped table-bordered">
						<thead>
							<tr>
								<th>Họ và tên</th>
								<th>Chức vụ</th>
								<th>Phòng ban</th>
								<th>Số điện thoại</th>
								<th>Email</th>
								<th>Trạng thái</th>
								<th>Hành động</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Nguyễn Văn A</td>
								<td>Công nhân</td>
								<td>Sản xuất</td>
								<td>0901234567</td>
								<td>a@example.com</td>
								<td>
									<span className="badge bg-success">Đang làm</span>
								</td>
								<td>
									<button className="btn btn-sm btn-primary me-2">Sửa</button>
									<button className="btn btn-sm btn-danger">Xóa</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				{/* Tab 2 - Thống kê */}
				<div className="tab-pane fade" id="stats" role="tabpanel">
					<div className="row text-center">
						<div className="col-md-4">
							<div className="card p-3 shadow-sm">
								<h5>Tổng nhân sự</h5>
								<p className="display-6 fw-bold text-primary">120</p>
							</div>
						</div>
						<div className="col-md-4">
							<div className="card p-3 shadow-sm">
								<h5>Đang làm việc</h5>
								<p className="display-6 fw-bold text-success">110</p>
							</div>
						</div>
						<div className="col-md-4">
							<div className="card p-3 shadow-sm">
								<h5>Đã nghỉ việc</h5>
								<p className="display-6 fw-bold text-danger">10</p>
							</div>
						</div>
					</div>
				</div>

				{/* Tab 3 - Tìm kiếm nâng cao */}
				<div className="tab-pane fade" id="search" role="tabpanel">
					<form className="row g-3">
						<div className="col-md-4">
							<input type="text" className="form-control" placeholder="Tên nhân sự" />
						</div>
						<div className="col-md-4">
							<select className="form-select">
								<option>Chọn phòng ban</option>
								<option>Sản xuất</option>
								<option>Kỹ thuật</option>
								<option>Quản lý</option>
							</select>
						</div>
						<div className="col-md-4">
							<select className="form-select">
								<option>Trạng thái</option>
								<option>Đang làm</option>
								<option>Đã nghỉ</option>
							</select>
						</div>
						<div className="col-12">
							<button type="submit" className="btn btn-primary">
								Tìm kiếm
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default StaffManagement;
