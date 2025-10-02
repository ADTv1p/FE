// src/pages/staff/StaffDetailPage.js
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Typography } from '@mui/material';
import { Person } from '@mui/icons-material'; // Import các icon cần thiết
import { Avatar } from "@mui/material"
import { BackButton, EditButton } from '../../common/ActionButtons';
import EditStaffModal  from './EditStaffModal';
import IfLoading from '../../common/IfLoading';
import IfError from '../../common/IfError';

import staffService from '../../../services/staffService'; 
import positionService from '../../../services/positionService'

const StaffDetailPage = () => {
    const { staff_id } = useParams();
    
    const [staff, setStaff] = useState(null);
    const [positions, setPositions] = useState([])
    const [showEditStaffModal, setShowEditStaffModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const formatDate = dateStr => {
        if (!dateStr) return "";
        const d = new Date(dateStr);
        return d.toLocaleDateString("vi-VN"); // dd/mm/yyyy
    };
    
    const fetchStaff = async () => {
        setLoading(true);
        try {
            const res = await staffService.getStaffDetail(staff_id);
            if (res?.EC === 0 && res.DT) { setStaff(res.DT); setError(null); }
            else { setError(res?.EM || "Không tìm thấy thông tin nhân sự này."); toast.error("Không tìm thấy thông tin nhân sự."); }
        } catch (err) {
            console.error("Lỗi tải chi tiết nhân sự:", err);
            setError("Lỗi kết nối hoặc dữ liệu không hợp lệ.");
            toast.error("Lỗi khi tải dữ liệu chi tiết.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStaff();
    }, [staff_id]);
    
    const position = staff?.position || null;
    const process = staff?.position?.process || null;

    if (loading) return <IfLoading/>;
    if (error || !staff) return <IfError/>;

    return (
        <div className="container">
            <div className="card shadow-sm p-3 mb-3 d-flex flex-row justify-content-between align-items-center" style={{ border: "1px solid #02437D"}}>
                <Typography variant="h4" display="flex" alignItems="center" gap={2} sx={{ color: "#02437D" }}>
                    <Person fontSize="large" />
                    CHI TIẾT NHÂN SỰ
                </Typography>
                <div>
					<EditButton className="me-2" onClick={() => setShowEditStaffModal(true)}>
						Cập nhật thông tin
					</EditButton>
	                <BackButton onClick={() => window.history.back()}>
    	                Quay lại
        	        </BackButton>
				</div>
            </div>
            <div className="row row-cols-3 g-4">
                <div className="col">
                    <div className="card shadow-sm border-0 h-100">
                        <div
                            className="card-header fw-bold"
                            style={{ backgroundColor: "#02437D", color: "#fff" }}
                        >
                            Thông tin Nhân sự
                        </div>
                        <div className="card-body" style={{ color: "#02437D" }}>
                            <div className="d-flex align-items-center mb-3">
                                <Avatar 
                                    alt={staff.full_name} src={staff.avatar ? `http://localhost:3001/${staff.avatar}` : ""}
                                    sx={{ width: 90, height: 90, marginRight: 2 }}
                                />
                                <div>
                                    <h5 className="mb-0">{staff.full_name}</h5>
                                    <small className="d-block">{staff.email}</small>
                                    <small className="d-block">{staff.phone}</small>
                                    <small className="d-block">{staff.department}</small>
                                </div>
                            </div>

                            <p className="card-text mb-1">
                                <strong>Ngày sinh:</strong> {formatDate(staff.date_of_birth)}
                            </p>
                            <p className="card-text mb-1">
                                <strong>Ngày bắt đầu:</strong> {formatDate(staff.start_date)}
                            </p>
                            <p className="card-text mb-1">
                                <strong>Trạng thái:</strong> {staff.status}
                            </p>
                        </div>
                        <div className="card-footer border-0 bg-white">
                            <p className="card-text text-muted text-end" style={{ fontSize: "0.8rem" }}>
                                Ngày tạo: {formatDate(staff.createdAt)} | Cập nhật: {formatDate(staff.updatedAt)}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col">
                    <div className="card shadow-sm h-100" style={{ borderColor: "transparent" }}>
						<div className="card-header fw-bold" style={{ backgroundColor: "#F1C143", color: "#02437D" }}>
							Thông tin Vị trí
						</div>
						<div className="card-body" style={{ color: "#02437D" }}>
							<h5 className="mb-2">{position.role}</h5>
                            <p className="card-text mb-1">
                                <strong>Mã code:</strong> {position.code}
                            </p>
                            <p className="card-text mb-1">
                                <strong>Công cụ:</strong> {position.tools}
                            </p>
                            <p className="card-text mb-1">
                                <strong>Tên thao tác:</strong> {position.process?.name}
                            </p>
                            <p className="card-text mb-2">
                                <strong>Mô tả:</strong> {position.process?.description}
                            </p>
						</div>
                        <div className="card-footer border-0 bg-white">
                            <p className="card-text text-muted text-end" style={{ fontSize: "0.8rem" }}>
                                Ngày tạo: {formatDate(position.process?.createdAt)} | Cập nhật:{" "}
                                {formatDate(position.process?.updatedAt)}
                            </p>
                        </div>
					</div>
                </div>

                <div className="col">
                    <div className="card h-100 shadow-sm" style={{ backgroundColor: "#fff", color: "#02437D", borderColor: "#02437D" }}>
                        <div className="card-body">
                            <p className="card-text m-0 fw-bold">Bước Thao Tác</p>
                            <ul className="">
                                {process?.steps?.map(step => (
                                    <li key={step.process_step_id} className="mb-1">
                                        <small className="d-block">{step.step_name}</small>
                                        <small className="d-block">{step.instruction}</small>
                                    </li>
                                ))}
                            </ul>

                        </div>
                    </div>
                </div>
            </div>

            <EditStaffModal
                show={showEditStaffModal}
                onClose={() => {
                    setShowEditStaffModal(false);
                    fetchStaff(); 
                }}
                staff={staff}
            />
        </div>
    );
};

export default StaffDetailPage;