// src/views/TestView.js
import { motion } from "framer-motion";

const TestView = () => {
	const colors = ["#0E0E0C", "#F1C143", "#02437D", "#B22222"];
	return (
		<div className="container py-5">
			<div className="row row-cols-3 g-4">
				{/* Card-body */}
				<div className="col">
					<div className="card shadow-sm h-100" style={{ backgroundColor: "#02437D", color: "#fff", borderColor: "transparent" }}>
						<div className="card-body">
							<h5 className="card-title fw-bold">Card Chính 1</h5>
							<p className="card-text">Nội dung quan trọng hiển thị mặc định.</p>
						</div>
					</div>
				</div>

				<div className="col">
					<div className="card shadow-sm h-100" style={{ backgroundColor: "#fff", color: "#02437D", borderColor: "#02437D" }}>
						<div className="card-body">
							<h5 className="card-title fw-bold">Card Tối giản 1</h5>
							<p className="card-text">Gọn gàng, chỉ hiển thị những gì cần thiết.</p>
						</div>
					</div>
				</div>

				<div className="col">
					<div className="card shadow-sm h-100" style={{ backgroundColor: "#F1C143", color: "#02437D", borderColor: "transparent" }}>
						<div className="card-body">
							<h5 className="card-title fw-bold">Card Quan trọng 1</h5>
							<p className="card-text">Làm nổi bật thông tin ưu tiên cao.</p>
						</div>
					</div>
				</div>

				{/* Card có header */}
				<div className="col">
					<div className="card shadow-sm h-100" style={{ borderColor: "transparent" }}>
						<div className="card-header fw-bold" style={{ backgroundColor: "#02437D", color: "#fff" }}>
							Card Chính 2
						</div>
						<div className="card-body" style={{ color: "#02437D" }}>
							<p className="card-text">Nội dung quan trọng hiển thị mặc định.</p>
						</div>
					</div>
				</div>

				<div className="col">
					<div className="card shadow-sm h-100" style={{ borderColor: "#02437D" }}>
						<div className="card-header fw-bold" style={{ backgroundColor: "#fff", color: "#02437D" }}>
							Card Tối giản 2
						</div>
						<div className="card-body" style={{ color: "#02437D" }}>
							<p className="card-text">Gọn gàng, chỉ hiển thị những gì cần thiết.</p>
						</div>
					</div>
				</div>

				<div className="col">
					<div className="card shadow-sm h-100" style={{ borderColor: "transparent" }}>
						<div className="card-header fw-bold" style={{ backgroundColor: "#F1C143", color: "#02437D" }}>
							Card Quan trọng 2
						</div>
						<div className="card-body" style={{ color: "#02437D" }}>
							<p className="card-text">Làm nổi bật thông tin ưu tiên cao.</p>
						</div>
					</div>
				</div>

				{/* Card border-left */}
				<div className="col">
					<div className="card shadow-sm h-100" style={{ borderLeft: "5px solid #0d6efd" }}>
						<div className="card-body">
							<h5 className="card-title fw-bold">Card Thông tin</h5>
							<p className="card-text">Dùng để hiển thị các thông báo nhỏ.</p>
						</div>
					</div>
				</div>

				<div className="col">
					<div className="card shadow-sm h-100" style={{ borderLeft: "5px solid #198754" }}>
						<div className="card-body">
							<h5 className="card-title fw-bold">Card Thành công</h5>
							<p className="card-text">Thông báo các thao tác thành công.</p>
						</div>
					</div>
				</div>

				<div className="col">
					<div className="card shadow-sm h-100" style={{ borderLeft: "5px solid #dc3545" }}>
						<div className="card-body">
							<h5 className="card-title fw-bold">Card Cảnh báo</h5>
							<p className="card-text">Thông tin quan trọng cần chú ý.</p>
						</div>
					</div>
				</div>
			</div>

			<div style={{
				width: 320,
				height: 320,
				position: "relative",
				margin: "40px auto",
				display: "flex",
				justifyContent: "center",
				alignItems: "center"
			}}>
				{/* orbit 1 */}
				<motion.div
					style={{
						position: "absolute",
						width: 240,
						height: 240,
						left: "50%",
						top: "50%",
						transform: "translate(-50%, -50%)",
						display: "block"
					}}
					animate={{ rotate: [0, 360] }}
					transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
				>
					<motion.div
						style={{
							position: "absolute",
							left: "50%",
							top: 8,                 // place at top of orbit
							transform: "translateX(-50%)",
							width: 32,
							height: 32,
							borderRadius: "50%",
							background: "#02437D",
							boxShadow: "0 6px 18px rgba(2,67,125,0.25)"
						}}
						animate={{ scale: [1, 1.4, 1] }}
						transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.1 }}
					/>
				</motion.div>

				{/* orbit 2 (opposite direction, different radius & speed) */}
				<motion.div
					style={{
						position: "absolute",
						width: 180,
						height: 180,
						left: "50%",
						top: "50%",
						transform: "translate(-50%, -50%)",
						display: "block"
					}}
					animate={{ rotate: [360, 0] }}
					transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }}
				>
					<motion.div
						style={{
							position: "absolute",
							left: "50%",
							top: 8,
							transform: "translateX(-50%)",
							width: 26,
							height: 26,
							borderRadius: "50%",
							background: "#F1C143",
							boxShadow: "0 6px 18px rgba(241,193,67,0.25)"
						}}
						animate={{ scale: [1, 1.35, 1] }}
						transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.05, delay: 0.2 }}
					/>
				</motion.div>

				{/* orbit 3 */}
				<motion.div
					style={{
						position: "absolute",
						width: 120,
						height: 120,
						left: "50%",
						top: "50%",
						transform: "translate(-50%, -50%)",
						display: "block"
					}}
					animate={{ rotate: [0, 360] }}
					transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
				>
					<motion.div
						style={{
							position: "absolute",
							left: "50%",
							top: 8,
							transform: "translateX(-50%)",
							width: 20,
							height: 20,
							borderRadius: "50%",
							background: "#B22222",
							boxShadow: "0 6px 18px rgba(178,34,34,0.25)"
						}}
						animate={{ scale: [1, 1.5, 1] }}
						transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
					/>
				</motion.div>
			</div>
		</div>
	);
};

export default TestView;
