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

const getProcessStepInfo = async (process_step_id) => {
    try {
        const response = await axios.get(`/process-steps/${process_step_id}`);
        return response;
    } catch (error) {
        console.error("Lỗi khi gọi API /api/process-steps/:process_step_id:", error);
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

const deleteProcessStep = async (process_step_id) => {
	try {
		const response = await axios.delete(`/process-steps/${process_step_id}`);
		return response;
	} catch (error) {
		console.error("Lỗi khi gọi API POST /api/process-steps/create:", error);
		throw error;
	}
};

export default { 
	getAllProcessSteps,
    getProcessStepInfo,
    createProcessStep,
    deleteProcessStep
};