import { motion } from "framer-motion";
import { CloseButton, EditButton, DetailButton  } from "../../common/ActionButtons";
import { useNavigate } from "react-router-dom";

const ViewPosition = ({ position, onClose }) => {
    const navigate = useNavigate();
    if (!position) {
        return <div className="card p-3 text-center text-muted">Không tìm thấy thông tin vị trí.</div>;
    }
    // --- Định nghĩa hàm InfoLabel (Nếu chưa có) ---
    const InfoLabel = ({ label, value }) => (
        <div className="d-flex align-items-center mb-1" style={{ color: "#F1C143" }}>
            <span className="d-inline-block fw-semibold w-50 rounded">{label}:</span>
            <span>{value}</span>
        </div>
    );

    // ---------------------------------------------
    
    // Hàm tiện ích để định dạng ngày tháng
    const formatDate = (dateString) => {
        if (!dateString) return "Không có";
        const options = { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit' 
        };
        return new Date(dateString).toLocaleDateString('vi-VN', options);
    };

    return (
        <motion.div
			initial={{ opacity: 0, x: -50 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.3, delay: 0.3, ease: "easeInOut" }}
			className="card shadow-sm"
			style={{ backgroundColor: "#02437D", color: "#fff", borderColor: "transparent" }}
		>
            <div className="card shadow-sm" style={{ backgroundColor: "#02437D", color: "#fff", borderColor: "transparent" }}>
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="card-title fw-bold">Thông tin Vị trí</h5>
                        <CloseButton size="small" onClick={onClose} />
                    </div>
                    <div className="py-3">
                        <h5>Thông tin</h5>
                        <InfoLabel label="Mã vị trí" value={position.code} />
                        <InfoLabel label="Vai trò" value={position.role} />
                        <InfoLabel label="Công cụ" value={position.tools} />
                        <div className="text-end">
                            <DetailButton onClick={() => navigate(`/quan-ly-nhan-su?position_code=${position.code}`)}>Danh sách nhân sự</ DetailButton>
                        </div>
                        
                        <div className="border-top pt-3">
                            <h5>Thao tác liên quan</h5>
                            <InfoLabel label="Tên Thao tác" value={position.process?.name || "Không xác định"} />
                            <InfoLabel label="Mô tả" value={position.process?.description || "Chưa có mô tả"} />
                            
                            <div className="py-2 text-end small">
                                <div className="mb-1">Ngày tạo: {formatDate(position.process?.createdAt)}</div>
                                <div className="mb-1">Cập nhật cuối: {formatDate(position.process?.updatedAt)}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ViewPosition;
