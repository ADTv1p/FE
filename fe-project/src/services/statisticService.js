import axios from '../axiosConfig';

const getErrorCountStatistics = async (period = "day") => {
	try {
		const response = await axios.get("/statistics/work-records/errors2", { params: { period: "day" } });
        return response;
	} catch (error) {
		console.error("Error calling API /statistics/work-records/errors:", error);
        throw error;
	}
};

export default { 
	getErrorCountStatistics,
};