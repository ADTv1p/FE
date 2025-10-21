// src/components/accessories/AccessoryManagement.jsx
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import AddAccessory from "./AddAccessory";
import UpdateAccessory from "./UpdateAccessory";
import accessoryService from "../../../services/accessoryService";
import { AddButton, EditButton } from '../../common/ActionButtons';
import Pagination from "../../common/Pagination"; 
import { Typography } from "@mui/material";
import { Build } from "@mui/icons-material";
import IfLoading from "../../common/IfLoading";
import IfError from "../../common/IfError";

const AccessoryManagement = () => {
    const [accessories, setAccessories] = useState([]);
    const [showForm, setShowForm] = useState(null);
    const [selectedAccessory, setSelectedAccessory] = useState(null);
	const [page, setPage] = useState(1);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const itemsPerPage = 10;

	const paginatedAccessories = accessories.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((item, index) => ({
		...item,
		stt: (page - 1) * itemsPerPage + index + 1 // Tính STT
	}));

	const totalPages = Math.ceil(accessories.length / itemsPerPage);

    const fetchAccessories = async () => {
        setLoading(true);
        try {
            const res = await accessoryService.getAllAccessories();
            if (res?.EC === 0) {
                setAccessories(res.DT);
            } else {
                toast.warn("Không có dữ liệu phụ kiện.");
                setAccessories([]);
            }
        } catch (err) {
            console.error("Lỗi tải phụ kiện:", err);
            toast.error(err?.response?.data?.EM || "Lỗi khi tải danh sách phụ kiện.");
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAccessories();
    }, []);

    const handlePageChange = (newPage) => {
		setPage(newPage);
	};

    const handleAddAccessory = async (data) => {
        try {
            const res = await accessoryService.createAccessory(data);
            if (res?.EC === 0) {
                fetchAccessories();
                setShowForm(null);
                toast.success("Thêm phụ kiện thành công!");
            } else {
                toast.error(res?.EM || "Lỗi khi thêm phụ kiện.");
            }
        } catch (error) {
            console.error("Lỗi khi thêm phụ kiện:", error);
            toast.error(error?.response?.data?.EM || "Không thể thêm phụ kiện.");
        }
    };

    const handleUpdateAccessory = async (data) => {
        try {
            const res = await accessoryService.updateAccessory(data);
            if (res?.EC === 0) {
                fetchAccessories();
                setShowForm(null);
                toast.success("Cập nhật phụ kiện thành công!");
            } else {
                toast.error(res?.EM || "Lỗi khi cập nhật phụ kiện.");
            }
        } catch (err) {
            console.error("Lỗi cập nhật:", err);
            toast.error(err?.response?.data?.EM || "Không thể cập nhật phụ kiện.");
        }
    };
    
    if (loading) return <IfLoading />;
    if (error) return <IfError />;

    return (
        <div className="container">
            <div className="card shadow-sm p-3 mb-3 d-flex flex-row justify-content-between align-items-center" style={{ border: "1px solid #02437D"}}>
                <Typography variant="h4" display="flex" alignItems="center" gap={2} sx={{ color: "#02437D" }}>
                    <Build fontSize="large" />
                    QUẢN LÝ PHỤ KIỆN
                </Typography>
                <div>
                    <AddButton className="me-2" onClick={() => setShowForm("add")}>
                        Thêm phụ kiện
                    </AddButton>
                </div>
            </div>

            <div className="row g-3">
                <motion.div
                    style={{ width: "100%" }} // fallback
                    animate={{ width: showForm ? "75%" : "100%" }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    <div className="card shadow-sm h-100" style={{ backgroundColor: "#fff", color: "#02437D", borderColor: "#02437D" }}>
						<div className="card-body">
							<h5 className="card-title fw-bold mb-3">Bảng danh sách phụ kiện</h5>
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead className="text-center">
                                        <tr>
                                            <th>#</th>
                                            <th>Tên phụ kiện</th>
                                            <th>Loại</th>
                                            <th>Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginatedAccessories.length > 0 ? (
                                            paginatedAccessories.map((item, index) => (
                                                <tr key={index}>
                                                    <td className="text-center">{item.stt}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.type}</td>
                                                    <td className="text-center">
                                                        <EditButton
                                                            className="me-2"
                                                            size="small"
                                                            onClick={() => {
                                                                setSelectedAccessory(item);
                                                                setShowForm("update");
                                                            }}
                                                        />
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={3} className="text-center">
                                                    Chưa có phụ kiện nào
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>

                                <Pagination 
                                    page={page}
                                    count={totalPages}
                                    onChange={handlePageChange}
                                />
                            </div>
						</div>
					</div>
                </motion.div>

                {showForm && (
                    <div className="col-3">
                        {showForm === "add" && (
                            <AddAccessory 
                                onSubmit={handleAddAccessory} 
                                onClose={() => setShowForm(null)} 
                            />
                        )}
                        {showForm === "update" && selectedAccessory && (
                            <UpdateAccessory 
                                accessory={selectedAccessory} 
                                onSubmit={handleUpdateAccessory} 
                                onClose={() => setShowForm(null)} 
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AccessoryManagement;