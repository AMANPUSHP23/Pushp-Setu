import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '@/layouts/DashboardLayout';
import HomePage from '@/pages/HomePage'; 
import ChoresDashboard from '@/modules/Chores/ChoresDashboard';
import MealPlanner from '@/modules/Meals/MealPlanner';
import BudgetDashboard from '@/modules/Budget/BudgetDashboard';
import CalendarPage from '@/modules/Calendar/CalendarPage';
import MedicationList from '@/modules/Medications/MedicationList';
import FamilyProfileList from '@/modules/EmergencyInfo/FamilyProfileList';
import NotFoundPage from '@/pages/NotFoundPage';
import SettingsPage from '@/pages/SettingsPage'; 
import LogoutPage from '@/pages/LogoutPage';
import HouseholdHubPage from '@/pages/HouseholdHubPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<HomePage />} />
        <Route path="chores" element={<ChoresDashboard />} />
        <Route path="meals" element={<MealPlanner />} />
        <Route path="budget" element={<BudgetDashboard />} />
        <Route path="calendar" element={<CalendarPage />} />
        <Route path="medications" element={<MedicationList />} />
        <Route path="emergency-info" element={<FamilyProfileList />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="logout" element={<LogoutPage />} />
        <Route path="hub" element={<HouseholdHubPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
  