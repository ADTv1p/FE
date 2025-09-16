import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import AddError from "./AddError";
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
				toast.warning(res?.EM || "Không thể lấy danh sách lỗi!");
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
			<div className="card shadow-sm border-0 mb-2">
				<div className="card-body text-center">
					<h2 className="fs-2 lead">Báo cáo lỗi</h2>
				</div>
			</div>

			{showFormAddError && (
				<AddError
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
