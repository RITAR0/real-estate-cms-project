import React, { useState } from "react";
import { Search, Plus, Filter, MapPin, Bed, Bath, Maximize, UserCheck, ChevronDown } from "lucide-react";
import { MOCK_PROPERTIES, MOCK_BROKERS } from "../constants";
import { Property } from "../types";
import AddPropertyModal from "./AddPropertyModal";

const PropertyListView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [properties, setProperties] = useState<Property[]>(MOCK_PROPERTIES);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredProperties = properties.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleAssignBroker = (propertyId: string, brokerId: string) => {
    setProperties((prev) => prev.map((p) => (p.id === propertyId ? { ...p, assignedBrokerId: brokerId } : p)));
  };

  const handleAddProperty = (newProperty: Property) => {
    setProperties((prev) => [newProperty, ...prev]);
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Inventory</h2>
          <p className="text-slate-500 font-medium">Manage and browse your real estate portfolio.</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-orange-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center space-x-2 hover:bg-orange-700 transition-all shadow-xl shadow-orange-200"
        >
          <Plus size={20} />
          <span>Add Property</span>
        </button>
      </header>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search listings..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-100 rounded-2xl focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center space-x-2 px-6 py-3 bg-white border border-slate-100 rounded-2xl text-slate-600 hover:bg-slate-50 transition-colors font-bold text-sm">
          <Filter size={18} />
          <span>Filters</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredProperties.map((prop) => {
          const broker = MOCK_BROKERS.find((b) => b.id === prop.assignedBrokerId);
          return (
            <div
              key={prop.id}
              className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 group hover:shadow-2xl transition-all duration-500 flex flex-col md:flex-row"
            >
              <div className="relative w-full md:w-64 h-64 md:h-auto overflow-hidden">
                <img
                  src={prop.image}
                  alt={prop.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <div className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black text-slate-900 uppercase shadow-sm w-fit">
                    {prop.type}
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-[10px] font-black text-white shadow-sm w-fit ${
                      prop.status === "Available"
                        ? "bg-green-500"
                        : prop.status === "Pending"
                          ? "bg-orange-500"
                          : "bg-red-500"
                    }`}
                  >
                    {prop.status}
                  </div>
                </div>
              </div>

              <div className="flex-1 p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center text-slate-400 text-xs font-bold uppercase tracking-widest">
                      <MapPin size={14} className="mr-1 text-orange-500" />
                      {prop.location}
                    </div>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-4 group-hover:text-orange-600 transition-colors">
                    {prop.title}
                  </h3>

                  <div className="flex items-center space-x-6 py-4 border-y border-slate-50 mb-4">
                    {prop.beds && (
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Beds</span>
                        <div className="flex items-center space-x-1">
                          <Bed size={14} className="text-orange-500" />
                          <span className="text-sm font-black text-slate-800">{prop.beds}</span>
                        </div>
                      </div>
                    )}
                    {prop.baths && (
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Baths</span>
                        <div className="flex items-center space-x-1">
                          <Bath size={14} className="text-orange-500" />
                          <span className="text-sm font-black text-slate-800">{prop.baths}</span>
                        </div>
                      </div>
                    )}
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Sqft</span>
                      <div className="flex items-center space-x-1">
                        <Maximize size={14} className="text-orange-500" />
                        <span className="text-sm font-black text-slate-800">{prop.sqft}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 gap-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                      Listing Price
                    </span>
                    <span className="text-2xl font-black text-slate-900 leading-none">
                      ${prop.price.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                      Assign Agent
                    </span>
                    <div className="relative">
                      <select
                        className="appearance-none bg-slate-100 hover:bg-slate-200 pl-4 pr-10 py-2 rounded-xl text-[10px] font-black text-slate-700 outline-none cursor-pointer transition-all"
                        value={prop.assignedBrokerId || ""}
                        onChange={(e) => handleAssignBroker(prop.id, e.target.value)}
                      >
                        <option value="">Choose Agent</option>
                        {MOCK_BROKERS.map((b) => (
                          <option key={b.id} value={b.id}>
                            {b.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={14}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <AddPropertyModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdd={handleAddProperty} />
    </div>
  );
};

export default PropertyListView;
