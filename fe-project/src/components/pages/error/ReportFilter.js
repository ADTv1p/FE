import { useState, useEffect } from 'react';
import { FilterButton } from '../../common/ActionButtons';

const ReportFilter = ({ workRecordList, onFilter }) => {
    const [filterName, setFilterName] = useState('');
	const [filterPhone, setFilterPhone] = useState('');
	const [filterEmail, setFilterEmail] = useState('');
	const [filterDate, setFilterDate] = useState(new Date().toISOString().split("T")[0]);
	const [filterErrorName, setFilterErrorName] = useState('');
	const [filterRole, setFilterRole] = useState('');
    
    useEffect(() => {
        onFilter({
            phone: filterPhone,
            email: filterEmail,
            createdAt: filterDate,
            errorName: filterErrorName,
            role: filterRole,
            name: filterName, // bổ sung
        });
    }, [filterPhone, filterEmail, filterDate, filterErrorName, filterRole, filterName]);

    const handleClearFilter = () => {
        setFilterName('');
        setFilterPhone('');
        setFilterEmail('');
        setFilterDate('');
        setFilterErrorName('');
        setFilterRole('');
    }

	return (
		<div className="card shadow-sm border-0 mb-3">
			<div className="card-body p-3">
                <h6 className="text-primary mb-3">Lọc báo cáo lỗi<span className="badge bg-danger ms-2 rounded-circle">{workRecordList.length}</span></h6>
                <div className="text-end">
                <FilterButton onClick={() => handleClearFilter()}>
                    Xóa bộ lọc
                </FilterButton>
                </div>
                <div className="mb-3">
                    <label className="form-label fw-bold mb-1">Tên nhân viên</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nhập tên nhân viên..."
                        value={filterName}
                        onChange={(e) => setFilterName(e.target.value)}
                    />
                </div>

				<div className="mb-3">
					<label className="form-label fw-bold mb-1">Số điện thoại</label>
					<input
						type="text"
						className="form-control"
						placeholder="Nhập số điện thoại..."
						value={filterPhone}
						onChange={(e) => setFilterPhone(e.target.value)}
					/>
				</div>

				<div className="mb-3">
					<label className="form-label fw-bold mb-1">Email</label>
					<input
						type="text"
						className="form-control"
						placeholder="Nhập email..."
						value={filterEmail}
						onChange={(e) => setFilterEmail(e.target.value)}
					/>
				</div>

				<div className="mb-3">
					<label className="form-label fw-bold mb-1">Ngày tạo</label>
					<input
						type="date"
						className="form-control"
						value={filterDate}
						onChange={(e) => setFilterDate(e.target.value)}
					/>
				</div>

				<div className="mb-3">
					<label className="form-label fw-bold mb-1">Tên lỗi</label>
					<input
						type="text"
						className="form-control"
						placeholder="Nhập tên lỗi..."
						value={filterErrorName}
						onChange={(e) => setFilterErrorName(e.target.value)}
					/>
				</div>

				<div>
					<label className="form-label fw-bold mb-1">Vai trò</label>
					<input
						type="text"
						className="form-control"
						placeholder="Nhập vai trò..."
						value={filterRole}
						onChange={(e) => setFilterRole(e.target.value)}
					/>
				</div>
			</div>
		</div>
	);
};

export default ReportFilter;
