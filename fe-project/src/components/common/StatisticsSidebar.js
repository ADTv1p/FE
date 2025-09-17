import { NavLink, useLocation } from "react-router-dom";
import "./StatisticsSidebar.css";

const StatisticsSidebar = () => {
	const location = useLocation(); // <-- lấy route hiện tại

	const statisticsLinks = [
		{ name: "Thống kê lỗi", path: "/thong-ke-loi" },
		{ name: "Thống kê thao tác", path: "/thong-ke-thao-tac" },
	];

	return (
		<div
            className="card shadow-sm border-0 p-3 h-100"
            style={{ width: "250px" }} 
        >
            <div className="card-body p-0">
                <ul className="stats-nav flex-column mb-auto">
                    {statisticsLinks.map((link, index) => (
                        <li className="stats-item mb-1" key={index}>
                            <NavLink
                                to={link.path}
                                className={`stats-link d-flex align-items-center rounded-3 py-2 px-3 ${
                                    location.pathname === link.path
                                        ? "active bg-primary text-white"
                                        : "text-dark"
                                }`}
                            >
                                <span className="me-2">{link.icon}</span>
                                <span>{link.name}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
	);
};

export default StatisticsSidebar;
