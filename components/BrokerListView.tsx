
import React, { useState } from 'react';
import { Search, Plus, Mail, Phone, Building2, UserCheck, MoreHorizontal } from 'lucide-react';
import { MOCK_BROKERS } from '../constants';
import { Broker } from '../types';

const BrokerListView: React.FC = () => {
  const [brokers] = useState<Broker[]>(MOCK_BROKERS);
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = brokers.filter(b => b.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Brokers</h2>
          <p className="text-slate-500 font-medium">Manage your team of real estate professionals.</p>
        </div>
        <button className="bg-orange-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center space-x-2 hover:bg-orange-700 transition-all shadow-xl shadow-orange-200">
          <Plus size={20} />
          <span>Add Broker</span>
        </button>
      </header>

      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          type="text"
          placeholder="Search brokers..."
          className="w-full pl-12 pr-4 py-3 bg-white border border-slate-100 rounded-2xl focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map(broker => (
          <div key={broker.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img src={broker.avatar} className="w-16 h-16 rounded-2xl object-cover" alt={broker.name} />
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${broker.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 leading-none mb-1">{broker.name}</h3>
                  <span className="text-xs font-bold text-orange-600 uppercase tracking-widest">{broker.status}</span>
                </div>
              </div>
              <button className="text-slate-300 hover:text-slate-600 transition-colors">
                <MoreHorizontal size={20} />
              </button>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3 text-slate-500">
                <Mail size={16} className="text-slate-400" />
                <span className="text-sm font-medium">{broker.email}</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-500">
                <Phone size={16} className="text-slate-400" />
                <span className="text-sm font-medium">{broker.phone}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-50">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 text-slate-900 font-black text-xl mb-1">
                  <Building2 size={16} className="text-orange-500" />
                  <span>{broker.activeProperties}</span>
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Listings</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 text-slate-900 font-black text-xl mb-1">
                  <UserCheck size={16} className="text-green-500" />
                  <span>{Math.floor(broker.activeProperties * 1.5)}</span>
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Closed Deals</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrokerListView;
