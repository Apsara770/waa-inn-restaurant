import React from "react";


const DownloadOrdersReportButton = () => {
  const handleDownload = () => {
    window.open("http://localhost:4000/api/reports/orders/pdf", "_blank"); // 4000 is the backend port
  };

  return (
    <button onClick={handleDownload} className="download-button">
      Download Orders Report (PDF)
    </button>
  );
};

export default DownloadOrdersReportButton;
