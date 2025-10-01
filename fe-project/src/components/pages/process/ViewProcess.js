import processStepService from "../../../services/processStepService";
import { AddButton, CloseButton, DeleteButton, DetailButton } from "../../common/ActionButtons";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ViewProcess = ({ process, onClose, onAddStep, onViewStep }) => {
    const navigate = useNavigate();
	if (!process) return null;
	const handleDeleteStep = async (process_step_id) => {
		try {
			const res = await processStepService.deleteProcessStep(process_step_id);
			if (res?.EC === 0) {
				toast.success("Xóa bước thành công!");
				onClose();
			} else {
				toast.error(res.EM);
			}
		} catch (err) {
			toast.error(err, "Lỗi kết nối khi thêm bước:");
		}
	};

	console.log(process)
	return (
		<div className="card shadow-sm" style={{ backgroundColor: "#02437D", color: "#fff", borderColor: "transparent" }}>
			<div className="card-body">
				<div className="d-flex justify-content-between align-items-center gap-2 mb-3">
					<h5 className="card-title fw-bold">Thông tin Thao tác</h5>
					<div>
						<AddButton className="me-2" onClick={() => onAddStep?.(process)}>
							Thêm bước cho thao tác
						</AddButton>
						<CloseButton size="small" onClick={onClose}/>
					</div>
				</div>

				<div className="mb-3">
					<div className="mb-1"><span className="text-white d-inline-block fw-semibold me-2 px-2 rounded" style={{width:"7em",backgroundColor:"#F1C143",color:"#0E0E0C"}}>Tên thao tác:</span>{process.name}</div>
					<div className="mb-1"><span className="text-white d-inline-block fw-semibold me-2 px-2 rounded" style={{width:"7em",backgroundColor:"#F1C143",color:"#0E0E0C"}}>Mô tả:</span>{process.description}</div>
					<div className="text-end">
						<DetailButton className="text-end" onClick={() => navigate(`/quan-ly-nhan-su?process_name=${process.name}`)}>Danh sách nhân sự thực hiện thao tác này</ DetailButton>
                    </div>
				</div>
				<div className="mb-3">
					<div className="card shadow-sm h-100" style={{ backgroundColor: "#fff", color: "#02437D", borderColor: "#02437D" }}>
						<div className="card-body">
							<h5 className="card-title fw-bold mb-3">Danh sách bước</h5>
							<table className="table table-sm table-bordered table-striped text-center align-middl">
								<thead className="text-center">
									<tr>
										<th>Thứ tự</th>
										<th>ID</th>
										<th>Tên bước</th>
										<th>Hành động</th>
									</tr>
								</thead>
								<tbody>
									{process?.steps?.length > 0 ? (
										process?.steps.map((step) => (
											<tr key={step.process_step_id}>
												<td className="align-middle">{step.step_order}</td>
												<td className="align-middle">{step.process_step_id}</td>
												<td className="align-middle">{step.step_name}</td>
												<td className="align-middle">
													<div className="d-flex justify-content-center gap-2">
														<DetailButton size="small" onClick={() => onViewStep?.(step)} />
														<DeleteButton size="small" onClick={() => handleDeleteStep?.(step.process_step_id)} />
													</div>
												</td>
											</tr>
										))
									) : (
										<tr>
											<td colSpan="4" className="text-center text-muted">
												Chưa có bước nào
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
					</div>

				</div>
			</div>
		</div>
	);
};

export default ViewProcess;
