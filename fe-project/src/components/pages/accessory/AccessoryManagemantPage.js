// src/components/accessories/AccessoryManagement.jsx
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import AddAccessory from "./AddAccessory";
import UpdateAccessory from "./UpdateAccessory";
import accessoryService from "../../../services/accessoryService";
import { AddButton, ConfirmButton, CloseButton, DeleteButton, EditButton } from '../../common/ActionButtons';

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
		<div className="container">
			<div className="card shadow-sm border-0 mb-2">
                <div className="card-body d-flex justify-content-between align-items-center">
					<h2 className="fs-2 lead">Quản lý lỗi</h2>
                    <div>
						<AddButton onClick={() => setShowForm("add")} >
							Thêm phụ kiện
						</AddButton>
					</div>
				</div>
			</div>
			<div className="row">
				{/* Cột trái: bảng */}
				<div className={showForm ? "col-9" : "col-12"}>
					<div className="card shadow-sm border-0 rounded">
						<div className="card-body">
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
													<EditButton
														className="me-2"
														size="small"
														onClick={() => {
															setSelectedAccessory(item);
															setShowForm("update");
														}}
													/>
													<DeleteButton size="small" />
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
		</div>
	);
};

export default AccessoryManagement;
