// ProcessManagement.js
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Typography, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { SettingsApplications } from '@mui/icons-material';

import AddProcess from "./AddProcess";
import AddStep from "./AddStep";
import ViewProcess from "./ViewProcess";
import ProcessTable from "./ProcessTable";
import ViewStep from "../step/ViewStep";
import EditProcessModal from "./EditProcessModal";

import processService from "../../../services/processService";
import accessoryService from "../../../services/accessoryService";
import processStepService from "../../../services/processStepService";

import { AddButton, BackButton, CloseButton } from "../../common/ActionButtons";
import ExportButton from "../../common/ExportButton";
import IfLoading from "../../common/IfLoading";
import IfError from "../../common/IfError";
import Pagination from "../../common/Pagination";
import ExportProcessListToExcel from "../../utils/export/ExportProcessListToExcel";

const ROWS_PER_PAGE = 10;

const ProcessManagement = () => {
	const [allProcesses, setAllProcesses] = useState([]);
	const [processes, setProcesses] = useState([]);
	const [process, setProcess] = useState(null);
	const [showEdit, setShowEdit] = useState(false);
	const [filterType, setFilterType] = useState("");
	const [staffsOfProcess, setStaffsOfProcess] = useState([]);
	const [replacementProcesses, setReplacementProcesses] = useState([]);
	const [selectedDeletedProcess, setSelectedDeletedProcess] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [page, setPage] = useState(1);

	const [viewState, setViewState] = useState({
		selectedProcess: null,
		selectedStep: null,
		showReplacement: false,
		showAddProcessModal: false,
		showAddStepModal: false
	});

	const handleFilter = (type) => {
		setFilterType(type);
		const sorted = [...allProcesses];
		if (type === "newest") sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
		if (type === "oldest") sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
		setProcesses(sorted);
		setPage(1);
	};

	const fetchProcesses = async () => {
		setLoading(true);
		try {
			const res = await processService.getAllProcesses();
			if (res?.EC === 0) {
				setAllProcesses(res.DT);
				setProcesses(res.DT);
			} else {
				toast.warn("Không có dữ liệu thao tác.");
				setAllProcesses([]);
				setProcesses([]);
			}
		} catch {
			toast.error("Lỗi khi tải danh sách thao tác.");
			setError(true);
		} finally {
			setLoading(false);
		}
	};

	const fetchAccessories = async () => {
		try {
			const res = await accessoryService.getSupportAccessories();
			return res?.EC === 0 ? res.DT : [];
		} catch {
			toast.error("Lỗi tải danh sách phụ kiện.");
			return [];
		}
	};

	const fetchStep = async (id) => {
		try {
			const res = await processStepService.getProcessStepInfo(id);
			if (res?.EC === 0)
				setViewState((prev) => ({ ...prev, selectedStep: res.DT, selectedProcess: null }));
			else toast.error("Không thể tải thông tin bước.");
		} catch {
			toast.error("Lỗi tải thông tin bước.");
		}
	};

	useEffect(() => {
		fetchProcesses();
	}, []);

	const handleAddProcess = async (data) => {
		if (!data.name?.trim()) return toast.warning("Tên thao tác không được để trống!");
		if (!data.description?.trim()) return toast.warning("Mô tả thao tác không được để trống!");

		try {
			const res = await processService.createProcess(data);
			if (res?.EC === 0) {
                toast.success("Thêm thao tác thành công!");
                setProcesses((p) => [...p, res.DT]);
                setAllProcesses((p) => [...p, res.DT]);
                setViewState((prev) => ({ ...prev, showAddProcessModal: false }));
            } else if (res?.EC === 1) {
                toast.warning(res.EM || "Dữ liệu đã tồn tại hoặc chưa hợp lệ!");
            } else {
                toast.error("Không thể thêm thao tác.");
            }

		} catch {
			toast.error("Lỗi khi thêm thao tác.");
		}
	};

	const handleAddStep = async (step) => {
		if (!step.step_order || step.step_order < 1) return toast.warning("Thứ tự bước phải lớn hơn 0!");
		if (!step.step_name?.trim()) return toast.warning("Tên bước không được để trống!");
		if (!step.instruction?.trim()) return toast.warning("Hướng dẫn bước không được để trống!");

		try {
			const res = await processStepService.createProcessStep(step);
			if (res?.EC === 0) {
				toast.success("Thêm bước thành công!");
				setViewState((prev) => ({
					...prev,
					selectedProcess: { ...prev.selectedProcess, steps: [...(prev.selectedProcess?.steps || []), res.DT] },
					showAddStepModal: false
				}));
			} else toast.error("Không thể thêm bước.");
		} catch {
			toast.error("Lỗi khi thêm bước.");
		}
	};

	const handleDeleteProcess = async (id) => {
		try {
			const res = await processService.deleteProcess(id);
			if (res.EC === 0) {
				toast.success("Xóa thao tác thành công!");
				fetchProcesses();
			} else if (res.EC === 3) {
				toast.warning("Thao tác có nhân sự khác đang thực hiện!");
				setStaffsOfProcess(res.DT.staffs || []);
				setReplacementProcesses(res.DT.otherProcesses || []);
			} else toast.error(res.EM);
		} catch {
			toast.error("Lỗi khi xóa thao tác.");
		}
	};

	const handleSelectReplacement = async (item) => {
		const data = { old_process_id: selectedDeletedProcess, new_process_id: item.process_id };
		try {
			const res = await processService.replaceAndDeleteProcess(data);
			toast[res?.EC === 0 ? "success" : "warning"](res.EM);
		} catch {
			toast.error("Lỗi khi thay thế thao tác.");
		}
	};

	const handleUpdateProcess = async (data) => {
		try {
			const res = await processService.updateProcess(data);
			if (res?.EC === 0) {
				toast.success(res.EM);
				setShowEdit(false);
				fetchProcesses();
				setViewState((prev) => ({ ...prev, selectedStep: null, selectedProcess: res.DT }));
			} else toast.warning(res.EM || "Có vấn đề xảy ra");
		} catch {
			toast.error("Lỗi khi cập nhật thao tác.");
		}
	};

	const totalPages = Math.ceil(processes.length / ROWS_PER_PAGE);

	const paginatedProcesses = processes.slice(
		(page - 1) * ROWS_PER_PAGE,
		page * ROWS_PER_PAGE
	).map((item, index) => ({
		...item,
		stt: (page - 1) * ROWS_PER_PAGE + index + 1 
	}));

	const handlePageChange = (p) => setPage(p);
	
	if (loading) return <IfLoading />;
	if (error) return <IfError />;

	return (
		<div className="container">
			<div className="card shadow-sm p-3 mb-3 d-flex flex-row justify-content-between align-items-center" style={{ border: "1px solid #02437D" }}>
				<Typography variant="h4" sx={{ color: "#02437D", display: "flex", alignItems: "center", gap: 2 }}>
					<SettingsApplications fontSize="large" /> QUẢN LÝ THAO TÁC
				</Typography>
				<div>
					<AddButton className="me-2" onClick={() => setViewState((p) => ({ ...p, showAddProcessModal: true }))}>Thêm Thao tác</AddButton>
					<ExportButton className="me-2" disabled={!processes.length} onClick={() => ExportProcessListToExcel(allProcesses)}>Xuất Danh Sách</ExportButton>
					<BackButton onClick={() => window.history.back()}>Quay lại</BackButton>
				</div>
			</div>

			<div className="row g-4">
				<motion.div
					style={{ width: "100%" }}
					animate={{ width: viewState.selectedProcess || viewState.selectedStep ? "50%" : "100%" }}
					transition={{ duration: 0.3 }}
				>
					<div className="card shadow-sm h-100" style={{ borderColor: "#02437D", color: "#02437D" }}>
						<div className="card-body">
							<div className="d-flex justify-content-between align-items-center mb-3">
								<h5 className="fw-bold mb-0">Danh sách thao tác</h5>
								<FormControl size="small" sx={{ minWidth: 120 }}>
									<InputLabel>Lọc</InputLabel>
									<Select value={filterType} label="Lọc" onChange={(e) => handleFilter(e.target.value)}>
										<MenuItem value="newest">Mới nhất</MenuItem>
										<MenuItem value="oldest">Cũ nhất</MenuItem>
									</Select>
								</FormControl>
							</div>

							<ProcessTable
								processes={paginatedProcesses}
								onView={(p) => setViewState({ selectedProcess: p, selectedStep: null })}
								onDelete={(id) => { setSelectedDeletedProcess(id); handleDeleteProcess(id); }}
								onEdit={(p) => { setProcess(p); setShowEdit(true); }}
							/>
							<Pagination page={page} count={totalPages} onChange={handlePageChange} />
						</div>
					</div>
				</motion.div>

				{(viewState.selectedProcess || viewState.selectedStep) && (
					<div className="col-6">
						{viewState.selectedProcess && (
							<ViewProcess
								process={viewState.selectedProcess}
								onClose={() => setViewState((p) => ({ ...p, selectedProcess: null }))}
								onAddStep={async () => {
									const accessories = await fetchAccessories();
									setViewState((p) => ({ ...p, showAddStepModal: true, accessories }));
								}}
								onViewStep={(s) => fetchStep(s.process_step_id)}
								onEditProcess={(p) => { setProcess(p); setShowEdit(true); }}
							/>
						)}

						{viewState.selectedStep && (
							<ViewStep step={viewState.selectedStep} onClose={() => setViewState((p) => ({ ...p, selectedStep: null }))} />
						)}
					</div>
				)}
			</div>

			<AddProcess show={viewState.showAddProcessModal} onSubmit={handleAddProcess} onClose={() => setViewState((p) => ({ ...p, showAddProcessModal: false }))} />
			<AddStep show={viewState.showAddStepModal} process={viewState.selectedProcess} accessories={viewState.accessories} onClose={() => setViewState((p) => ({ ...p, showAddStepModal: false }))} onSubmit={handleAddStep} />
			<EditProcessModal show={showEdit} process={process} onClose={() => setShowEdit(false)} onSubmit={handleUpdateProcess} />
		</div>
	);
};

export default ProcessManagement;
