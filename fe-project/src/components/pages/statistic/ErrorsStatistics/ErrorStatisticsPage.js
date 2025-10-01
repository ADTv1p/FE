import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import StatisticsSidebar from "../../../common/StatisticsSidebar";
import statisticService from "../../../../services/statisticService";
import ExportWorkRecordsStatistic from "../../../utils/export/ExportWorkRecordsStatistic";
import ExportButton from "../../../common/ExportButton";
import { BackButton } from "../../../common/ActionButtons";
import { Button, ButtonGroup, Typography } from "@mui/material";
import { StackedLineChart, ArrowDropDown } from '@mui/icons-material';
import MuiPieChart from "./PieChart";
import IfLoading from "../../../common/IfLoading";
import IfError from "../../../common/IfError";
import MuiLineChart from "./LineChart";
import ErrorTable from "./ErrorTable";
import MuiBarChart from "./BarChart";

const ErrorStatistics = () => {
    const [errorStats, setErrorStats] = useState(null);
    const [period, setPeriod] = useState("day");
    const [pieChartData, setPieChartData] = useState([]);
    const [barChartData, setBarChartData] = useState([]);
    const [lineChartData, setLineChartData] = useState([]);
    const [errorsData, setErrorsData] = useState(false);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchErrorStatistics = async () => {
        try {
            setLoading(true);
            const res = await statisticService.getErrorCountStatistics();
            if (res && res.EC === 0) {
                setErrorStats(res.DT);
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

    const fetchErrorByPosition = async () => {
        try {
            setLoading(true);
            const res = await statisticService.getErrorByPosition();
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

    const fetchErrorByTime = async (period = "day") => {
        try {
            setLoading(true);
            const resDataBytime = await statisticService.getErrorByTime(period);
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

    const handleGetStaffListByPositionId = async (positionId) => {
        try {
            const res = await statisticService.getErrorStaffByPosition(positionId);
            setErrorsData(res.DT)
        } catch (e) {
            console.error(e);
        }
    };

    const handleExportErrorStatistic = async () => {
        try {
            const res = await statisticService.handleExportErrorData();
            if (res && res.EC === 0) {
                ExportWorkRecordsStatistic(res.DT);
            } else {
                toast.error(res?.EM || "Không thể xuất thống kê lỗi.");
            }
        } catch (err) {
            console.error("Lỗi khi xuất thống kê:", err);
            toast.error("Lỗi kết nối khi xuất thống kê lỗi.");
        } finally {
            toast.success("Xuất báo cáo thống kê lỗi đã hoàn thành");
        }
    };

    useEffect(() => {
        fetchErrorByPosition();
        fetchErrorByTime(period);
        fetchErrorStatistics();
    }, [period]);

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
                            THỐNG KÊ LỖI
                        </Typography>
                        <div>
                            <ExportButton
                                className="me-2"
                                endIcon={<ArrowDropDown />}
                                onClick={() => {handleExportErrorStatistic()}}
                            >
                                Xuất báo cáo
                            </ExportButton>
                            <BackButton onClick={() => window.history.back()}>
                                Quay lại
                            </BackButton>
                        </div>
                    </div>

                    {/* Error Statistics Table */}
                    <div className="card mb-3 border-0">
                        <div className="mb-3 d-flex justify-content-between">
                            <Button variant="outlined" color="primary" size="large">
                                Tổng số lỗi: {errorStats}
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
                                        <MuiPieChart items={pieChartData} onSelect={handleGetStaffListByPositionId} />
                                    </div>
                                </div>
                                <div className="card shadow-sm flex-fill" style={{ backgroundColor: "#fff", color: "#02437D", borderColor: "#02437D" }}>
                                    <div className="card-body d-flex flex-row justify-content-center align-items-center">
                                        <MuiBarChart items={barChartData} />
                                    </div>
                                </div>
                            </div>

                            {/* Cột phải */}
                            <div className="col">
                                <div className="card shadow-sm h-100" style={{ backgroundColor: "#fff", color: "#02437D", borderColor: "#02437D" }}>
                                    <div className="card-body d-flex flex-row justify-content-center align-items-center">
                                        <MuiLineChart items={lineChartData} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card shadow-sm" style={{ backgroundColor: "#fff", color: "#02437D", borderColor: "#02437D" }}>
                        <div className="card-body">
                            <ErrorTable errors={errorsData} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ErrorStatistics;