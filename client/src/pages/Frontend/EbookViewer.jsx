import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import ApiConfig from '../../config/apiConfig';
import { getDataHandler } from '../../config/services';
import { Document, Page, pdfjs } from "react-pdf";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
const EbookViewer = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [ebook, setEbook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [numPages, setNumPages] = useState(0);
const [pageWidth, setPageWidth] = useState(900);
pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;
  useEffect(() => {
    const fetchEbook = async () => {
      try {
        const endpoint = ApiConfig.ebooksbyslug(slug);
        const response = await getDataHandler(endpoint, null, null, true);      
        if (response) {
          setEbook(response);
        } else {
          navigate('/ebooks', { replace: true });
        }
      } catch (error) {
        console.error('Error fetching ebook:', error);
        setError('Failed to load eBook');
      } finally {
        setLoading(false);
      }
    };

    fetchEbook();
  }, [slug, navigate]);

const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
};
  // Security measures - prevent right-click
  useEffect(() => {
    const preventDefault = (e) => e.preventDefault();
    document.addEventListener('contextmenu', preventDefault);
    
    // Prevent keyboard shortcuts
    const handleKeyDown = (e) => {
      if (e.ctrlKey && (e.key === 's' || e.key === 'p')) {
        e.preventDefault();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    window.onbeforeprint = () => false;

    return () => {
      document.removeEventListener('contextmenu', preventDefault);
      document.removeEventListener('keydown', handleKeyDown);
      window.onbeforeprint = null;
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4D2C5E] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your eBook...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading eBook</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => navigate('/ebooks')}
            className="bg-[#4D2C5E] text-white px-6 py-3 rounded-lg hover:bg-[#5a3a6e] transition-colors"
          >
            Back to eBooks
          </button>
        </div>
      </div>
    );
  }

  if (!ebook) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">eBook Not Found</h2>
          <button 
            onClick={() => navigate('/ebooks')}
            className="bg-[#4D2C5E] text-white px-6 py-3 rounded-lg hover:bg-[#5a3a6e] transition-colors"
          >
            Back to eBooks
          </button>
        </div>
      </div>
    );
  }

  // Use Google Docs viewer to prevent download

  return (
    <div className="min-h-screen bg-gray-900">
      <Helmet>
        <title>{ebook.title} | Upskillab eBook</title>
        <meta name="description" content={`Read "${ebook.title}" - Free educational eBook from Upskillab`} />
      <link rel="canonical" href={`https://upskillab.com/ebooks/${ebook.slug}`} />
      </Helmet>

      {/* Simple Header */}
      <motion.div 
        className="bg-gray-800 text-white p-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate('/ebooks')}
            className="flex items-center text-gray-300 hover:text-white transition-colors text-sm sm:text-base"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to eBooks
          </button>
          
          <h1 className="text-sm sm:text-lg font-semibold truncate max-w-xs sm:max-w-md text-center mx-2">
            {ebook.title}
          </h1>
          
          <div className="text-xs text-gray-400 hidden sm:block">
            Read-only View
          </div>
        </div>
      </motion.div>

      {/* PDF Viewer */}
      <div className="overflow-y-auto h-screen bg-gray-100">
    <Document
  file={ebook.pdfLink}
  onLoadSuccess={onDocumentLoadSuccess}
  onLoadError={(error) => {
    console.log("FULL ERROR:", error);
    console.log("MESSAGE:", error.message);
    console.log("NAME:", error.name);
  }}
>
        {Array.from(new Array(numPages), (_, index) => (
            <div
                key={index}
                className="flex justify-center mb-4"
            >
                <Page
                    pageNumber={index + 1}
                    width={pageWidth}
                    renderAnnotationLayer={false}
                    renderTextLayer={false}
                />
            </div>
        ))}
    </Document>
</div>
      <motion.div 
        className="h-screen bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
  
        
        {/* Security overlay to prevent interactions */}
        <div 
          className="fixed inset-0 pointer-events-none"
          style={{
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none'
          }}
        />
      </motion.div>

      {/* Footer Instructions */}
      <motion.div 
        className="bg-gray-800 text-center p-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <p className="text-gray-300 text-sm">
          📖 Scroll to navigate • This eBook is for viewing only
        </p>
      </motion.div>
    </div>
  );
};

export default EbookViewer;