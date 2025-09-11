import axios from '../axiosConfig';

// Hàm lấy dữ liệu hỗ trợ cho các chức năng thêm mới đối tượng
const getSupportPositions = async () => {
    try {
        const response = await axios.get("/positions/support");
        return response;
    } catch (error) {
        console.error("Lỗi khi gọi API /api/positions/support:", error);
        throw error;
    }
};

// Hàm lấy danh sách positions để hiển thị và quản lý
const getAllPositions = async () => {
    try {
        const response = await axios.get("/positions");
        return response;
    } catch (error) {
        console.error("Lỗi khi gọi API /api/positions:", error);
        throw error;
    }
};

// Hàm thêm vị trí mới
const createPosition = async (data) => {
	try {
		const response = await axios.post("/positions", data);
		return response;
	} catch (error) {
		console.error("Lỗi khi gọi API POST /api/positions:", error);
		throw error;
	}
};

export default { getSupportPositions, getAllPositions, createPosition };