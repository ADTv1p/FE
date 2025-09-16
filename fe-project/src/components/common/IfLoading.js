const IfLoading = () => {
    return (
        <div className="container text-center">
            <div className="spinner-border text-primary mb-3" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <p className="fs-5">Đang tải dữ liệu...</p>
        </div>
    );
}

export default IfLoading;