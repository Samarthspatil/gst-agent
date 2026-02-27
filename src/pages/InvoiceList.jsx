import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { invoicesAPI } from '../api/invoices';
import Button from '../components/Button';
import Loader from '../components/Loader';
import Toast from '../components/Toast';

const InvoiceList = () => {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      setIsLoading(true);
      const data = await invoicesAPI.getAllInvoices();
      setInvoices(data.invoices || data || []);
    } catch (error) {
      setToast({
        message: error.response?.data?.detail || 'Failed to fetch invoices',
        type: 'error',
      });
      console.error('Error fetching invoices:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleView = (id) => {
    navigate(`/invoices/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/invoices/${id}/edit`);
  };

  const handleDelete = async (id, invoiceNumber) => {
    if (!window.confirm(`Are you sure you want to delete invoice ${invoiceNumber}?`)) {
      return;
    }

    try {
      setDeletingId(id);
      await invoicesAPI.deleteInvoice(id);
      
      setToast({
        message: 'Invoice deleted successfully!',
        type: 'success',
      });
      
      // Refresh the invoice list
      await fetchInvoices();
    } catch (error) {
      setToast({
        message: error.response?.data?.detail || 'Failed to delete invoice',
        type: 'error',
      });
      console.error('Error deleting invoice:', error);
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN');
  };

  const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return '-';
    return `₹${parseFloat(amount).toFixed(2)}`;
  };

  const closeToast = () => setToast(null);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-garnet to-garnet-dark text-white rounded-3xl p-8 mb-10 shadow-lg border border-cotton/20">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-4xl font-bold mb-2">📋 All Invoices</h1>
                <p className="text-white/90 text-lg">Manage and review your uploaded invoices</p>
              </div>
              <Button
                variant="primary"
                onClick={() => navigate('/upload')}
                className="bg-white text-garnet hover:bg-cotton shadow-lg"
              >
                + Upload New
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="bg-white rounded-3xl shadow-md p-12 border border-garnet/10">
              <Loader text="Loading invoices..." />
            </div>
          ) : invoices.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-md p-12 text-center border border-garnet/10">
              <svg
                className="h-24 w-24 text-gray-400 mx-auto mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-garnet mb-2">No invoices found</h3>
              <p className="text-garnet/60 mb-6">Upload your first invoice to get started</p>
              <Button
                variant="primary"
                onClick={() => navigate('/upload')}
              >
                Upload Invoice
              </Button>
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-md overflow-hidden border border-garnet/10">
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full divide-y divide-garnet/10">
                  <thead className="bg-khaki/10">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-garnet uppercase tracking-wider">
                        Invoice Number
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-garnet uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-garnet uppercase tracking-wider">
                        GSTIN
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-garnet uppercase tracking-wider">
                        Taxable Value
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-garnet uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-garnet uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-garnet/5">
                    {invoices.map((invoice) => (
                      <tr key={invoice.id} className="hover:bg-khaki/ transition">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-garnet">
                          {invoice.invoiceNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-garnet/70">
                          {formatDate(invoice.invoiceDate)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-garnet/70">
                          {invoice.gstin}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-garnet/70">
                          {formatCurrency(invoice.taxableValue)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-garnet">
                          {formatCurrency(invoice.totalAmount)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          <div className="flex space-x-3">
                            <button
                              onClick={() => handleView(invoice.id)}
                              className="text-cotton hover:text-cotton-dark font-semibold transition"
                            >
                              View
                            </button>
                            <span className="text-gray-300">|</span>
                            <button
                              onClick={() => handleEdit(invoice.id)}
                              className="text-khaki hover:text-khaki-dark font-semibold transition"
                            >
                              Edit
                            </button>
                            <span className="text-gray-300">|</span>
                            <button
                              onClick={() => handleDelete(invoice.id, invoice.invoiceNumber)}
                              disabled={deletingId === invoice.id}
                              className="text-red-600 hover:text-red-800 font-semibold transition disabled:opacity-50"
                            >
                              {deletingId === invoice.id ? 'Deleting...' : 'Delete'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden">
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="border-b border-garnet/10 p-4 hover:bg-khaki/5 transition">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-garnet">{invoice.invoiceNumber}</h3>
                      <span className="text-sm text-garnet bg-cotton/10 px-3 py-1 rounded-full">{formatDate(invoice.invoiceDate)}</span>
                    </div>
                    <div className="space-y-1 text-sm text-garnet/70 mb-3">
                      <p>GSTIN: {invoice.gstin}</p>
                      <p>Taxable: {formatCurrency(invoice.taxable_value)}</p>
                      <p className="font-semibold text-garnet">Total: {formatCurrency(invoice.total_amount)}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleView(invoice.id)}
                        className="flex-1 px-4 py-2 bg-cotton text-white rounded-2xl hover:bg-cotton-dark text-sm font-medium transition shadow-sm"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleEdit(invoice.id)}
                        className="flex-1 px-4 py-2 bg-khaki text-white rounded-2xl hover:bg-khaki-dark text-sm font-medium transition shadow-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(invoice.id, invoice.invoiceNumber)}
                        disabled={deletingId === invoice.id}
                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-2xl hover:bg-red-700 text-sm font-medium transition shadow-sm disabled:opacity-50"
                      >
                        {deletingId === invoice.id ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={closeToast}
        />
      )}
    </div>
  );
};

export default InvoiceList;
