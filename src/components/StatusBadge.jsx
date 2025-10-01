// src/components/StatusBadge.jsx
const StatusBadge = ({ status }) => {
  const getStatusClass = () => {
    switch(status) {
      case 'pending': return 'pending';
      case 'processing': return 'processing';
      case 'completed': return 'completed';
      case 'picked': return 'picked';
      default: return '';
    }
  };
  
  const getStatusText = () => {
    switch(status) {
      case 'pending': return 'Pending';
      case 'processing': return 'Dicuci';
      case 'completed': return 'Selesai';
      case 'picked': return 'Diambil';
      default: return status;
    }
  };
  
  return (
    <span className={`status-badge ${getStatusClass()}`}>
      {getStatusText()}
    </span>
  );
};

export default StatusBadge;