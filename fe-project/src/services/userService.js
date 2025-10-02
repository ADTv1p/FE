import axios from '../axiosConfig';

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
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

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
const handleLogin = async (data) => {
	try {
		const response = await axios.post("/user/login", data, {
			headers: { "Content-Type": "application/json" } 
		});
		console.log(response)
		return response; 
	} catch (error) {
		console.error("Lỗi khi gọi API /user/login:", error.message);
		return { EC: 1, EM: "Lỗi gọi API", DT: null };
	}
};

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
const setAuthData = ({ user, token }) => {
	localStorage.setItem("token", token);
	localStorage.setItem("user", JSON.stringify(user));
};

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
const getToken = () => localStorage.getItem("token");

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
const getUser = () => {
	const user = localStorage.getItem("user");
	return user ? JSON.parse(user) : null;
};

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
const clearAuthData = () => {
	localStorage.removeItem("token");
	localStorage.removeItem("user");
};

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
const isLoggedIn = () => !!getToken();

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
export default { 
    handleRegister,
    handleLogin,
	setAuthData,
	getUser,
	clearAuthData,
	isLoggedIn,
};