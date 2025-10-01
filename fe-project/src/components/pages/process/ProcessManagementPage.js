// ProcessManagement.js
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
import { AddButton, BackButton } from "../../common/ActionButtons";
import ExportButton from "../../common/ExportButton";
import IfLoading from "../../common/IfLoading";
import IfError from "../../common/IfError";
import { Typography } from "@mui/material";
import { SettingsApplications } from '@mui/icons-material';
import Pagination from "../../common/Pagination";
import ExportProcessListToExcel from "../../utils/export/ExportProcessListToExcel";

// Hàm tiện ích: hiển thị toast lỗi
const showErrorToast = (error, defaultMessage) => {
    console.error(defaultMessage, error);
    toast.error(error?.response?.data?.EM || defaultMessage);
};

// Định nghĩa các hằng số
const ROWS_PER_PAGE = 10;

const ProcessManagement = () => {
    const [allProcesses, setAllProcesses] = useState([]); // Lưu toàn bộ data gốc
    const [processes, setProcesses] = useState([]); // Danh sách hiển thị (để dành cho sau này có lọc)
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    
    // State để quản lý trạng thái hiển thị của các modal/chi tiết
    const [viewState, setViewState] = useState({
        selectedProcess: null,
        selectedStep: null,
        showAddProcessModal: false,
        showAddStepModal: false
    });

    // Lấy dữ liệu từ API
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
        } catch (err) {
            showErrorToast(err, "Lỗi khi tải danh sách thao tác.");
            setError(true);
        } finally {
            setLoading(false);
        }
    };
    // Lấy danh sách phụ kiện (để dùng cho modal thêm bước)
    const fetchAccessories = async () => {
        try {
            const res = await accessoryService.getSupportAccessories();
            if (res?.EC === 0) {
                return res.DT;
            } else {
                showErrorToast(null, "Không thể tải danh sách phụ kiện.");
                return [];
            }
        } catch (err) {
            showErrorToast(err, "Lỗi tải phụ kiện:");
            return [];
        }
    };
    
    // Lấy thông tin chi tiết một bước
    const fetchStep = async (process_step_id) => {
        try {
            const res = await processStepService.getProcessStepInfo(process_step_id);
            if (res?.EC === 0) {
                setViewState(prev => ({
                    ...prev,
                    selectedStep: res.DT,
                    selectedProcess: null,
                }));
            } else {
                showErrorToast(null, "Không thể tải thông tin bước.");
            }
        } catch (err) {
            showErrorToast(err, "Lỗi tải thông tin bước:");
        }
    };
    
    // Tải dữ liệu khi component được mount
    useEffect(() => {
        fetchProcesses();
    }, []);

    // Xử lý khi thêm một thao tác mới
    const handleAddProcess = async (data) => {
        if (!data.name?.trim()) return toast.warning("Tên thao tác không được để trống!");
        if (!data.description?.trim()) return toast.warning("Mô tả thao tác không được để trống!");

        try {
            const res = await processService.createProcess(data);
            if (res?.EC === 0) {
                toast.success("Thêm thao tác thành công!");
                setProcesses(prev => [...prev, res.DT]);
                setAllProcesses(prev => [...prev, res.DT]);
                setViewState(prev => ({ ...prev, showAddProcessModal: false }));
            } else {
                showErrorToast(null, "Không thể thêm thao tác.");
            }
        } catch (err) {
            showErrorToast(err, "Lỗi kết nối khi thêm thao tác:");
        }
    };

    // Xử lý khi thêm một bước mới vào thao tác
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
                setViewState(prev => {
                    const updatedProcess = {
                        ...prev.selectedProcess,
                        steps: [...(prev.selectedProcess?.steps || []), res.DT]
                    };
                    return { ...prev, selectedProcess: updatedProcess, showAddStepModal: false };
                });
            } else {
                showErrorToast(null, "Không thể thêm bước.");
            }
        } catch (err) {
            showErrorToast(err, "Lỗi kết nối khi thêm bước:");
        }
    };

    // Xử lý khi xem chi tiết một thao tác
    const handleViewProcess = (process) => {
        setViewState({
            selectedProcess: process,
            selectedStep: null,
            showAddProcessModal: false,
            showAddStepModal: false,
        });
    };

    // Xử lý khi xóa một thao tác
    const handleDeleteProcess = async(process_id) => {
        try {
            const res = await processService.deleteProcess(process_id);
            if (res?.EC === 0) {
                toast.success("Xóa thao tác thành công!");
                fetchProcesses();
            } else {
                toast.error(res.EM);
            }
        } catch (err) {
            toast.error(err, "Lỗi kết nối khi xóa thao tác:");
        }
    };

    // Xử lý khi xem chi tiết một bước
    const handleViewStep = (step) => {
        fetchStep(step.process_step_id);
    };

    // Xử lý khi đóng modal thêm bước
    const handleOpenAddStepModal = async () => {
        const accessories = await fetchAccessories();
        setViewState(prev => ({ ...prev, showAddStepModal: true, accessories }));
    };
    
    // Xử lý phân trang
    const handlePageChange = (newPage) => setPage(newPage);
    const startIdx = (page - 1) * ROWS_PER_PAGE;
    const endIdx = startIdx + ROWS_PER_PAGE;
    const currentProcesses = processes.slice(startIdx, endIdx);

    // Render giao diện
    if (loading) return <IfLoading />;
    if (error) return <IfError />;

    return (
        <div className="container">
            <div className="card shadow-sm p-3 mb-3 d-flex flex-row justify-content-between align-items-center" style={{ border: "1px solid #02437D"}}>
                <Typography variant="h4" display="flex" alignItems="center" gap={2} sx={{ color: "#02437D" }}>
                    <SettingsApplications fontSize="large" />
                    QUẢN LÝ THAO TÁC
                </Typography>
                <div>
                    <AddButton
                        className="me-2"
                        onClick={() => setViewState(prev => ({ ...prev, showAddProcessModal: true }))}
                    >
                        Thêm Thao tác
                    </AddButton>
                    <ExportButton className="me-2" disabled={!processes || processes.length === 0} onClick={() => ExportProcessListToExcel(allProcesses)}>
                        Xuất Danh Sách Thao tác
                    </ExportButton>
                    <BackButton onClick={() => window.history.back()}>
                        Quay lại
                    </BackButton>
                </div>
            </div>

            <div className="row g-4">
                {/* Bảng process */}
                <div className={viewState.selectedProcess || viewState.selectedStep ? "col-6" : "col-12"}>
                    <div className="card shadow-sm h-100" style={{ backgroundColor: "#fff", color: "#02437D", borderColor: "#02437D" }}>
						<div className="card-body">
							<h5 className="card-title fw-bold mb-3">Bảng danh sách</h5>
							<ProcessTable
                                processes={currentProcesses}
                                onEdit={(p) => console.log("Sửa", p)}
                                onView={handleViewProcess}
                                onDelete={(process_id) => handleDeleteProcess(process_id)}
                            />
                            <Pagination
                                page={page}
                                count={Math.ceil(processes.length / ROWS_PER_PAGE)}
                                onChange={handlePageChange}
                            />
						</div>
					</div>
                </div>

                {/* Panel chi tiết */}
                {(viewState.selectedProcess || viewState.selectedStep) && (
                    <div className="col-6">
                        {viewState.selectedProcess && (
                            <ViewProcess
                                process={viewState.selectedProcess}
                                onClose={() => setViewState(prev => ({ ...prev, selectedProcess: null }))}
                                onAddStep={handleOpenAddStepModal}
                                onViewStep={handleViewStep}
                            />
                        )}

                        {viewState.selectedStep && (
                            <ViewStep
                                step={viewState.selectedStep}
                                onClose={() => setViewState(prev => ({ ...prev, selectedStep: null }))}
                            />
                        )}
                    </div>
                )}
            </div>

            {/* Modal Components */}
            <AddProcess
                show={viewState.showAddProcessModal}
                onSubmit={handleAddProcess}
                onClose={() => setViewState(prev => ({ ...prev, showAddProcessModal: false }))}
            />
            <AddStep
                show={viewState.showAddStepModal}
                process={viewState.selectedProcess}
                accessories={viewState.accessories}
                onClose={() => setViewState(prev => ({ ...prev, showAddStepModal: false }))}
                onSubmit={handleAddStep}
            />
        </div>
    );
};

export default ProcessManagement;