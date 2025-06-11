
import React from 'react';
import './DownloadFoodPerformanceReportButton.css'; // Assuming you have a CSS file for styling


const DownloadFoodPerformanceReportButton = () => {
  const handleDownload = () => {
    window.open("http://localhost:4000/api/reports/food-performance/pdf", "_blank");
  };

  return (
    <button onClick={handleDownload} className="download-button">
      Download Food Performance Report (PDF)
    </button>
  );
};

export default DownloadFoodPerformanceReportButton;
