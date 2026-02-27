import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { invoicesAPI } from '../api/invoices';
import Button from '../components/Button';
import Loader from '../components/Loader';
import Toast from '../components/Toast';

const InvoiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchInvoice();
  }, [id]);

  const fetchInvoice = async () => {
    try {
      setIsLoading(true);
      const data = await invoicesAPI.getInvoiceById(id);
      setInvoice(data);
    } catch (error) {
      setToast({
        message: error.response?.data?.detail || 'Failed to fetch invoice',
        type: 'error',
      });
      console.error('Error fetching invoice:', error);
    } finally {
      setIsLoading(false);
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

  if (isLoading) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-md p-12 border border-garnet/10">
            <Loader text="Loading invoice..." />
          </div>
        </div>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-md p-12 text-center border border-garnet/10">
            <h3 className="text-xl font-semibold text-garnet mb-4">Invoice not found</h3>
            <Button variant="primary" onClick={() => navigate('/invoices')} className="rounded-full">
              Go to Invoices
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-garnet to-garnet-dark text-white rounded-3xl p-8 mb-10 shadow-lg border border-cotton/20">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-4xl font-bold mb-2">📄 Invoice Details</h1>
                <p className="text-white/90 text-lg">View complete invoice information</p>
              </div>
              <div className="flex space-x-3">
                <Button
                  variant="primary"
                  onClick={() => navigate(`/invoices/${id}/edit`)}
                  className="bg-white text-garnet hover:bg-cotton shadow-lg"
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate('/invoices')}
                  className="border-2 border-white text-white hover:bg-white/20"
                >
                  Back
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-md p-8 border border-garnet/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-cotton/5 p-4 rounded-xl border border-cotton/20">
                <label className="block text-sm font-medium text-garnet mb-2">
                  Invoice Number
                </label>
                <p className="text-lg font-semibold text-garnet-dark">{invoice.invoiceNumber}</p>
              </div>

              <div className="bg-khaki/5 p-4 rounded-xl border border-khaki/20">
                <label className="block text-sm font-medium text-garnet mb-2">
                  Invoice Date
                </label>
                <p className="text-lg font-semibold text-garnet-dark">{formatDate(invoice.invoiceDate)}</p>
              </div>

              <div className="bg-cotton/5 p-4 rounded-xl border border-cotton/20">
                <label className="block text-sm font-medium text-garnet mb-2">
                  GSTIN
                </label>
                <p className="text-lg font-semibold text-garnet-dark">{invoice.gstin}</p>
              </div>

              <div className="bg-khaki/5 p-4 rounded-xl border border-khaki/20">
                <label className="block text-sm font-medium text-garnet mb-2">
                  Taxable Value
                </label>
                <p className="text-lg font-semibold text-garnet-dark">{formatCurrency(invoice.taxableValue)}</p>
              </div>

              <div className="bg-cotton/5 p-4 rounded-xl border border-cotton/20">
                <label className="block text-sm font-medium text-garnet mb-2">
                  CGST
                </label>
                <p className="text-lg font-semibold text-garnet-dark">{formatCurrency(invoice.cgst)}</p>
              </div>

              <div className="bg-khaki/5 p-4 rounded-xl border border-khaki/20">
                <label className="block text-sm font-medium text-garnet mb-2">
                  SGST
                </label>
                <p className="text-lg font-semibold text-garnet-dark">{formatCurrency(invoice.sgst)}</p>
              </div>

              <div className="bg-cotton/5 p-4 rounded-xl border border-cotton/20">
                <label className="block text-sm font-medium text-garnet mb-2">
                  IGST
                </label>
                <p className="text-lg font-semibold text-garnet-dark">{formatCurrency(invoice.igst)}</p>
              </div>

              <div className="bg-gradient-to-br from-khaki/10 to-cotton/10 p-4 rounded-xl border-2 border-garnet/20">
                <label className="block text-sm font-medium text-garnet mb-2">
                  Total Amount
                </label>
                <p className="text-2xl font-bold text-garnet">{formatCurrency(invoice.totalAmount)}</p>
              </div>
            </div>

            {invoice.createdAt && (
              <div className="mt-8 pt-6 border-t border-garnet/10 bg-khaki/5 rounded-lg p-4">
                <p className="text-sm text-garnet font-semibold">
                  Created: {new Date(invoice.createdAt).toLocaleString('en-IN')}
                </p>
                {invoice.updatedAt && invoice.updatedAt !== invoice.createdAt && (
                  <p className="text-sm text-garnet/60 mt-2">
                    Last Updated: {new Date(invoice.updatedAt).toLocaleString('en-IN')}
                  </p>
                )}
              </div>
            )}
          </div>
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

export default InvoiceDetail;
