import RefreshIcon from "@mui/icons-material/Refresh";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const IfError = () => {
    return (
        <div className="container mt-5 text-center">
            <p className="fs-5 text-danger d-flex justify-content-center align-items-center gap-2">
                <ErrorOutlineIcon color="error" fontSize="large" />
                Đã xảy ra lỗi khi tải dữ liệu.
            </p>
            <button
                className="btn btn-outline-primary d-inline-flex align-items-center gap-2"
                onClick={() => window.location.reload()}
            >
                <RefreshIcon fontSize="small" /> Tải lại trang
            </button>
        </div>
    );
}

export default IfError;