import axios from '../axiosConfig';

const getAllProcesses = async () => {
    try {
        const response = await axios.get("/processes/list");
        return response;
    } catch (error) {
        console.error("Lỗi khi gọi API /api/processes/list:", error);
        throw error;
    }
};
const getSupportProccesses = async () => {
    try {
        const response = await axios.get("/processes/support/list");
        return response;
    } catch (error) {
        console.error("Lỗi khi gọi API /api/processes/support/list:", error);
        throw error;
    }
};
const createProcess = async (data) => {
	try {
		const response = await axios.post("/processes/create", data);
		return response;
	} catch (error) {
		console.error("Lỗi khi gọi API POST /api/processes/create:", error);
		throw error;
	}
};

const deleteProcess = async (process_id) => {
	try {
		const response = await axios.delete(`/processes/${process_id}`);
		return response;
	} catch (error) {
		console.error("Lỗi khi gọi API POST /api/process/delete:", error);
		throw error;
	}
};

export default { 
	getAllProcesses,
    getSupportProccesses,
    createProcess, deleteProcess
};