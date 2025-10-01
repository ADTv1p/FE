import { LineChart } from "@mui/x-charts/LineChart";

export default function MuiLineChart({ items = [] }) {
	const data = items.map(i => Number(i.error_count) || 0);
	const labels = items.map(i => i.period);

	return (
		<div style={{ width: "100%", height: 400 }}>
			{items.length === 0 ? (
				<div>Không có dữ liệu</div>
			) : (
				<LineChart
					xAxis={[{ scaleType: "point", data: labels, label: "Thời gian" }]}
					series={[
						{
							data,
							label: "Số lỗi",
							color: "#F1C143"
						}
					]}
					yAxis={[{ label: "Số lỗi" }]}
					height={380}
					slotProps={{
						legend: { hidden: false, position: { vertical: "top", horizontal: "middle" } },
						tooltip: { trigger: "item" } 
					}}
					highlightScope={{ highlighted: "series", faded: "global" }} 
				/>
			)}
		</div>
	);
}
