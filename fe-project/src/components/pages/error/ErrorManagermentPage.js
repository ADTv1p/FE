import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import workRecordService from "../../../services/workRecordService";
import ReportErrorList from "./ReportErrorList";
import ReportFilter from "./ReportFilter";
import ExportButton from "../../common/ExportButton";
import exportWorkRecordsToExcel from "../../utils/export/exportWorkRecordsToExcel";

const ErrorManagement = () => {
    const [workRecords, setWorkRecords] = useState([]);
    const [filteredWorkRecord, setFilterWorkRecord] = useState([]);

    const fetchWorkRecords = async () => {
        try {
            const res = await workRecordService.getAllWorkRecords();
            if (res?.EC === 0) {
                setFilterWorkRecord(res.DT);
                setWorkRecords(res.DT);
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

    const handleFilterWorkRecords = (filters) => {
        const filtered = workRecords.filter(record => {
            return (
                (!filters.phone || record.staff?.phone?.includes(filters.phone)) &&
                (!filters.email || record.staff?.email?.includes(filters.email)) &&
                (!filters.createdAt || new Date(record.createdAt).toDateString() === new Date(filters.createdAt).toDateString()) &&
                (!filters.errorName || record.error?.name?.toLowerCase().includes(filters.errorName.toLowerCase())) &&
                (!filters.role || record.staff?.position?.role === filters.role) &&
                (!filters.name || record.staff?.full_name?.toLowerCase().includes(filters.name.toLowerCase()))
            );
        });
        setFilterWorkRecord(filtered);
    };

    const handleExportReport = async(filteredWorkRecord) => {
        exportWorkRecordsToExcel(filteredWorkRecord);
    };

    return (
        <div className="container">
            <div className="card shadow-sm border-0 mb-2">
                <div className="card-body d-flex justify-content-between align-items-center">
                    <h2 className="fs-2 lead mb-0">Quản lý lỗi</h2>
                    <div>
                        <ExportButton
                            className="me-2"
                            disabled={!filteredWorkRecord || filteredWorkRecord.length === 0}
                            onClick={() => handleExportReport(filteredWorkRecord)}
                            >
                            Xuất Danh Sách Báo Cáo
                        </ExportButton>
                    </div>
                </div>
            </div>
            <div className="row g-3">
                <div className="col-9">
                    <ReportErrorList workRecordList={filteredWorkRecord} />
                </div>
                <div className="col-3">
                    <div className="sticky-top" style={{ top: '5em', zIndex: '1000' }}>
                        <ReportFilter workRecordList={filteredWorkRecord} onFilter={handleFilterWorkRecords} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ErrorManagement;