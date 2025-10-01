import { CircularProgress, Typography } from "@mui/material";
const IfLoading = () => {
    return (
        <div className="container mt-5 d-flex justify-content-center align-items-center">
            <div className="text-center">
                <CircularProgress color="primary" size={60}/>
                <Typography variant="h6" mt={2}>
                    Đang tải dữ liệu...
                </Typography>
            </div>
        </div>
    );
}

export default IfLoading;