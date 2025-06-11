// components/DownloadSalesReportButton.jsx
import React from "react";


const DownloadSalesReportButton = () => {
  const handleDownload = () => {
    window.open("http://localhost:4000/api/reports/sales/pdf", "_blank");
  };

  return (
    <button onClick={handleDownload} className="download-button">
      Download Sales Report (PDF)
    </button>
  );
};

export default DownloadSalesReportButton;
