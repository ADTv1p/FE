// src/components/ProcessTable.js
import { DeleteButton } from "../../common/ActionButtons";

const ProcessTable = ({ processes, onView, onDelete }) => {
    return (
        <div className="overflow-hidden">
            <table className="table table-hover">
                <thead className="text-center">
                    <tr>
                        <th>Mã thao tác</th>
                        <th>Tên thao tác</th>
                        <th>Mô tả</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {processes && processes.length > 0 ? (
                        processes.map((p) => (
                            <tr key={p.process_id} style={{ cursor: "pointer" }} onClick={(e) => {e.stopPropagation(); onView?.(p)}}>
                                <td>{p.process_id}</td>
                                <td>{p.name}</td>
                                <td>{p.description}</td>
                                <td>
                                    <div className="d-flex justify-content-center gap-2">
                                        <DeleteButton
                                            size="small"
                                            onClick={(e) => {e.stopPropagation(); onDelete?.(p.process_id)}}
                                        >
                                            Xóa
                                        </DeleteButton>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center text-muted">
                                Không có thao tác nào
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ProcessTable;