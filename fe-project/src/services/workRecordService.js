import axios from '../axiosConfig';

// Lấy danh sách tất cả bản ghi công việc
const getAllWorkRecords = async () => {
	try {
		const response = await axios.get("/work-records/list");
		return response;
	} catch (error) {
		console.error("Lỗi khi gọi API /api/work-records/list:", error);
		throw error;
	}
};

// Lấy chi tiết bản ghi công việc theo ID
const getWorkRecordByIdApiService = async (work_record_id) => {
	try {
		const response = await axios.get(`/work-records/${work_record_id}`);
		return response;
	} catch (error) {
		console.error("Lỗi khi gọi API /api/work-records/:id:", error);
		throw error;
	}
};

// Tạo bản ghi công việc mới
const createWorkRecord = async (data) => {
	try {
		const response = await axios.post("/work-records/create", data);
		return response;
	} catch (error) {
		console.error("Lỗi khi gọi API POST /api/work-records/create:", error);
		throw error;
	}
};

// Cập nhật bản ghi công việc
const updateWorkRecordApiService = async (data) => {
	try {
		const response = await axios.put("/work-records/update", data);
		return response;
	} catch (error) {
		console.error("Lỗi khi gọi API PUT /api/work-records/update:", error);
		throw error;
	}
};

export default {
	getAllWorkRecords,
	getWorkRecordByIdApiService,
	createWorkRecord,
	updateWorkRecordApiService,
};