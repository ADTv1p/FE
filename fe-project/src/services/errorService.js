import axios from '../axiosConfig';

// Lấy danh sách tất cả lỗi
const getAllErrorsApiService = async () => {
	try {
		const response = await axios.get("/errors/list");
		return response;
	} catch (error) {
		console.error("Lỗi khi gọi API /api/errors/list:", error);
		throw error;
	}
};

// Lấy chi tiết lỗi theo ID
const getErrorByIdApiService = async (id) => {
	try {
		const response = await axios.get(`/errors/${id}`);
		return response;
	} catch (error) {
		console.error("Lỗi khi gọi API /api/errors/:id:", error);
		throw error;
	}
};

// Tạo lỗi mới
const createErrorApiService = async (data) => {
	try {
		const response = await axios.post("/errors/create", data);
		return response;
	} catch (error) {
		console.error("Lỗi khi gọi API POST /api/errors/create:", error);
		throw error;
	}
};

// Cập nhật lỗi
const updateErrorApiService = async (data) => {
	try {
		const response = await axios.put("/errors/update", data);
		return response;
	} catch (error) {
		console.error("Lỗi khi gọi API PUT /api/errors/update:", error);
		throw error;
	}
};

export default {
	getAllErrorsApiService,
	getErrorByIdApiService,
	createErrorApiService,
	updateErrorApiService,
};
