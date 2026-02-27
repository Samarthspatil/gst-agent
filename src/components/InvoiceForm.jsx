import React from 'react';
import Button from './Button';

const InvoiceForm = ({ invoice, onChange, onSubmit, onCancel, isLoading = false, submitLabel = 'Save' }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...invoice, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  const inputClassName = "w-full px-4 py-3 border border-garnet/20 rounded-xl focus:ring-2 focus:ring-cotton focus:border-transparent transition bg-white text-garnet shadow-sm";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-garnet mb-2">
            Invoice Number *
          </label>
          <input
            type="text"
            name="invoice_number"
            value={invoice.invoice_number || ''}
            onChange={handleInputChange}
            required
            className={inputClassName}
            placeholder="Enter invoice number"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-garnet mb-2">
            Invoice Date *
          </label>
          <input
            type="date"
            name="invoice_date"
            value={invoice.invoice_date || ''}
            onChange={handleInputChange}
            required
            className={inputClassName}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-garnet mb-2">
            GSTIN *
          </label>
          <input
            type="text"
            name="gstin"
            value={invoice.gstin || ''}
            onChange={handleInputChange}
            required
            pattern="[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}"
            className={inputClassName}
            placeholder="22AAAAA0000A1Z5"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-garnet mb-2">
            Taxable Value *
          </label>
          <input
            type="number"
            name="taxable_value"
            value={invoice.taxable_value || ''}
            onChange={handleInputChange}
            required
            step="0.01"
            min="0"
            className={inputClassName}
            placeholder="0.00"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-garnet mb-2">
            CGST
          </label>
          <input
            type="number"
            name="cgst"
            value={invoice.cgst || ''}
            onChange={handleInputChange}
            step="0.01"
            min="0"
            className={inputClassName}
            placeholder="0.00"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-garnet mb-2">
            SGST
          </label>
          <input
            type="number"
            name="sgst"
            value={invoice.sgst || ''}
            onChange={handleInputChange}
            step="0.01"
            min="0"
            className={inputClassName}
            placeholder="0.00"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-garnet mb-2">
            IGST
          </label>
          <input
            type="number"
            name="igst"
            value={invoice.igst || ''}
            onChange={handleInputChange}
            step="0.01"
            min="0"
            className={inputClassName}
            placeholder="0.00"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-garnet mb-2">
            Total Amount *
          </label>
          <input
            type="number"
            name="total_amount"
            value={invoice.total_amount || ''}
            onChange={handleInputChange}
            required
            step="0.01"
            min="0"
            className={inputClassName}
            placeholder="0.00"
          />
        </div>
      </div>

      <div className="flex space-x-4 pt-4">
        <Button
          type="submit"
          variant="primary"
          disabled={isLoading}
          className="rounded-full"
        >
          {isLoading ? 'Saving...' : submitLabel}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
          className="rounded-full"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default InvoiceForm;
