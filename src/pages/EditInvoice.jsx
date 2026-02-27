import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { invoicesAPI } from '../api/invoices';
import InvoiceForm from '../components/InvoiceForm';
import Loader from '../components/Loader';
import Toast from '../components/Toast';

const EditInvoice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
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

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await invoicesAPI.updateInvoice(id, invoice);
      setToast({
        message: 'Invoice updated successfully!',
        type: 'success',
      });
      setTimeout(() => {
        navigate(`/invoices/${id}`);
      }, 1500);
    } catch (error) {
      setToast({
        message: error.response?.data?.detail || 'Failed to update invoice',
        type: 'error',
      });
      console.error('Error updating invoice:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    navigate(`/invoices/${id}`);
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
          <div className="bg-gradient-to-r from-cotton to-cotton-dark text-white rounded-3xl p-8 mb-10 shadow-lg border border-cotton/20">
            <h1 className="text-4xl font-bold mb-2">✏️ Edit Invoice</h1>
            <p className="text-white/90 text-lg">Update invoice information</p>
          </div>

          <div className="bg-white rounded-3xl shadow-md p-8 border border-garnet/10">
            <InvoiceForm
              invoice={invoice}
              onChange={setInvoice}
              onSubmit={handleSave}
              onCancel={handleCancel}
              isLoading={isSaving}
              submitLabel="Update Invoice"
            />
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

export default EditInvoice;
