// DashboardPage.jsx

import React from 'react';
import ProfileInfo from '../../Components/dashboard/ProfileInfo';
import NotificationsDabbawala from '../../Components/dashboard/NotificationsDabbawala';
import OrdersSection from '../../Components/dashboard/OrdersSection';
import DabbawalaFeedback from '../../Components/dashboard/DabbawalaFeedback';
import './DashboardPage.css'; // Import CSS file for styling

const DashboardPage = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-header">Welcome Sarah to your Dashboard!</h1>
      <div className="dashboard-containers">
        <div className="profile-info-container">
          <ProfileInfo />
        </div>

        <div className="notifications-container">
          
          <NotificationsDabbawala />
        </div>

        <div className="orders-container">
          <OrdersSection />
        </div>

        <div className="feedback-container">
        
          <DabbawalaFeedback />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
