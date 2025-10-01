import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import StaffTable from "./StaffTable";
import StaffFilter from "./StaffFilter";
import staffService from "../../../services/staffService";
import { toast } from "react-toastify";
import { Typography } from "@mui/material";
import { People } from '@mui/icons-material';
import Pagination from "../../common/Pagination";
import IfLoading from "../../common/IfLoading";
import IfError from "../../common/IfError";

const StaffManagement = () => {
	const location = useLocation();
	const params = new URLSearchParams(location.search);
	const position_code = params.get("position_code");
	const process_name = params.get("process_name");

	const [allStaffs, setAllStaffs] = useState([]);
	const [staffs, setStaffs] = useState([]);
	const [search, setSearch] = useState({ 
		name: "", 
		position_code: position_code || "", 
		status: "", 
		process_name: process_name || ""
	});

	const [page, setPage] = useState(1);
	const itemsPerPage = 10;

	const paginatedStaffs = staffs.slice(
		(page - 1) * itemsPerPage,
		page * itemsPerPage
	).map((item, index) => ({
		...item,
		stt: (page - 1) * itemsPerPage + index + 1 // Thêm STT
	}));

	const totalPages = Math.ceil(staffs.length / itemsPerPage);

	const handlePageChange = (newPage) => setPage(newPage);

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		const fetchStaffs = async () => {
			setLoading(true);
			try {
				const res = await staffService.getAllStaffs();
				if (res?.EC === 0) {
					setAllStaffs(res.DT);
					setStaffs(res.DT);
				} else {
					toast.warn("Không có dữ liệu nhân sự!");
					setStaffs([]);
					setAllStaffs([]);
				}
			} catch (err) {
				console.error("Lỗi tải nhân sự:", err);
				toast.error("Lỗi khi tải danh sách nhân sự.");
				setError(true);
			} finally {
				setLoading(false);
			}
		};
		fetchStaffs();
	}, []);
	
	useEffect(() => {
		if ((position_code || process_name) && allStaffs.length > 0) {
			setSearch(prev => ({ ...prev, position_code, process_name }));
			const filtered = allStaffs.filter(staff =>
				(!position_code || staff.position?.code?.toLowerCase().includes(position_code.toLowerCase())) &&
				(!process_name || staff.position?.process?.name?.toLowerCase().includes(process_name.toLowerCase()))
			);
			setStaffs(filtered);
		}
	}, [position_code, process_name, allStaffs]);

	// handleSearchChange
	const handleSearchChange = (field, value) => {
		setSearch(prev => {
			const newSearch = { ...prev, [field]: value };
			const filteredStaffs = allStaffs.filter(staff => {
				const matchName = newSearch.name
					? staff.full_name.toLowerCase().includes(newSearch.name.toLowerCase())
					: true;
				const matchPos = newSearch.position_code
					? staff.position?.code?.toLowerCase().includes(newSearch.position_code.toLowerCase())
					: true;
				const matchStatus = newSearch.status
					? (newSearch.status === "Đang làm" ? staff.status === "active" : staff.status !== "active")
					: true;
				const matchProcess = newSearch.process_name
					? staff.position?.process?.name?.toLowerCase().includes(newSearch.process_name.toLowerCase())
					: true;
				return matchName && matchPos && matchStatus && matchProcess;
			});
			setStaffs(filteredStaffs);
			return newSearch;
		});
	};

	if (loading) return <IfLoading />;
	if (error) return <IfError />;

	return (
		<div className="container">
			<div className="card shadow-sm p-3 mb-3 d-flex flex-row justify-content-between align-items-center" style={{ border: "1px solid #02437D"}}>
				<Typography variant="h4" display="flex" alignItems="center" gap={2} sx={{ color: "#02437D" }}>
					<People fontSize="large" />
					NHÂN SỰ
				</Typography>
			</div>
			<div className="card p-3 mb-3" style={{ border: "1px solid #02437D"}}>
				<StaffFilter search={search} onChange={handleSearchChange} />
				<StaffTable staffs={paginatedStaffs} />
				<Pagination 
					page={page}
					count={totalPages}
					onChange={handlePageChange}
				/>
			</div>
		</div>
	);
};

export default StaffManagement;