import React, { useState, useEffect } from "react";
import {
  Building2,
  Users,
  UserCircle,
  Calendar,
  Map as MapIcon,
  TrendingUp,
  ArrowUpRight,
  Loader2,
  Globe,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { MOCK_PROPERTIES, MOCK_JOBS } from "../constants";
import MapView from "./MapView";

const DashboardView: React.FC = () => {
  const [insights, setInsights] = useState<string>("Analyzing market data for Lebanon...");
  const [loadingInsights, setLoadingInsights] = useState(true);

  const stats = [
    {
      label: "Lebanese Listings",
      value: MOCK_PROPERTIES.length,
      icon: Building2,
      color: "text-orange-600",
      bg: "bg-orange-100",
    },
    { label: "Active Brokers", value: 12, icon: Users, color: "text-green-600", bg: "bg-green-100" },
    { label: "Total Clients", value: 156, icon: UserCircle, color: "text-purple-600", bg: "bg-purple-100" },
    { label: "Site Visits", value: MOCK_JOBS.length, icon: Calendar, color: "text-blue-600", bg: "bg-blue-100" },
  ];

  const chartData = [
    { name: "Jan", sales: 4200 },
    { name: "Feb", sales: 3800 },
    { name: "Mar", sales: 2900 },
    { name: "Apr", sales: 4500 },
    { name: "May", sales: 5100 },
    { name: "Jun", sales: 4800 },
  ];

  return (
    <div className="space-y-6 pb-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-orange-600 font-bold text-xs uppercase tracking-widest mb-1">
            <Globe className="w-3 h-3" />
            <span>Regional Portfolio: Lebanon</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Main Dashboard</h2>
          <p className="text-slate-500 font-medium">Real-time management for your Lebanese properties.</p>
        </div>
        <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          <span className="text-xs font-bold text-slate-600">LIVE MARKET DATA</span>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-all group"
          >
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{stat.label}</p>
              <h3 className="text-3xl font-black text-slate-800">{stat.value}</h3>
            </div>
            <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl group-hover:scale-110 transition-transform`}>
              <stat.icon className="w-7 h-7" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Map Section */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-slate-900 rounded-[2rem] p-8 text-white shadow-2xl relative overflow-hidden group border border-slate-800">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity transform rotate-12">
              <MapIcon size={240} />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-4 max-w-md">
                <div className="inline-flex items-center space-x-2 px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full border border-orange-500/30">
                  <MapIcon className="w-4 h-4" />
                  <span className="font-bold uppercase tracking-widest text-[10px]">Territory Mapping</span>
                </div>
                <h3 className="text-2xl font-black leading-tight">Interactive Lebanon Property Network</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Explore available listings across Beirut, Byblos, and Jounieh. Real-time availability and site visitor
                  tracking.
                </p>
                <div className="flex space-x-4">
                  <div className="bg-white/5 backdrop-blur-xl p-4 rounded-2xl flex-1 border border-white/10">
                    <div className="flex items-center space-x-2 mb-1">
                      <Building2 className="w-4 h-4 text-orange-400" />
                      <span className="text-2xl font-black">{MOCK_PROPERTIES.length}</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Local Listings</span>
                  </div>
                  <div className="bg-white/5 backdrop-blur-xl p-4 rounded-2xl flex-1 border border-white/10">
                    <div className="flex items-center space-x-2 mb-1">
                      <Calendar className="w-4 h-4 text-orange-400" />
                      <span className="text-2xl font-black">2</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Active Showings</span>
                  </div>
                </div>
              </div>
              <button className="flex-shrink-0 bg-white text-slate-900 px-6 py-3 rounded-2xl font-bold text-sm shadow-xl hover:bg-orange-500 hover:text-white transition-all flex items-center space-x-2 self-start md:self-center">
                <span>Expand Map</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="bg-white p-4 rounded-[2rem] shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4 px-4 pt-4">
              <h3 className="font-black text-slate-800 flex items-center space-x-2 uppercase tracking-tight">
                <MapIcon className="w-5 h-5 text-orange-500" />
                <span>Geographical Distribution</span>
              </h3>
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
            <div className="h-[450px]">
              <MapView properties={MOCK_PROPERTIES} />
            </div>
          </div>
        </div>

        {/* Sidebar Insights & Jobs */}
        <div className="space-y-8">
          {/* Insights
          <div className="bg-orange-600 rounded-[2rem] p-8 text-white shadow-xl relative overflow-hidden">
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
            <div className="flex items-center space-x-2 mb-6">
              <TrendingUp className="w-6 h-6" />
              <h3 className="font-black text-xl tracking-tight">Market Analysis</h3>
            </div>
            <div className="min-h-[140px] flex flex-col justify-center bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              {loadingInsights ? (
                <div className="flex flex-col items-center justify-center space-y-3 py-4">
                  <Loader2 className="w-8 h-8 animate-spin text-white" />
                  <span className="text-xs font-bold uppercase tracking-widest opacity-80">AI Consult In Progress</span>
                </div>
              ) : (
                <p className="text-sm text-white leading-relaxed font-medium italic">"{insights}"</p>
              )}
            </div>
            <div className="mt-6 flex items-center justify-between">
              <div className="flex -space-x-2">
                <img src="https://i.pravatar.cc/40?u=1" className="w-8 h-8 rounded-full border-2 border-orange-600" />
                <img src="https://i.pravatar.cc/40?u=2" className="w-8 h-8 rounded-full border-2 border-orange-600" />
                <img src="https://i.pravatar.cc/40?u=3" className="w-8 h-8 rounded-full border-2 border-orange-600" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Verified AI Engine</p>
            </div>
          </div> */}

          {/* Upcoming Jobs */}
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-black text-slate-800 uppercase tracking-tight">Active Schedule</h3>
              <span className="px-3 py-1 bg-blue-100 text-blue-600 text-[10px] font-bold rounded-full">
                {MOCK_JOBS.length} TASKS
              </span>
            </div>
            <div className="space-y-6">
              {MOCK_JOBS.map((job) => {
                // Fix: Retrieve the correct property details from MOCK_PROPERTIES using the job's propertyId to fix the undefined 'property' field error.
                const property = MOCK_PROPERTIES.find((p) => p.id === job.propertyId);
                return (
                  <div key={job.id} className="relative pl-6 border-l-2 border-slate-100 group">
                    <div className="absolute -left-[5px] top-0 w-2 h-2 bg-orange-500 rounded-full group-hover:scale-150 transition-transform"></div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-black text-slate-800 leading-none">{job.title}</h4>
                      <p className="text-xs text-slate-500 font-medium">{property?.title || "Unknown Property"}</p>
                      <div className="flex items-center space-x-2 pt-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span className="text-[10px] font-black text-slate-400 uppercase">{job.date}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Activity Section */}
      <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h3 className="font-black text-slate-800 uppercase tracking-tight">Volume Performance</h3>
            <p className="text-xs font-medium text-slate-400">Total transaction volume across Lebanese districts.</p>
          </div>
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button className="text-[10px] px-4 py-2 bg-white text-slate-900 rounded-lg font-black shadow-sm">
              MONTHLY
            </button>
            <button className="text-[10px] px-4 py-2 text-slate-400 hover:text-slate-600 font-black transition-colors">
              QUARTERLY
            </button>
          </div>
        </div>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#64748b", fontWeight: "bold" }}
                dy={15}
              />
              <YAxis hide />
              <Tooltip
                cursor={{ fill: "#f8fafc", radius: 10 }}
                contentStyle={{
                  borderRadius: "16px",
                  border: "none",
                  boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
                  padding: "12px",
                }}
              />
              <Bar dataKey="sales" radius={[8, 8, 8, 8]} barSize={40}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={index === chartData.length - 1 ? "#f97316" : "#e2e8f0"}
                    className="hover:fill-orange-400 transition-colors"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
