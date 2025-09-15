import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import workRecordService from "../../../services/workRecordService";
import ReportErrorList from "./ReportErrorList";

const ErrorManagerment = () => {
    const [workRecords, setWorkRecords] = useState([]);
    
    const fetchWorkRecords = async () => {
        try {
            const res = await workRecordService.getAllWorkRecords();
            if (res?.EC === 0) {
                setWorkRecords(res?.DT);
            } else {
                toast.warning(res?.EM || "Không thể lấy danh sách báo cáo lỗi!");
            }
        } catch (err) {
            console.error("Lỗi khi lấy danh sách báo cáo lỗi:", err);
            toast.error("Lỗi server khi tải dữ liệu!");
        }
    };

    useEffect(() => {
        fetchWorkRecords();
    }, []);

    return (
        <div className="container">
			<div className="card shadow-sm border-0 mb-2">
				<div className="card-body text-center">
					<h2 className="fs-2 lead">Quản lý lỗi</h2>
				</div>
			</div>

            <ReportErrorList workRecordList={workRecords} />
		</div>
    );
}

export default ErrorManagerment;
