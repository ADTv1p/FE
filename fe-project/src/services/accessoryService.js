import axios from '../axiosConfig';

const getSupportAccessories = async () => {
    try {
        const response = await axios.get("/accessories/support/list");
        return response;
    } catch (error) {
        console.error("Lỗi khi gọi API /api/accessories/support/list:", error);
        throw error;
    }
};
const getAllAccessories = async () => {
    try {
        const response = await axios.get("/accessories/list");
        return response;
    } catch (error) {
        console.error("Lỗi khi gọi API /api/accessories/list:", error);
        throw error;
    }
};
const createAccessory = async (data) => {
    try {
        const response = await axios.post("/accessories/create", data);
        return response;
    } catch (error) {
        console.error("Lỗi khi gọi API POST /api/accessories/create:", error);
        throw error;
    }
};
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
