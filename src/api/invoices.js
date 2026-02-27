import apiClient from './axios';

const OCR_API_URL = import.meta.env.VITE_OCR_API_URL || 'http://localhost:8000';

export const invoicesAPI = {
  // Upload invoice image and get extracted data using external OCR API
  uploadInvoice: async (formData) => {
    console.log('🔗 Calling OCR API:', OCR_API_URL);
    
    const response = await fetch(`${OCR_API_URL}/process-invoice`, {
      method: 'POST',
      headers: {
        'ngrok-skip-browser-warning': 'true',
      },
      body: formData,
    });
    
    console.log('📡 Response Status:', response.status);
    console.log('📡 Response OK:', response.ok);
    console.log('📡 Response Headers:', [...response.headers.entries()]);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API Error Response:', errorText);
      throw new Error(`Failed to process invoice: ${response.status} - ${errorText}`);
    }
    
    const textResponse = await response.text();
    console.log('📄 Raw Text Response:', textResponse);
    console.log('📏 Response Length:', textResponse.length);
    
    try {
      const data = JSON.parse(textResponse);
      console.log('📦 Parsed JSON Data:', data);
      console.log('📦 Data Type:', typeof data);
      console.log('📦 Data Keys:', Object.keys(data));
      console.log('📦 Data Values:', Object.values(data));
      
      // Log each field individually
      console.log('🔍 invoice_number:', data.invoice_number);
      console.log('🔍 invoice_date:', data.invoice_date);
      console.log('🔍 gstin:', data.gstin);
      console.log('🔍 taxable_value:', data.taxable_value);
      console.log('🔍 GSTIN (uppercase):', data.GSTIN);
      console.log('🔍 All data:', JSON.stringify(data, null, 2));
      
      return data;
    } catch (parseError) {
      console.error('❌ JSON Parse Error:', parseError);
      console.error('❌ Could not parse response as JSON');
      throw new Error('Invalid JSON response from server');
    }
  },

  // Create new invoice
  createInvoice: async (data) => {
    console.log('📤 Creating invoice with data:', data);
    const response = await apiClient.post('/save-invoice', data);
    console.log('📥 Create invoice response:', response.data);
    return response.data;
  },

  // Get all invoices
  getAllInvoices: async () => {
    console.log('📥 Fetching all invoices from /invoices');
    const response = await apiClient.get('/invoices');
    console.log('📦 Invoices response:', response.data);
    return response.data;
  },

  // Get invoice by ID
  getInvoiceById: async (id) => {
    console.log('📥 Fetching invoice by ID:', id);
    const response = await apiClient.get(`/invoices/${id}`);
    console.log('📦 Invoice response:', response.data);
    return response.data;
  },

  // Update invoice
  updateInvoice: async (id, data) => {
    const response = await apiClient.put(`/api/v1/invoices/${id}`, data);
    return response.data;
  },

  // Delete invoice
  deleteInvoice: async (id) => {
    const response = await apiClient.delete(`/api/v1/invoices/${id}`);
    return response.data;
  },

  // Get invoice count
  getInvoiceCount: async () => {
    const response = await apiClient.get('/api/v1/invoices/count');
    return response.data;
  },
};
