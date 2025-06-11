import React from 'react';
import './Reports.css';

// Importing report download buttons
import DownloadSalesReportButton from '../../components/DownloadSalesReportButton/DownloadSalesReportButton';
import DownloadOrdersReportButton from '../../components/DownloadOrdersReportButton/DownloadOrdersReportButton';
import DownloadFoodPerformanceReportButton from '../../components/DownloadFoodPerformanceReportButton/DownloadFoodPerformanceReportButton';

// Importing React Icons
import { FaChartLine, FaClipboardList, FaUtensils } from 'react-icons/fa';

const Reports = () => {
  return (
    <div className="reports-page-container">
      <h2 className="reports-title">Business Reports</h2>
      <p className="reports-subtitle">Generate and download key business reports below.</p>

      {/* Wrapper for report cards */}
      <div className="reports-buttons-wrapper">

        {/* Sales Report */}
        <div className="report-card">
          <FaChartLine className="report-icon" />
          <h3>Sales Report</h3>
          <p>Get a detailed report of your sales performance.</p>
          <DownloadSalesReportButton />
        </div>

        {/* Orders Report */}
        <div className="report-card">
          <FaClipboardList className="report-icon" />
          <h3>Orders Report</h3>
          <p>Download reports on recent and historical orders.</p>
          <DownloadOrdersReportButton />
        </div>

        {/* Food Performance Report */}
        <div className="report-card">
          <FaUtensils className="report-icon" />
          <h3>Food Performance</h3>
          <p>See which dishes are performing best.</p>
          <DownloadFoodPerformanceReportButton />
        </div>

      </div>
    </div>
  );
};

export default Reports;
