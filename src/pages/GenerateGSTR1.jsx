import React, { useState } from 'react';
import { gstr1API } from '../api/gstr1';
import Button from '../components/Button';
import Loader from '../components/Loader';
import Toast from '../components/Toast';

const GenerateGSTR1 = () => {
  const currentYear = new Date().getFullYear();
  const [formData, setFormData] = useState({
    month: new Date().getMonth() + 1,
    year: currentYear,
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [toast, setToast] = useState(null);

  const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' },
  ];

  const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: parseInt(value),
    });
  };

  const handleGenerate = async () => {
    try {
      setIsGenerating(true);
      setDownloadUrl(null);
      const data = await gstr1API.generateGSTR1(formData);
      
      if (data.download_url) {
        setDownloadUrl(data.download_url);
        setToast({
          message: 'GSTR-1 generated successfully!',
          type: 'success',
        });
      }
    } catch (error) {
      setToast({
        message: error.response?.data?.detail || 'Failed to generate GSTR-1',
        type: 'error',
      });
      console.error('Error generating GSTR-1:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async () => {
    try {
      const blob = await gstr1API.downloadGSTR1CSV(downloadUrl);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `GSTR1_${formData.month}_${formData.year}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      setToast({
        message: 'File downloaded successfully!',
        type: 'success',
      });
    } catch (error) {
      setToast({
        message: 'Failed to download file',
        type: 'error',
      });
      console.error('Error downloading file:', error);
    }
  };

  const closeToast = () => setToast(null);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-khaki to-khaki-dark text-white rounded-3xl p-8 mb-10 shadow-lg border border-khaki/20">
            <h1 className="text-4xl font-bold mb-3">📄 Generate GSTR-1</h1>
            <p className="text-white/90 text-lg">Download your GSTR-1 return in CSV format</p>
          </div>

          <div className="bg-white rounded-3xl shadow-md p-10 border border-garnet/10">
            <p className="text-garnet/60 mb-8">
              Select the month and year to generate GSTR-1 draft and download CSV file.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-garnet mb-2">
                  Month *
                </label>
                <select
                  name="month"
                  value={formData.month}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-garnet/20 rounded-xl focus:ring-2 focus:ring-cotton focus:border-transparent transition bg-white text-garnet shadow-sm"
                >
                  {months.map((month) => (
                    <option key={month.value} value={month.value}>
                      {month.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-garnet mb-2">
                  Year *
                </label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-garnet/20 rounded-xl focus:ring-2 focus:ring-cotton focus:border-transparent transition bg-white text-garnet shadow-sm"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>

              <Button
                variant="primary"
                onClick={handleGenerate}
                disabled={isGenerating}
                fullWidth
                className="rounded-xl py-4"
              >
              {isGenerating ? 'Generating...' : 'Generate GSTR-1 Draft'}
            </Button>

            {isGenerating && (
              <div className="mt-8">
                <Loader text="Generating GSTR-1 draft..." />
              </div>
            )}

            {downloadUrl && !isGenerating && (
              <div className="mt-8 p-6 bg-cotton/10 border border-cotton/20 rounded-2xl">
                <div className="flex items-center mb-4">
                  <svg
                    className="h-6 w-6 text-cotton mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="text-lg font-semibold text-garnet">
                    GSTR-1 Generated Successfully!
                  </h3>
                </div>
                <p className="text-garnet/60 mb-4">
                  Your GSTR-1 draft for {months.find(m => m.value === formData.month)?.label} {formData.year} is ready.
                </p>
                <Button
                  variant="success"
                  onClick={handleDownload}
                  fullWidth
                  className="rounded-xl"
                >
                  Download CSV File
                </Button>
              </div>
            )}
          </div>

          <div className="mt-8 bg-khaki/10 border border-khaki/20 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-garnet mb-3">Information</h3>
            <ul className="space-y-2 text-garnet/60 text-sm">
              <li>• The GSTR-1 draft will include all invoices for the selected month and year.</li>
              <li>• The CSV file can be uploaded to the GST portal.</li>
              <li>• Please verify all data before filing.</li>
              <li>• Make sure all invoices are correctly entered before generating.</li>
            </ul>
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

export default GenerateGSTR1;
