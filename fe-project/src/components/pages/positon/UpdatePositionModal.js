import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { CloseButton, ConfirmButton } from "../../common/ActionButtons";
import { TextField, MenuItem } from "@mui/material";
import positionService from "../../../services/positionService";
import processService from "../../../services/processService";

const TOOL_OPTIONS = [
	{ value: "", label: "-- Không chọn --" },
	{ value: "dao", label: "Dao cắt băng keo" },
	{ value: "keo", label: "Kéo" },
	{ value: "sung_gio", label: "Súng bắn dây rút" },
	{ value: "mo_vit", label: "Mỏ vịt" },
];

const ROLE_OPTIONS = [
	{ value: "", label: "-- Không chọn --" },
	{ value: "tape", label: "tape - Quấn băng keo" },
	{ value: "layout", label: "layout - Trải dây" },
	{ value: "sub", label: "sub - Cắm dây điện" },
];

const UpdatePositionModal = ({ onClose = () => {}, onUpdated = () => {}, position = {}}) => {
    const [formData, setFormData] = useState({});
    const [processes, setProcesses] = useState([]);
    
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
        if (position && Object.keys(position).length > 0) {
            setFormData(position);
        }
        fetchProcess();
    }, [position]);

    const handleChange = e => {
        const { name, value, files } = e.target;
        const newValue = files ? files[0] : value;
        setFormData(prev => ({
            ...prev,
            [name]: newValue
        }));
    };

    const handleUpdate = async e => {
        e.preventDefault();

        const data = new FormData();
        const { position_id, code, role, tools, process_id } = formData;

        data.append("position_id", position_id);
        data.append("code", code);
        data.append("role", role);
        data.append("tools", tools);
        data.append("process_id", process_id);

        console.log("📦 Dữ liệu gửi lên server:");
        for (let [key, value] of data.entries()) {
            console.log(`${key}:`, value);
        }
        try {
            const res = await positionService.updatePosition(position.position_id, data);
            if (res?.EC === 0) {
                toast.success(res.EM || "Cập nhật vị trí thành công");
                onUpdated(res.DT);
				onClose()
            } else toast.error(res.EM || "Cập nhật thất bại");
        } catch (err) {
            console.error("Lỗi khi cập nhật:", err);
            toast.error("Cập nhật thất bại: Lỗi kết nối");
        }
    };

    return (
        <motion.div
			initial={{ opacity: 0, x: -50 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.3, delay: 0.3, ease: "easeInOut" }}
			className="card shadow-sm"
			style={{ backgroundColor: "#02437D", color: "#fff", borderColor: "transparent" }}
		>
            <div className="card shadow-sm" style={{ borderColor: "transparent" }}>
                <div className="card-header fw-bold d-flex justify-content-between align-items-center" style={{ backgroundColor: "#02437D", color: "#fff" }}>
                    Cập nhật thông tin vị trí
                    <CloseButton size="small" onClick={onClose} />
                </div>
                <div className="card-body" style={{ color: "#02437D" }}>
                    {/* Form nội dung */}
                    <form onSubmit={handleUpdate}>
                        <div className="py-3">
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <TextField
                                        label="Mã hiệu"
                                        name="code"
                                        value={formData.code || ""}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                </div>

                                <div className="col-md-6">
                                    <TextField
                                        label="Vai trò"
                                        name="role"
                                        value={formData.role || ""}
                                        onChange={handleChange}
                                        fullWidth
                                    >
                                        {ROLE_OPTIONS.map((r) => (
                                            <MenuItem key={r.value} value={r.value}>
                                                {r.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>

                                <div className="col-12">
                                    <TextField
                                        select
                                        label="Công cụ"
                                        name="tools"
                                        value={formData.tools || ""}
                                        onChange={handleChange}
                                        fullWidth
                                    >
                                        {TOOL_OPTIONS.map((t) => (
                                            <MenuItem key={t.value} value={t.value}>
                                                {t.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>

                                <div className="col-12">
                                    <TextField
                                        select
                                        label="Thao tác"
                                        name="process_id"
                                        value={formData.process_id || ""}   // không dùng position_id
                                        onChange={handleChange}
                                        fullWidth
                                    >
                                        {processes.length > 0 ? (
                                            processes.map((p) => (
                                                <MenuItem key={p.process_id} value={p.process_id}>
                                                    {p.name}
                                                </MenuItem>
                                            ))
                                        ) : (
                                            <MenuItem disabled>Không có thao tác</MenuItem>
                                        )}
                                    </TextField>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="d-flex justify-content-end gap-2 border-top pt-3">
                            <CloseButton onClick={onClose} />
                            <ConfirmButton type="submit">Lưu thay đổi</ConfirmButton>
                        </div>
                    </form>
                </div>
            </div>
        </motion.div>
    );
};

export default UpdatePositionModal;
