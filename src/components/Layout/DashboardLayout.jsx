import React from 'react';
import Sidebar from './Sidebar';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-4 md:p-8 transition-colors duration-300">
        <div className="mx-auto max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
}
