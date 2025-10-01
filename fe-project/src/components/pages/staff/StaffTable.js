import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DeleteButton, EditButton } from "../../common/ActionButtons";
import EditStaffModal from './EditStaffModal';

const StaffTable = ({ staffs }) => {
	const navigate = useNavigate();
	const [showEditStaffModal, setShowEditStaffModal] = useState(false);
	const [selectedStaff, setSelectedStaff] = useState(null);

	const onViewDetail = (staff_id) => {
		navigate(`/quan-ly-nhan-su/chi-tiet-nhan-su/${staff_id}`);
	};

	return (
		<>
			<div className="overflow-hidden">
				<table className="table table-hover">
					<thead>
						<tr className="text-center">
							<th>#</th>
							<th>Họ và tên</th>
							<th>Vị trí</th>
							<th>Phòng ban</th>
							<th>Số điện thoại</th>
							<th>Email</th>
							<th>Trạng thái</th>
							<th>Hành động</th>
						</tr>
					</thead>
					<tbody>
						{staffs && staffs.length > 0 ? (
							staffs.map((staff) => (
								<tr key={staff.staff_id} style={{ cursor: "pointer" }} onClick={() => onViewDetail(staff.staff_id)}>
									<td className="text-center">{staff.stt}</td>
									<td>{staff.full_name}</td>
									<td>{staff.position?.process?.name || "Không có"}</td>
									<td>{staff.position?.code || "Không có"}</td>
									<td>{staff.department}</td>
									<td>{staff.phone}</td>
									<td>{staff.email}</td>
									<td>
										<span
											className={`badge ${
												staff.status === "active"
													? "bg-success"
													: staff.status === "inactive"
													? "bg-warning"
													: "bg-danger"
											}`}
										>
											{staff.status === "active"
												? "Đang làm"
												: staff.status === "inactive"
												? "Ngừng làm"
												: "Đã nghỉ"}
										</span>
									</td>
									<td className="text-center">
										<EditButton
											className="me-2"
											size="small"
											onClick={(e) => {
												e.stopPropagation(); 
												setSelectedStaff(staff);
												setShowEditStaffModal(true);
											}}
										>
											Sửa
										</EditButton>
										<DeleteButton size="small">Xóa</DeleteButton>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan="8" className="text-center text-muted">
									Không có nhân sự nào
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			<EditStaffModal
				show={showEditStaffModal}
				onClose={() => {
					setShowEditStaffModal(false);
				}}
				staff={selectedStaff}
			/>
		</>
	);
};

export default StaffTable;