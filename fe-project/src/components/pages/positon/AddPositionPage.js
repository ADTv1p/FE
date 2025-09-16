import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import DescriptionStep from "./DescriptionStep";
import processService from "../../../services/processService";
import positionService from "../../../services/positionService";
import { AddButton } from "../../common/ActionButtons";

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

const AddPosition = () => {
	const [formData, setFormData] = useState({
		code: "",
		role: "",
		tools: "",
		process_id: "",
	});
	const [processes, setProcesses] = useState([]);
	const [selectedProcess, setSelectedProcess] = useState(null);

	// Lấy danh sách thao tác khi component mount
	useEffect(() => {
		const fetchProcesses = async () => {
			try {
				const res = await processService.getAllProcesses();
				if (res?.EC === 0) setProcesses(res.DT);
				else toast.error(res?.EM || "Không thể tải danh sách thao tác");
			} catch (err) {
				console.error(err);
				toast.error("Lỗi khi tải danh sách thao tác");
			}
		};
		fetchProcesses();
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSelectProcess = (process) => {
		setFormData((prev) => ({ ...prev, process_id: process.process_id }));
		setSelectedProcess(process);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!formData.code.trim() || !formData.role.trim()) {
			toast.warning("Mã và vai trò không được bỏ trống");
			return;
		}

		try {
			const res = await positionService.createPosition(formData);
			if (res?.EC === 0) {
				toast.success("Thêm vị trí thành công!");
				setFormData({ code: "", role: "", tools: "", process_id: "" });
				setSelectedProcess(null);
			} else {
				toast.error(res?.EM || "Không thể thêm vị trí");
			}
		} catch (err) {
			console.error("Lỗi khi thêm vị trí:", err);
			toast.error("Lỗi kết nối khi thêm vị trí");
		}
	};


	return (
		<div className="card shadow-sm border-0 mb-4">
			<div className="card-header d-flex justify-content-between align-items-center py-2 bg-light">
				<p className="lead fs-5 mb-0">Thêm vị trí</p>
			</div>

			<div className="card-body p-3">
				<form onSubmit={handleSubmit} className="row g-3">
					{/* Cột trái */}
					<div className="col-md-3">
						{/* Mã vị trí */}
						<div className="mb-3">
							<label className="form-label fw-semibold">Mã vị trí</label>
							<input
								type="text"
								name="code"
								className="form-control"
								placeholder="Nhập mã vị trí"
								value={formData.code}
								onChange={handleChange}
								required
							/>
						</div>

						{/* Vai trò */}
						<div className="mb-3">
							<label className="form-label fw-semibold">Vai trò</label>
							<select
								name="role"
								className="form-select"
								value={formData.role}
								onChange={handleChange}
								required
							>
								{ROLE_OPTIONS.map((r) => (
									<option key={r.value} value={r.value}>
										{r.label}
									</option>
								))}
							</select>
						</div>

						{/* Dụng cụ */}
						<div className="mb-3">
							<label className="form-label fw-semibold">Dụng cụ</label>
							<select
								name="tools"
								className="form-select"
								value={formData.tools}
								onChange={handleChange}
							>
								{TOOL_OPTIONS.map((t) => (
									<option key={t.value} value={t.value}>
										{t.label}
									</option>
								))}
							</select>
						</div>
					</div>

					{/* Cột giữa: Chọn thao tác */}
					<div className="col-md-4">
						<label className="form-label fw-semibold">Chọn Thao tác</label>
						<div className="d-flex flex-column gap-2">
							{processes.map((p) => (
								<button
									type="button"
									key={p.process_id}
									className={`btn ${
										formData.process_id === p.process_id
											? "btn-primary"
											: "btn-outline-secondary"
									} text-start`}
									onClick={() => handleSelectProcess(p)}
								>
									<p className="mb-0 fw-semibold">{p.name}</p>
									<small className="text-muted">{p.description}</small>
								</button>
							))}
						</div>
					</div>

					{/* Cột phải: Hiển thị các bước thao tác */}
					<div className="col-md-5">
						<label className="form-label fw-semibold">Các bước của thao tác</label>
						<DescriptionStep process={selectedProcess} />
					</div>

					{/* Nút submit */}
					<div className="col-12 d-grid">
						<AddButton type="submit">
							Thêm vị trí
						</AddButton>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddPosition;
