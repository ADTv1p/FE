import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { RegisterButton } from "./common/ActionButtons";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import userService from "../services/userService";


const RegisterPage = () => {
    const navigate = useNavigate();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [dateOfBirth, setDateOfBirth] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const [errors, setErrors] = useState({ name: "", email: "", phone: "", dateOfBirth: "", password: "", confirm: "" });

	const validateInputs = () => {
		const newErrors = { name: "", email: "", phone: "", dateOfBirth: "", password: "", confirm: "" };
		let hasError = false;

		if (!name.trim()) { newErrors.name = "Tên không được để trống"; hasError = true; }
		if (!email.includes("@")) { newErrors.email = "Email không hợp lệ"; hasError = true; }
		if (!phone.match(/^\d{10,15}$/)) { newErrors.phone = "Số điện thoại không hợp lệ"; hasError = true; }
		if (!dateOfBirth) { 
            newErrors.dateOfBirth = "Ngày sinh không được để trống"; 
            hasError = true; 
        } else if (new Date(dateOfBirth) > new Date()) {
            newErrors.dateOfBirth = "Ngày sinh không thể ở tương lai";
            hasError = true;
        }
		if (password.length < 6) { newErrors.password = "Mật khẩu phải ít nhất 6 ký tự"; hasError = true; }
		if (password !== confirmPassword) { newErrors.confirm = "Mật khẩu xác nhận không khớp"; hasError = true; }
        
		setErrors(newErrors);
		return !hasError;
	};

	const submitRegister = async () => {
        if (!validateInputs()) return;

        try {
            const resData = await userService.handleRegister({ 
                name, email, phone, date_of_birth: dateOfBirth, password 
            });

            if (resData.EC === 0) {
                toast.success("Đăng ký thành công");
                setTimeout(() => {
                    navigate("/dang-nhap");
                }, 1500);
            } else if (resData.EC === 2) {
                setErrors({ ...errors, email: resData.EM || "Email đã được sử dụng" });
            } else if (resData.EC === 3) {
                setErrors({ ...errors, phone: resData.EM || "Số điện thoại đã được sử dụng" });
            } else {
                toast.error(resData.EM || "Đăng ký thất bại");
                setErrors({ ...errors, password: resData.EM || "Đăng ký thất bại" });
            }
        } catch (err) {
            setErrors({ ...errors, password: "Lỗi kết nối server" });
        }
    };

	const handleSubmit = (e) => {
		e.preventDefault();
		submitRegister();
	};

	return (
		<div className="container pt-5 d-flex justify-content-center align-items-center">
			<div className="card shadow overflow-hidden" style={{ borderColor: "#F1C143", width: "80%", maxWidth: 1000 }}>
                <div className="row">
                    <div className="col-5 d-flex justify-content-center align-items-center" style={{ backgroundColor: "#F1C143", color: "#fff"  }}>
                        <img src="/yazaki-seeklogo.png" alt="Logo" style={{ height: "3em", marginRight: "10px", filter: "drop-shadow(2px 3px 3px rgba(0, 0, 0, 0.83))"  }} />
                    </div>
                    <div className="col p-5">
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Họ và tên"
                                fullWidth
                                required
                                margin="normal"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                error={!!errors.name}
                                helperText={errors.name}
                            />
                            <TextField
                                label="Email"
                                type="email"
                                fullWidth
                                required
                                margin="normal"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                error={!!errors.email}
                                helperText={errors.email}
                            />
                            <TextField
                                label="Số điện thoại"
                                fullWidth
                                required
                                margin="normal"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                error={!!errors.phone}
                                helperText={errors.phone}
                            />
                            <TextField
                                label="Ngày sinh"
                                type="date"
                                fullWidth
                                required
                                margin="normal"
                                InputLabelProps={{ shrink: true }}
                                value={dateOfBirth}
                                onChange={(e) => setDateOfBirth(e.target.value)}
                                error={!!errors.dateOfBirth}
                                helperText={errors.dateOfBirth}
                            />
                            <TextField
                                label="Mật khẩu"
                                type={showPassword ? "text" : "password"}
                                fullWidth
                                required
                                margin="normal"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                error={!!errors.password}
                                helperText={errors.password}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                label="Xác nhận mật khẩu"
                                type={showConfirm ? "text" : "password"}
                                fullWidth
                                required
                                margin="normal"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                error={!!errors.confirm}
                                helperText={errors.confirm}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowConfirm(!showConfirm)} edge="end">
                                                {showConfirm ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <div className="d-flex justify-content-end mt-2">
                                <RegisterButton type="submit" />
                            </div>
                        </form>
                    </div>
                </div>
			</div>
		</div>
	);
};

export default RegisterPage;
