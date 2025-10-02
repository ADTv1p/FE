// src/components/common/PrivateRoute.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import userService from "../../services/userService";

const PrivateRoute = () => {
	const isAuth = userService.isLoggedIn();

	if (!isAuth) {
		// chưa đăng nhập → redirect về login
		return <Navigate to="/dang-nhap" replace />;
	}

	// đã đăng nhập → render các route con
	return <Outlet />;
};

export default PrivateRoute;
