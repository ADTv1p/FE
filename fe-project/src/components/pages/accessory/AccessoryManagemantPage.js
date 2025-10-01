// src/components/accessories/AccessoryManagement.jsx
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import AddAccessory from "./AddAccessory";
import UpdateAccessory from "./UpdateAccessory";
import accessoryService from "../../../services/accessoryService";
import { AddButton, EditButton, DeleteButton, BackButton } from '../../common/ActionButtons';
import { Typography } from "@mui/material";
import { Build } from "@mui/icons-material";
import IfLoading from "../../common/IfLoading";
import IfError from "../../common/IfError";

const AccessoryManagement = () => {
    const [accessories, setAccessories] = useState([]);
    const [showForm, setShowForm] = useState(null);
    const [selectedAccessory, setSelectedAccessory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
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
        fetchAccessories();
    }, []);

    const handleAddAccessory = async (data) => {
        try {
            const res = await accessoryService.createAccessory(data);
            if (res?.EC === 0) {
                setAccessories((prev) => [...prev, res.DT]);
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
                setAccessories((prev) =>
                    prev.map((acc) => (acc.accessory_id === data.accessory_id ? res.DT : acc))
                );
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
    
    // Thêm hàm xóa để đảm bảo các nút hành động đều có logic
    const handleDeleteAccessory = (accessoryId) => {
       
        toast.info("Chức năng xóa đang được phát triển.");
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
                    <BackButton onClick={() => window.history.back()}>
                        Quay lại
                    </BackButton>
                </div>
            </div>

            <div className="row g-3">
                <div className={showForm ? "col-9" : "col-12"}>
                    <div className="card shadow-sm h-100" style={{ backgroundColor: "#fff", color: "#02437D", borderColor: "#02437D" }}>
						<div className="card-body">
							<h5 className="card-title fw-bold mb-3">Bảng danh sách</h5>
                            <div className="table-responsive">
                                <table className="table table-striped table-bordered">
                                    <thead className="text-center">
                                        <tr>
                                            <th>Tên phụ kiện</th>
                                            <th>Loại</th>
                                            <th>Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {accessories.length > 0 ? (
                                            accessories.map((item, index) => (
                                                <tr key={index}>
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
                                                        <DeleteButton 
                                                            size="small" 
                                                            onClick={() => handleDeleteAccessory(item.accessory_id)} 
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
                            </div>
						</div>
					</div>
                </div>

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