import { useState } from "react";
import { ConfirmButton, CloseButton } from "../../common/ActionButtons";
import { TextField } from "@mui/material";

const AddProcess = ({ show, onSubmit, onClose }) => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit({ name, description });
		setName("");
		setDescription("");
	};

	return (
		<>
			{show && <div className="modal-backdrop fade show"></div>}
			<div className={`modal fade ${show ? "show d-block" : ""}`} tabIndex="-1">
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content" style={{ borderColor: "transparent" }}>
                        <div className="modal-header py-2" style={{ backgroundColor: "#02437D", color: "#fff" }}>
                            <h5 className="modal-title fw-bold" id="addProcessStepModalLabel">Thêm thao tác</h5>
							<CloseButton size="small" className="btn-close" onClick={onClose} />
						</div>
						<div className="modal-body p-3" style={{ color: "#02437D" }}>
							<form onSubmit={handleSubmit}>
								<div className="mb-2">
									<TextField
										label="Tên thao tác"
										value={name}
										onChange={(e) => setName(e.target.value)}
										fullWidth
										required
										placeholder="Nhập tên thao tác"
									/>
								</div>
								<div className="mb-2">
									<TextField
										label="Mô tả"
										value={description}
										onChange={(e) => setDescription(e.target.value)}
										fullWidth
										multiline
										rows={3}
										required
										placeholder="Nhập mô tả"
									/>
								</div>
								<ConfirmButton className="w-100" type="submit" disabled={!name || !description}>
									Thêm thao tác
								</ConfirmButton>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AddProcess;
