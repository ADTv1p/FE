import axios from '../axiosConfig';

// Lấy danh sách phụ kiện hỗ trợ
const getSupportAccessories = async () => {
    try {
        const response = await axios.get("/accessories/support/list");
        return response;
    } catch (error) {
        console.error("Lỗi khi gọi API /api/accessories/support/list:", error);
        throw error;
    }
};

// Lấy danh sách tất cả phụ kiện
const getAllAccessories = async () => {
    try {
        const response = await axios.get("/accessories/list");
        return response;
    } catch (error) {
        console.error("Lỗi khi gọi API /api/accessories/list:", error);
        throw error;
    }
};

// Thêm phụ kiện mới
const createAccessory = async (data) => {
    try {
        const response = await axios.post("/accessories/create", data);
        return response;
    } catch (error) {
        console.error("Lỗi khi gọi API POST /api/accessories/create:", error);
        throw error;
    }
};

// Cập nhật phụ kiện
const updateAccessory = async (data) => {
    try {
        const response = await axios.put("/accessories/update", data);
        return response;
    } catch (error) {
        console.error("Lỗi khi gọi API POST /api/accessories/update:", error);
        throw error;
    }
};

export default { getSupportAccessories, getAllAccessories, createAccessory, updateAccessory };
