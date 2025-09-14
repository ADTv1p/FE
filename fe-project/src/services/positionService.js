import axios from '../axiosConfig';

// Hàm lấy dữ liệu hỗ trợ cho các chức năng thêm mới đối tượng
const getSupportPositions = async () => {
    try {
        const response = await axios.get("/positions/support/list");
        return response;
    } catch (error) {
        console.error("Lỗi khi gọi API /api/positions/support:", error);
        throw error;
    }
};

// Hàm lấy danh sách positions để hiển thị và quản lý
const getAllPositions = async () => {
    try {
        const response = await axios.get("/positions/list");
        return response;
    } catch (error) {
        console.error("Lỗi khi gọi API /api/positions:", error);
        throw error;
    }
};

// Hàm thêm vị trí mới
const createPosition = async (data) => {
	try {
        console.log("Dữ liệu gửi đến API:", data);
		const response = await axios.post("/positions/create", data);
		return response;
	} catch (error) {
		console.error("Lỗi khi gọi API POST /api/positions:", error);
		throw error;
	}
};

export default { getSupportPositions, getAllPositions, createPosition };