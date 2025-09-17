import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import StatisticsSidebar from "../../common/StatisticsSidebar";
import statisticService from "../../../services/statisticService";
import ExportButton from "../../common/ExportButton";
import IfLoading from "../../common/IfLoading";
import IfError from "../../common/IfError";
const ErrorStatistics = () => {
    const [errorStats, setErrorStats] = useState({
        totalErrors: 0,
        errorsByType: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
 
    useEffect(() => {
        const fetchErrorStatistics = async () => {
            try {
                setLoading(true);
                const res = await statisticService.getErrorCountStatistics("day");
                if (res && res.EC === 0) {
                    const data = res.DT;

                    // Tổng số lỗi
                    const totalErrors = data.length;

                    // Nhóm theo loại lỗi
                    const errorsByTypeMap = {};
                    data.forEach((item) => {
                        const type = item.error?.name || "Khác";
                        errorsByTypeMap[type] = (errorsByTypeMap[type] || 0) + 1;
                    });

                    const errorsByType = Object.entries(errorsByTypeMap).map(([type, count]) => ({
                        type,
                        count,
                    }));

                    setErrorStats({ totalErrors, errorsByType });
                } else {
                    toast.error(res?.EM || "Không thể tải thống kê lỗi.");
                }
            } catch (err) {
                console.error("Lỗi khi tải thống kê:", err);
                toast.error("Lỗi kết nối khi tải thống kê lỗi.");
            } finally {
                setLoading(false);
            }
        };

        fetchErrorStatistics();
    }, []);

    if (loading) return <IfLoading />
    if (error) return <IfError />

    return (
        <div className="container">
            <div className="d-flex">
                <StatisticsSidebar />
                <div className="flex-grow-1 ps-3">
                    {/* Header Card */}
                    <div className="card shadow-sm border-0 mb-2">
                        <div className="card-body d-flex justify-content-between align-items-center text-center">
                            <h2 className="fs-2 lead mb-0">Thống kê lỗi</h2>
                            <ExportButton className="me-2">Xuất Danh Sách Thao Tác</ExportButton>
                        </div>
                    </div>

                    {/* Error Statistics Table */}
                    <div className="card shadow-sm border-0 mb-2">
                        <div className="card-body">
                            <div>
                                <div className="mb-3">
                                    <h5>Tổng số lỗi: {errorStats.totalErrors}</h5>
                                </div>
                                <div className="table-responsive shadow-sm border-0 rounded-3 bg-white p-3 mb-4">
                                    <table className="table table-bordered table-hover">
                                        <thead className="table-light">
                                            <tr>
                                                <th scope="col">Loại lỗi</th>
                                                <th scope="col">Số lượng</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {errorStats.errorsByType.length > 0 ? (
                                                errorStats.errorsByType.map((error, index) => (
                                                    <tr key={index}>
                                                        <td>{error.type}</td>
                                                        <td>{error.count}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="2" className="text-center">
                                                        Không có dữ liệu lỗi
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ErrorStatistics;