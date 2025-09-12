// src/components/accessories/AccessoryManagement.jsx
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import AddAccessory from "./AddAccessory";
import UpdateAccessory from "./UpdateAccessory";
import accessoryService from "../../../services/accessoryService";

const AccessoryManagement = () => {
	const [showForm, setShowForm] = useState(null);
	const [accessories, setAccessories] = useState([]);
	const [selectedAccessory, setSelectedAccessory] = useState(null);

	useEffect(() => {
		const fetchAccessories = async () => {
			try {
				const res = await accessoryService.getAllAccessories();
				if (res?.EC === 0) setAccessories(res.DT);
				else toast.error(res?.EM || "Không thể tải danh sách phụ kiện.");
			} catch (err) {
				console.error("Lỗi tải phụ kiện:", err);
				toast.error("Lỗi khi tải danh sách phụ kiện.");
			}
		};
		fetchAccessories();
	}, []);

	const handleAddAccessory = async (data) => {
		try {
			const res = await accessoryService.createAccessory(data);
			if (res || res.EC === 0) {
				setAccessories((prev) => [...prev, res.DT]);
				setShowForm(null);
				toast.success("Thêm phụ kiện thành công!");
			} else {
				toast.error(res.EM || "Lỗi khi thêm phụ kiện.");
			}
		} catch (error) {
			console.error("Lỗi khi thêm phụ kiện:", error);
			toast.error("Không thể thêm phụ kiện.");
		}
	};

	const handleUpdateAccessory = async (data) => {
	try {
		const res = await accessoryService.updateAccessory(data);
		if (res?.EC === 0) {
			setAccessories((prev) =>
				prev.map((acc) => (acc.accessory_id === data.accessory_id ? res.DT : acc))
			);
			setShowForm(null);
			toast.success("Cập nhật phụ kiện thành công!");
		} else toast.error(res?.EM || "Lỗi khi cập nhật phụ kiện.");
	} catch (err) {
		console.error("Lỗi cập nhật:", err);
		toast.error("Không thể cập nhật phụ kiện.");
	}
};

	return (
		<div className="row g-4">
			{/* Cột trái: bảng */}
			<div className={showForm ? "col-9" : "col-12"}>
				<div className="d-flex justify-content-between mb-3">
					<button
						className="btn btn-success"
						onClick={() => setShowForm("add")}
					>
						<i className="fas fa-plus me-2"></i>Thêm phụ kiện
					</button>
				</div>
				<div className="shadow-sm border-0 rounded-3 bg-white p-3">
					<p className="lead fs-2 text-center">Quản lý phụ kiện</p>
					<hr />
					<table className="table table-striped table-bordered">
						<thead>
							<tr>
								<th>Tên phụ kiện</th>
								<th>Loại</th>
								<th>Hành động</th>
							</tr>
						</thead>
						<tbody>
							{accessories.length > 0 ? (
								accessories.map((item, index) => (
									<tr key={index}>
										<td>{item.name}</td>
										<td>{item.type}</td>
										<td>
											<button
												className="btn btn-sm btn-primary me-2"
												onClick={() => {
													setSelectedAccessory(item);
													setShowForm("update");
												}}
											>
												Sửa
											</button>
											<button className="btn btn-sm btn-danger">Xóa</button>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td colSpan={3} className="text-center">
										Chưa có phụ kiện nào
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>

			{showForm === "add" && (
				<div className="col-3">
					<AddAccessory onSubmit={handleAddAccessory} onClose={() => setShowForm(null)} />
				</div>
			)}
			
			{showForm === "update" && selectedAccessory && (
				<div className="col-3">
					<UpdateAccessory accessory={selectedAccessory} onSubmit={handleUpdateAccessory} onClose={() => setShowForm("add")} />
				</div>
			)}

				

		</div>
	);
};

export default AccessoryManagement;
