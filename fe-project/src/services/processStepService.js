import axios from '../axiosConfig';

const getAllProcessSteps = async () => {
    try {
        const response = await axios.get("/processes-steps/list");
        return response;
    } catch (error) {
        console.error("Lỗi khi gọi API /api/processes-steps/list:", error);
        throw error;
    }
};

const createProcessStep = async (data) => {
	try {
		const response = await axios.post("/process-steps/create", data);
		return response;
	} catch (error) {
		console.error("Lỗi khi gọi API POST /api/process-steps/create:", error);
		throw error;
	}
};

export default { 
	getAllProcessSteps,
    createProcessStep 
};