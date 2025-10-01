import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

export default function MuiBarChart({ items = [] }) {
	const labels = items.map(i => i.period);
	const dataValues = items.map(i => Number(i.error_count) || 0);

	return (
		<div style={{ width: "100%", height: 200 }}>
			{items.length === 0 ? (
				<div>Không có dữ liệu</div>
			) : (
				<BarChart
					xAxis={[{ scaleType: "band", data: labels, label: "Thời gian" }]}
					series={[
						{
							data: dataValues,
							label: "Số lỗi",
							color: "#02437D"
						}
					]}
					// yAxis={[{ label: "Số lỗi" }]}
					height={200}
					slotProps={{
						legend: { hidden: false, position: { vertical: "top", horizontal: "middle" } },
						tooltip: { trigger: "item" } // hiển thị tooltip khi hover
					}}
					highlightScope={{ highlighted: "item", faded: "global" }} // hiệu ứng hover cột
				/>
			)}
		</div>
	);
}
