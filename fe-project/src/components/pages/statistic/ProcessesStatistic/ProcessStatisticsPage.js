import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import StatisticsSidebar from "../../../common/StatisticsSidebar";
import statisticService from "../../../../services/statisticService";
import ExportProcessDataToExcel from "../../../utils/export/ExportProcessDataToExcel";
import ExportButton from "../../../common/ExportButton";
import { BackButton } from "../../../common/ActionButtons";
import { Button, ButtonGroup, Typography } from "@mui/material";
import { StackedLineChart } from '@mui/icons-material';
import IfLoading from "../../../common/IfLoading";
import IfError from "../../../common/IfError";
import MuiPieChart from "./PieChart";
import MuiLineChart from "./LineChart";
import MuiBarChart from "./BarChart";
import ProcessTable from "./ProcessTable";

const ProcessStatistics = () => {
    const [processCount, setProcessCount] = useState(null);
    const [period, setPeriod] = useState("day");
    const [lineChartData, setLineChartData] = useState([]);
    const [barChartData, setBarChartData] = useState([]);
    const [pieChartData, setPieChartData] = useState([]);
    const [tableData, setTableData] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
 
    const fetchProcessStatisticsAllTime = async () => {
        try {
            setLoading(true);
            const res = await statisticService.getProcessStatisticsAllTime();
            if (res && res.EC === 0) {
                setProcessCount(res.DT);
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

    const fetchProcessesWithStaff = async () => {
        try {
            setLoading(true);
            const res = await statisticService.getProcessesWithStaff();
            if (res && res.EC === 0) {
                setPieChartData(res.DT);
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

    const fetchProcessByType = async (period = "day") => {
        try {
            setLoading(true);
            const resDataBytime = await statisticService.getProcessByType(period);
            if (resDataBytime && resDataBytime.EC === 0) {
                setBarChartData(resDataBytime.DT);
                setLineChartData(resDataBytime.DT);
            } else {
                toast.error(resDataBytime?.EM || "Không thể tải thống kê lỗi.");
            }
        } catch (err) {
            console.error("Lỗi khi tải thống kê:", err);
            toast.error("Lỗi kết nối khi tải thống kê lỗi.");
        } finally {
            setLoading(false);
        }
    };

    const handleGetProcessData= async (process_id) => {
        try {
            const res = await statisticService.getProcessData(process_id);
            console.log("Dữ liệu staff lỗi:", res.DT);
            setTableData(res.DT)
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        fetchProcessesWithStaff();
        fetchProcessByType(period);
        fetchProcessStatisticsAllTime();
    }, [period]);

    const handleExport = async() => {
        try {
            setLoading(true);
            const res = await statisticService.handleExportProcessData();
            if (res && res.EC === 0) {
                ExportProcessDataToExcel(res.DT);
            } else {
                toast.error(res?.EM || "Không thể tải thống kê lỗi.");
            }
        } catch (err) {
            console.error("Lỗi khi tải thống kê:", err);
            toast.error("Lỗi kết nối khi tải thống kê lỗi.");
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <IfLoading />
    if (error) return <IfError />

    return (
        <div className="container">
            <div className="d-flex">
                <StatisticsSidebar />
                <div className="flex-grow-1 ps-3">
                    <div className="card shadow-sm p-3 mb-3 d-flex flex-row justify-content-between align-items-center" style={{ border: "1px solid #02437D"}}>
                        <Typography variant="h4" display="flex" alignItems="center" gap={2} sx={{ color: "#02437D" }}>
                            <StackedLineChart fontSize="large" />
                            THỐNG KÊ THAO TÁC
                        </Typography>
                        <div>
                            <ExportButton className="me-2" onClick={handleExport}
                            >
                                Xuất báo cáo
                            </ExportButton>
                            <BackButton />
                        </div>
                    </div>

                    {/* Error Statistics Table */}
                    <div className="card mb-3 border-0">
                        <div className="mb-3 d-flex justify-content-between">
                            <Button variant="outlined" color="primary" size="large">
                                Tổng số thao tác: {processCount}
                            </Button>
                            <ButtonGroup variant="outlined" size="normal">
                                <Button
                                    variant={period === "day" ? "contained" : "outlined"}
                                    onClick={() => setPeriod("day")}
                                >
                                    Ngày
                                </Button>
                                <Button
                                    variant={period === "week" ? "contained" : "outlined"}
                                    onClick={() => setPeriod("week")}
                                >
                                    Tuần
                                </Button>
                                <Button
                                    variant={period === "month" ? "contained" : "outlined"}
                                    onClick={() => setPeriod("month")}
                                >
                                    Tháng
                                </Button>
                            </ButtonGroup>
                        </div>
                        <div className="row g-1">
                            {/* Cột trái */}
                            <div className="col-5 d-flex flex-column">
                                <div className="card shadow-sm mb-2 flex-fill" style={{ backgroundColor: "#fff", color: "#02437D", borderColor: "#02437D" }}>
                                    <div className="card-body d-flex flex-row justify-content-center align-items-center">
                                        {Array.isArray(pieChartData) && pieChartData.length > 0 ? (
                                            <MuiPieChart items={pieChartData} onSelect={handleGetProcessData} />
                                        ) : (
                                            <p className="card-text">Không có dữ liệu hiển thị.</p>
                                        )}
                                    </div>
                                </div>
                                <div className="card shadow-sm flex-fill" style={{ backgroundColor: "#fff", color: "#02437D", borderColor: "#02437D" }}>
                                    <div className="card-body d-flex flex-row justify-content-center align-items-center">
                                        {Array.isArray(barChartData) && barChartData.length > 0 ? (
                                            <MuiBarChart items={barChartData} />
                                        ) : (
                                            <p className="card-text">Không có dữ liệu hiển thị.</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Cột phải */}
                            <div className="col">
                                <div className="card shadow-sm h-100" style={{ backgroundColor: "#fff", color: "#02437D", borderColor: "#02437D" }}>
                                    <div className="card-body d-flex flex-row justify-content-center align-items-center">
                                        {Array.isArray(lineChartData) && lineChartData.length > 0 ? (
                                            <MuiLineChart items={lineChartData} />
                                        ) : (
                                            <p className="card-text">Không có dữ liệu hiển thị.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card shadow-sm" style={{ backgroundColor: "#fff", color: "#02437D", borderColor: "#02437D" }}>
                        <div className="card-body text-center">
                            {Array.isArray(tableData) && tableData.length > 0 ? (
                                <ProcessTable data={tableData} />
                            ) : (
                                <p className="card-text">Không có dữ liệu hiển thị.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProcessStatistics;