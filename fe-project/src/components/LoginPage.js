import React, { useState } from "react";
import { toast } from "react-toastify";
import userService from "../services/userService";
import { useNavigate } from "react-router-dom";

import { LoginButton } from "./common/ActionButtons";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const LoginCard = () => {
    const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({ email: "", password: "" });

    const validateInputs = () => {
        const newErrors = { email: "", password: "" };
        let hasError = false;

        if (!email.includes("@")) {
            newErrors.email = "Email không hợp lệ";
            hasError = true;
        }
        if (password.length < 6) {
            newErrors.password = "Mật khẩu phải ít nhất 6 ký tự";
            hasError = true;
        }

        setErrors(newErrors);
        return !hasError;
    };

    const submitLogin = async () => {
        if (!validateInputs()) return;

        try {
            const resData = await userService.handleLogin({ email, password });
            if (resData.EC === 0) {
                toast.success("Chào mừng bạn");
                setErrors({ email: "", password: "" });
                setTimeout(() => {
                    navigate("/"); // điều hướng sau 1 giây
                }, 1000);
            } else if (resData.EC === 1) {
                setErrors({ ...errors, password: resData.EM || "Đăng nhập thất bại" });
            } else if (resData.EC === 2) {
                setErrors({ ...errors, email: resData.EM || "Email không tồn tại" });
            }
        } catch (err) {
            setErrors({ ...errors, password: "Lỗi kết nối server" });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        submitLogin();
    };

	return (
		<div className="container mt-5 d-flex justify-content-center align-items-center">
            <div className="card mt-5 shadow-sm" style={{ borderColor: "#02437D" }}>
                <div className="card-header fw-bold" style={{ backgroundColor: "#02437D", color: "#fff" }}>
                    Đăng nhập
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
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
                        <div className="d-flex justify-content-end mt-2">
                            <LoginButton type="submit" />
                        </div>
                    </form>
                </div>
            </div>
		</div>
	);
};

export default LoginCard;
