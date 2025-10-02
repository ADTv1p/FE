import { Typography } from "@mui/material";
import { motion } from "framer-motion";

const IfLoading = () => {
	return (
		<div className="container mt-5 d-flex justify-content-center align-items-center">
			<div className="text-center">
				{/* Orbiting Circles Loader */}
				<div style={{
					width: 320,
					height: 320,
					position: "relative",
					margin: "0 auto",
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
								top: 8,
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

					{/* orbit 2 */}
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

				<Typography variant="h6" mt={2}>
                    Đang tải dữ liệu
                    <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                    >
                        ...
                    </motion.span>
                </Typography>
			</div>
		</div>
	);
};

export default IfLoading;
