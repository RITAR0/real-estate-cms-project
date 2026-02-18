
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import DashboardView from './components/DashboardView';
import PropertyListView from './components/PropertyListView';
import BrokerListView from './components/BrokerListView';
import ClientListView from './components/ClientListView';
import LocationsView from './components/LocationsView';
import { Briefcase } from 'lucide-react';

const PlaceholderView: React.FC<{ name: string }> = ({ name }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
    <div className="p-10 bg-orange-100 rounded-[2.5rem] text-orange-600 shadow-xl shadow-orange-100">
      <Briefcase size={64} />
    </div>
    <h2 className="text-3xl font-black text-slate-900">{name} Management</h2>
    <p className="text-slate-500 max-w-md font-medium">
      This module is currently being optimized for high-volume transactions. 
      Check back soon for advanced {name.toLowerCase()} analytics.
    </p>
    <button className="bg-orange-600 text-white px-8 py-4 rounded-[2rem] font-black hover:bg-orange-700 transition-all shadow-xl shadow-orange-200 mt-4 uppercase tracking-widest text-xs">
      Create New Entry
    </button>
  </div>
);

const App: React.FC = () => {
  const [activeView, setActiveView] = useState('dashboard');

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView />;
      case 'properties':
        return <PropertyListView />;
      case 'brokers':
        return <BrokerListView />;
      case 'clients':
        return <ClientListView />;
      case 'locations':
        return <LocationsView />;
      case 'jobs':
        return <PlaceholderView name="Workflow" />;
      case 'documents':
        return <PlaceholderView name="E-Document" />;
      case 'settings':
        return <PlaceholderView name="Security" />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      <main className="flex-1 ml-64 p-12 transition-all duration-300 overflow-x-hidden">
        <div className="max-w-[1440px] mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
