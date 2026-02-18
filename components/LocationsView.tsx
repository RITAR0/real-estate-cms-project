import React from "react";
import MapView from "./MapView";
import { MOCK_PROPERTIES } from "../constants";

const LocationsView: React.FC = () => {
  const [statusFilter, setStatusFilter] = React.useState("All");
  const [typeFilter, setTypeFilter] = React.useState("All");
  const [priceRange, setPriceRange] = React.useState({ min: "", max: "" });

  const filteredProperties = React.useMemo(() => {
    return MOCK_PROPERTIES.filter((p) => {
      if (statusFilter !== "All" && p.status !== statusFilter) return false;
      if (typeFilter !== "All" && p.type !== typeFilter) return false;
      if (priceRange.min && p.price < parseInt(priceRange.min)) return false;
      if (priceRange.max && p.price > parseInt(priceRange.max)) return false;
      return true;
    });
  }, [statusFilter, typeFilter, priceRange]);

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col space-y-6">
      <header className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Territory Insights</h2>
          <p className="text-slate-500 font-medium">Real-time geographical distribution of your assets.</p>
        </div>

        <div className="flex flex-wrap gap-3 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border-none rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-orange-500/20 outline-none cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="For Sale">For Sale</option>
            <option value="For Rent">For Rent</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-slate-50 border-none rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-orange-500/20 outline-none cursor-pointer"
          >
            <option value="All">All Types</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="Office">Office</option>
            <option value="Land">Land</option>
            <option value="Commercial">Commercial</option>
          </select>

          <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-1">
            <span className="text-xs font-bold text-slate-400 uppercase">Price</span>
            <input
              type="number"
              placeholder="Min"
              className="w-20 bg-transparent border-none text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:ring-0 p-0"
              value={priceRange.min}
              onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
            />
            <span className="text-slate-300">-</span>
            <input
              type="number"
              placeholder="Max"
              className="w-20 bg-transparent border-none text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:ring-0 p-0"
              value={priceRange.max}
              onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
            />
          </div>
        </div>
      </header>
      <div className="flex-1 bg-white p-4 rounded-[2.5rem] shadow-2xl border border-slate-100 relative overflow-hidden">
        <MapView properties={filteredProperties} />
      </div>
    </div>
  );
};

export default LocationsView;
