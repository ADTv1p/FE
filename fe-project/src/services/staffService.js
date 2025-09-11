import axios from '../axiosConfig';

export const fetchQuanLiData = async () => {
    try {
        const response = await axios.get('/quan-li');
        return response; // Trả về dữ liệu từ API
    } catch (error) {
        console.error('Lỗi khi gọi API /quan-li:', error);
        throw error; // Ném lỗi để xử lý ở nơi gọi
    }
};

export default { fetchQuanLiData };