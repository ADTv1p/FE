// src/components/common/Pagination.js
import { Pagination as MuiPagination, Stack } from "@mui/material";

const Pagination = ({ page, count, onChange }) => {
	return (
		<Stack spacing={2} alignItems="center" mt={2}>
			<MuiPagination
				page={page}
				count={count}
				color="primary"
				onChange={(e, value) => onChange(value)}
				showFirstButton
				showLastButton
			/>
		</Stack>
	);
};

export default Pagination;
