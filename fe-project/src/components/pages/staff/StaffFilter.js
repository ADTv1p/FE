// StaffFilter.js
import { TextField, MenuItem } from "@mui/material";

const StaffFilter = ({ search, onChange }) => {
	return (
		<div className="row g-3 mb-3">
			<div className="col">
				<TextField
					fullWidth
					label="Tên nhân sự"
					variant="outlined"
					value={search.name}
					onChange={e => onChange("name", e.target.value)}
				/>
			</div>
			<div className="col">
				<TextField
					fullWidth
					label="Tên thao tác"
					variant="outlined"
					value={search.process_name}
					onChange={e => onChange("process_name", e.target.value)}
				/>
			</div>
			<div className="col">
				<TextField
					fullWidth
					label="Mã vị trí"
					variant="outlined"
					value={search.position_code}
					onChange={e => onChange("position_code", e.target.value)}
				/>
			</div>

			<div className="col">
				<TextField
					select
					fullWidth
					label="Trạng thái"
					variant="outlined"
					value={search.status}
					onChange={e => onChange("status", e.target.value)}
				>
					<MenuItem value="">Tất cả</MenuItem>
					<MenuItem value="Đang làm">Đang làm</MenuItem>
					<MenuItem value="Đã nghỉ">Đã nghỉ</MenuItem>
				</TextField>
			</div>
		</div>
	);
};

export default StaffFilter;
