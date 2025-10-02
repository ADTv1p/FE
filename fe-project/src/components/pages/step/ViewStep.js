import { motion  } from "framer-motion";
import { CloseButton } from "../../common/ActionButtons";

const ViewStep = ({ step, onClose }) => {
    if (!step) return null;

    return (
        <motion.div
			initial={{ opacity: 0, x: 50 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.5, ease: "easeInOut" }}
			className="card shadow-sm"
			style={{ backgroundColor: "#02437D", color: "#fff", borderColor: "transparent" }}
		>
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="card-title fw-bold">Thông tin Thao Tác</h5>
                        <CloseButton size="small" onClick={onClose}/>
                    </div>

                    <div className="d-flex flex-wrap gap-3">
                        <Info label="ID bước:" value={step.process_step_id} />
                        <Info label="ID thao tác:" value={step.process_id} />
                        <Info label="ID phụ kiện:" value={step.accessory_id || "—"} />
                        <Info label="Thứ tự:" value={step.step_order} />
                        <Info label="Tên bước:" value={step.step_name} />
                        <Info label="Dụng cụ:" value={step.tool_required || "—"} />
                        <Info label="Phụ kiện sử dụng:" value={step.accessories_used || "—"} />
                    </div>

                    <div className="mt-2">
                        <small className="fw-semibold text-white">Hướng dẫn</small>
                        <div className="border rounded p-2" style={{ whiteSpace: "pre-wrap",backgroundColor: "#F1C143", color: "#0E0E0C" }}>
                            {step.instruction}
                        </div>
                    </div>

                    <hr className="my-3" />
                    <h6 className="fw-bold mb-2">Phụ kiện</h6>
                    <div className="row row-cols-2 g-2">
                        <Info label="Tên:" value={step.accessory?.name || "—"} />
                        <Info label="Loại:" value={step.accessory?.type || "—"} />
                    </div>

                    <hr className="my-3" />
                    <p className="text-white small mb-0">
                        Tạo: {new Date(step.createdAt).toLocaleString()} | Cập nhật:{" "}
                        {new Date(step.updatedAt).toLocaleString()}
                    </p>
                </div>
        </motion.div>
    );
};

const Info = ({ label, value }) => (
    <div>
        <small className="fw-semibold" style={{color: "#F1C143"}}>{label}</small>
        <div>{value}</div>
    </div>
);

export default ViewStep;