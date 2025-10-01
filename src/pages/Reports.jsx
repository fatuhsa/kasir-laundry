import { useOrders } from '../context/OrderContext';
import { useState } from 'react';

const Reports = () => {
  const { orders } = useOrders();
  const [reportType, setReportType] = useState('daily');
  
  const generateReport = () => {
    const now = new Date();
    
    if (reportType === 'daily') {
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const todayOrders = orders.filter(order => {
        const orderDate = new Date(order.createdAt);
        return orderDate >= today;
      });
      
      const totalIncome = todayOrders.reduce((sum, order) => sum + order.price, 0);
      
      return {
        title: 'Laporan Harian',
        date: today.toLocaleDateString('id-ID'),
        orderCount: todayOrders.length,
        totalIncome
      };
    } else {
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const monthOrders = orders.filter(order => {
        const orderDate = new Date(order.createdAt);
        return orderDate >= startOfMonth;
      });
      
      const totalIncome = monthOrders.reduce((sum, order) => sum + order.price, 0);
      
      return {
        title: 'Laporan Bulanan',
        date: now.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' }),
        orderCount: monthOrders.length,
        totalIncome
      };
    }
  };
  
  const report = generateReport();
  
  const exportToCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "ID Order,Nama Pelanggan,Layanan,Status,Harga,Tanggal\n";
    
    const filteredOrders = reportType === 'daily' 
      ? orders.filter(order => {
          const orderDate = new Date(order.createdAt);
          const today = new Date();
          return orderDate.toDateString() === today.toDateString();
        })
      : orders.filter(order => {
          const orderDate = new Date(order.createdAt);
          const now = new Date();
          return orderDate.getMonth() === now.getMonth() && 
                 orderDate.getFullYear() === now.getFullYear();
        });
    
    filteredOrders.forEach(order => {
      const row = `${order.id},${order.customerName},${order.serviceType},${order.status},${order.price},${new Date(order.createdAt).toLocaleDateString('id-ID')}`;
      csvContent += row + "\n";
    });
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${report.title.replace(' ', '_')}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    
    link.click();
  };
  
  return (
    <div className="reports">
      <h1>Laporan</h1>
      
      <div className="report-controls">
        <div className="report-type-selector">
          <label>Jenis Laporan:</label>
          <select 
            value={reportType} 
            onChange={(e) => setReportType(e.target.value)}
          >
            <option value="daily">Harian</option>
            <option value="monthly">Bulanan</option>
          </select>
        </div>
        
        <button onClick={exportToCSV} className="export-btn">
          Export ke CSV
        </button>
      </div>
      
      <div className="report-summary">
        <h2>{report.title}</h2>
        <p>Periode: {report.date}</p>
        
        <div className="report-stats">
          <div className="stat-card">
            <h3>Jumlah Order</h3>
            <p className="stat-number">{report.orderCount}</p>
          </div>
          
          <div className="stat-card">
            <h3>Total Pemasukan</h3>
            <p className="stat-number">Rp {report.totalIncome.toLocaleString('id-ID')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;