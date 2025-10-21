// src/components/ProcessTable.js
const ProcessTable = ({ processes, onView }) => {
    return (
        <div className="overflow-hidden">
            <table className="table table-hover">
                <thead className="text-center">
                    <tr>
                        <th>#</th>
                        <th>Tên thao tác</th>
                        <th>Mô tả</th>
                    </tr>
                </thead>
                <tbody>
                    {processes && processes.length > 0 ? (
                        processes.map((p) => (
                            <tr key={p.process_id} style={{ cursor: "pointer" }} onClick={(e) => {e.stopPropagation(); onView?.(p)}}>
                                <td>{p.stt}</td>
                                <td>{p.name}</td>
                                <td>{p.description}</td>
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