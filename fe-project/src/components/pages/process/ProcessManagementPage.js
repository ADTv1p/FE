import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import AddProcess from "./AddProcess";
import AddStep from "./AddStep";
import ViewProcess from "./ViewProcess";
import ProcessTable from "./ProcessTable";
import ViewStep from "../step/ViewStep";

import processServicie from "../../../services/processService";
import accessoryService from "../../../services/accessoryService";
import processStepService from "../../../services/processStepService";

const ProcessManagement = () => {
	const [showAddProcess, setShowAddProcess] = useState(false); 
	const [showAddStep, setShowAddStep] = useState(false); 
	const [showProcessInfo, setShowProcessInfo] = useState(false); 
	const [showStepInfo, setShowStepInfo] = useState(false); 
	const [selectedProcess, setSelectedProcess] = useState(null);
	const [selectedStep, setSelectedStep] = useState(null);
	const [processes, setProcesses] = useState([]);
	const [accessories, setAccessories] = useState([]);

	const fetchProcesses = async () => {
		try {
			const res = await processServicie.getAllProcesses();
			if (res?.EC === 0) setProcesses(res.DT);
		} catch (err) {
			console.error("Lỗi tải phụ kiện:", err);
			toast.error("Lỗi khi tải danh sách phụ kiện.");
		}
	};

	const fetchAccessories = async () => {
		try {
			const res = await accessoryService.getSupportAccessories();
			if (res?.EC === 0) setAccessories(res.DT);
			else toast.error(res?.EM || "Không thể tải danh sách thao tác.");
		} catch (err) {
			console.error("Lỗi tải thao tác:", err);
			toast.error("Lỗi khi tải danh sách thao tác.");
		}
	};

	const fetchStep = async (process_step_id) => {
		try {
			const res = await processStepService.getProcessStepInfo(process_step_id);
			if (res?.EC === 0) setSelectedStep(res.DT);
			else toast.error(res?.EM || "Không thể tải thông tin bước.");
		} catch (err) {
			console.error("Lỗi tải thao tác:", err);
			toast.error("Lỗi khi tải danh sách thao tác.");
		}
	};

	useEffect(() => {
		fetchProcesses();
	}, []);

	const handleAddProcess = async (data) => {
		if (!data.name?.trim()) return toast.warning("Tên thao tác không được để trống!");
		if (!data.description?.trim())
			return toast.warning("Mô tả thao tác không được để trống!");

		try {
			const res = await processServicie.createProcess(data);
			if (res?.EC === 0) {
				toast.success("Thêm thao tác thành công!");
				setProcesses((prev) => [...prev, res.DT]); // Thêm thao tác mới vào danh sách
				setShowAddProcess(false);
			} else {
				toast.error(res?.EM || "Không thể thêm thao tác.");
			}
		} catch (err) {
			console.error("Lỗi khi thêm thao tác:", err);
			toast.error("Lỗi kết nối khi thêm thao tác.");
		}
	};

	const handleAddStep = async (stepData) => {
		if (!stepData.step_order || stepData.step_order < 1)
			return toast.warning("Thứ tự bước phải lớn hơn 0!");
		if (!stepData.step_name?.trim())
			return toast.warning("Tên bước không được để trống!");
		if (!stepData.instruction?.trim())
			return toast.warning("Hướng dẫn bước không được để trống!");
		try {
			const res = await processStepService.createProcessStep(stepData);
			console.log("Res thêm bước:", res);
			if (res?.EC === 0) {
				toast.success("Thêm bước thành công!");
				// Cập nhật lại steps cho process đang xem
				setSelectedProcess((prev) => ({
					...prev,
					steps: [...(prev?.steps || []), res.DT],
				}));
				setShowAddStep(false);
			} else {
				toast.error(res?.EM || "Không thể thêm bước.");
			}
		} catch (err) {
			console.error("Lỗi khi thêm bước:", err);
			toast.error("Lỗi kết nối khi thêm bước.");
		}
	};

	return (
		<div>
			<p className="lead fs-2 mb-3 text-center">Quản lý thao tác</p>
			<div className="row g-4">
				{/* Cột bảng */}
				<div className={`col-${(showAddProcess || showAddStep || showProcessInfo) ? 6 : 12}`}>
					<div className="shadow-sm border-0 rounded-3 bg-white p-3 mb-4">
						<div className="d-flex justify-content-end mb-2">
							<button className="btn btn-success" onClick={() => setShowAddProcess(true)}>
								Thêm thao tác
							</button>
						</div>
						<ProcessTable
							processes={processes}
							onEdit={(p) => console.log("Sửa", p)}
							onView={(p) => { setSelectedProcess(p); setShowProcessInfo(true); }}
							onDelete={(id) => console.log("Xóa", id)}
						/>
					</div>
				</div>

				{/* Cột chi tiết / form */}
				{(showAddProcess || showAddStep || showProcessInfo || showStepInfo) && (
					<div className="col-6">
						{showStepInfo && selectedStep && (
							<ViewStep step={selectedStep} onClose={() => setShowStepInfo(false)} />
						)}

						{showAddProcess && (
							<AddProcess
								onSubmit={handleAddProcess}
								onClose={() => setShowAddProcess(false)}
							/>
						)}

						{showProcessInfo && selectedProcess && (
							<ViewProcess
								process={selectedProcess}
								onClose={() => { setSelectedProcess(null); setShowProcessInfo(false); }}
								onAddStep={() => { setShowAddStep(true); fetchAccessories(); }}
								onViewStep={(step) => { setShowStepInfo(true); fetchStep(step.process_step_id); }}
							/>
						)}

						{showAddStep && selectedProcess && (
							<AddStep
								process={selectedProcess}
								accessories={accessories}
								onClose={() => setShowAddStep(false)}
								onSubmit={handleAddStep}
							/>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default ProcessManagement;
