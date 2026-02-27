import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { invoicesAPI } from '../api/invoices';
import InvoiceForm from '../components/InvoiceForm';
import Button from '../components/Button';
import Loader from '../components/Loader';
import Toast from '../components/Toast';

const UploadInvoice = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [extractedData, setExtractedData] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setExtractedData(null);
    } else {
      setToast({
        message: 'Please select an image file',
        type: 'error',
      });
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setToast({
        message: 'Please select a file first',
        type: 'warning',
      });
      return;
    }

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('file', selectedFile);

      console.log('📤 Uploading file to OCR API...');
      const response = await invoicesAPI.uploadInvoice(formData);
      
      console.log('📥 Raw API Response:', response);
      console.log('📊 Response Type:', typeof response);
      console.log('🔍 Response Keys:', Object.keys(response));
      
      // Helper function to parse numeric values with currency symbols and commas
      const parseNumeric = (value) => {
        if (!value) return 0;
        // Remove currency symbols, commas, and spaces
        const cleaned = String(value).replace(/[₹,\s]/g, '');
        return parseFloat(cleaned) || 0;
      };
      
      // Helper function to convert date format from DD/MM/YYYY to YYYY-MM-DD
      const parseDate = (dateStr) => {
        if (!dateStr) return '';
        // Try DD/MM/YYYY format
        const ddmmyyyy = dateStr.match(/(\d{2})\/(\d{2})\/(\d{4})/);
        if (ddmmyyyy) {
          return `${ddmmyyyy[3]}-${ddmmyyyy[2]}-${ddmmyyyy[1]}`;
        }
        // Return as-is if already in YYYY-MM-DD format
        return dateStr;
      };
      
      // Extract data from nested invoice object
      const invoice = response.invoice || {};
      const seller = invoice.seller || {};
      const totals = invoice.totals || {};
      const firstItem = invoice.items && invoice.items[0] ? invoice.items[0] : {};
      
      // Map the response fields from nested structure
      const formattedData = {
        invoice_number: invoice.invoice_number || '',
          
        invoice_date: parseDate(invoice.invoice_date || ''),
        
        gstin: seller.gstin || '',
          
        taxable_value: parseNumeric(totals.taxable_value || firstItem.taxable_value || 0),
        
        cgst: parseNumeric(totals.total_cgst || firstItem.cgst_amount || 0),
        
        sgst: parseNumeric(totals.total_sgst || firstItem.sgst_amount || 0),
        
        igst: parseNumeric(totals.total_igst || firstItem.igst_amount || 0),
        
        total_amount: parseNumeric(totals.grand_total || 0),
      };
      
      // Calculate total if not provided
      if (formattedData.total_amount === 0) {
        formattedData.total_amount = formattedData.taxable_value 
          + formattedData.cgst 
          + formattedData.sgst 
          + formattedData.igst;
      }
      
      console.log('✅ Formatted Data:', formattedData);
      
      setExtractedData(formattedData);
      setToast({
        message: 'Invoice data extracted successfully!',
        type: 'success',
      });
    } catch (error) {
      console.error('❌ Upload Error:', error);
      console.error('❌ Error Message:', error.message);
      console.error('❌ Error Response:', error.response);
      setToast({
        message: error.message || error.response?.data?.detail || 'Failed to upload invoice',
        type: 'error',
      });
      console.error('Error uploading invoice:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      console.log('💾 Saving invoice data:', extractedData);
      
      // Create new invoice with extracted data
      const response = await invoicesAPI.createInvoice(extractedData);
      
      console.log('✅ Invoice saved successfully:', response);
      
      setToast({
        message: 'Invoice saved successfully!',
        type: 'success',
      });
      setTimeout(() => {
        navigate('/invoices');
      }, 1500);
    } catch (error) {
      console.error('❌ Save Error:', error);
      console.error('❌ Error Response:', error.response);
      console.error('❌ Error Data:', error.response?.data);
      setToast({
        message: error.response?.data?.detail || error.message || 'Failed to save invoice',
        type: 'error',
      });
      console.error('Error saving invoice:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  const closeToast = () => setToast(null);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-garnet to-garnet-dark text-white rounded-3xl p-8 mb-10 shadow-lg border border-cotton/20">
            <h1 className="text-4xl font-bold mb-3">📤 Upload Invoice</h1>
            <p className="text-white/90 text-lg">Upload invoice photos and we'll extract the data automatically</p>
          </div>

          {/* Upload Section */}
          {!extractedData && (
            <div className="bg-white rounded-3xl shadow-md p-8 mb-8 border border-garnet/10">
              <div className="mb-6">
                <label className="block text-sm font-semibold text-garnet mb-3">
                  Select Invoice Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full px-4 py-3 border border-garnet/20 rounded-2xl focus:ring-2 focus:ring-cotton focus:border-transparent transition bg-white shadow-sm"
                />
              </div>

              {previewUrl && (
                <div className="mb-6 bg-khaki/5 p-4 rounded-2xl">
                  <p className="text-sm font-semibold text-garnet mb-3">Preview:</p>
                  <div className="rounded-2xl overflow-hidden border border-garnet/10 shadow-sm">
                    <img
                      src={previewUrl}
                      alt="Invoice preview"
                      className="max-w-full h-auto"
                      style={{ maxHeight: '400px', margin: '0 auto', display: 'block' }}
                    />
                  </div>
                </div>
              )}

              <Button
                variant="primary"
                onClick={handleUpload}
                disabled={!selectedFile || isUploading}
                fullWidth
                className="rounded-2xl py-4"
              >
                {isUploading ? 'Processing...' : 'Upload and Extract Data'}
              </Button>

              {isUploading && (
                <div className="mt-8">
                  <Loader text="Processing invoice..." />
                </div>
              )}
            </div>
          )}

          {/* Extracted Data Form */}
          {extractedData && (
            <div className="bg-white rounded-3xl shadow-md p-8 border border-garnet/10">
              <div className="bg-cotton/10 rounded-2xl p-4 mb-6 border-l-4 border-cotton">
                <h2 className="text-2xl font-semibold text-garnet mb-1">
                  Extracted Invoice Data
                </h2>
                <p className="text-sm text-garnet/60 mb-0">
                  Review and edit the extracted data if needed, then click Save.
                </p>
              </div>

              <InvoiceForm
                invoice={extractedData}
                onChange={setExtractedData}
                onSubmit={handleSave}
                onCancel={handleCancel}
                isLoading={isSaving}
                submitLabel="Save Invoice"
              />
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

export default UploadInvoice;
