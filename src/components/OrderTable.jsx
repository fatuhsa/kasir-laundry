import { useOrders } from '../context/OrderContext';
import StatusBadge from './StatusBadge';
import { Link } from 'react-router-dom';

const OrderTable = ({ filter = 'all' }) => {
  const { orders } = useOrders();
  
  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status === filter);
  
  const getStatusText = (status) => {
    const statusMap = {
      'pending': 'Pending',
      'processing': 'Dicuci',
      'completed': 'Selesai',
      'picked': 'Diambil'
    };
    return statusMap[status] || status;
  };
  
  return (
    <div className="order-table-container">
      <div className="table-responsive">
        <table className="order-table">
          <thead>
            <tr>
              <th>ID Order</th>
              <th>Nama</th>
              <th>Layanan</th>
              <th>Status</th>
              <th>Harga</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{order.customerName}</td>
                <td>{order.serviceType}</td>
                <td>
                  <StatusBadge status={order.status} />
                </td>
                <td>Rp {order.price.toLocaleString('id-ID')}</td>
                <td>
                  <Link to={`/order/${order.id}`} className="detail-btn">
                    Detail
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {filteredOrders.length === 0 && (
        <p className="no-orders">Tidak ada order ditemukan</p>
      )}
    </div>
  );
};

export default OrderTable;