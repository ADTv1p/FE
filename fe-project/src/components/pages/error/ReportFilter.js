import { useState, useEffect } from 'react';
import { FilterButton } from '../../common/ActionButtons';
import { TextField } from "@mui/material";

const ReportFilter = ({ workRecordList, onFilter }) => {
	const [filterName, setFilterName] = useState('');
	const [filterPhone, setFilterPhone] = useState('');
	const [filterEmail, setFilterEmail] = useState('');
	const [filterFromDate, setFilterFromDate] = useState('');
	const [filterToDate, setFilterToDate] = useState('');
	const [filterErrorName, setFilterErrorName] = useState('');
	const [filterRole, setFilterRole] = useState('');

	useEffect(() => {
		onFilter({
			phone: filterPhone,
			email: filterEmail,
			fromDate: filterFromDate,
			toDate: filterToDate,
			errorName: filterErrorName,
			role: filterRole,
			name: filterName,
		});
	}, [filterPhone, filterEmail, filterFromDate, filterToDate, filterErrorName, filterRole, filterName]);

	const handleClearFilter = () => {
		setFilterName('');
		setFilterPhone('');
		setFilterEmail('');
		setFilterFromDate('');
		setFilterToDate('');
		setFilterErrorName('');
		setFilterRole('');
	}

	return (
		<div className="card shadow-sm" style={{ borderColor: "#02437D" }}>
			<div className="card-header fw-bold d-flex justify-content-between align-items-center" style={{ backgroundColor: "#fff", color: "#02437D", borderColor: "#02437D" }}>
				<>
					<span>Lọc B/C sự cố</span>
					<span className="badge bg-danger ms-2 rounded-circle">{workRecordList.length}</span>
				</>
				<FilterButton onClick={handleClearFilter}>
					Xóa bộ lọc
				</FilterButton>
			</div>
			<div className="card-body" style={{ color: "#02437D" }}>
				<TextField label="Tên nhân viên" variant="outlined" size="small" fullWidth className="mb-3" value={filterName} onChange={e => setFilterName(e.target.value)} />
				<TextField label="Số điện thoại" variant="outlined" size="small" fullWidth className="mb-3" value={filterPhone} onChange={e => setFilterPhone(e.target.value)} />
				<TextField label="Email" variant="outlined" size="small" fullWidth className="mb-3" value={filterEmail} onChange={e => setFilterEmail(e.target.value)} />
				<div className="d-flex gap-2 mb-3">
					<TextField
						label="Từ ngày"
						type="date"
						variant="outlined"
						size="small"
						fullWidth
						value={filterFromDate}
						onChange={e => setFilterFromDate(e.target.value)}
					/>
					<TextField
						label="Đến ngày"
						type="date"
						variant="outlined"
						size="small"
						fullWidth
						value={filterToDate}
						onChange={e => setFilterToDate(e.target.value)}
					/>
				</div>
				<TextField label="Tên lỗi" variant="outlined" size="small" fullWidth className="mb-3" value={filterErrorName} onChange={e => setFilterErrorName(e.target.value)} />
				<TextField label="Vai trò" variant="outlined" size="small" fullWidth className="mb-3" value={filterRole} onChange={e => setFilterRole(e.target.value)} />
			</div>
		</div>
	);
};

export default ReportFilter;
