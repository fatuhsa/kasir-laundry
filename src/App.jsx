import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { OrderProvider } from './context/OrderContext';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import OrderDetail from './pages/OrderDetail';
import AddOrder from './pages/AddOrder';
import Reports from './pages/Reports';
import BottomNav from './components/BottomNav';

// Placeholder pages for menu items
const Customers = () => <div className="page-container"><h1>Halaman Pelanggan</h1></div>;
const Services = () => <div className="page-container"><h1>Halaman Layanan</h1></div>;
const Expenses = () => <div className="page-container"><h1>Halaman Pengeluaran</h1></div>;
const ScanQR = () => <div className="page-container"><h1>Halaman Scan QR</h1></div>;
const PaymentMethods = () => <div className="page-container"><h1>Halaman Metode Pembayaran</h1></div>;
const Settings = () => <div className="page-container"><h1>Halaman Pengaturan</h1></div>;

function App() {
  return (
    <OrderProvider>
      <Router>
        <div className="app">
          <div className="app-container">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/order/:id" element={<OrderDetail />} />
              <Route path="/add-order" element={<AddOrder />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/services" element={<Services />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/scan-qr" element={<ScanQR />} />
              <Route path="/payment-methods" element={<PaymentMethods />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
          <BottomNav />
        </div>
      </Router>
    </OrderProvider>
  );
}

export default App;