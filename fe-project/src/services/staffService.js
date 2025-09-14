import axios from '../axiosConfig';

const getAllStaffs = async () => {
    try {
        const response = await axios.get("/staff/list");
        return response;
    } catch (error) {
        console.error("Lỗi khi gọi API /api/staff/list:", error);
        throw error;
    }
};

export default { getAllStaffs };