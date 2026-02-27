# GST Filing Agent - Frontend

A clean, modern, and responsive web application for managing GST invoice filing for small businesses.

## Features

- 📸 Upload invoice photos and extract data
- ✏️ Edit extracted invoice data
- 📋 View all invoices in a clean interface
- 📊 Generate GSTR-1 drafts
- 💾 Download CSV files for GST filing
- 📱 Fully responsive mobile-friendly design

## Tech Stack

- **React 18** - Modern functional components with hooks
- **React Router** - Client-side routing
- **Axios** - API calls and HTTP client
- **Tailwind CSS** - Utility-first styling
- **Vite** - Fast build tool and dev server

## Project Structure

```
src/
├── api/                  # API integration layer
│   ├── axios.js         # Axios configuration
│   ├── invoices.js      # Invoice API endpoints
│   └── gstr1.js         # GSTR-1 API endpoints
├── components/          # Reusable components
│   ├── Navbar.jsx       # Navigation bar
│   ├── Button.jsx       # Custom button component
│   ├── Loader.jsx       # Loading spinner
│   ├── Toast.jsx        # Notification component
│   └── InvoiceForm.jsx  # Invoice form component
├── pages/               # Page components
│   ├── Dashboard.jsx    # Main dashboard
│   ├── UploadInvoice.jsx    # Upload invoice page
│   ├── InvoiceList.jsx      # List all invoices
│   ├── InvoiceDetail.jsx    # Invoice details
│   ├── EditInvoice.jsx      # Edit invoice
│   └── GenerateGSTR1.jsx    # Generate GSTR-1
├── App.jsx              # Main app with routing
├── main.jsx             # Entry point
└── index.css            # Global styles
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

4. Update the `.env` file with your backend API URL:

```
VITE_API_BASE_URL=http://localhost:8000
```

### Development

Run the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Build

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## API Endpoints

The application expects the following backend API endpoints:

### Invoices

- `POST /api/v1/invoices/upload` - Upload invoice image
- `GET /api/v1/invoices` - Get all invoices
- `GET /api/v1/invoices/count` - Get invoice count
- `GET /api/v1/invoices/{id}` - Get invoice by ID
- `PUT /api/v1/invoices/{id}` - Update invoice
- `DELETE /api/v1/invoices/{id}` - Delete invoice

### GSTR-1

- `POST /api/v1/gstr1/generate` - Generate GSTR-1 draft

## Features Overview

### Dashboard
- Shows total invoice count
- Quick action buttons for common tasks
- Clean card-based layout

### Upload Invoice
- File upload for invoice images
- Real-time preview
- Extracted data displayed in editable form
- Validation and error handling

### Invoice List
- Table view for desktop
- Card view for mobile
- View and edit actions
- Formatted currency and dates

### Invoice Detail
- Full invoice information display
- Edit button for quick access
- Timestamps for audit trail

### Edit Invoice
- Pre-filled form with existing data
- Validation
- Success/error notifications

### Generate GSTR-1
- Month and year selection
- Generate draft button
- Download CSV functionality
- Helpful information display

## Design Features

- Clean white background with soft shadows
- Rounded cards for modern look
- Large, clear buttons
- Professional color scheme
- Mobile-first responsive design
- Accessible form inputs
- Loading states and error handling
- Toast notifications for user feedback

## License

MIT
