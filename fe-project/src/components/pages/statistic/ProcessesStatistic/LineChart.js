import { LineChart } from "@mui/x-charts/LineChart";

export default function MuiLineChart({ items = [] }) {
	const labels = items.map(i => i.period);
	const createdData = items.map(i => Number(i.created_count) || 0);
	const updatedData = items.map(i => Number(i.updated_count) || 0);

	return (
		<div style={{ width: "100%", height: 400 }}>
			{items.length === 0 ? (
				<div>Không có dữ liệu</div>
			) : (
				<LineChart
					xAxis={[{ scaleType: "point", data: labels, label: "Thời gian" }]}
					series={[
						{
							data: createdData,
							label: "Thêm mới",
							color: "#02437D"
						},
						{
							data: updatedData,
							label: "Cập nhật",
							color: "#F1C143"
						}
					]}
					yAxis={[{ label: "Số thao tác" }]}
					height={350}
					slotProps={{
						legend: { hidden: false, position: { vertical: "top", horizontal: "middle" } },
						tooltip: {
							trigger: "axis", // hiển thị tooltip cho toàn bộ trục X
							format: ({ seriesIndex, datum, xValue, series }) => {
								return `${xValue}\n${series[0].label}: ${series[0].data[seriesIndex]}\n${series[1].label}: ${series[1].data[seriesIndex]}`;
							}
						}
					}}
					highlightScope={{ highlighted: "series", faded: "global" }}
				/>
			)}
		</div>
	);
}
