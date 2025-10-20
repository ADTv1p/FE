import { useState, useEffect } from "react";
import { CloseButton, ConfirmButton, FileButton } from "../../common/ActionButtons";
import { TextField, MenuItem, Avatar } from "@mui/material";
import staffService from "../../../services/staffService";
import { toast } from "react-toastify";
import positionService from "../../../services/positionService";

const EditStaffModal = ({ show = false, onClose = () => {}, onUpdate, staff = {}}) => {
	const [formData, setFormData] = useState({});
	const [positions, setPositions] = useState({});
    const [preview, setPreview] = useState("");

	const handleFileChange = (e) => {
		const file = e.target.files?.[0];
		if (file) {
			setFormData({ ...formData, avatar: file });
			setPreview(URL.createObjectURL(file)); // ✅ tạo URL preview mới
		}
	};

    const fetchPositions = async () => {
        try {
            const res = await positionService.getAllPositions();
            if (res?.EC === 0 && res.DT) setPositions(res.DT);
            else toast.error(res?.EM || "Không lấy được danh sách chức vụ.");
        } catch (err) {
            console.error("Lỗi tải chức vụ:", err);
            toast.error("Lỗi kết nối khi tải danh sách chức vụ.");
        }
    };

	useEffect(() => {
        if (staff) setFormData(staff);
        fetchPositions();
    }, [staff]);

    if (!staff) return null;

	const handleChange = e => {
        const { name, value, files } = e.target;
        const newValue = files ? files[0] : value;
        setFormData(prev => ({
            ...prev,
            [name]: newValue
        }));
    };

    const validateFormData = (data) => {
        const errors = [];

        if (!data.full_name || data.full_name.trim() === "") {
            errors.push("Họ và tên không được để trống.");
        }

        if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            errors.push("Email không hợp lệ.");
        }

        if (data.phone && !/^\d{9,15}$/.test(data.phone)) {
            errors.push("Số điện thoại không hợp lệ (chỉ chứa 9-15 chữ số).");
        }

        if (data.date_of_birth && isNaN(new Date(data.date_of_birth).getTime())) {
            errors.push("Ngày sinh không hợp lệ.");
        }

        if (data.start_date && isNaN(new Date(data.start_date).getTime())) {
            errors.push("Ngày bắt đầu không hợp lệ.");
        }

        return errors;
    };

	const handleUpdate = async e => {
		e.preventDefault();

		const errors = validateFormData(formData);
		if (errors.length > 0) {
			errors.forEach(err => toast.error(err));
			return;
		}

		const { avatar: avatarFile, ...otherFields } = formData;
		const data = new FormData();

		Object.entries(otherFields).forEach(([key, value]) => {
			if (key !== "staff_id" && value !== staff[key]) {
				data.append(key, value);
			}
		});

		const avatar = avatarFile instanceof File ? avatarFile : null;

		try {
			const res = await staffService.updateStaff(staff.staff_id, avatar, data);
			if (res?.EC === 0) {
				toast.success(res.EM || "Cập nhật nhân viên thành công");
				setFormData(res.DT);
				onUpdate && onUpdate(res.DT);
				onClose();                    
			} else {
				toast.error(res.EM || "Cập nhật thất bại");
				console.error("Lỗi khi cập nhật:", res);
			}
		} catch (err) {
			toast.error("Cập nhật thất bại: Lỗi kết nối");
			console.error("Lỗi khi cập nhật:", err);
		}
	};

	return (
		<div className={`modal fade ${show ? "show d-block" : "d-none"}`} tabIndex="-1"
			style={{ backgroundColor: show ? "rgba(0,0,0,0.5)" : "transparent" }}>
			<div className="modal-dialog modal-lg modal-dialog-centered">
				<div className="modal-content border-0">
					<div className="modal-header" style={{ backgroundColor: "#02437D", color: "#fff" }}>
						<h5 className="modal-title">Cập nhật thông tin nhân viên</h5>
						<CloseButton size="small" className="btn-close" onClick={onClose} />
					</div>

					<div className="modal-body">
						<form onSubmit={handleUpdate}>
							<div className="row row-cols-2 g-3">
								<div className="col-12 text-center mb-3">
									<div className="d-flex flex-column align-items-center">
										<Avatar
											src={
												preview
													? preview
													: formData.avatar
													? `http://localhost:3001/${formData.avatar}`
													: ""
											}
											alt="avatar"
											sx={{ width: 180, height: 180, mb: 2 }}
										/>
										<FileButton
											type="file"
											name="avatar"
											accept="image/*"
											onChange={handleFileChange} 
										/>
									</div>
								</div>

								<div className="col">
									<TextField label="Họ và tên" name="full_name" value={formData.full_name || ""} onChange={handleChange} fullWidth required />
								</div>
								<div className="col">
									<TextField label="Email" type="email" name="email" value={formData.email || ""} onChange={handleChange} fullWidth />
								</div>
								<div className="col">
									<TextField label="Số điện thoại" name="phone" value={formData.phone || ""} onChange={handleChange} fullWidth />
								</div>
								<div className="col">
									<TextField label="Ngày sinh" type="date" name="date_of_birth" value={formData.date_of_birth || ""} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} />
								</div>
								<div className="col">
									<TextField label="Ngày bắt đầu" type="date" name="start_date" value={formData.start_date || ""} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} />
								</div>
								<div className="col">
									<TextField label="Phòng ban" name="department" value={formData.department || ""} fullWidth InputProps={{ readOnly: true }} />
								</div>
								<div className="col">
									<TextField select label="Chức vụ" name="position_id" value={formData.position_id || ""} onChange={handleChange} fullWidth>
										{positions.length > 0 ? (
											positions.map(p => (
												<MenuItem key={p.position_id} value={p.position_id}>
													{p.code} - {p.role}
												</MenuItem>
											))
										) : (
											<MenuItem disabled>Không có chức vụ</MenuItem>
										)}
									</TextField>
								</div>
								<div className="col">
									<TextField select label="Trạng thái" name="status" value={formData.status || ""} onChange={handleChange} fullWidth>
										<MenuItem value="active">Đang làm việc</MenuItem>
										<MenuItem value="inactive">Ngừng làm việc</MenuItem>
									</TextField>
								</div>
							</div>
						</form>
					</div>

					<div className="modal-footer">
						<CloseButton onClick={onClose} />
						<ConfirmButton type="submit" onClick={handleUpdate}>
							Lưu thay đổi
						</ConfirmButton>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditStaffModal;
