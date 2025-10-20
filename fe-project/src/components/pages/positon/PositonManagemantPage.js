import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Typography } from "@mui/material";
import { BusinessCenter } from "@mui/icons-material";
import positionService from "../../../services/positionService";
import ViewPosition from "./ViewPosition";
import PositionTable from "./PositionTable";
import Pagination from "../../common/Pagination"; 
import { AddButton, BackButton } from "../../common/ActionButtons";
import ExportButton from "../../common/ExportButton";
import UpdatePositionModal from "./UpdatePositionModal";

const PositionManagement = () => {
	const navigate = useNavigate();
	const [positions, setPositions] = useState([]);
	const [selectedPosition, setSelectedPosition] = useState(null);
	const [view, setView] = useState(null);
	const [page, setPage] = useState(1);
	const itemsPerPage = 10;

	const paginatedPositions = positions.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((item, index) => ({
		...item,
		stt: (page - 1) * itemsPerPage + index + 1 // Tính STT
	}));
	const totalPages = Math.ceil(positions.length / itemsPerPage);

	useEffect(() => {
		const fetchPositions = async () => {
			try {
				const res = await positionService.getAllPositions();
				if (res?.EC === 0) setPositions(res.DT);
			} catch (err) {
				toast.error("Lỗi khi tải danh sách vị trí.");
			}
		};
		fetchPositions();
	}, []);

	const handlePageChange = (newPage) => {
		setPage(newPage);
	};

	return (
		<div className="container">
			<div className="card shadow-sm p-3 mb-3 d-flex flex-row justify-content-between align-items-center" style={{ border: "1px solid #02437D"}}>
				<Typography variant="h4" display="flex" alignItems="center" gap={2} sx={{ color: "#02437D" }}>
					<BusinessCenter fontSize="large" />
					QUẢN LÝ VỊ TRÍ
				</Typography>
				<div>
					<AddButton className="me-2" onClick={() => navigate("/them-vi-tri")}>
						Thêm Vị trí
					</AddButton>
						{/* <ExportButton className="me-2"> 
							Xuất Danh Sách
						</ExportButton> */}
					<BackButton onClick={() => window.history.back()}>
						Quay lại
					</BackButton>
				</div>
			</div>

			<div className="row g-3">
				<motion.div
					style={{ width: "100%" }}
					animate={{ width: view ? "66.6666666%" : "100%" }}
					transition={{ duration: 0.3 }}
				>
					<div className="card shadow-sm h-100" style={{ backgroundColor: "#fff", color: "#02437D", borderColor: "#02437D" }}>
						<div className="card-body">
							<h5 className="card-title fw-bold mb-3">Bảng danh sách</h5>
							<PositionTable
								positions={paginatedPositions}
								onView={(position) => {
									setSelectedPosition(position);
									setView('view');
								}}
								onUpdate={(position) => {
									setSelectedPosition(position);
									setView('update');
								}}
							/>
							<Pagination 
								page={page}
								count={totalPages}
								onChange={handlePageChange}
							/>
						</div>
					</div>
				</motion.div>

			{view === 'view' && (
				<div className="col-4">
					<ViewPosition
						position={selectedPosition}
						onClose={() => setView(null)}
					/>
				</div>
			)}
			{view === 'update' && (
				<div className="col-4">
					<UpdatePositionModal
						position={selectedPosition}
						onClose={() => setView(null)}
					/>
				</div>
			)}
			</div>
		</div>
	);
};

export default PositionManagement;