import './ActionButtons.css';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';

// Thêm vào export
const AddButton = ({ onClick, disabled = false, type = 'button' , className = '', style = {}, children = 'Thêm', size = 'large' }) => (
	<button
		type={type}
		className={`action-btn action-btn-add action-btn-${size} ${className}`}
		onClick={onClick}
		disabled={disabled}
		style={style}
	>
		<AddIcon fontSize="small" />
		{size === 'large' && children}
	</button>
);

const ConfirmButton = ({ onClick, disabled = false, type = 'button' , className = '', style = {}, children = 'Xác nhận', size = 'large' }) => (
	<button
		type={type}
		className={`action-btn action-btn-confirm action-btn-${size} ${className}`}
		onClick={onClick}
		disabled={disabled}
		style={style}
	>
		<CheckIcon fontSize="small" />
		{size === 'large' && children}
	</button>
);

const CloseButton = ({ onClick, disabled = false, type = 'button' , className = '', style = {}, children = 'Đóng', size = 'large' }) => (
	<button
		type={type}
		className={`action-btn action-btn-close action-btn-${size} ${className}`}
		onClick={onClick}
		disabled={disabled}
		style={style}
	>
		<CloseIcon fontSize="small" />
		{size === 'large' && children}
	</button>
);

const DeleteButton = ({ onClick, disabled = false, type = 'button' , className = '', style = {}, children = 'Xóa', size = 'large' }) => (
	<button
		type={type}
		className={`action-btn action-btn-delete action-btn-${size} ${className}`}
		onClick={onClick}
		disabled={disabled}
		style={style}
	>
		<DeleteIcon fontSize="small" />
		{size === 'large' && children}
	</button>
);

const EditButton = ({ onClick, disabled = false, type = 'button' , className = '', style = {}, children = 'Sửa', size = 'large' }) => (
	<button
		type={type}
		className={`action-btn action-btn-edit action-btn-${size} ${className}`}
		onClick={onClick}
		disabled={disabled}
		style={style}
	>
		<EditIcon fontSize="small" />
		{size === 'large' && children}
	</button>
);

const DetailButton = ({ onClick, disabled = false, type = 'button', className = '', style = {}, children = 'Xem chi tiết', size = 'large' }) => (
	<button
		type={type}
		className={`action-btn action-btn-detail action-btn-${size} ${className}`}
		onClick={onClick}
		disabled={disabled}
		style={style}
	>
		<VisibilityIcon fontSize="small" />
		{size === 'large' && children}
	</button>
);

const FilterButton = ({ onClick, disabled = false, type = 'button' , className = '', style = {}, children = 'Lọc', size = 'large' }) => (
	<button
		type={type}
		className={`action-btn action-btn-filter action-btn-${size} ${className}`}
		onClick={onClick}
		disabled={disabled}
		style={style}
	>
		<FilterListIcon fontSize="small" />
		{size === 'large' && children}
	</button>
);

const SearchButton = ({ onClick, disabled = false, type = 'button' , className = '', style = {}, children = 'Tìm', size = 'large' }) => (
	<button
		type={type}
		className={`action-btn action-btn-search action-btn-${size} ${className}`}
		onClick={onClick}
		disabled={disabled}
		style={style}
	>
		<SearchIcon fontSize="small" />
		{size === 'large' && children}
	</button>
);

export { AddButton, ConfirmButton, CloseButton, DeleteButton, EditButton, DetailButton, FilterButton, SearchButton };