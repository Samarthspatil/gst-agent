import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import UploadInvoice from './pages/UploadInvoice';
import InvoiceList from './pages/InvoiceList';
import InvoiceDetail from './pages/InvoiceDetail';
import EditInvoice from './pages/EditInvoice';
import GenerateGSTR1 from './pages/GenerateGSTR1';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/upload" element={<UploadInvoice />} />
          <Route path="/invoices" element={<InvoiceList />} />
          <Route path="/invoices/:id" element={<InvoiceDetail />} />
          <Route path="/invoices/:id/edit" element={<EditInvoice />} />
          <Route path="/generate-gstr1" element={<GenerateGSTR1 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
