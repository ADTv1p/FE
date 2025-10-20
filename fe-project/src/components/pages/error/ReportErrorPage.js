import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Report } from '@mui/icons-material';
import { BackButton } from "../../common/ActionButtons";
import { Typography } from '@mui/material';
import AddErrorModal from "./AddErrorModal";
import ReportErrorForm from "./ReportErrorForm";
import errorService from "../../../services/errorService";
import workOrderService from "../../../services/workOrderService";
import positionService from "../../../services/positionService";
import workRecordService from "../../../services/workRecordService";

const ReportError = () => {
	const [showFormAddError, setShowFormAddError] = useState(false);
	const [errors, setErrors] = useState([]);
	const [workOrders, setWorkOrders] = useState([]);
	const [positions, setPositions] = useState([]);

	const fetchErrors = async () => {
		try {
			const res = await errorService.getAllErrorsApiService();
			if (res?.EC === 0) {
				setErrors(res?.DT);
			} else {
				toast.warning(res?.EM || "Không thể lấy danh sách báo cáo!");
			}
		} catch (err) {
			console.error("Lỗi khi lấy danh sách lỗi:", err);
			toast.error("Lỗi server khi tải dữ liệu!");
		}
	};

	const fetchWorkOrders = async () => {
		try {
			const res = await workOrderService.getAllWorkOrdersApiService();
			if (res?.EC === 0) {
				setWorkOrders(res?.DT);
			} else {
				toast.warning(res?.EM || "Không thể lấy danh sách đơn công việc!");
			}
		} catch (err) {
			console.error("Lỗi khi lấy danh sách đơn công việc:", err);
			toast.error("Lỗi server khi tải dữ liệu!");
		}
	};

	const fetchPositions = async () => {
		try {
			const res = await positionService.getSupportPositions();
			if (res?.EC === 0) {
				setPositions(res?.DT);
			} else {
				toast.warning(res?.EM || "Không thể lấy danh sách vị trí!");
			}
		} catch (err) {
			console.error("Lỗi khi lấy danh sách vị trí:", err);
			toast.error("Lỗi server khi tải dữ liệu!");
		}
	};	

	useEffect(() => {
		fetchWorkOrders();
		fetchErrors();
		fetchPositions();
	}, []);

	const handleAddError = async (data) => {
		try {
			const res = await errorService.createErrorApiService(data);
			if (res.EC === 0) {
				toast.success(res.EM);
				setShowFormAddError(false);
				setTimeout(() => {
					window.location.reload();
				}, 1000); // Chờ 1 giây trước khi reload
			} else {
				toast.warning(res.EM);
			}
		} catch (err) {
			console.error("Lỗi khi thêm lỗi:", err);
			toast.error("Không thể tạo lỗi, vui lòng thử lại!");
		}
	};

	const openAddErrorForm = () => {
		setShowFormAddError(true);
	}

	const handleAddReport = async(data) => {
		try {
			const res = await workRecordService.createWorkRecord(data);
			if (res.EC === 0) {
				toast.success(res.EM);
				setTimeout(() => {
					window.location.reload();
				}, 1000); 
			} else {
				toast.warning(res.EM);
			}
		} catch (err) {
			console.error("Lỗi khi thêm báo cáo:", err);
			toast.error("Không thể tạo báo cáo, vui lòng thử lại!");
		}
	};

	return (
		<div className="container">
			<div className="card shadow-sm p-3 mb-3 d-flex flex-row justify-content-between align-items-center" style={{ border: "1px solid #02437D"}}>
                <Typography variant="h4" display="flex" alignItems="center" gap={2} sx={{ color: "#02437D" }}>
                    <Report fontSize="large" />
                    BÁO CÁO SỰ CỐ
                </Typography>
				<BackButton onClick={() => window.history.back()}>
					Quay lại
				</BackButton>
            </div>

			{showFormAddError && (
				<AddErrorModal
					onSubmit={handleAddError}
					showFormAddError={setShowFormAddError}
					onClose={() => setShowFormAddError(false)}
				/>
			)}

			<ReportErrorForm 
				onSubmit={handleAddReport} 
			 	onShowAddError={openAddErrorForm} 
				errors={errors} 
				workOrders ={workOrders} 
				positions={positions}
			/>
		</div>
	);
};

export default ReportError;
