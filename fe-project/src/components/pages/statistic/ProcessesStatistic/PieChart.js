import { PieChart } from "@mui/x-charts/PieChart";
export default function MuiPieChart({ items = [], onSelect }) {
	items = items || [];
	const data = (items || [])
		.filter(i => i.value > 0)
		.map((i, idx) => ({
			id: i.process_id,
			label: `Mã thao tác: ${i.process_id}`,
			value: i.value,
			color: `hsl(206 97% ${25 + idx * 8}%)`
		}));

	return (
		<div id="processPieChart">
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
		</div>
	);
}
