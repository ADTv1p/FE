import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

export default function MuiBarChart({ items = [] }) {
	const labels = items.map(i => i.period);
	const createdData = items.map(i => Number(i.created_count) || 0);
	const updatedData = items.map(i => Number(i.updated_count) || 0);

	return (
		<div style={{ width: "100%", height: "100%" }}>
			{items.length === 0 ? (
				<div>Không có dữ liệu</div>
			) : (
				<BarChart
					xAxis={[{ scaleType: "band", data: labels, label: "Thời gian" }]}
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
					height={220}
					slotProps={{
						legend: { hidden: false, position: { vertical: "top", horizontal: "middle" } },
						tooltip: { trigger: "item" } // hover hiển thị từng cột
					}}
					highlightScope={{ highlighted: "item", faded: "global" }}
				/>
			)}
		</div>
	);
}
