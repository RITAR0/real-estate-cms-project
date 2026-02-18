import React, { useState } from "react";
import { X } from "lucide-react";
import { Client, Broker } from "../types";
import { MOCK_BROKERS } from "../constants";

interface AddClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (client: Client) => void;
}

const AddClientModal: React.FC<AddClientModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState<Partial<Client>>({
    name: "",
    email: "",
    type: "Buyer",
    assignedBrokerId: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    const newClient: Client = {
      id: `c${Date.now()}`,
      name: formData.name || "",
      email: formData.email || "",
      type: formData.type as "Buyer" | "Seller" | "Tenant",
      assignedBrokerId: formData.assignedBrokerId || undefined,
      lastInteraction: new Date().toISOString().split("T")[0],
    };

    onAdd(newClient);
    onClose();
    // Reset form
    setFormData({
      name: "",
      email: "",
      type: "Buyer",
      assignedBrokerId: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h2 className="text-2xl font-black text-slate-900">New Client/Lead</h2>
            <p className="text-slate-500 font-medium text-sm">Add a new prospective client</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-bold text-slate-900"
              placeholder="e.g. Sarah Jones"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-bold text-slate-900"
              placeholder="e.g. sarah@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Client Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-bold text-slate-900"
            >
              <option value="Buyer">Buyer</option>
              <option value="Seller">Seller</option>
              <option value="Tenant">Tenant</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
              Assign Broker
            </label>
            <select
              name="assignedBrokerId"
              value={formData.assignedBrokerId}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-bold text-slate-900"
            >
              <option value="">Unassigned</option>
              {MOCK_BROKERS.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t border-slate-100 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-orange-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-200"
            >
              Add Client
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClientModal;
