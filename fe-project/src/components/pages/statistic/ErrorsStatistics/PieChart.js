import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

export default function MuiPieChart({ items = [], onSelect }) {
	const data = items.map((i, idx) => ({
		id: i.position_id,
		label: i.position_code,
		value: Number(i.total) || 0,
		color: `hsl(206 97% ${25 + idx * 8}%)`
	}));

	return (
		<PieChart
			series={[
				{
					data,
					highlightScope: { fade: "global", highlight: "item" },
					faded: { innerRadius: 30, additionalRadius: -30, color: "gray" }
				}
			]}
			height={200}
			width={200}
			onItemClick={(_, { dataIndex }) => {
				const id = data[dataIndex]?.id;
				onSelect && onSelect(id);
			}}
		/>
	);
}