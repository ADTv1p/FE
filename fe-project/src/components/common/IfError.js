import { Typography, Button } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const IfError = () => {
	return (
		<div className="container mt-5 d-flex justify-content-center align-items-center">
			<div className="text-center d-flex flex-column gap-3">
                <div className="text-center">
				   <ErrorOutlineIcon color="error" sx={{ fontSize: 60 }} />
                </div>
                    
				<Typography variant="h4" color="error">
					Đã xảy ra lỗi khi tải dữ liệu.
				</Typography>
                <Button
                    variant="outlined"
                    startIcon={<RefreshIcon />}
                    onClick={() => window.location.reload()}
                >
                    Tải lại trang
                </Button>
			</div>
		</div>
	);
};

export default IfError;
