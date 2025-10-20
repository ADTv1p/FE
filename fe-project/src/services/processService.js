import axios from '../axiosConfig';

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
const getAllProcesses = async () => {
    try {
        const response = await axios.get("/processes/list");
        return response;
    } catch (error) {
        console.error("Lỗi khi gọi API /api/processes/list:", error);
        throw error;
    }
};

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
const getSupportProccesses = async () => {
    try {
        const response = await axios.get("/processes/support/list");
        return response;
    } catch (error) {
        console.error("Lỗi khi gọi API /api/processes/support/list:", error);
        throw error;
    }
};

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
const createProcess = async (data) => {
	try {
		const response = await axios.post("/processes/create", data);
		return response;
	} catch (error) {
		console.error("Lỗi khi gọi API POST /api/processes/create:", error);
		throw error;
	}
};

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
const updateProcess = async (updatedData) => {
	try {
		const response = await axios.put(`/processes/${updatedData.process_id}`, updatedData);
		return response;
	} catch (error) {
		console.error("Lỗi khi gọi API PUT /processes/:process_id:", error);
		throw error;
	}
};

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
const replaceAndDeleteProcess = async (data) => {
	try {
		// data gồm { old_process_id, new_process_id }
		const response = await axios.post("/processes/replace-and-delete", data);
		return response;
	} catch (error) {
		console.error("Lỗi khi gọi API POST /api/processes/replace-and-delete:", error);
		throw error;
	}
};

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
const deleteProcess = async (process_id) => {
	try {
		const response = await axios.delete(`/processes/${process_id}`);
		return response;
	} catch (error) {
		console.error("Lỗi khi gọi API POST /api/process/delete:", error);
		throw error;
	}
};

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
export default { 
	getAllProcesses,
    getSupportProccesses,
    createProcess,
	updateProcess, 
	replaceAndDeleteProcess,
	deleteProcess
};