import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import DescriptionStep from "./DescriptionStep";
import processService from "../../../services/processService";
import positionService from "../../../services/positionService";
import { BackButton, ConfirmButton } from "../../common/ActionButtons";
import { Typography, TextField, MenuItem, Button } from "@mui/material";
import { PanToolRounded } from "@mui/icons-material";

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
		<div className="container">
			<div className="card shadow-sm p-3 mb-3 d-flex flex-row justify-content-between align-items-center" style={{ border: "1px solid #02437D"}}>
				<Typography variant="h4" display="flex" alignItems="center" gap={2} sx={{ color: "#02437D" }}>
					<PanToolRounded fontSize="large" />
					THÊM VỊ TRÍ
				</Typography>
				<div>
					<BackButton onClick={() => window.history.back()}>
						Quay lại
					</BackButton>
				</div>
			</div>

			<div className="card shadow-sm h-100" style={{ backgroundColor: "#fff", color: "#02437D", borderColor: "#02437D" }}>
				<div className="card-body">
					<form onSubmit={handleSubmit} className="row g-3">
						{/* Cột trái */}
						<div className="col-md-3">
							{/* Mã vị trí */}
							<TextField
								name="code"
								label="Mã vị trí"
								placeholder="Nhập mã vị trí"
								value={formData.code}
								onChange={handleChange}
								required
								fullWidth
								margin="normal"
							/>

							{/* Vai trò */}
							<TextField
								name="role"
								label="Vai trò"
								select
								value={formData.role}
								onChange={handleChange}
								required
								fullWidth
								margin="normal"
							>
								{ROLE_OPTIONS.map((r) => (
									<MenuItem key={r.value} value={r.value}>
										{r.label}
									</MenuItem>
								))}
							</TextField>

							{/* Dụng cụ */}
							<TextField
								name="tools"
								label="Dụng cụ"
								select
								value={formData.tools}
								onChange={handleChange}
								fullWidth
								margin="normal"
							>
								{TOOL_OPTIONS.map((t) => (
									<MenuItem key={t.value} value={t.value}>
										{t.label}
									</MenuItem>
								))}
							</TextField>
						</div>

						{/* Cột giữa: Chọn thao tác */}
						<div className="col-md-4">
							<label className="form-label fw-semibold">Chọn Thao tác</label>
							<div className="d-flex flex-column gap-2">
								{processes.map((p) => (
									<Button
									key={p.process_id} variant={formData.process_id === p.process_id ? "contained" : "outlined"}
									onClick={() => handleSelectProcess(p)} fullWidth
									sx={{
										display: "flex",
										flexDirection: "column",
										alignItems: "flex-start",
										backgroundColor: formData.process_id === p.process_id ? "#02437D" : undefined,
										color: formData.process_id === p.process_id ? "#ffffff" : undefined,
										"&:hover": {
											backgroundColor: formData.process_id === p.process_id ? "#02437D" : undefined,
										},
									}}
								>
									<span className="fw-semibold">{p.name}</span>
									<small className="">{p.description}</small>
								</Button>

								))}
							</div>
						</div>

						{/* Cột phải: Hiển thị các bước thao tác */}
						<div className="col-md-5">
							<label className="form-label fw-semibold">Các bước của thao tác</label>
							<DescriptionStep process={selectedProcess} />
						</div>

						{/* Nút submit */}
						<div className="col-12 text-center">
							<ConfirmButton size="large" type="submit">
								Thêm vị trí
							</ConfirmButton>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AddPosition;
