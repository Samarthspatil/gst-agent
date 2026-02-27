# GST Filing Agent - Backend API

Simple Express backend server for the GST Filing Agent application.

## Features

- RESTful API for invoice management
- GSTR-1 CSV generation
- In-memory data storage (persists during server runtime)
- CORS enabled for frontend communication
- Sample invoice data included

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

The server will run on `http://localhost:8000`

## API Endpoints

### Health Check
- `GET /health` - Server health status

### Invoices
- `GET /api/v1/invoices/count` - Get total invoice count
- `GET /api/v1/invoices` - Get all invoices
- `GET /api/v1/invoices/:id` - Get invoice by ID
- `POST /api/v1/invoices/upload` - Upload invoice image (mock extraction)
- `POST /api/v1/invoices` - Create new invoice
- `PUT /api/v1/invoices/:id` - Update invoice
- `DELETE /api/v1/invoices/:id` - Delete invoice

### GSTR-1
- `POST /api/v1/gstr1/generate` - Generate GSTR-1 CSV
  - Request body: `{ "month": "2", "year": "2026" }`

## Sample Data

The server includes 2 sample invoices to get started:
- INV-001 (Feb 15, 2026) - ₹11,800
- INV-002 (Feb 20, 2026) - ₹17,700

## Notes

- Data is stored in-memory and will be reset when server restarts
- Upload functionality returns mock extracted data
- For production, connect to a real database
