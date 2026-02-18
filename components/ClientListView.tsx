import React, { useState } from "react";
import { Search, Plus, UserCircle, Briefcase, ChevronDown, CheckCircle2 } from "lucide-react";
import { MOCK_CLIENTS, MOCK_BROKERS } from "../constants";
import { Client } from "../types";
import AddClientModal from "./AddClientModal";

const ClientListView: React.FC = () => {
  const [clients, setClients] = useState<Client[]>(MOCK_CLIENTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAssign = (clientId: string, brokerId: string) => {
    setClients((prev) => prev.map((c) => (c.id === clientId ? { ...c, assignedBrokerId: brokerId } : c)));
  };

  const handleAddClient = (newClient: Client) => {
    setClients((prev) => [newClient, ...prev]);
    setIsAddModalOpen(false);
  };

  const filtered = clients.filter((c) => c.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Client CRM</h2>
          <p className="text-slate-500 font-medium">Relationships and portfolio management.</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-orange-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center space-x-2 hover:bg-orange-700 shadow-xl shadow-orange-200"
        >
          <Plus size={20} />
          <span>New Lead</span>
        </button>
      </header>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search leads and clients..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-100 rounded-2xl focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all"
            value={searchTerm}
          />
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Client Name</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Lead Type</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Assigned Broker
              </th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.map((client) => {
              const broker = MOCK_BROKERS.find((b) => b.id === client.assignedBrokerId);
              return (
                <tr key={client.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-orange-100 group-hover:text-orange-600 transition-colors">
                        <UserCircle size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{client.name}</p>
                        <p className="text-xs text-slate-500">{client.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        client.type === "Buyer"
                          ? "bg-blue-100 text-blue-600"
                          : client.type === "Seller"
                            ? "bg-purple-100 text-purple-600"
                            : "bg-green-100 text-green-600"
                      }`}
                    >
                      {client.type}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="relative inline-block text-left">
                      <select
                        value={client.assignedBrokerId || ""}
                        onChange={(e) => handleAssign(client.id, e.target.value)}
                        className="appearance-none bg-slate-100/50 hover:bg-slate-100 border-none px-4 py-2 pr-10 rounded-xl text-xs font-bold text-slate-700 outline-none cursor-pointer transition-all"
                      >
                        <option value="">Unassigned</option>
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
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="p-2 text-slate-300 hover:text-orange-600 transition-colors">
                      <Briefcase size={18} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <AddClientModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdd={handleAddClient} />
    </div>
  );
};

export default ClientListView;
