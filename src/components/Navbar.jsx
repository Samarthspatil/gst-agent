import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'text-garnet font-bold border-b-2 border-cotton' : 'text-garnet/70';
  };

  return (
    <nav className="bg-white shadow-md border-b border-cotton/30">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-cotton/20 p-2 rounded-xl border border-cotton/40">
              <span className="text-3xl">📊</span>
            </div>
            <span className="text-2xl font-bold text-garnet">
              Smart GST Filing
            </span>
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium hover:text-cotton transition pb-1 ${isActive('/')}`}
            >
              Home
            </Link>
            <Link
              to="/invoices"
              className={`text-sm font-medium hover:text-cotton transition pb-1 ${isActive('/invoices')}`}
            >
              Invoices
            </Link>
            <Link
              to="/upload"
              className={`text-sm font-medium hover:text-cotton transition pb-1 ${isActive('/upload')}`}
            >
              Upload
            </Link>
            <Link
              to="/generate-gstr1"
              className={`text-sm font-medium hover:text-cotton transition pb-1 ${isActive('/generate-gstr1')}`}
            >
              Generate GSTR-1
            </Link>
          </div>
          <Link to="/upload" className="hidden md:block">
            <button className="bg-garnet hover:bg-cotton text-white px-6 py-3 rounded-full text-sm font-semibold transition shadow-md">
              📤 Upload Invoice
            </button>
          </Link>
          <div className="md:hidden">
            <button className="text-primary focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
