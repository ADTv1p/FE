import React from "react";
import { NavLink } from "react-router-dom";

const StatisticsSidebar = () => {
	const statisticsLinks = [
		{ name: "Thống kê lỗi", path: "/statistics/errors" },
		{ name: "Thống kê hiệu suất", path: "/statistics/performance" },
		{ name: "Thống kê người dùng", path: "/statistics/users" },
		{ name: "Thống kê thao tác", path: "/statistics/processes" },
	];

	return (
		<div
            className="card shadow-sm border-0 p-3"
            style={{ width: "250px", minHeight: "50vh" }} 
        >
            <div className="card-body p-0">
                <ul className="nav nav-pills flex-column mb-auto">
                    {statisticsLinks.map((link, index) => (
                        <li className="nav-item" key={index}>
                            <NavLink
                                to={link.path}
                                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                                aria-current={link.path === window.location.pathname ? "page" : undefined}
                            >
                                {link.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
	);
};

export default StatisticsSidebar;
