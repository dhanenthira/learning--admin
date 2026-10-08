import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { UIProvider } from './context/UIContext';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Questions from './pages/Questions';
import CodingManagement from './pages/CodingManagement';
import Assessments from './pages/Assessments';
import BattlesMonitor from './pages/BattlesMonitor';
import Analytics from './pages/Analytics';

function ProtectedLayout() {
  const { admin } = useAuth();

  if (!admin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <UIProvider>
      <div className="admin-layout">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/students" element={<Students />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/coding" element={<CodingManagement />} />
          <Route path="/assessments" element={<Assessments />} />
          <Route path="/battles" element={<BattlesMonitor />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </UIProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<ProtectedLayout />} />
      </Routes>
    </AuthProvider>
  );
}
