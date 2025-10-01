import axios from "../axiosConfig";

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
const getErrorCountStatistics = async (period = "day") => {
	try {
		return await axios.get("/statistics/work-records/errors-all-time");
	} catch (error) {
		return { EC: 1, EM: "API error: errors-all-time", DT: error };
	}
};

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
const getErrorByPosition = async () => {
	try {
		return await axios.get("/statistics/work-records/errors-by-position");
	} catch (error) {
		return { EC: 1, EM: "API error: errors-by-position", DT: error };
	}
};

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
const getErrorStaffByPosition = async (positionId) => {
	try {
		return await axios.get("/statistics/work-records/errors-staff-by-position", { params: { positionId } });
	} catch (error) {
		return { EC: 1, EM: "API error: errors-by-position", DT: error };
	}
};

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
const getErrorByTime = async (period) => {
	try {
		return await axios.get("/statistics/work-records/errors-by-time", { params: { period } });
	} catch (error) {
		return { EC: 1, EM: "API error: errors-by-time", DT: error };
	}
};

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
const getErrorData = async (period) => {
	try {
		return await axios.get("/statistics/work-records/errors-data", { params: { period } });
	} catch (error) {
		return { EC: 1, EM: "API error: errors-data", DT: error };
	}
};

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
const handleExportErrorData = async () => {
	try {
		return await axios.get("/statistics/work-records/export-error-data");
	} catch (error) {
		return { EC: 1, EM: "API error: export-error-data", DT: error };
	}
};

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
const getProcessStatisticsAllTime = async () => {
	try {
		return await axios.get("/statistics/processes/process-all-time");
	} catch (error) {
		return { EC: 1, EM: "API error: process-all-time", DT: error };
	}
};

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
const getProcessesWithStaff = async () => {
	try {
		return await axios.get("/statistics/processes/process-with-staff");
	} catch (error) {
		return { EC: 1, EM: "API error: process-with-staff", DT: error };
	}
};
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
const getProcessByType = async (period) => {
	try {
		return await axios.get("/statistics/processes/process-by-type", { params: { period } });
	} catch (error) {
		return { EC: 1, EM: "API error: process-by-type", DT: error };
	}
};

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
const getProcessData = async (process_id) => {
	try {
		return await axios.get("/statistics/processes/process-data", { params: { process_id } });
	} catch (error) {
		return { EC: 1, EM: "API error: errors-data", DT: error };
	}
};

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
const handleExportProcessData = async () => {
	try {
		return await axios.get("/statistics/processes/export-process-data");
	} catch (error) {
		return { EC: 1, EM: "API error: errors-data", DT: error };
	}
};

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
export default { 
	getErrorCountStatistics,
	getErrorByPosition,
	getErrorStaffByPosition,
	getErrorByTime,
	getErrorData,
	handleExportErrorData,
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
	getProcessStatisticsAllTime,
	getProcessesWithStaff,
	getProcessByType,
	getProcessData,
	handleExportProcessData,
};