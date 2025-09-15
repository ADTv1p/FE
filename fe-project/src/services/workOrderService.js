import axios from '../axiosConfig';

// Lấy danh sách tất cả đơn công việc
const getAllWorkOrdersApiService = async () => {
	try {
		const response = await axios.get("/work-orders/list");
		return response;
	} catch (error) {
		console.error("Lỗi khi gọi API /api/work-orders/list:", error);
		throw error;
	}
};

// Lấy chi tiết đơn công việc theo ID
const getWorkOrderByIdApiService = async (id) => {
	try {
		const response = await axios.get(`/work-orders/${id}`);
		return response;
	} catch (error) {
		console.error("Lỗi khi gọi API /api/work-orders/:id:", error);
		throw error;
	}
};

// Tạo đơn công việc mới
const createWorkOrderApiService = async (data) => {
	try {
		const response = await axios.post("/work-orders/create", data);
		return response;
	} catch (error) {
		console.error("Lỗi khi gọi API POST /api/work-orders/create:", error);
		throw error;
	}
};

// Cập nhật đơn công việc
const updateWorkOrderApiService = async (data) => {
	try {
		const response = await axios.put("/work-orders/update", data);
		return response;
	} catch (error) {
		console.error("Lỗi khi gọi API PUT /api/work-orders/update:", error);
		throw error;
	}
};

export default {
	getAllWorkOrdersApiService,
	getWorkOrderByIdApiService,
	createWorkOrderApiService,
	updateWorkOrderApiService,
};