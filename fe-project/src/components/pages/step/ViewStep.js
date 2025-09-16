import { CloseButton } from "../../common/ActionButtons";

const ViewStep = ({ step, onClose }) => {
	if (!step) return null;
	return (
		<div className="card shadow-sm border-0 mb-4">
			<div className="card-header d-flex justify-content-between align-items-center bg-light">
                <p className="lead fs-5 mb-0">Chi tiết bước</p>
				<CloseButton size="small" onClick={onClose}/>
			</div>

			<div className="card-body p-3">
				<div className="d-flex flex-wrap gap-3">
                    <p className="mb-0">
                        <small className="fw-semibold text-muted">ID bước: </small>
                        {step.process_step_id}
                    </p>
                    <p className="mb-0">
                        <small className="fw-semibold text-muted">ID thao tác: </small>
                        {step.process_id}
                    </p>
                    <p className="mb-0">
                        <small className="fw-semibold text-muted">ID phụ kiện: </small>
                        {step.accessory_id}
                    </p>
                    <p className="mb-0">
                        <small className="fw-semibold text-muted">Thứ tự: </small>
                        {step.step_order}
                    </p>
                    <p className="mb-0">
                        <small className="fw-semibold text-muted">Tên bước: </small>
                        {step.step_name}
                    </p>
                    <p className="mb-0">
                        <small className="fw-semibold text-muted">Dụng cụ: </small>
                        {step.tool_required}
                    </p>
                    <p className="mb-0">
                        <small className="fw-semibold text-muted">Phụ kiện sử dụng: </small>
                        {step.accessories_used || "—"}
                    </p>

                </div>

				{/* Hướng dẫn chiếm nguyên hàng */}
				<div className="mt-2">
					<small className="fw-semibold text-muted">Hướng dẫn</small>
					<div className="border rounded p-2 bg-light" style={{ whiteSpace: "pre-wrap" }}>
						{step.instruction}
					</div>
				</div>

				<hr className="my-2" />
				<h6 className="fw-bold mb-2">Phụ kiện</h6>
				<div className="row row-cols-2 g-2">
					<p className="mb-0">
                        <small className="fw-semibold text-muted">Tên: </small>
                        {step.accessory?.name || "—"}
                    </p>
                    <p className="mb-0">
                        <small className="fw-semibold text-muted">Loại: </small>
                        {step.accessory?.type || "—"}
                    </p>
				</div>

				<hr className="my-2" />
				<p className="text-muted small mb-0">
					Tạo: {new Date(step.createdAt).toLocaleString()} | Cập nhật:{" "}
					{new Date(step.updatedAt).toLocaleString()}
				</p>
			</div>
		</div>
	);
};

const Info = ({ label, value }) => (
	<div>
		<small className="fw-semibold text-muted">{label}</small>
		<div>{value}</div>
	</div>
);

export default ViewStep;
