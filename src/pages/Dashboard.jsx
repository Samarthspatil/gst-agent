import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { invoicesAPI } from '../api/invoices';
import Button from '../components/Button';
import Loader from '../components/Loader';
import Toast from '../components/Toast';

const Dashboard = () => {
  const navigate = useNavigate();
  const [invoiceCount, setInvoiceCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchInvoiceCount();
  }, []);

  const fetchInvoiceCount = async () => {
    try {
      setIsLoading(true);
      const data = await invoicesAPI.getInvoiceCount();
      setInvoiceCount(data.count || 0);
    } catch (error) {
      setToast({
        message: 'Failed to fetch invoice count',
        type: 'error',
      });
      console.error('Error fetching invoice count:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const closeToast = () => setToast(null);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-garnet via-garnet-light to-garnet-dark text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>
        </div>
        {/* Background Image on Right with Fade */}
        <div 
          className="absolute right-0 top-0 bottom-0 w-1/2 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1604719312566-8912e9227c6a?q=80&w=1200)',
            maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.6) 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.6) 100%)'
          }}
        ></div>
        <div className="relative container mx-auto px-6 py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-5 py-2.5 rounded-full mb-6 border border-white/30">
              <span className="text-2xl mr-2">📊</span>
              <p className="text-sm font-semibold tracking-wide">Smart GST Filing</p>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Simplify Your GST Filing Process
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-white/90">
              Upload invoices, extract data automatically, and generate GSTR-1 reports with ease.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate('/upload')}
                className="bg-cotton hover:bg-cotton-dark text-white shadow-lg text-lg px-8 py-4 rounded-full font-semibold transition"
              >
                Upload Invoice
              </button>
              <button
                onClick={() => navigate('/invoices')}
                className="border-2 border-white text-white hover:bg-white/20 backdrop-blur-sm text-lg px-8 py-4 rounded-full font-semibold transition"
              >
                View All Invoices
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {isLoading ? (
            <div className="bg-white rounded-3xl shadow-lg p-12">
              <Loader text="Loading dashboard..." />
            </div>
          ) : (
            <>
              {/* Stats Card */}
              <div className="bg-gradient-to-br from-khaki to-khaki-dark text-white rounded-3xl shadow-lg p-8 mb-12 border border-khaki-light/40">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/90 text-sm mb-2 font-medium tracking-wide uppercase">Total Invoices Uploaded</p>
                    <p className="text-6xl font-bold mb-2">{invoiceCount}</p>
                    <p className="text-sm text-white/80 mt-3">Ready for processing</p>
                  </div>
                  <div className="bg-white/25 backdrop-blur-sm rounded-full p-6 shadow-xl border-2 border-white/30">
                    <svg
                      className="h-16 w-16 text-white"
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
                  </div>
                </div>
              </div>

              {/* Feature Section */}
              <div className="mb-8 bg-khaki/10 rounded-2xl p-6 border-l-4 border-cotton">
                <h2 className="text-3xl font-bold text-garnet mb-2">What would you like to do?</h2>
                <p className="text-garnet/70 text-lg">Choose an action below to get started</p>
              </div>

              {/* Action Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-3xl shadow-md p-8 hover:shadow-lg transition border border-garnet/10">
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-cotton to-cotton-dark rounded-full p-5 w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-sm">
                      <svg
                        className="h-10 w-10 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-garnet">Upload Invoice</h3>
                    <p className="text-garnet/60 text-sm mb-6">
                      Upload invoice photos and extract data automatically
                    </p>
                    <button
                      onClick={() => navigate('/upload')}
                      className="bg-garnet hover:bg-cotton hover:text-garnet text-white px-8 py-3 rounded-full font-semibold transition shadow-md w-full"
                    >
                      Upload Now
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-3xl shadow-md p-8 hover:shadow-lg transition border border-garnet/10">
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-khaki to-khaki-dark rounded-full p-5 w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-sm">
                      <svg
                        className="h-10 w-10 text-white"
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
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-garnet">View Invoices</h3>
                    <p className="text-garnet/60 text-sm mb-6">
                      Browse and manage all your uploaded invoices
                    </p>
                    <button
                      onClick={() => navigate('/invoices')}
                      className="bg-garnet hover:bg-cotton hover:text-garnet text-white px-8 py-3 rounded-full font-semibold transition shadow-md w-full"
                    >
                      View All
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-3xl shadow-md p-8 hover:shadow-lg transition border border-garnet/10">
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-garnet to-garnet-dark rounded-full p-5 w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-sm">
                      <svg
                        className="h-10 w-10 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-garnet">Generate GSTR-1</h3>
                    <p className="text-garnet/60 text-sm mb-6">
                      Create GSTR-1 draft and download CSV file
                    </p>
                    <button
                      onClick={() => navigate('/generate-gstr1')}
                      className="bg-garnet hover:bg-cotton hover:text-garnet text-white px-8 py-3 rounded-full font-semibold transition shadow-md w-full"
                    >
                      Generate
                    </button>
                  </div>
                </div>
              </div>
            </>
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

export default Dashboard;
