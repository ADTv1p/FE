import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { CloseButton, ConfirmButton, FileButton } from "../../common/ActionButtons";
import { TextField, MenuItem, Avatar } from "@mui/material";
import staffService from "../../../services/staffService";
import positionService from "../../../services/positionService";
import processService from "../../../services/processService";


const UpdatePositionModal = ({ show = false, onClose = () => {}, position = {}}) => {
    const [formData, setFormData] = useState({});
    const [processes, setProcesses] = useState({});
    
    const fetchProcess = async () => {
        try {
            const res = await processService.getAllProcesses();
            if (res?.EC === 0 && res.DT) setProcesses(res.DT);
            else toast.error(res?.EM || "Không lấy danh sách thao tác!");
        } catch (err) {
            console.error("Lỗi tải chức vụ:", err);
            toast.error("Lỗi kết nối khi tải danh sách chức vụ.");
        }
    };

    useEffect(() => {
        if (position) setFormData(position);
        fetchProcess();
    }, [position]);

    if (!position) return null;

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

        const data = new FormData();
        for (const key in formData) {
            if (key !== "staff_id" && key !== "avatar") { 
                if (formData[key] !== staff[key]) {
                    data.append(key, formData[key]);
                }
            }
        }

        try {
            const res = await positionService.updatePosition(position.position_id, data);
            if (res?.EC === 0) {
                toast.success(res.EM || "Cập nhật nhân viên thành công");
                setFormData(res.DT);
                onClose(res.DT);
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
                        <h5 className="modal-title">Cập nhật thông tin vị trí</h5>
                        <CloseButton size="small" className="btn-close" onClick={onClose} />
                    </div>

                    <div className="modal-body">
                        <form onSubmit={handleUpdate}>
                            <div className="row row-cols-2 g-3">
                                <div className="col-12 text-center mb-3">
                                    <div className="d-flex flex-column align-items-center">
                                        <Avatar src={formData.avatar ? (typeof formData.avatar === "string" ? `http://localhost:3001/${formData.avatar}` : URL.createObjectURL(formData.avatar)) : ""} alt="avatar" sx={{ width: 180, height: 180, mb: 2 }} />
                                        <FileButton type="file" name="avatar" accept="image/*" onChange={handleChange} />
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
                                    <TextField select label="Thao tác" name="process_id" value={formData.process_id || ""} onChange={handleChange} fullWidth>
                                        {processes.length > 0 ? (
                                            processes.map(p => (
                                                <MenuItem key={p.process_id} value={p.process_id}>
                                                    {p.name} - {p.descrition}
                                                </MenuItem>
                                            ))
                                        ) : (
                                            <MenuItem disabled>Không có thao tác</MenuItem>
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

export default UpdatePositionModal;
