import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import AddProcess from "./AddProcess";
import AddStep from "./AddStep";
import ViewProcess from "./ViewProcess";
import ProcessTable from "./ProcessTable";
import ViewStep from "../step/ViewStep";
import processService from "../../../services/processService";
import accessoryService from "../../../services/accessoryService";
import processStepService from "../../../services/processStepService";
import { AddButton } from "../../common/ActionButtons";
import ExportButton from "../../common/ExportButton";
import IfLoading from "../../common/IfLoading";
import IfError from "../../common/IfError";

// Hàm tiện ích để hiển thị toast lỗi
const showErrorToast = (error, defaultMessage) => {
	console.error(defaultMessage, error);
	toast.error(error?.response?.data?.EM || defaultMessage);
};

// Hàm tiện ích để đóng modal
const closeModal = (modalId) => {
	const modal = document.getElementById(modalId);
	if (modal) {
		const bsModal = window.bootstrap.Modal.getInstance(modal);
		bsModal?.hide();
	}
};

const ProcessManagement = () => {
	const [selectedProcess, setSelectedProcess] = useState(null);
	const [selectedStep, setSelectedStep] = useState(null);
	const [processes, setProcesses] = useState([]);
	const [accessories, setAccessories] = useState([]);
	const [showProcessInfo, setShowProcessInfo] = useState(false);
	const [showStepInfo, setShowStepInfo] = useState(false);
	const [showAddProcessModal, setShowAddProcessModal] = useState(false);
	const [showAddStepModal, setShowAddStepModal] = useState(false);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(true);

	const fetchProcesses = async () => {
		setLoading(true);
		setError(false);
		try {
			const res = await processService.getAllProcesses();
			if (res?.EC === 0) {
				setProcesses(res.DT);
			} else {
				setError(true);
				showErrorToast(null, "Không thể tải danh sách thao tác.");
			}
		} catch (err) {
			setError(true);
			showErrorToast(err, "Lỗi tải danh sách thao tác:");
		} finally {
			setLoading(false);
		}
	};

	const fetchAccessories = async () => {
		try {
			const res = await accessoryService.getSupportAccessories();
			if (res?.EC === 0) {
				setAccessories(res.DT);
			} else {
				showErrorToast(null, "Không thể tải danh sách phụ kiện.");
			}
		} catch (err) {
			showErrorToast(err, "Lỗi tải phụ kiện:");
		}
	};

	const fetchStep = async (process_step_id) => {
		try {
			const res = await processStepService.getProcessStepInfo(process_step_id);
			if (res?.EC === 0) {
				setSelectedStep(res.DT);
				setShowStepInfo(true);
			} else {
				showErrorToast(null, "Không thể tải thông tin bước.");
			}
		} catch (err) {
			showErrorToast(err, "Lỗi tải thông tin bước:");
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
				setProcesses((prev) => [...prev, res.DT]);
				setShowAddProcessModal(false);
			} else {
				showErrorToast(null, "Không thể thêm thao tác.");
			}
		} catch (err) {
			showErrorToast(err, "Lỗi kết nối khi thêm thao tác:");
		}
	};

	const handleAddStep = async (stepData) => {
		if (!stepData.step_order || stepData.step_order < 1) {
			return toast.warning("Thứ tự bước phải lớn hơn 0!");
		}
		if (!stepData.step_name?.trim()) {
			return toast.warning("Tên bước không được để trống!");
		}
		if (!stepData.instruction?.trim()) {
			return toast.warning("Hướng dẫn bước không được để trống!");
		}
		try {
			const res = await processStepService.createProcessStep(stepData);
			if (res?.EC === 0) {
				toast.success("Thêm bước thành công!");
				setSelectedProcess((prev) => ({
					...prev,
					steps: prev ? [...(prev.steps || []), res.DT] : [res.DT],
				}));
				setShowAddStepModal(false);
			} else {
				showErrorToast(null, "Không thể thêm bước.");
			}
		} catch (err) {
			showErrorToast(err, "Lỗi kết nối khi thêm bước:");
		}
	};

	const handleViewProcess = (process) => {
		setSelectedProcess(process);
		setShowProcessInfo(true);
		setShowStepInfo(false);
	};

	const handleViewStep = (step) => {
		fetchStep(step.process_step_id);
	};

	const handleCloseViewProcess = () => {
		setSelectedProcess(null);
		setShowProcessInfo(false);
	};

	const handleCloseViewStep = () => {
		setSelectedStep(null);
		setShowStepInfo(false);
	};

	if (loading) return <IfLoading />
	if (error) return <IfError />

	return (
		<div className="container">
			<div className="card shadow-sm border-0 mb-2">
				<div className="card-body text-center d-flex justify-content-between">
					<h2 className="fs-2 lead">Quản lý thao tác</h2>
					<div>
						<AddButton
							className="me-2"
							onClick={() => setShowAddProcessModal(true)}
						>
							Thêm thao tác
						</AddButton>
						<ExportButton className="me-2">
							Xuất Danh Sách Thao Tác
						</ExportButton>
					</div>
				</div>
			</div>
			<div className="row g-4">
				<div className={showProcessInfo || showStepInfo ? "col-6" : "col-12"}>
					<div className="shadow-sm border-0 rounded-3 bg-white p-3 mb-4">
						<ProcessTable
							processes={processes}
							onEdit={(p) => console.log("Sửa", p)}
							onView={handleViewProcess}
							onDelete={(id) => console.log("Xóa", id)}
						/>
					</div>
				</div>
				{(showProcessInfo || showStepInfo) && (
					<div className="col-6">
						{showProcessInfo && selectedProcess && (
							<ViewProcess
								process={selectedProcess}
								onClose={handleCloseViewProcess}
								onAddStep={() => {
									fetchAccessories();
									setShowAddStepModal(true);
								}}
								onViewStep={handleViewStep}
							/>
						)}
						{showStepInfo && selectedStep && (
							<ViewStep step={selectedStep} onClose={handleCloseViewStep} />
						)}
					</div>
				)}
			</div>

			{/* Modal Components */}
			<AddProcess
				show={showAddProcessModal}
				onSubmit={handleAddProcess}
				onClose={() => setShowAddProcessModal(false)}
			/>
			<AddStep
				show={showAddStepModal}
				process={selectedProcess}
				accessories={accessories}
				onClose={() => setShowAddStepModal(false)}
				onSubmit={handleAddStep}
			/>
		</div>
	);
};

export default ProcessManagement;
