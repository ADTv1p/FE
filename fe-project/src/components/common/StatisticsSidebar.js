import { NavLink, useLocation } from "react-router-dom";
import { Equalizer } from '@mui/icons-material';
import "./StatisticsSidebar.css";

const StatisticsSidebar = () => {
	const location = useLocation(); // <-- lấy route hiện tại

	const statisticsLinks = [
		{ name: "Thống kê lỗi", path: "/thong-ke-loi" },
		{ name: "Thống kê thao tác", path: "/thong-ke-thao-tac" },
	];

	return (
		<div
            className="card shadow-sm h-100" 
            style={{ minWidth: "250px",maxWidth: "300px", backgroundColor: "#fff", color: "#02437D", borderColor: "#02437D" }}
        >
            <div className="card-body">
                <ul className="stats-nav d-flex flex-column mb-auto gap-2">
                    {statisticsLinks.map((link, index) => (
                        <li className="stats-item" key={index}>
                            <NavLink
                                to={link.path}
                                className={`stats-link d-flex align-items-center rounded-3 py-2 px-3 ${
                                    location.pathname === link.path
                                        ? "activex text-white"
                                        : ""
                                }`}
                            >
                                <Equalizer fontSize="medium" />
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
