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

const createStaff = async (data) => {
	try {
        console.log("Data sent to /staff/create:", data);
		const response = await axios.post("/staff/create", data, { headers: { "Content-Type": "multipart/form-data"  }});
		return response;
	} catch (error) {
		console.error("Lỗi khi gọi API POST /api/process-steps/create:", error);
		throw error;
	}
};

export default { 
    getAllStaffs, 
    createStaff
};