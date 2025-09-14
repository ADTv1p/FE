const DescriptionStep = ({ process }) => {
	if (!process) return null;

	return (
		<ul className="list-group mb-3">
            {process.steps?.length > 0 ? (
                process.steps.map((step) => (
                    <li key={step.process_step_id} className="list-group-item">
                        <span className="fw-semibold">Bước {step.step_order}. {step.step_name}: </span>
                        {step.instruction || "Không có hướng dẫn"}
                    </li>
                ))
            ) : (
                <li className="list-group-item text-muted">Chưa có bước nào</li>
            )}
        </ul>
	);
};

export default DescriptionStep;
