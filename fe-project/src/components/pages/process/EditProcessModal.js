import { useState, useEffect } from "react";
import { CloseButton, ConfirmButton } from "../../common/ActionButtons";
import { TextField, Typography } from "@mui/material";

const EditProcessModal = ({ show, process, onSubmit, onClose }) => {
	const [formData, setFormData] = useState({
        name: "",
        description: "",
    });
    const [isChanged, setIsChanged] = useState(false);

    useEffect(() => {
        if (process) {
            setFormData({
                name: process.name || "",
                description: process.description || "",
            });
            setIsChanged(false);
        }
    }, [process]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updated = { ...formData, [name]: value };
        setFormData(updated);

        // kiểm tra thay đổi
        const changed =
            updated.name !== (process?.name || "") ||
            updated.description !== (process?.description || "");
        setIsChanged(changed);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !isChanged) return;

        const updatedProcess = { ...formData, process_id: process.process_id };

        const res = await onSubmit?.(updatedProcess); // cha xử lý API và trả process mới
        if (res?.EC === 0) {
            onClose(); // đóng modal
        }
    };

	return (
		<>
			{show && <div className="modal-backdrop fade show"></div>}
			<div className={`modal fade ${show ? "show d-block" : ""}`} tabIndex="-1">
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content" style={{ borderColor: "transparent" }}>
						<div className="modal-header py-2" style={{ backgroundColor: "#02437D", color: "#fff" }}>
							<h5 className="modal-title fw-bold">Cập nhật thao tác</h5>
							<CloseButton size="small" className="btn-close" onClick={onClose} />
						</div>
						<div className="modal-body p-3" style={{ color: "#02437D" }}>
							<form onSubmit={handleSubmit} className="row g-3">
								<div className="col-12">
									<TextField
										label="Tên thao tác"
										name="name"
										value={formData.name}
										onChange={handleChange}
										fullWidth
										required
									/>
								</div>
								<div className="col-12">
									<TextField
                                        label="Mô tả"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        fullWidth
                                        multiline
                                        rows={3}
                                    />
                                    <Typography variant="body2" color="textSecondary" mt={1}>
                                        Mô tả thao tác dùng cho bản thiết kế và sản phẩm nào
                                    </Typography>
								</div>
								<div className="col-12 d-grid">
									<ConfirmButton type="submit" disabled={!isChanged}>
										Lưu thay đổi
									</ConfirmButton>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default EditProcessModal;
