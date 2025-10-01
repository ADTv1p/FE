import axios from '../axiosConfig';

const handleRegister = async (data) => {
	try {
		const response = await axios.post("/user/register", data, {
			headers: { "Content-Type": "application/json" }
		});
		return response;
	} catch (error) {
		console.error("Lỗi khi gọi API /user/register:", error.message);
		return { EC: 1, EM: "Lỗi gọi API", DT: null };
	}
};

const handleLogin = async (data) => {
	try {
		const response = await axios.post("/user/login", data, {
			headers: { "Content-Type": "application/json" } 
		});
		return response; 
	} catch (error) {
		console.error("Lỗi khi gọi API /user/login:", error.message);
		return { EC: 1, EM: "Lỗi gọi API", DT: null };
	}
};

export default { 
    handleRegister,
    handleLogin
};