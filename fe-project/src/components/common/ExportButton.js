import './ExportButton.css';
import GetAppIcon from '@mui/icons-material/GetApp';

const ExportButton = ({ children, type = 'button', variant = 'primary', size = 'medium', onClick, disabled = false, className = '', style = {},}) => {
  return (
    <button
      type={type}
      className={`custom-btn custom-btn-${variant} custom-btn-${size} ${className}`}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      <GetAppIcon fontSize={size === 'small' ? 'small' : 'medium'} className="btn-icon" />
      {children}
    </button>
  );
};

export default ExportButton;