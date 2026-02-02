
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MarketingView from './views/MarketingView';
import LoginView from './views/LoginView';
import OnboardingView from './views/OnboardingView';
import DashboardView from './views/DashboardView';
import SendRequestsView from './views/SendRequestsView';
import FeedbackInboxView from './views/FeedbackInboxView';
import BillingView from './views/BillingView';
import PublicRatingView from './views/PublicRatingView';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50">
        <Routes>
          <Route path="/" element={<MarketingView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/setup" element={<OnboardingView />} />
          <Route path="/dashboard" element={<DashboardView />} />
          <Route path="/dashboard/send" element={<SendRequestsView />} />
          <Route path="/dashboard/inbox" element={<FeedbackInboxView />} />
          <Route path="/dashboard/billing" element={<BillingView />} />
          <Route path="/rate/:businessId" element={<PublicRatingView />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
