// AddProcess.jsx
import { useState } from "react";
import { ConfirmButton } from "../../common/ActionButtons";

const AddProcess = ({ show, onSubmit, onClose }) => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");

	const handleSubmit = () => {
		onSubmit({ name, description });
		setName("");
		setDescription("");
	};

	return (
		<>
			{show && <div className="modal-backdrop fade show"></div>}
			<div className={`modal fade ${show ? "show d-block" : ""}`} tabIndex="-1">
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Thêm thao tác</h5>
							<button
								type="button"
								className="btn-close"
								onClick={onClose}
							></button>
						</div>
						<div className="modal-body p-3">
							<form onSubmit={handleSubmit}>
								<div className="mb-2">
									<label className="form-label">Tên thao tác</label>
									<input
										type="text"
										className="form-control"
										value={name}
										onChange={(e) => setName(e.target.value)}
										placeholder="Nhập tên thao tác"
										required
									/>
								</div>
								<div className="mb-2">
									<label className="form-label">Mô tả</label>
									<textarea
										className="form-control"
										value={description}
										onChange={(e) => setDescription(e.target.value)}
										placeholder="Nhập mô tả"
										required
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
