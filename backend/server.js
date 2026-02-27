import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// In-memory database for invoices
let invoices = [
  {
    id: '1',
    invoiceNumber: 'INV-001',
    invoiceDate: '2026-02-15',
    gstin: '29ABCDE1234F1Z5',
    taxableValue: 10000,
    cgst: 900,
    sgst: 900,
    igst: 0,
    totalAmount: 11800,
    createdAt: '2026-02-15T10:30:00Z',
    updatedAt: '2026-02-15T10:30:00Z',
  },
  {
    id: '2',
    invoiceNumber: 'INV-002',
    invoiceDate: '2026-02-20',
    gstin: '27XYZAB5678G2H9',
    taxableValue: 15000,
    cgst: 1350,
    sgst: 1350,
    igst: 0,
    totalAmount: 17700,
    createdAt: '2026-02-20T14:20:00Z',
    updatedAt: '2026-02-20T14:20:00Z',
  },
];

// API Routes

// Get invoice count
app.get('/api/v1/invoices/count', (req, res) => {
  res.json({ count: invoices.length });
});

// Get all invoices
app.get('/api/v1/invoices', (req, res) => {
  res.json({ invoices });
});

// Get invoice by ID
app.get('/api/v1/invoices/:id', (req, res) => {
  const invoice = invoices.find(inv => inv.id === req.params.id);
  if (!invoice) {
    return res.status(404).json({ error: 'Invoice not found' });
  }
  res.json({ invoice });
});

// New simplified endpoints
// Get all invoices
app.get('/invoices', (req, res) => {
  console.log('📥 Received GET /invoices');
  console.log('📊 Returning', invoices.length, 'invoices');
  res.json({ invoices });
});

// Get invoice by ID
app.get('/invoices/:id', (req, res) => {
  console.log('📥 Received GET /invoices/:id', req.params.id);
  const invoice = invoices.find(inv => inv.id === req.params.id);
  if (!invoice) {
    console.log('❌ Invoice not found:', req.params.id);
    return res.status(404).json({ error: 'Invoice not found' });
  }
  console.log('✅ Invoice found:', invoice);
  res.json({ invoice });
});

// Upload invoice image and extract data
app.post('/api/v1/invoices/upload', upload.single('invoice'), (req, res) => {
  // Mock extracted data from image
  const extractedData = {
    invoiceNumber: `INV-${Math.floor(Math.random() * 1000)}`,
    invoiceDate: new Date().toISOString().split('T')[0],
    gstin: '29ABCDE1234F1Z5',
    taxableValue: Math.floor(Math.random() * 20000) + 5000,
    cgst: 0,
    sgst: 0,
    igst: 0,
  };
  
  extractedData.cgst = extractedData.taxableValue * 0.09;
  extractedData.sgst = extractedData.taxableValue * 0.09;
  extractedData.totalAmount = extractedData.taxableValue + extractedData.cgst + extractedData.sgst;

  res.json({ data: extractedData });
});

// Create new invoice
app.post('/save-invoice', (req, res) => {
  console.log('📥 Received POST /save-invoice');
  console.log('📦 Request Body:', req.body);
  
  try {
    const invoiceData = req.body;
    
    // Generate new ID
    const newId = invoices.length > 0 
      ? String(Math.max(...invoices.map(inv => parseInt(inv.id))) + 1)
      : '3';
    
    const newInvoice = {
      id: newId,
      invoiceNumber: invoiceData.invoice_number,
      invoiceDate: invoiceData.invoice_date,
      gstin: invoiceData.gstin,
      taxableValue: parseFloat(invoiceData.taxable_value) || 0,
      cgst: parseFloat(invoiceData.cgst) || 0,
      sgst: parseFloat(invoiceData.sgst) || 0,
      igst: parseFloat(invoiceData.igst) || 0,
      totalAmount: parseFloat(invoiceData.total_amount) || 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    invoices.push(newInvoice);
    
    console.log('✅ Invoice created:', newInvoice);
    console.log('📊 Total invoices:', invoices.length);
    
    res.status(201).json({ invoice: newInvoice });
  } catch (error) {
    console.error('❌ Error creating invoice:', error);
    res.status(500).json({ error: 'Failed to create invoice', detail: error.message });
  }
});

// Update invoice
app.put('/api/v1/invoices/:id', (req, res) => {
  const index = invoices.findIndex(inv => inv.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Invoice not found' });
  }
  
  invoices[index] = {
    ...invoices[index],
    ...req.body,
    updatedAt: new Date().toISOString(),
  };
  
  res.json({ invoice: invoices[index] });
});

// Delete invoice
app.delete('/api/v1/invoices/:id', (req, res) => {
  const index = invoices.findIndex(inv => inv.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Invoice not found' });
  }
  
  invoices.splice(index, 1);
  res.json({ message: 'Invoice deleted successfully' });
});

// Generate GSTR-1
app.post('/api/v1/gstr1/generate', (req, res) => {
  const { month, year } = req.body;
  
  // Filter invoices by month and year
  const filteredInvoices = invoices.filter(invoice => {
    const invoiceDate = new Date(invoice.invoiceDate);
    return (
      invoiceDate.getMonth() + 1 === parseInt(month) &&
      invoiceDate.getFullYear() === parseInt(year)
    );
  });

  // Generate CSV content
  const csvHeader = 'Invoice Number,Date,GSTIN,Taxable Value,CGST,SGST,IGST,Total Amount\n';
  const csvRows = filteredInvoices.map(inv => 
    `${inv.invoiceNumber},${inv.invoiceDate},${inv.gstin},${inv.taxableValue},${inv.cgst},${inv.sgst},${inv.igst},${inv.totalAmount}`
  ).join('\n');
  
  const csvContent = csvHeader + csvRows;
  
  res.json({
    csvContent,
    filename: `GSTR1_${month}_${year}.csv`,
    count: filteredInvoices.length,
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📊 API endpoints available at http://localhost:${PORT}/api/v1/`);
});
