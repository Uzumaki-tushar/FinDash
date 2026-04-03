import React, { useEffect } from 'react';
import { useStore } from './store/useStore';
import DashboardLayout from './components/Layout/DashboardLayout';
import SummaryCards from './components/Dashboard/SummaryCards';
import Visualizations from './components/Dashboard/Visualizations';
import Insights from './components/Dashboard/Insights';
import TransactionsTable from './components/Transactions/TransactionsTable';

function App() {
  const { isDarkMode } = useStore();

  useEffect(() => {
    // Initial sync with DOM just in case
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
        </div>
        
        <SummaryCards />
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <div className="col-span-1 lg:col-span-4">
            <Visualizations />
          </div>
          <div className="col-span-1 lg:col-span-3">
            <Insights />
          </div>
        </div>

        <TransactionsTable />
      </div>
    </DashboardLayout>
  );
}

export default App;
