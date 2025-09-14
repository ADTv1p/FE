import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import positionService from "../../../services/positionService";
import ViewPosition from "./ViewPosition";
import PositionTable from "./PositionTable";

const PositionManagement = () => {
	const [positions, setPositions] = useState([]);
	const [selectedPosition, setSelectedPosition] = useState(null);

	useEffect(() => {
		const fetchPositions = async () => {
			try {
				const res = await positionService.getAllPositions();
				if (res?.EC === 0) setPositions(res.DT);
			} catch (err) {
				console.error("Lỗi tải vị trí:", err);
				toast.error("Lỗi khi tải danh sách vị trí.");
			}
		};
		fetchPositions();
	}, []);

	return (
		<div className="shadow-lg border-0 rounded-3 bg-white p-3">
			<div className="d-flex justify-content-between align-items-center mb-3">
				<p className="lead fs-2 mb-0">Quản lý vị trí</p>
			</div>

			<div className="row">
				<div className={selectedPosition ? "col-md-6" : "col-12"}>
					<PositionTable positions={positions} onView={setSelectedPosition} />
				</div>

				{selectedPosition && (
					<div className="col-md-6">
						<ViewPosition
							position={selectedPosition}
							onClose={() => setSelectedPosition(null)}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default PositionManagement;
